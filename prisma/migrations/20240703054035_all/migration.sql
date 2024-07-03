-- CreateEnum
CREATE TYPE "type" AS ENUM ('ALL', 'FORENTEND', 'BACKEND');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "technologies" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "type" "type" NOT NULL DEFAULT 'ALL';
