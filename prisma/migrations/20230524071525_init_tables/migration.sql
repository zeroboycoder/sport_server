/*
  Warnings:

  - You are about to alter the column `ban_end_date` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `ban_end_date` DATETIME(3) NULL;
