"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Error interno del servidor";
    res.status(status).json({ message });
};
exports.errorHandler = errorHandler;
