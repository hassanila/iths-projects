import axios, { AxiosResponse } from 'axios';

import dotenv from 'dotenv';

dotenv.config();

interface Coordinates {
  lat: number;
  lng: number;
}

export default async function(
  city: string,
  country: string,
): Promise<Coordinates | null> {
  return new Promise((resolve, reject) => {
    axios({
      url: `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`,
      headers: {
        'X-Api-Key': process.env.APININJA_API_KEY,
      },
    })
      .then((response: AxiosResponse) => {
        if (response.data.length == 0) {
          return reject('No results');
        } else {
          const obj = response.data[0];

          const coordinates: Coordinates = {
            lat: obj.latitude,
            lng: obj.longitude,
          };

          resolve(coordinates);
        }
      })
      .catch((error) => {

        return reject(error.response?.status || error.message);
      });
  });
}
