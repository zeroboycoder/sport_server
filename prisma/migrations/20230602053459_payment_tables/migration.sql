/*
  Warnings:

  - You are about to drop the column `senderId` on the `deposit` table. All the data in the column will be lost.
  - Added the required column `sender_id` to the `deposit` table without a default value. This is not possible if the table is not empty.
  - Made the column `paymentAccountId` on table `deposit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `deposit` DROP FOREIGN KEY `deposit_paymentAccountId_fkey`;

-- DropForeignKey
ALTER TABLE `deposit` DROP FOREIGN KEY `deposit_senderId_fkey`;

-- AlterTable
ALTER TABLE `deposit` DROP COLUMN `senderId`,
    ADD COLUMN `sender_id` INTEGER NOT NULL,
    MODIFY `paymentAccountId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `deposit` ADD CONSTRAINT `deposit_paymentAccountId_fkey` FOREIGN KEY (`paymentAccountId`) REFERENCES `paymentAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deposit` ADD CONSTRAINT `deposit_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
