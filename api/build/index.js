"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const errorHandler_1 = require("./middleware/errorHandler");
const client_1 = require("@prisma/client");
const nodeRoutes_1 = __importDefault(require("./routes/nodeRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/nodes", nodeRoutes_1.default);
app.use("/api/tasks", taskRoutes_1.default);
// Error handling
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`OMNIA-1 API REST server is running on port ${PORT}`);
});
// Prisma cleanup
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});
