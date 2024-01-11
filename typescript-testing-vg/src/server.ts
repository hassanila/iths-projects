import express, { Request, Response } from 'express';
import { connectToDb } from './db';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import PostContact from './types/PostContact';
import validateText from './utils/validateText';
import PostError from './types/PostError';
import validateEmail from './utils/validateEmail';
import validateZipCode from './utils/validateZipCode';
import validatePersonalNumber from './utils/validatePersonalNumber';
import GetContact from './types/GetContact';
import getCoordinates from './utils/getCoordinates';

dotenv.config();

const app = express();
app.use(express.json());
let client: MongoClient | null = null;

const port = 3000;

async function getClient(): Promise<MongoClient> {
  if (client) {
    return new Promise((resolve) => {
      resolve(client as MongoClient);
    });
  } else {
    return connectToDb() as Promise<MongoClient>;
  }
}

app.get('/contact/:id?', async (req: Request, res: Response) => {

  // also mock db connection error in tests
  client = await getClient();

  const collection = client
    .db('typescript-testing-vg')
    .collection('contacts');
  let data = null;
  if (req.params.id) {
    try {
      const result = await collection.findOne({
        _id: new ObjectId(req.params.id),
      });

      if (!result) {
        throw new Error('Contact not found');
      }

      const coordinates = await getCoordinates(result.city, result.country);

      if (coordinates !== null) {
        result.lat = coordinates.lat;
        result.lng = coordinates.lng;
      }

      data = result as unknown as GetContact;
    } catch (err) {
      console.error(err);
    }

    if (!data) {
      return res.sendStatus(404);
    }
  } else {
    let result = await collection.find().toArray();

    // wait for all coordinates to be fetched
    result = await Promise.all(
      result.map(async (contact) => {
        const coordinates = await getCoordinates(
          contact.city,
          contact.country,
        );

        if (coordinates !== null) {
          contact.lat = coordinates.lat;
          contact.lng = coordinates.lng;
        }

        return contact;
      }),
    );

    data = result as unknown[] as GetContact[];
  }
  res.send(data);
  /* catch (err) {
     console.error(err);
   } /*finally {
     if (client) {
       await client.close();
     }*/
});

app.post('/contact', async (req, res) => {
  const errors: PostError[] = [];

  if (typeof req.body.firstname === 'undefined') {
    errors.push({ error: 'firstname is missing' });
  } else if (!validateText(req.body.firstname)) {
    errors.push({ error: 'firstname is invalid' });
  }

  if (typeof req.body.lastname === 'undefined') {
    errors.push({ error: 'lastname is missing' });
  } else if (!validateText(req.body.lastname)) {
    errors.push({ error: 'lastname is invalid' });
  }

  if (typeof req.body.email === 'undefined') {
    errors.push({ error: 'email is missing' });
  } else if (!validateEmail(req.body.email)) {
    errors.push({ error: 'email is invalid' });
  }

  if (typeof req.body.personalnumber === 'undefined') {
    errors.push({ error: 'personalnumber is missing' });
  } else if (!validatePersonalNumber(req.body.personalnumber)) {
    errors.push({ error: 'personalnumber is invalid' });
  }

  if (typeof req.body.address === 'undefined') {
    errors.push({ error: 'address is missing' });
  } else if (!validateText(req.body.address)) {
    errors.push({ error: 'address is invalid' });
  }

  if (typeof req.body.zipCode === 'undefined') {
    errors.push({ error: 'zipCode is missing' });
  } else if (!validateZipCode(req.body.zipCode)) {
    errors.push({ error: 'zipCode is invalid' });
  }

  if (typeof req.body.city === 'undefined') {
    errors.push({ error: 'city is missing' });
  } else if (!validateText(req.body.city)) {
    errors.push({ error: 'city is invalid' });
  }

  if (typeof req.body.country === 'undefined') {
    errors.push({ error: 'country is missing' });
  } else if (!validateText(req.body.country)) {
    errors.push({ error: 'country is invalid' });
  }

  if (errors.length > 0) {
    //console.log(errors);
    return res.status(400).send(errors);
  }

  client = await getClient();

  const collection = client
    .db('typescript-testing-vg')
    .collection('contacts');
  const result = await collection.insertOne(req.body as PostContact);

  if (result.acknowledged) {
    res.sendStatus(201);
  } /*else {
      throw new Error('DB error: could not insert contact');
    }*/
  /*catch (err) {
   errors.push({ error: 'DB error: could not insert contact' });
   //console.log(errors);
   return res.status(400).send(errors);
 }/* finally {
   if (client) {
     await client.close();
   }
 }*/
});


const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { server };
export default app;
