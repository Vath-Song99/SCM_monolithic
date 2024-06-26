import { MongoServerError } from 'mongodb';

interface ErrorResponse {
    status: number;
    message: string;
}

const handleMongoError = (error: MongoServerError): ErrorResponse => {
    if (error.code === 11000) {
        // Duplicate key error
        const field = Object.keys(error.keyValue)[0];
        return {
            status: 400,
            message: `Duplicate key error: ${field} must be unique. Value: ${error.keyValue[field]}`,
        };
    }

    // Handle other MongoDB errors
    return {
        status: 500,
        message: `MongoDB error: ${error.message}`,
    };
};

export { handleMongoError, ErrorResponse };
