import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createToken, generateHash } from '../utils/authUtils';
import { authenticate, authorize } from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/login', async (req, res) => {
  const { hash } = req.body;

  try {
    const token = await prisma.token.findUnique({ where: { hash } });

    if (!token) {
      return res.status(401).json({ message: 'Token no encontrado.' });
    }

    const jwtToken = await createToken(hash);

    res.json({ token: jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
});

router.post('/generate-token', authenticate, authorize('admin'), async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ message: 'Se deben proporcionar un email y un rol.' });
  }

  try {
    const hash = await generateHash(email, role);
    const token = await prisma.token.create({ data: { hash, email, role } });
    res.json(token);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
