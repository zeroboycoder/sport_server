/*
  Warnings:

  - Added the required column `receiver_account_name` to the `deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver_account_number` to the `deposit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deposit` ADD COLUMN `receiver_account_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `receiver_account_number` VARCHAR(191) NOT NULL;
