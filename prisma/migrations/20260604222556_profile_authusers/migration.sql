-- CreateTable
CREATE TABLE "authorized_users" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "is_registered" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authorized_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "authorized_user_id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authorized_users_cpf_key" ON "authorized_users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "authorized_users_email_key" ON "authorized_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_authorized_user_id_key" ON "profiles"("authorized_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_cpf_key" ON "profiles"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_authorized_user_id_fkey" FOREIGN KEY ("authorized_user_id") REFERENCES "authorized_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
