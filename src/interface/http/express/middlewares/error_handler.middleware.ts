import { NextFunction, Request, Response } from 'express';
import type { ErrorRequestHandler } from 'express';
import config from 'config';

export interface Error {
  statusCode: number;
  status: string;
  message: string;
  error?: string;
  stack?: string;
  name?: string;
  isOperational?: boolean;
}

function setDevError(err: Error, res: Response) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    error_stack: err.stack,
  });
}

function setProductionError(err: Error, res: Response) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(`Error 💣:`, err);

    res.status(500).json({
      status: `Error`,
      message: `Something went wrong.`,
    });
  }
}

const ErrorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.get<string>('env') === 'development') {
    setDevError(err, res);
  } else if (config.get<string>('env') === 'production') {
    setProductionError(err, res);
  }
  next();
};

export default ErrorHandler;
