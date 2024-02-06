DROP DATABASE IF EXISTS monstersandco_db;
CREATE DATABASE monstersandco_db;

USE monstersandco_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    job_title VARCHAR(50) NOT NULL,
    salary DECIMAL(15,2),

)

CREATE TABLE employees (

)
