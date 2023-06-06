-- AlterTable
ALTER TABLE `user` ALTER COLUMN `phone` DROP DEFAULT,
    ALTER COLUMN `password` DROP DEFAULT,
    MODIFY `user_code` VARCHAR(191) NULL;
