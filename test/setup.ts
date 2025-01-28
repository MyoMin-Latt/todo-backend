import mongoose from 'mongoose';
import app from '../src/server';

beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGO_URI!);
});

afterAll(async () => {
    // Disconnect from the database and close the server
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});