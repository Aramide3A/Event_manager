/*
  Warnings:

  - You are about to drop the column `ticketTypeId` on the `Ticket_Holder` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Ticket_Type` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Ticket_Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Ticket_Type` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket_Holder" DROP CONSTRAINT "Ticket_Holder_ticketTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket_Type" DROP CONSTRAINT "Ticket_Type_userId_fkey";

-- DropIndex
DROP INDEX "Ticket_Type_userId_eventId_key";

-- AlterTable
ALTER TABLE "Ticket_Holder" DROP COLUMN "ticketTypeId";

-- AlterTable
ALTER TABLE "Ticket_Type" DROP COLUMN "userId",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_Ticket_HolderToTicket_Type" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Ticket_HolderToTicket_Type_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Ticket_HolderToTicket_Type_B_index" ON "_Ticket_HolderToTicket_Type"("B");

-- AddForeignKey
ALTER TABLE "_Ticket_HolderToTicket_Type" ADD CONSTRAINT "_Ticket_HolderToTicket_Type_A_fkey" FOREIGN KEY ("A") REFERENCES "Ticket_Holder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Ticket_HolderToTicket_Type" ADD CONSTRAINT "_Ticket_HolderToTicket_Type_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket_Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
