"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createToken = async (hash) => {
    const token = await prisma.token.findUnique({ where: { hash } });
    if (!token) {
        throw new Error("Token no encontrado.");
    }
    const jwtToken = jsonwebtoken_1.default.sign({ id: token.id, email: token.email, role: token.role }, process.env.JWT_SECRET || "", { expiresIn: "1h" });
    return jwtToken;
};
exports.createToken = createToken;
const verifyToken = (jwtToken) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET || "");
        return decoded;
    }
    catch (error) {
        throw new Error("Token inválido.");
    }
};
exports.verifyToken = verifyToken;
const generateHash = async (email, role) => {
    const salt = await bcrypt_1.default.genSalt(10);
    const hash = await bcrypt_1.default.hash(`${email}-${role}-${Date.now()}`, salt);
    return hash;
};
exports.generateHash = generateHash;
