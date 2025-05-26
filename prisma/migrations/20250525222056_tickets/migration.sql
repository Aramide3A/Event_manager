/*
  Warnings:

  - You are about to drop the column `tickets` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EVENT_TYPE" AS ENUM ('PHYSICAL', 'VIRTUAL', 'HYBRID');

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "tickets",
ADD COLUMN     "totalTickets" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Ticket";

-- CreateTable
CREATE TABLE "Ticket_Type" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket_Holder" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticketTypeId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_Holder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_Type_userId_eventId_key" ON "Ticket_Type"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_Holder_userId_eventId_key" ON "Ticket_Holder"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "Ticket_Type" ADD CONSTRAINT "Ticket_Type_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_Type" ADD CONSTRAINT "Ticket_Type_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_Holder" ADD CONSTRAINT "Ticket_Holder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_Holder" ADD CONSTRAINT "Ticket_Holder_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_Holder" ADD CONSTRAINT "Ticket_Holder_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "Ticket_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
