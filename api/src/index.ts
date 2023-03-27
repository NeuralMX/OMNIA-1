import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { PrismaClient } from '@prisma/client';
import nodeRoutes from './routes/nodeRoutes';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const prisma = new PrismaClient();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', (_req, res) => res.send('OMNIA-1'));
app.use('/api/auth', authRoutes);
app.use('/api/nodes', nodeRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`OMNIA-1 API REST server is running on port ${PORT}`);
});

// Prisma cleanup
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
