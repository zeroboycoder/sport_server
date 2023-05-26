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
    `imgurl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
