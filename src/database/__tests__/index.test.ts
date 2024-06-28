import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import MongoDBConnector from '../index'; // Adjust the import path accordingly

describe('MongoDBConnector', () => {
  let mongoServer: MongoMemoryServer;
  let mongoDBConnector: MongoDBConnector;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
  });

  beforeEach(() => {
    mongoDBConnector = MongoDBConnector.getInstance();
  });

  afterEach(async () => {
    await mongoDBConnector.disconnect();
    MongoDBConnector.resetInstance();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it('should connect to MongoDB', async () => {
    const mongoUri = mongoServer.getUri();
    await mongoDBConnector.connect({ url: mongoUri });

    expect(mongoose.connection.readyState).toBe(1); // 1 means connected
  });

  it('should disconnect from MongoDB', async () => {
    const mongoUri = mongoServer.getUri();
    await mongoDBConnector.connect({ url: mongoUri });
    await mongoDBConnector.disconnect();

    expect(mongoose.connection.readyState).toBe(0); // 0 means disconnected
  });

  it('should handle connection errors', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const invalidUri = 'mongodb+srv://learnwithkru:gT5jqfgZyQ8UmCNn@learnwithkru.elxl0wh.mongodb.net676rr/studentpppp';

    await mongoDBConnector.connect({ url: invalidUri });

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('MongoDB disconnected'));
    consoleSpy.mockRestore();
  });
});
