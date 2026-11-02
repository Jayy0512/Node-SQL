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
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
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

