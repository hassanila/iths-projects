import app, { server } from '../../src/server';
import request from 'supertest';
import GetContact from '../../src/types/GetContact';
import PostContact from '../../src/types/PostContact';
import PostError from '../../src/types/PostError';
import nock from 'nock';

afterAll((done) => {
  server.close(() => {
    console.log('Server closed');
    done();
  });
});

nock('https://api.api-ninjas.com')
  .persist()
  .get('/v1/geocoding')
  .query(true)
  .reply(200, [
    {
      latitude: 59.33258,
      longitude: 18.0649,
    },
  ]);

describe('GET /contact', () => {
  it('gets all contacts - expect 200 OK', async () => {
    const response = await request(server).get(`/contact`);
    expect(response.status).toEqual(200);

    const contacts = response.body as GetContact[];

    expect(Array.isArray(contacts)).toBe(true);

    contacts.forEach((contact) => {
      expect(typeof contact).toBe('object');

      expect(typeof contact._id).toBe('string');
      expect(contact._id.length).toBeGreaterThanOrEqual(10);

      expect(typeof contact.firstname).toBe('string');
      expect(contact.firstname.length).toBeGreaterThanOrEqual(2);

      expect(typeof contact.lastname).toBe('string');
      expect(contact.lastname.length).toBeGreaterThanOrEqual(2);

      expect(typeof contact.email).toBe('string');
      expect(contact.email.length).toBeGreaterThanOrEqual(5);

      expect(typeof contact.personalnumber).toBe('string');
      expect(contact.personalnumber.length).toBeGreaterThanOrEqual(10);

      expect(typeof contact.address).toBe('string');
      expect(contact.address.length).toBeGreaterThanOrEqual(5);

      expect(typeof contact.zipCode).toBe('string');
      expect(contact.zipCode.length).toBe(6);

      expect(typeof contact.city).toBe('string');
      expect(contact.city.length).toBeGreaterThanOrEqual(2);

      expect(typeof contact.country).toBe('string');
      expect(contact.country.length).toBeGreaterThanOrEqual(2);

      expect(typeof contact.lat).toBe('number');
      expect(typeof contact.lng).toBe('number');
    });
  });
});

describe(`GET /contact/:id`, () => {

  // need to change testContactId to a valid id that exists in the database, otherwise the test will fail
  // you can add a new contact to the database and use that id
  const testContactId = '657cb93196ea408ede7cc811';
  const testNonExistentContactId = '000b945ceac003d890000000';
  const testInvalidContactId = '1234567890';

  it('gets contact by id - expect 200 OK', async () => {
    const response = await request(server).get(`/contact/${testContactId}`);
    expect(response.status).toEqual(200);

    const contact = response.body as GetContact;

    expect(typeof contact).toBe('object');

    expect(typeof contact._id).toBe('string');
    expect(contact._id.length).toBeGreaterThanOrEqual(10);

    expect(typeof contact.firstname).toBe('string');
    expect(contact.firstname.length).toBeGreaterThanOrEqual(2);

    expect(typeof contact.lastname).toBe('string');
    expect(contact.lastname.length).toBeGreaterThanOrEqual(2);

    expect(typeof contact.email).toBe('string');
    expect(contact.email.length).toBeGreaterThanOrEqual(5);

    expect(typeof contact.personalnumber).toBe('string');
    expect(contact.personalnumber.length).toBeGreaterThanOrEqual(10);

    expect(typeof contact.address).toBe('string');
    expect(contact.address.length).toBeGreaterThanOrEqual(5);

    expect(typeof contact.zipCode).toBe('string');
    expect(contact.zipCode.length).toBe(6);

    expect(typeof contact.city).toBe('string');
    expect(contact.city.length).toBeGreaterThanOrEqual(2);

    expect(typeof contact.country).toBe('string');
    expect(contact.country.length).toBeGreaterThanOrEqual(2);

    expect(typeof contact.lat).toBe('number');
    expect(typeof contact.lng).toBe('number');
  });

  it('gets contact with non-existent id - expect 404 Not Found', async () => {
    const response = await request(server).get(
      `/contact/${testNonExistentContactId}`,
    );
    expect(response.status).toEqual(404);
  });

  it('gets contact with invalid id - expect 404 Not Found', async () => {
    const response = await request(server).get(
      `/contact/${testInvalidContactId}`,
    );
    expect(response.status).toEqual(404);
  });
});

describe(`POST /contact`, () => {

  const testValidPostContact = {
    firstname: 'Anna',
    lastname: 'Andersson',
    email: 'anna.andersson@gmail.com',
    personalnumber: '550713-1405',
    address: 'Utvecklargatan 12',
    zipCode: '111 22',
    city: 'Stockholm',
    country: 'Sweden',
  } as PostContact;

  const testInvalidPostContact = {
    firstname: '',
    lastname: '',
    email: '',
    personalnumber: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
  };

  const testEmptyPostContact = {};


  it('adds a valid contact - expect 201 Created', async () => {
    const response = await request(app)
      .post(`/contact`)
      .send(testValidPostContact);
    expect(response.status).toEqual(201);
  });

  it('adds an invalid contact - expect 400 Bad Request', async () => {
    const response = await request(app)
      .post(`/contact`)
      .send(testInvalidPostContact);
    expect(response.status).toEqual(400);

    const errors = response.body as PostError[];

    expect(Array.isArray(errors)).toBe(true);

    expect(errors.length).toBe(8);

    errors.forEach((error) => {
      expect(typeof error).toBe('object');
      expect(Object.keys(error).length).toBe(1);
      expect(typeof error.error).toBe('string');
      expect(error.error.length).toBeGreaterThan(0);
    });

    expect(errors[0].error).toBe('firstname is invalid');
    expect(errors[1].error).toBe('lastname is invalid');
    expect(errors[2].error).toBe('email is invalid');
    expect(errors[3].error).toBe('personalnumber is invalid');
    expect(errors[4].error).toBe('address is invalid');
    expect(errors[5].error).toBe('zipCode is invalid');
    expect(errors[6].error).toBe('city is invalid');
    expect(errors[7].error).toBe('country is invalid');
  });

  it('adds an empty contact - expect 400 Bad Request', async () => {
    const response = await request(app)
      .post(`/contact`)
      .send(testEmptyPostContact);
    expect(response.status).toEqual(400);

    const errors = response.body as PostError[];

    expect(Array.isArray(errors)).toBe(true);

    expect(errors.length).toBe(8);

    errors.forEach((error) => {
      expect(typeof error).toBe('object');
      expect(Object.keys(error).length).toBe(1);
      expect(typeof error.error).toBe('string');
      expect(error.error.length).toBeGreaterThan(0);
    });

    expect(errors[0].error).toBe('firstname is missing');
    expect(errors[1].error).toBe('lastname is missing');
    expect(errors[2].error).toBe('email is missing');
    expect(errors[3].error).toBe('personalnumber is missing');
    expect(errors[4].error).toBe('address is missing');
    expect(errors[5].error).toBe('zipCode is missing');
    expect(errors[6].error).toBe('city is missing');
    expect(errors[7].error).toBe('country is missing');
  });
});