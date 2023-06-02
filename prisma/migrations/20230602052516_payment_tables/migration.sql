/*
  Warnings:

  - You are about to drop the column `status` on the `deposit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `deposit` DROP COLUMN `status`,
    ADD COLUMN `confirm` BOOLEAN NOT NULL DEFAULT false;
