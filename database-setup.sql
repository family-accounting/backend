-- Family Finance Manager Database Setup Script
-- Run this script in your PostgreSQL database

-- Create database (run this as superuser)
-- CREATE DATABASE family_finance;

-- Connect to the family_finance database and run the following:

-- Create extension for UUID support (if not exists)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Note: The actual tables will be created automatically by TypeORM
-- when you run the application with DB_SYNC=true for the first time
-- or when you run the migrations.

-- For production, it's recommended to:
-- 1. Set DB_SYNC=false in your environment
-- 2. Generate and run migrations using:
--    npm run typeorm:generate-migration
--    npm run typeorm:run-migrations

-- Verify database connection
SELECT version();
SELECT current_database();
