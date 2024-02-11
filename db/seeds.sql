INSERT INTO departments (department_name)
VALUES
    ('Executives'),
    ('Management'),
    ('Operations'),
    ('Sales'),
    ('Human Resources');

INSERT INTO roles (job_title, salary, department_id)
VALUES
    ('Chief Executive Officer', 800000.00, 1),
    ('General Manager', 420000.00, 2),
    ('Operations Director', 150000.00, 3),
    ('Sales Associate', 80000, 4),
    ('HR Recruitor', 95000, 5);

INSERT INTO employees (first_name, last_name, job_title, department_name, manager_id)
VALUES
    ('James', 'Sullivan', 'Chief Executive Officer', 'Executives', NULL),
    ('Michael', 'Wazowski', 'General Manager', 'Management', 1),
    ('Roz', 'Monster', 'Operations Director', 'Operations', 3),
    ('Randall', 'Boggs','Sales Associate', 'Sales', 4),
    ('Celia', 'Mae', 'HR Recruitor', 'Human Resources', 5);