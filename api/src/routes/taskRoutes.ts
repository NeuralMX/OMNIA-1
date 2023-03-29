import express from 'express';
import { PrismaClient, TaskStatus } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany({ include: { node: true } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.post('/', async (req, res) => {
  const { description, nodeId, typeId, code, payload } = req.body;

  if (!description || !nodeId || !typeId) {
    return res.status(400).json({
      message: 'Se deben proporcionar una descripción, un identificador de nodo y un tipo de tarea.',
    });
  }

  try {
    const task = await prisma.task.create({
      data: { description, nodeId, typeId, code, payload, status: TaskStatus.pending },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Se debe proporcionar un estado.' });
  }

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { status },
      include: { node: true },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.delete({ where: { id } });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.get('/node/:nodeId/reward', async (req, res) => {
  const { nodeId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { nodeId },
      select: { type: { select: { reward: true } } },
    });

    const totalReward = tasks.reduce((total, task) => {
      return total + (task.type?.reward || 0);
    }, 0);

    res.json({ totalTasks: tasks.length, totalReward });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
