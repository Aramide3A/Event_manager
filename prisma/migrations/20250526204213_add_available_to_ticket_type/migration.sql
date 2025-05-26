-- AlterTable
ALTER TABLE "Ticket_Type" ADD COLUMN     "available" INTEGER,
ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'AVAILABLE';
