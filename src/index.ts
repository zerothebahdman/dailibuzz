import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';

const app: Application = express();
app.use(express.json());
export default app;
