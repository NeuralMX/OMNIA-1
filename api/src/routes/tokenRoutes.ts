import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authorize } from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', authorize('admin'), async (_req, res) => {
  try {
    const tokens = await prisma.token.findMany();
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
