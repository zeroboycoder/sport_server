/*
  Warnings:

  - You are about to alter the column `confirm` on the `deposit` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `deposit` MODIFY `confirm` VARCHAR(191) NOT NULL DEFAULT 'false';
