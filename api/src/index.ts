import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import nodeRoutes from './routes/nodeRoutes';
import taskRoutes from './routes/taskRoutes';
import taskTypeRoutes from './routes/taskTypeRoutes';
import authRoutes from './routes/authRoutes';
import http from 'http';
import { Server } from 'socket.io';
import { SocketService } from './utils/socket.service';

const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app); // Crear servidor HTTP
const io = new Server(server); // Crear servidor de socket.io

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (_req, res) => res.send('OMNIA-1'));
app.use('/api/auth', authRoutes);
app.use('/api/nodes', nodeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/task-types', taskTypeRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`OMNIA-1 API REST server is running on port ${PORT}`);
});

// Escuchar eventos de conexión en el servidor de socket.io
io.on('connection', (socket) => {
  console.log(`Socket connected and registered: ${socket.id}`);
  SocketService.instance.registerSocket(socket);

  // Cuando se desconecta
  socket.on('disconnect', () => {
    SocketService.instance.removeSocket(socket.id);
  });
});

// Prisma cleanup
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
