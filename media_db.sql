CREATE DATABASE media_db;
USE media_db;

CREATE TABLE media(
id INT AUTO_INCREMENT PRIMARY KEY, file_path VARCHAR(255) NOT NULL, caption TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);