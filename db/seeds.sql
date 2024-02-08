INSERT INTO departments (department_name)
('Executives'),
('Management'),
('Operations'),
('Sales'),
('Human Resources');

INSERT INTO roles (job_title, salary, department_id)
('Chief Executive Officer', 800000.00, 1),
('General Manager', 420000.00, 2),
('Operations Director', 150000.00, 3),
('Sales Associate', 80000, 4),
('HR Recruitor', 95000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
('James P.', 'Sullivan', 1, NULL),
('Michael', 'Wazowski', 2, 1),
('Roz', 'Monster', 3, 3),
('Randall', 'Boggs', 4, 4),
('Celia', 'Mae', 5, 5),