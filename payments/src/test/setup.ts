import  { MongoMemoryServer } from 'mongodb-memory-server'
import  mongoose from 'mongoose'
import { app } from '../app';
import request from 'supertest'
import jwt from 'jsonwebtoken'


declare global {
    var signin: (id?: string) => string[];
}

global.signin = (id?: string) => {
    // Build a JWT payload. { id, email }
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }
    
    // Create the JWT token
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    // Build session Object. { JWT: MY_JWT }
    const session = {jwt: token }

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session)

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64')

    // return a string thats the cookie with the encoded data
    return [`session=${base64}`];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51OCH6SD9PB3VpiLC9BjJKRwRnIGVlVfBzdDFoJcN6UyUA5RzK4a4wPbomeJRK0GXMQ3AFyWx5UIcwX0nahDSsvB700QzZ5Tx9W'
let mongo: any
beforeAll(async() => {
    process.env.JWT_KEY = 'testing123'

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    
    await mongoose.connect(mongoUri, {});
})

beforeEach(async() => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({});
    }
})

afterAll(async() => {
    await mongo.stop();
    await mongoose.connection.close()
})