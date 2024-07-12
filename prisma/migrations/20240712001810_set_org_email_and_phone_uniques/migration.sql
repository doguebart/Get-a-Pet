/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orgs_phone_key" ON "orgs"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
