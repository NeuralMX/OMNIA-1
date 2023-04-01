/*
  Warnings:

  - You are about to drop the column `type` on the `Task` table. All the data in the column will be lost.
  - Added the required column `deviceId` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "deviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "type",
ADD COLUMN     "typeId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TaskType";

-- CreateTable
CREATE TABLE "TaskType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reward" INTEGER NOT NULL,
    "code" TEXT,
    "payload" TEXT,

    CONSTRAINT "TaskType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TaskType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
