import { PrismaClient, TaskStatus, TokenRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const masterToken = await prisma.token.create({
    data: {
      email: 'omnia-1@neuralmx.com',
      hash: 'QUITAN_EL_TRAPO_Y_NO_LO_PONEN',
      role: TokenRole.admin,
    },
  });
  console.log('Master Token creado', masterToken);

  const userToken = await prisma.token.create({
    data: {
      email: 'user@neuralmx.com',
      hash: 'USER_TOKEN_OMNIA',
      role: TokenRole.user,
    },
  });
  console.log('User Token creado', userToken);

  // Tasks
  const taskType = await prisma.taskType.create({
    data: {
      name: 'TaskType de prueba',
      description: 'Un TaskType de prueba',
      reward: 1,
    },
  });

  const node1 = await prisma.node.create({
    data: {
      name: 'Nodo 1',
      ipAddress: '192.168.0.1',
      description: 'Este es el nodo 1 de la red.',
      gpuModel: 'NVIDIA GeForce RTX 3080',
      gpuMemory: 10,
      gpuTemperature: 75.5,
      cpuModel: 'Intel Core i7-11700K',
      cpuCores: 8,
      cpuSpeed: 3.6,
      ram: 16,
      storage: 512,
      os: 'Windows 10 Pro',
    },
  });

  await prisma.task.createMany({
    data: [
      {
        nodeId: node1.id,
        description: 'Tarea 1 del nodo 1',
        typeId: taskType.id,
        code: 'print("Hola mundo")',
        payload: JSON.stringify({ image_url: 'https://mi_imagen.jpg' }),
        status: TaskStatus.pending,
      },
      {
        nodeId: node1.id,
        description: 'Tarea 2 del nodo 1',
        typeId: taskType.id,
        code: 'print("Entrenando modelo...")',
        payload: JSON.stringify({ dataset_url: 'https://mi_dataset.csv' }),
        status: TaskStatus.completed,
      },
    ],
  });

  const node2 = await prisma.node.create({
    data: {
      name: 'Nodo 2',
      ipAddress: '192.168.0.2',
      description: 'Este es el nodo 2 de la red.',
      gpuModel: 'NVIDIA GeForce RTX 3070',
      gpuMemory: 8,
      gpuTemperature: 70.2,
      cpuModel: 'AMD Ryzen 9 5900X',
      cpuCores: 12,
      cpuSpeed: 3.7,
      ram: 32,
      storage: 1024,
      os: 'Ubuntu 20.04 LTS',
    },
  });

  await prisma.task.createMany({
    data: [
      {
        nodeId: node2.id,
        description: 'Tarea 1 del nodo 2',
        typeId: taskType.id,
        code: 'print("Fine-tuning de modelo...")',
        payload: JSON.stringify({ model_url: 'https://mi_modelo.h5' }),
        status: TaskStatus.in_progress,
      },
      {
        nodeId: node2.id,
        description: 'Tarea 2 del nodo 2',
        typeId: taskType.id,
        code: 'print("Ejecutando código personalizado...")',
        payload: JSON.stringify({}),
        status: TaskStatus.pending,
      },
    ],
  });

  console.log('Datos de prueba creados con éxito.', node1, node2);

  prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
