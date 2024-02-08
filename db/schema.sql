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
    salary DECIMAL(8,2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,           
    last_name VARCHAR(30) NOT NULL, 
    role_id INT,           
    department_name VARCHAR(50),                             
    manager_id INT NOT NULL,                            
    FOREIGN KEY (role_id)                       
        REFERENCES roles(id)
        ON DELETE SET NULL,                    
    FOREIGN KEY (manager_id)                   
        ON DELETE SET NULL         
);
