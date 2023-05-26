/*
  Warnings:

  - You are about to drop the column `imgurl` on the `deposit` table. All the data in the column will be lost.
  - Added the required column `imgUrl` to the `deposit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deposit` DROP COLUMN `imgurl`,
    ADD COLUMN `imgUrl` VARCHAR(191) NOT NULL;
