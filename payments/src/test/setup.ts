import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signin(userId?: string): string[];
    }
  }
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51H0pnhCVxbxetmfxOTZkVPjst16VwM3t6OImERFQGzMyxHVHTlW4Vs2Vc50NooGFytiDmotvqvHqRjZU9CtyuF5B00fnGshr1a';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'altakey';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (userId?: string) => {
  // Build a JWT payload { id, email}
  const payload = {
    id: userId || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
