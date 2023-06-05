/*
  Warnings:

  - You are about to drop the column `memberId` on the `agent` table. All the data in the column will be lost.
  - Added the required column `agent_code` to the `member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `agent` DROP FOREIGN KEY `agent_memberId_fkey`;

-- AlterTable
ALTER TABLE `agent` DROP COLUMN `memberId`;

-- AlterTable
ALTER TABLE `member` ADD COLUMN `agent_code` VARCHAR(191) NOT NULL;
