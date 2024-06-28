import path from 'path';
import dotenv from 'dotenv';
import { ApiError } from '@scm/errors/api-error';
import getConfig from '../configs'; // Adjust the import path as needed

jest.mock('path');
jest.mock('dotenv');

describe('Config Functions', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests
    process.env = { ...originalEnv }; // Reset process.env to original values before each test
  });

  afterEach(() => {
    process.env = originalEnv; // Restore process.env to original state
  });

  describe('createConfig', () => {
    it('should load environment variables from the specified config path', () => {
      const mockConfigPath = '../../configs/.env';
      (path.join as jest.Mock).mockReturnValue(mockConfigPath);

      (dotenv.config as jest.Mock).mockImplementation(({ path }) => {
        if (path === mockConfigPath) {
          process.env.NODE_ENV = 'development';
          process.env.PORT = '3000';
          process.env.MONGODB_URL = 'mongodb://localhost:27017/test';
          process.env.LOG_LEVEL = 'info';
        }
      });

      const config = getConfig('development');

      expect(dotenv.config).toHaveBeenCalledWith({ path: mockConfigPath });
      expect(config).toEqual({
        env: 'development',
        port: '3000',
        mongoUrl: 'mongodb://localhost:27017/test',
        logLevel: 'info',
      });
    });

    it('should throw an error if required environment variables are missing', () => {
      const mockConfigPath = '../../configs/.env';
      (path.join as jest.Mock).mockReturnValue(mockConfigPath);

      (dotenv.config as jest.Mock).mockImplementation(({ path }) => {
        if (path === mockConfigPath) {
          process.env.NODE_ENV = 'development';
          delete process.env.PORT;
          delete process.env.MONGODB_URL;
          delete process.env.LOG_LEVEL;
        }
      });

      expect(() => getConfig('development')).toThrow(
        new ApiError('Missing required environment variables: PORT, MONGODB_URL, LOG_LEVEL')
      );
    });
  });

  describe('getConfig', () => {
    it('should return the correct config path for development environment', () => {
      const mockConfigPath = '../../configs/.env';
      (path.join as jest.Mock).mockReturnValue(mockConfigPath);

      const config = getConfig('development');

      console.log(config)
      expect(path.join).toHaveBeenCalledWith(__dirname, mockConfigPath);
      expect(config).toEqual({
        env: 'development',
        port: '3000',
        mongoUrl: 'mongodb://localhost:27017/test',
        logLevel: 'info',
      });
    });

    it('should return the correct config path for staging environment', () => {
      const mockConfigPath = '../../configs/.env.staging';
      (path.join as jest.Mock).mockReturnValue(mockConfigPath);

      const config = getConfig('staging');
      expect(path.join).toHaveBeenCalledWith(__dirname, mockConfigPath);
      expect(config).toEqual({
        env: 'staging',
        port: '4000',
        mongoUrl: 'mongodb://localhost:27017/staging',
        logLevel: 'warn',
      });
    });

    it('should return the correct config path for production environment', () => {
      const mockConfigPath = '../../configs/.env.production';
      (path.join as jest.Mock).mockReturnValue(mockConfigPath);

      const config = getConfig('production');
      expect(path.join).toHaveBeenCalledWith(__dirname, mockConfigPath);
      expect(config).toEqual({
        env: 'production',
        port: '5000',
        mongoUrl: 'mongodb://localhost:27017/production',
        logLevel: 'error',
      });
    });
  });
});
