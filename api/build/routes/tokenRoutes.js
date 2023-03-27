"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/", (0, auth_1.authorize)("admin"), async (_req, res) => {
    try {
        const tokens = await prisma.token.findMany();
        res.json(tokens);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
