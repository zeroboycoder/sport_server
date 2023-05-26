/*
  Warnings:

  - You are about to alter the column `user_id` on the `agent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `agent` MODIFY `user_id` INTEGER NOT NULL;
