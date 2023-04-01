import express from 'express';
import { PrismaClient, TaskStatus } from '@prisma/client';
import { SocketService } from '../utils/socket.service';
import { MessageToNode } from '../enum/message.enum';

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

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Se debe proporcionar un estado.' });
  }

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { status },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.patch('/:id/update-status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Se debe proporcionar un estado.' });
  }

  const taskStatus = status.toLowerCase();

  if (!Object.values(TaskStatus).includes(taskStatus)) {
    return res.status(400).json({ message: 'El estado proporcionado no es válido.' });
  }

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { status: taskStatus },
      include: { node: true },
    });

    res.json(task);
  } catch (error) {
    console.log(error);
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

router.post('/:taskId/prepare-task', async (req, res) => {
  const { taskId } = req.params;
  const { socketId } = req.body;

  if (!socketId) {
    return res.status(400).json({ message: 'Se debe proporcionar un socketId.' });
  }

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: 'La tarea no fue encontrada.' });
    }

    const socket = SocketService.instance.getSocket(socketId);
    if (!socket) {
      return res.status(404).json({ message: 'El socket no fue encontrado.' });
    }

    socket.emit(MessageToNode.PrepareTask.toString(), task);

    return res.json({ message: 'Evento enviado.', task });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

router.post('/start-task', async (req, res) => {
  const { socketId } = req.body;

  if (!socketId) {
    return res.status(400).json({ message: 'Se debe proporcionar un socketId.' });
  }

  try {
    const socket = SocketService.instance.getSocket(socketId);
    if (!socket) {
      return res.status(404).json({ message: 'El socket no fue encontrado.' });
    }

    socket.emit(MessageToNode.StartTask.toString());

    return res.json({ message: 'Evento enviado.' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
