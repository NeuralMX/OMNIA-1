import { Request, Response, NextFunction } from "express";

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.body.role;
    if (!roles.includes(userRole)) {
      res
        .status(403)
        .json({
          message: "Acceso denegado. No tienes los permisos necesarios.",
        });
      return;
    }
    next();
  };
};
