/*
  Warnings:

  - You are about to alter the column `phone` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- DropIndex
DROP INDEX `user_phone_key` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(191) NOT NULL;
