/*
  Warnings:

  - You are about to drop the column `payment_provider_name` on the `deposit` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_account_number` on the `deposit` table. All the data in the column will be lost.
  - Added the required column `receiver_account_id` to the `deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `deposit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deposit` DROP COLUMN `payment_provider_name`,
    DROP COLUMN `receiver_account_number`,
    ADD COLUMN `receiver_account_id` INTEGER NOT NULL,
    ADD COLUMN `sender_id` INTEGER NOT NULL,
    MODIFY `agent_id` VARCHAR(191) NOT NULL;
