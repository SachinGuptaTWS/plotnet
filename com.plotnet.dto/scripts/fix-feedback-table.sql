-- Fix: "column author_id of relation feedback does not exist"
-- The app expects table `feedback` with: id, author_id (FK -> users), body, created_at, admin_reply, admin_replied_at
--
-- Run this once in Neon SQL Editor (or psql) connected to your database, then restart Spring Boot.

DROP TABLE IF EXISTS feedback CASCADE;

-- After restart, Hibernate (spring.jpa.hibernate.ddl-auto=update) will recreate `feedback` with the correct columns.
