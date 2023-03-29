import express from 'express';
import { PrismaClient, Task } from '@prisma/client';
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

router.get('/:id', authenticate, authorize('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const node = await prisma.node.findUnique({ where: { id } });
    if (!node) {
      res.status(404).json({ message: 'Node not found' });
    } else {
      res.json(node);
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const {
    name,
    ipAddress,
    description,
    gpuModel,
    gpuMemory,
    gpuTemperature,
    cpuModel,
    cpuCores,
    cpuSpeed,
    ram,
    storage,
    os,
  } = req.body;

  try {
    const node = await prisma.node.create({
      data: {
        name,
        ipAddress,
        description,
        gpuModel,
        gpuMemory,
        gpuTemperature,
        cpuModel,
        cpuCores,
        cpuSpeed,
        ram,
        storage,
        os,
      },
    });
    res.json(node);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  const { id } = req.params;
  const {
    name,
    ipAddress,
    description,
    gpuModel,
    gpuMemory,
    gpuTemperature,
    cpuModel,
    cpuCores,
    cpuSpeed,
    ram,
    storage,
    os,
  } = req.body;

  try {
    const node = await prisma.node.update({
      where: { id },
      data: {
        name,
        ipAddress,
        description,
        gpuModel,
        gpuMemory,
        gpuTemperature,
        cpuModel,
        cpuCores,
        cpuSpeed,
        ram,
        storage,
        os,
      },
    });
    res.json(node);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.node.delete({ where: { id } });
    res.json({ message: 'Node deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
