/*
  Warnings:

  - Added the required column `membershipId` to the `InvoiceDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvoiceDetail" ADD COLUMN     "membershipId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
