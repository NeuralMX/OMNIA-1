import { Request, Response } from "express";

interface Error {
  status?: number;
  message?: string;
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
) => {
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  res.status(status).json({ message });
};
