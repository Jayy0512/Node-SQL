# MySQL Notes: Connecting Node.js with MySQL

## 1. MySQL2 Package

The `mysql2` package is a Node.js library used to connect a Node.js application with a MySQL database.

It allows us to:
- Establish a connection with MySQL.
- Execute SQL queries from Node.js.
- Insert, update, delete and retrieve database records.
- Close the database connection.

### Installation

Run the following command in your project terminal:

```bash
npm install mysql2
```

### Example: Connecting Node.js with MySQL

Create a file named `index.js`.

```javascript
const mysql = require("mysql2");

// Create connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "college",
    password: "your_password"
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Connected to MySQL Database!");
});

// Close connection
connection.end();
```

**Explanation:**

- `require("mysql2")`: Imports the MySQL2 package.
- `createConnection()`: Creates a connection with the MySQL database.
- `host`: Specifies the database server address.
- `user`: Specifies the MySQL username.
- `database`: Specifies the database name.
- `password`: Specifies the MySQL password.
- `connection.end()`: Closes the database connection.

### Closing a Connection

```javascript
connection.end();
```

The `end()` method closes the MySQL connection gracefully after completing database operations.

---

# 2. Using SQL from CLI (Windows)

CLI stands for **Command Line Interface**. It allows us to execute SQL queries directly from the terminal without using a graphical interface.

### Step 1: Open MySQL CLI

On Windows, open Command Prompt (CMD) or the VS Code terminal and execute:

```bash
mysql -u root -p
```

If MySQL's `bin` directory is not added to the Windows PATH, use its full installation path:

```bash
"C:\Program Files\MySQL\MySQL Server 8.0\bin"
.\mysql.exe -u root -p
```

Enter your MySQL password when prompted.

**Note:** Your installation folder or MySQL version may be different.

### Step 2: Create an SQL File

Create a file named `schema.sql` in your project folder.

Write your SQL queries inside it.

Example:

```sql
CREATE DATABASE college;

USE college;

CREATE TABLE student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    marks INT
);

INSERT INTO student (name, marks)
VALUES
('Rahul', 85),
('Priya', 92),
('Amit', 78);
```

### Step 3: Execute the SQL File from CLI

If you are already inside the MySQL CLI, execute:

```sql
SOURCE C:/Users/YourName/Desktop/schema.sql;
```

Alternatively, from Windows CMD or VS Code terminal, execute:

```bash
mysql -u root -p < "C:\Users\YourName\Desktop\schema.sql"
```

This executes all SQL statements written inside `schema.sql`.

### Useful MySQL CLI Commands

| Command | Purpose |
|---|---|
| `SHOW DATABASES;` | Displays all databases |
| `USE college;` | Selects a database |
| `SHOW TABLES;` | Displays tables |
| `DESCRIBE student;` | Displays table structure |
| `SELECT * FROM student;` | Displays all student records |
| `EXIT;` | Exits MySQL CLI |

**Remember:**
- `mysql -u root -p` opens the MySQL command-line client.
- `SOURCE schema.sql;` executes an SQL file from inside MySQL CLI.
- `mysql -u root -p < schema.sql` executes an SQL file directly from Windows CMD.

# 3. Using SQL Files with MySQL CLI (Windows)

## 1. Introduction

Instead of writing SQL queries directly inside the MySQL CLI, we can write them in a separate `.sql` file and execute that file through the command line.

A `.sql` file contains SQL statements such as:

- Creating databases
- Creating tables
- Inserting records
- Updating records
- Deleting records

We can execute all these SQL statements together using the MySQL CLI.

## 2. Creating a SQL File

First, create a new file named:

```text
schema.sql
```

Write your SQL queries inside this file.

**Example:**

```sql
CREATE DATABASE college;

USE college;

CREATE TABLE student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    marks INT
);

INSERT INTO student (name, marks)
VALUES
('Rahul', 85),
('Amit', 90),
('Priya', 95);
```

Here, we have:
1. Created a database named `college`.
2. Selected the database using `USE`.
3. Created a table named `student`.
4. Inserted three records into the table.

## 3. Opening MySQL CLI (Windows)

To access MySQL through the command line:

**Step 1:** Open the VS Code terminal or Windows PowerShell.

**Step 2:** Navigate to the MySQL Server `bin` directory.

```powershell
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
```

**Step 3:** Execute the following command:

```powershell
.\mysql.exe -u root -p
```

Explanation:

- `mysql.exe` → MySQL command-line client.
- `-u root` → Connect using the root username.
- `-p` → Ask for the user's password.

Enter your MySQL password when prompted.

After successful authentication, you will see:

```sql
mysql>
```

This means you are inside the MySQL CLI.

## 4. Executing the SQL File

Once connected to MySQL CLI, we can execute our `schema.sql` file using the `SOURCE` command.

**Syntax:**

```sql
SOURCE path/to/schema.sql;
```

**Example (Windows):**

```sql
SOURCE C:/Users/HP/Downloads/Practical/Node - SQL/schema.sql;
```

This command executes all SQL statements written inside `schema.sql`.

**Important:** Use the actual location of your SQL file. Forward slashes (`/`) work well for Windows paths in MySQL CLI. Be careful when writing paths containing spaces.

## 5. Verifying the Database and Tables

After executing the SQL file, we can verify whether everything was created successfully.

**Show all databases:**

```sql
SHOW DATABASES;
```

**Select a database:**

```sql
USE college;
```

**Show all tables in the selected database:**

```sql
SHOW TABLES;
```

**Display table records:**

```sql
SELECT * FROM student;
```

## 6. Important MySQL CLI Commands

| Command | Purpose |
|---|---|
| `SHOW DATABASES;` | Displays all databases |
| `USE college;` | Selects a database |
| `SHOW TABLES;` | Displays tables in the selected database |
| `SOURCE file.sql;` | Executes a SQL file |
| `SELECT * FROM student;` | Displays all records |
| `EXIT;` | Exits MySQL CLI |

## 7. Complete Workflow

1. Create a `schema.sql` file.
2. Write SQL queries inside the file.
3. Open the terminal.
4. Navigate to the MySQL Server `bin` directory.
5. Connect to MySQL using `.\mysql.exe -u root -p`.
6. Execute the SQL file using the `SOURCE` command.
7. Verify the database and tables using MySQL commands.

## 8. Key Takeaway

A `.sql` file allows us to store multiple SQL queries in one place and execute them together using the MySQL CLI.

The `SOURCE` command is particularly useful because we don't have to manually type every SQL query into the terminal.

**Remember:**

- `.sql` → File extension used for SQL scripts.
- `mysql.exe` → Opens the MySQL command-line client.
- `SOURCE` → Executes SQL statements from an external file.
