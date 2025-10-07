-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LCAAssessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "metalType" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "LCAAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProcessStage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "stageType" TEXT NOT NULL,
    "energyConsumption" REAL,
    "waterUsage" REAL,
    "materialInput" REAL,
    "materialOutput" REAL,
    "recycledContent" REAL,
    "transportDistance" REAL,
    "co2Emissions" REAL,
    "wasteGenerated" REAL,
    "assessmentId" TEXT NOT NULL,
    CONSTRAINT "ProcessStage_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "LCAAssessment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImpactResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    CONSTRAINT "ImpactResult_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "LCAAssessment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CircularityMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "metricName" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "benchmark" REAL,
    "assessmentId" TEXT NOT NULL,
    CONSTRAINT "CircularityMetric_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "LCAAssessment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
