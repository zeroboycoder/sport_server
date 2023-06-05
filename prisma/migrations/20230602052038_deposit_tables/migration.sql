/*
  Warnings:

  - You are about to drop the column `agent_id` on the `deposit` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_account_id` on the `deposit` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `deposit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `deposit` DROP COLUMN `agent_id`,
    DROP COLUMN `receiver_account_id`,
    DROP COLUMN `sender_id`,
    ADD COLUMN `paymentAccountId` INTEGER NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `deposit` ADD CONSTRAINT `deposit_paymentAccountId_fkey` FOREIGN KEY (`paymentAccountId`) REFERENCES `paymentAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deposit` ADD CONSTRAINT `deposit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
