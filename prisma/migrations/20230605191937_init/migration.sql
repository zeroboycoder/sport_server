/*
  Warnings:

  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `user_code` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `user_code` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `transferRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `sender_id` INTEGER NULL,
    `receiver_d` INTEGER NULL,
    `transaction_type_id` INTEGER NULL,
    `sender_before_amount` INTEGER NOT NULL,
    `sender_after_amount` INTEGER NOT NULL,
    `receiver_after_amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactionType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transferRecord` ADD CONSTRAINT `transferRecord_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transferRecord` ADD CONSTRAINT `transferRecord_receiver_d_fkey` FOREIGN KEY (`receiver_d`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transferRecord` ADD CONSTRAINT `transferRecord_transaction_type_id_fkey` FOREIGN KEY (`transaction_type_id`) REFERENCES `transactionType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
