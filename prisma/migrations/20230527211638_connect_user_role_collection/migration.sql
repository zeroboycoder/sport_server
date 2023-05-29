-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `user_code` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `ban_end_date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `user_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `secret_code` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `agent_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deposit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agent_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `sender_account_name` VARCHAR(191) NOT NULL,
    `sender_account_number` INTEGER NOT NULL,
    `receiver_account_name` VARCHAR(191) NOT NULL,
    `receiver_account_number` INTEGER NOT NULL,
    `payment_provider_name` VARCHAR(191) NOT NULL,
    `transaction_number` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `remark` VARCHAR(191) NOT NULL,
    `reject_remark` VARCHAR(191) NOT NULL,
    `imgUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
