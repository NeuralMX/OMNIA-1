import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Truncating tables...');
  await prisma.token.deleteMany({ where: {} });
  await prisma.task.deleteMany({ where: {} });
  await prisma.node.deleteMany({ where: {} });

  prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
