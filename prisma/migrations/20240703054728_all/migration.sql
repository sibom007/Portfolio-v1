-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "Live" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "githubClient" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "githubServer" TEXT NOT NULL DEFAULT '';
