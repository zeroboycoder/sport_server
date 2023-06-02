/*
  Warnings:

  - You are about to drop the column `receiver_account_name` on the `deposit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `deposit` DROP COLUMN `receiver_account_name`;

-- CreateTable
CREATE TABLE `paymentProvider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paymentAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `qr_code` VARCHAR(191) NOT NULL,
    `paymentProviderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `paymentAccount` ADD CONSTRAINT `paymentAccount_paymentProviderId_fkey` FOREIGN KEY (`paymentProviderId`) REFERENCES `paymentProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
