/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `Node` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Node_deviceId_key" ON "Node"("deviceId");
