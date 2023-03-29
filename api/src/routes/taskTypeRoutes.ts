import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const taskTypes = await prisma.taskType.findMany();
    res.json(taskTypes);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.post('/', async (req, res) => {
  const { name, description, reward, code, payload } = req.body;

  if (!name || !description || !reward) {
    return res.status(400).json({
      message: 'Se deben proporcionar un nombre, una descripción y una recompensa para el tipo de tarea.',
    });
  }

  try {
    const taskType = await prisma.taskType.create({
      data: { name, description, reward, code, payload },
    });

    res.json(taskType);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, reward, code, payload } = req.body;

  if (!name && !description && !reward && !code && !payload) {
    return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar.' });
  }

  try {
    const taskType = await prisma.taskType.update({
      where: { id },
      data: { name, description, reward, code, payload },
    });

    res.json(taskType);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const taskType = await prisma.taskType.delete({ where: { id } });
    res.json(taskType);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
