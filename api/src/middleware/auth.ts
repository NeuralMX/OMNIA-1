import { TokenRole } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/authUtils';

interface AuthenticatedRequest extends Request {
  user?: Record<string, unknown>;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: (error as Error).message });
  }
};

export const authorize = (requiredRole: TokenRole) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role || !(req.user.role === requiredRole || req.user.role === TokenRole.admin)) {
      return res.status(403).json({ message: 'No tiene permiso para realizar esta acción.' });
    }

    next();
  };
};
