-- CreateTable
CREATE TABLE "animal_requests" (
    "request_id" SERIAL NOT NULL,
    "user_phone" VARCHAR(20),
    "image_url" TEXT NOT NULL,
    "address" TEXT DEFAULT '',
    "injury_description" TEXT NOT NULL,
    "animal_type" VARCHAR(50) NOT NULL,
    "org_name" VARCHAR(255),
    "request_status" BOOLEAN DEFAULT false,

    CONSTRAINT "animal_requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "ngo" (
    "org_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "fixed_address" TEXT NOT NULL,
    "working_hours" VARCHAR(50) NOT NULL,
    "upi_id" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "ngo_pkey" PRIMARY KEY ("org_name")
);

-- CreateTable
CREATE TABLE "users" (
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "ngo_email_key" ON "ngo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "animal_requests" ADD CONSTRAINT "animal_requests_org_name_fkey" FOREIGN KEY ("org_name") REFERENCES "ngo"("org_name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "animal_requests" ADD CONSTRAINT "animal_requests_user_phone_fkey" FOREIGN KEY ("user_phone") REFERENCES "users"("phone") ON DELETE CASCADE ON UPDATE NO ACTION;
