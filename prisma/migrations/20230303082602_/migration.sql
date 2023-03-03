/*
  Warnings:

  - You are about to drop the column `threadId` on the `Tag` table. All the data in the column will be lost.
  - Made the column `threadId` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_threadId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_threadId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "threadId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "threadId";

-- CreateTable
CREATE TABLE "_TagTothread" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagTothread_AB_unique" ON "_TagTothread"("A", "B");

-- CreateIndex
CREATE INDEX "_TagTothread_B_index" ON "_TagTothread"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagTothread" ADD CONSTRAINT "_TagTothread_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagTothread" ADD CONSTRAINT "_TagTothread_B_fkey" FOREIGN KEY ("B") REFERENCES "thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
