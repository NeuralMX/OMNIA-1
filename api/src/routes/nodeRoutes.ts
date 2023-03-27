import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', authenticate, authorize('admin'), async (_req, res) => {
  try {
    const nodes = await prisma.node.findMany();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.post("/", authenticate, authorize("admin"), async (req, res) => {
  const { name, ipAddress } = req.body;

  try {
    const node = await prisma.node.create({ data: { name, ipAddress } });
    res.json(node);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;