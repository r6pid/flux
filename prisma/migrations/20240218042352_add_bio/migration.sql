-- CreateTable
CREATE TABLE "Bio" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bio" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Bio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bio_id_key" ON "Bio"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bio_userId_key" ON "Bio"("userId");

-- AddForeignKey
ALTER TABLE "Bio" ADD CONSTRAINT "Bio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
