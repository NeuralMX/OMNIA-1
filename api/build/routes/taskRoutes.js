"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    try {
        const tasks = await prisma.task.findMany({ include: { node: true } });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/", async (req, res) => {
    const { description, nodeId } = req.body;
    if (!description || !nodeId) {
        return res
            .status(400)
            .json({
            message: "Se deben proporcionar una descripción y un identificador de nodo.",
        });
    }
    try {
        const task = await prisma.task.create({ data: { description, nodeId, status: client_1.TaskStatus.pending } });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ message: "Se debe proporcionar un estado." });
    }
    try {
        const task = await prisma.task.update({
            where: { id },
            data: { status },
            include: { node: true },
        });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.delete({ where: { id } });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
