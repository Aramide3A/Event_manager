/*
  Warnings:

  - You are about to drop the column `price` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "price",
ADD COLUMN     "eventType" "EVENT_TYPE" NOT NULL DEFAULT 'PHYSICAL';
