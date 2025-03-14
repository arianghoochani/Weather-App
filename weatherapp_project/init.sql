-- Ensure the database exists
CREATE DATABASE IF NOT EXISTS weather_db;
USE weather_db;

-- Create the table
CREATE TABLE IF NOT EXISTS weather (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(32) UNIQUE NOT NULL,
    temperature FLOAT,
    humidity FLOAT,
    windspeed FLOAT
);
