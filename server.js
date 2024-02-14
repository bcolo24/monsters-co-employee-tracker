// Importing required modules
const inquirer = require("inquirer");
const mysql = require('mysql2/promise'); // Using mysql2
const cfonts = require('cfonts');

async function connectDatabase() {
  try {
      return await mysql.createConnection({
        host: 'localhost',
        // port: 3001,
        user: 'root',
        password: 'SequelP24!',
        database: 'monstersandco_db'
      });
  } catch (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
  }
}

cfonts.say('Monsters & Co. \nSQL Employee Tracker', {
    font: 'block',              
    align: 'center',              
    colors: ['magenta'],         
    background: 'transparent',  
    letterSpacing: 1,           
    lineHeight: 1,              
    space: true,               
    maxLength: '0',            
    gradient: false,            
    independentGradient: false, 
    transitionGradient: false, 
    env: 'node'                 
});

function start() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit"
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    db.end();
                    console.log("Goodbye!");
                    break;
            }
          });
}

async function viewAllDepartments() {
  try {
      const [rows] = await db.query("SELECT * FROM departments");
      console.table(rows);
      start(); // Go back to the main menu
  } catch (err) {
      console.error('Error fetching departments:', err);
  }
}
async function viewAllRoles() {
  try {
    const [rows] = await db.execute('SELECT * FROM roles');
    console.table(rows);
    start(); // Go back to the main menu
  } catch (err) {
    console.error('Error fetching roles:', err);
  }
}

async function viewAllEmployees() {
  try {
    const [rows] = await db.execute('SELECT * FROM employees');
    console.table(rows);
    start(); // Go back to the main menu
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
      },
    ])
    .then(async (answer) => {
      const query = 'INSERT INTO departments (department_name) VALUES (?)';

      try {
        const [results] = await db.execute(query, [answer.departmentName]);
        console.log(`Department '${answer.departmentName}' added successfully!`);
        start(); // Go back to the main menu
      } catch (err) {
        console.error('Error adding department:', err);
        start();
      }
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the job title of the new role:',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary for the new role:',
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the new role:',
      },
    ])
    .then(async (answer) => {
      const query = 'INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?)';

      try {
        const [results] = await db.execute(query, [answer.roleTitle, answer.roleSalary, answer.departmentId]);
        console.log(`Role '${answer.roleTitle}' added successfully!`);
        start(); // Go back to the main menu or adapt as needed
      } catch (err) {
        console.error('Error adding role:', err.message);
      }
    });
}

//add employee function
function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Enter the employee's first name:",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Enter the employee's last name:",
        },
        {
          type: 'input',
          name: 'jobTitle',
          message: "Enter the job title for the new employee:",
        },
        {
          type: 'input',
          name: 'departmentName',
          message: "Enter the department name for the role:",
        },
        {
          type: 'input',
          name: 'managerId',
          message: "Enter the manager's ID for the new employee (if applicable):",
        },
      ])
      .then((answer) => {
        const query = 'INSERT INTO employees (first_name, last_name, job_title, department_name, manager_id) VALUES (?, ?, ?, ?, ?)';
  
        db.query(query,[answer.firstName, answer.lastName, answer.jobTitle, answer.departmentName, answer.managerId || null],
          (err, results) => {
            if (err) {
              console.error('Error adding employee:', err.message);
            } else {
              console.log(`Employee '${answer.firstName} ${answer.lastName}' added successfully!`);
              start(); // Go back to the main menu or adapt as needed
            }
          }
        );
      });
  }

// Async function to update an employee role
async function updateEmployeeRole() {
  try {
    const [employees] = await db.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees");
    const [roles] = await db.query("SELECT id, job_title FROM roles");

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Select the employee to update:",
        choices: employees.map(emp => ({ name: emp.name, value: emp.id }))
      },
      {
        type: "list",
        name: "roleId",
        message: "Select the new role:",
        choices: roles.map(role => ({ name: role.job_title, value: role.id}))
      }
    ]);

    const updateQuery = "UPDATE employees SET role_id = ? WHERE id = ?";
    await db.query(updateQuery, [answers.roleId, answers.employeeId]);
    console.log('Employee role updated successfully.');
    start();
  } catch (err) {
    console.error('Error updating employee role:', err);
    start();
  }
}

let db;
// Connect to the database and start the application
(async () => {
  try {
      db = await connectDatabase();
      console.log('Connected to the database');
      await start(); // Start the application after a successful database connection
  } catch (err) {
      console.error('Error connecting to the database:', err.message);
  }
})();