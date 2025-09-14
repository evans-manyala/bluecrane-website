-- Creates DB & user (Compose also sets these, this is a safety net and where you could seed data)
CREATE DATABASE IF NOT EXISTS it_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'Tobyman'@'%' IDENTIFIED BY 'test@##w0rd';
GRANT ALL PRIVILEGES ON it_service.* TO 'Tobyman'@'%';
FLUSH PRIVILEGES;
