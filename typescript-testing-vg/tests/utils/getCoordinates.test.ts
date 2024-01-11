import nock from 'nock';
import getCoordinates from '../../src/utils/getCoordinates';

describe(`getCoordinates`, () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it(`returns coordinates for valid city and country`, async () => {

    nock('https://api.api-ninjas.com')
      .get('/v1/geocoding?city=Stockholm&country=Sweden')
      .reply(200, [
        {
          latitude: 59.33258,
          longitude: 18.0649,
        },
      ]);

    const coordinates = await getCoordinates('Stockholm', 'Sweden');

    expect(typeof coordinates?.lat).toEqual('number');
    expect(typeof coordinates?.lng).toEqual('number');

  });

  it(`returns error for invalid city and country`, async () => {

    nock('https://api.api-ninjas.com')
      .get('/v1/geocoding?city=12345&country=abcde')
      .reply(200, []);

    await getCoordinates('12345', 'abcde').catch((error) => {
      expect(error).toEqual('No results');
    });
  });

  it(`returns error for invalid api key`, async () => {

    nock('https://api.api-ninjas.com', {
      reqheaders: {
        'x-api-key': '12345',
      },
    })
      .get('/v1/geocoding')
      .query(true)
      .reply(400, {
        'error': 'Invalid API Key.',
      });


    const oldEnv = process.env.APININJA_API_KEY;
    process.env.APININJA_API_KEY = '12345';

    await getCoordinates('Stockholm', 'Sweden').catch((error) => {
      expect(error).toEqual(400);

      process.env.APININJA_API_KEY = oldEnv;
    });
  });

  it(`returns error for any problem with request`, async () => {

    nock('https://api.api-ninjas.com')
      .get('/v1/geocoding?city=Stockholm&country=Sweden')
      .replyWithError({ message: 'No response received' });

    await getCoordinates('Stockholm', 'Sweden').catch((error) => {
      expect(error).toEqual('No response received');
    });
  });
});