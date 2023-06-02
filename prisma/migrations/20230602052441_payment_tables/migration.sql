/*
  Warnings:

  - You are about to drop the column `userId` on the `deposit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `deposit` DROP FOREIGN KEY `deposit_userId_fkey`;

-- AlterTable
ALTER TABLE `deposit` DROP COLUMN `userId`,
    ADD COLUMN `senderId` INTEGER NULL,
    MODIFY `sender_account_number` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `deposit` ADD CONSTRAINT `deposit_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
