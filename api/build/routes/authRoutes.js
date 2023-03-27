"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const authUtils_1 = require("../utils/authUtils");
const auth_1 = require("../middleware/auth");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/login", async (req, res) => {
    const { hash } = req.body;
    try {
        const token = await prisma.token.findUnique({ where: { hash } });
        if (!token) {
            return res.status(401).json({ message: "Token no encontrado." });
        }
        const jwtToken = await (0, authUtils_1.createToken)(hash);
        res.json({ token: jwtToken });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/generate-token", auth_1.authenticate, (0, auth_1.authorize)("admin"), async (req, res) => {
    const { email, role } = req.body;
    if (!email || !role) {
        return res
            .status(400)
            .json({ message: "Se deben proporcionar un email y un rol." });
    }
    try {
        const hash = await (0, authUtils_1.generateHash)(email, role);
        const token = await prisma.token.create({ data: { hash, email, role } });
        res.json(token);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
