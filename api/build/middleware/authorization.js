"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (roles) => {
    return (req, res, next) => {
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
exports.authorize = authorize;
