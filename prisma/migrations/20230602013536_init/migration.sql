/*
  Warnings:

  - You are about to drop the column `userId` on the `wallet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `wallet` DROP FOREIGN KEY `wallet_userId_fkey`;

-- AlterTable
ALTER TABLE `wallet` DROP COLUMN `userId`;
