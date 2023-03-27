"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const client_1 = require("@prisma/client");
const authUtils_1 = require("../utils/authUtils");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token no proporcionado." });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0, authUtils_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.authenticate = authenticate;
const authorize = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user ||
            !req.user.role ||
            !(req.user.role === requiredRole || req.user.role === client_1.TokenRole.admin)) {
            return res
                .status(403)
                .json({ message: "No tiene permiso para realizar esta acción." });
        }
        next();
    };
};
exports.authorize = authorize;
