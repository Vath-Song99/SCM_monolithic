import express, { Application } from 'express';
import { errorHandler } from './middlewares/error-handler';

const app:Application = express();

app.use(express.json({
    limit: '10mb'
}));


// Global error handler
app.use(errorHandler)

export default app;