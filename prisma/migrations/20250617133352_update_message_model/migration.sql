/*
  Warnings:

  - You are about to drop the column `input` on the `moessages` table. All the data in the column will be lost.
  - You are about to drop the column `response` on the `moessages` table. All the data in the column will be lost.
  - Added the required column `role` to the `moessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `moessages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('bot', 'user');

-- AlterTable
ALTER TABLE "moessages" DROP COLUMN "input",
DROP COLUMN "response",
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;
