-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cand_type" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "voters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "voteCount" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" SERIAL NOT NULL,
    "voterId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_email_key" ON "candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "voters_email_key" ON "voters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "votes_voterId_key" ON "votes"("voterId");

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "voters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
