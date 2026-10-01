-- ================================================
-- PIKT Database Schema
-- Run this in phpMyAdmin or MySQL Workbench
-- ================================================

CREATE DATABASE IF NOT EXISTS pikt_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pikt_db;

-- ================================================
-- Teachers Table
-- ================================================
CREATE TABLE IF NOT EXISTS teachers (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  gender      ENUM('male','female','other') DEFAULT 'male',
  phone       VARCHAR(30)   DEFAULT NULL,
  email       VARCHAR(255)  DEFAULT NULL,
  position    VARCHAR(255)  DEFAULT NULL,
  subject     VARCHAR(255)  DEFAULT NULL,
  photo       TEXT          DEFAULT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ================================================
-- News Table
-- ================================================
CREATE TABLE IF NOT EXISTS news (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(500)  NOT NULL,
  content     TEXT          NOT NULL,
  category    VARCHAR(100)  DEFAULT 'ផ្សេងៗ',
  author      VARCHAR(255)  DEFAULT 'Admin PIKT',
  image       TEXT          DEFAULT NULL,
  published   TINYINT(1)    DEFAULT 1,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ================================================
-- Courses Table
-- ================================================
CREATE TABLE IF NOT EXISTS courses (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(500)  NOT NULL,
  category    VARCHAR(255)  DEFAULT 'ផ្សេងៗ',
  duration    VARCHAR(100)  DEFAULT '3 ឆ្នាំ',
  level       VARCHAR(50)   DEFAULT 'AD',
  description TEXT          DEFAULT NULL,
  image       TEXT          DEFAULT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ================================================
-- Sample Data (Optional)
-- ================================================
INSERT INTO news (title, content, category, author) VALUES
('ការណែនាំការចុះឈ្មោះ ឆ្នាំ ២០២៥-២០២៦','PIKT ជូនដំណឹងដល់និស្សិតថ្មី ដែលប្រឡងជាប់...','ការចុះឈ្មោះ','Admin PIKT'),
('ពិធីប្រគល់សញ្ញាបត្រ ២០២৪-২০২৥','PIKT នឹងរៀបចំ ពិធីប្រគល់សញ្ញាបត្រ ខែវិច្ឆិកា...','ព្រឹត្តិការណ៍','Admin PIKT');

INSERT INTO courses (name, category, duration, level, description) VALUES
('បច្ចេកវិទ្យាព័ត៌មាន (IT)','បច្ចេកវិទ្យា','3 ឆ្នាំ','AD','ការសរសេរកម្មវិធី, បណ្ដាញ, Database, Security'),
('អគ្គិសនី (Electrical)','ហេដ្ឋារចនាសម្ព័ន្ធ','3 ឆ្នាំ','AD','ការដំឡើងអគ្គិសនី, ជួសជុល, Renewable Energy'),
('គ្រប់គ្រងពាណិជ្ជកម្ម','ពាណិជ្ជកម្ម','3 ឆ្នាំ','AD','ការគ្រប់គ្រង, Marketing, Finance'),
('កសិកម្ម (Agriculture)','កសិកម្ម','3 ឆ្នាំ','AD','ដំណាំ, ចិញ្ចឹមសត្វ, ជីបង្កើន');

-- ================================================
-- Admins Table (for secure login)
-- ================================================
CREATE TABLE IF NOT EXISTS admins (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  username    VARCHAR(100)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  name        VARCHAR(255)  DEFAULT 'Admin',
  role        ENUM('admin','superadmin') DEFAULT 'admin',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
-- After running this SQL, run: node scripts/createAdmin.js

-- ================================================
-- Cooperations Table
-- ================================================
CREATE TABLE IF NOT EXISTS cooperations (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(500) NOT NULL,
  country     VARCHAR(100) DEFAULT 'កម្ពុជា',
  type        VARCHAR(100) DEFAULT 'ដៃគូ',
  description TEXT         DEFAULT NULL,
  logo        TEXT         DEFAULT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Sample data
INSERT INTO cooperations (name, country, type, description) VALUES
('ធនាគារអភិវឌ្ឍន៍អាស៊ី (ADB)',      'អន្ដរជាតិ', 'ហិរញ្ញប្បទាន', 'ផ្ដល់ជំនួយហិរញ្ញវត្ថុ ក្នុងការបង្កើតស្ថាប័ន'),
('ក្រសួងការងារ និងវិជ្ជាជីវៈ',       'កម្ពុជា',    'ដឹកនាំ',       'ស្ថាប័ន Supervising ចម្បង'),
('ក្រសួងអប់រំ យុវវ័យ និងកីឡា',      'កម្ពុជា',    'ដៃគូ',         'ដៃគូ ក្នុងការអភិវឌ្ឍ Curriculum'),
('ILO — អង្គការការងារអន្ដរជាតិ',     'អន្ដរជាតិ', 'បច្ចេកទេស',    'ជំនួយបច្ចេកទេស ក្នុង TVET'),
('KOICA — ស្ថានទូតកូរ៉េ',             'កូរ៉េ',      'ហ្វឹកហ្វឺន',   'ជំនួយការហ្វឹកហ្វឺន និងបច្ចេកទេស'),
('JICA — ស្ថានទូតជប៉ុន',              'ជប៉ុន',      'អភិវឌ្ឍន៍',   'ជំនួយអភិវឌ្ឍន៍ ហេដ្ឋារចនាសម្ព័ន្ធ');
