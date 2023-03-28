-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('pending', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('inference', 'training', 'fine_tuning', 'execute_code');

-- CreateEnum
CREATE TYPE "TokenRole" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "description" TEXT,
    "gpuModel" TEXT,
    "gpuMemory" INTEGER,
    "gpuTemperature" DOUBLE PRECISION,
    "cpuModel" TEXT,
    "cpuCores" INTEGER,
    "cpuSpeed" DOUBLE PRECISION,
    "ram" DOUBLE PRECISION,
    "storage" DOUBLE PRECISION,
    "os" TEXT,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "nodeId" TEXT NOT NULL,
    "type" "TaskType" NOT NULL DEFAULT 'inference',
    "code" TEXT,
    "payload" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "TokenRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_hash_key" ON "Token"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Token_email_key" ON "Token"("email");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
