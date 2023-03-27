import { PrismaClient, TaskStatus, TokenRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const masterToken = await prisma.token.create({
    data: {
      email: 'omnia-1@neuralmx.com',
      hash: 'QUITAN_EL_TRAPO_Y_NO_LO_PONEN',
      role: TokenRole.admin,
    }
  })
  console.log('Master Token creado', masterToken);
  
  const node1 = await prisma.node.create({
    data: {
      name: "Nodo 1",
      ipAddress: "192.168.0.1",
      description: "Este es el nodo 1 de la red.",
      tasks: {
        create: [
          {
            description: "Tarea 1 del nodo 1",
            status: TaskStatus.pending,
          },
          {
            description: "Tarea 2 del nodo 1",
            status: TaskStatus.completed,
          },
        ],
      },
    },
  });

  const node2 = await prisma.node.create({
    data: {
      name: "Nodo 2",
      ipAddress: "192.168.0.2",
      description: "Este es el nodo 2 de la red.",
      tasks: {
        create: [
          {
            description: "Tarea 1 del nodo 2",
            status: TaskStatus.in_progress,
          },
          {
            description: "Tarea 2 del nodo 2",
            status: TaskStatus.pending,
          },
        ],
      },
    },
  });

  console.log("Datos de prueba creados con éxito.", node1, node2);

  prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
