-- CreateTable
CREATE TABLE "candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cand_type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "voters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "votes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "voterId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    CONSTRAINT "votes_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "voters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "votes_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
