/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `agent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `agent_userId_key` ON `agent`(`userId`);
