-- CreateTable
CREATE TABLE "Boarding" (
    "boardingId" TEXT NOT NULL PRIMARY KEY,
    "petId" TEXT NOT NULL,
    "checkInDate" DATETIME NOT NULL,
    "expectedDailyStays" INTEGER NOT NULL,
    "insertedByUserId" TEXT NOT NULL,
    CONSTRAINT "Boarding_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("petId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Boarding_insertedByUserId_fkey" FOREIGN KEY ("insertedByUserId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Breed" (
    "breedId" TEXT NOT NULL PRIMARY KEY,
    "speciesId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Breed_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species" ("speciesId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pet" (
    "petId" TEXT NOT NULL PRIMARY KEY,
    "tutorId" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "breedId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Pet_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor" ("tutorId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pet_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species" ("speciesId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pet_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed" ("breedId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Species" (
    "speciesId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tutor" (
    "tutorId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
