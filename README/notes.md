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

# 2. Inserting Data into MySQL Using Placeholders (Node.js)

## 1. Introduction

When working with MySQL in Node.js, we can insert data into a database using the `connection.query()` method.

Instead of directly writing values inside SQL queries, we can use **placeholders (`?`)**.

Placeholders allow us to pass values separately from the SQL query.

**Advantages of using placeholders:**

- Prevents SQL Injection attacks.
- Makes queries cleaner and easier to maintain.
- Allows us to insert dynamic data.
- Makes inserting multiple records easier.

## 2. Inserting a Single User Using Placeholders

We can use placeholders (`?`) to insert a single user's information into a table.

### Example:

```javascript
let user = ["123abc", "random_user", "random@gmail.com", "random123"];

connection.query(
    "INSERT INTO info (id, username, email, password) VALUES (?, ?, ?, ?)",
    user,
    function (err, result) {
        if (err) throw err;

        console.log(result);
    }
);
```

### Explanation:

**1. Creating an array of user data**

```javascript
let user = ["123abc", "random_user", "random@gmail.com", "random123"];
```

This array contains the values we want to insert into the database.

**2. Writing the SQL query with placeholders**

```sql
INSERT INTO info (id, username, email, password)
VALUES (?, ?, ?, ?);
```

Each `?` represents a value that will be provided separately.

**3. Passing the values**

```javascript
connection.query(query, user, callback);
```

The values in the `user` array are automatically mapped to the placeholders in order.

| Placeholder | Value |
|---|---|
| First `?` | `123abc` |
| Second `?` | `random_user` |
| Third `?` | `random@gmail.com` |
| Fourth `?` | `random123` |

**Important:** The number and order of values must match the placeholders in the SQL query.

## 3. Inserting Multiple Users Using Placeholders (Bulk Insert)

Instead of inserting users one by one, we can insert multiple records in a single query.

This is known as **Bulk Insert**.

### Example:

```javascript
let q = "INSERT INTO info (id, username, email, password) VALUES ?";

let users = [
    ["abc0", "abc_00", "abc0@mail", "abc0_012"],
    ["abc1", "abc_1", "abc1@mail", "abc1_012"],
    ["abc2", "abc_2", "abc2@mail", "abc2_012"]
];

try {
    connection.query(q, [users], (err, result) => {
        if (err) throw err;

        console.log(result);
        console.log(result[0]);
        console.log(result.length);
    });
} catch (err) {
    console.log(err);
}
```

### Explanation:

**1. Creating the SQL query**

```javascript
let q = "INSERT INTO info (id, username, email, password) VALUES ?";
```

Here, we use only one placeholder (`?`) because we are passing multiple rows together.

**2. Creating an array of users**

```javascript
let users = [
    ["abc0", "abc_00", "abc0@mail", "abc0_012"],
    ["abc1", "abc_1", "abc1@mail", "abc1_012"],
    ["abc2", "abc_2", "abc2@mail", "abc2_012"]
];
```

Notice that:

- Each inner array represents one user.
- Each inner array contains four values.
- The outer array contains all the users we want to insert.

**3. Passing the users array**

```javascript
connection.query(q, [users], callback);
```

Here, we pass `[users]` instead of `users`.

The extra square brackets are important because the `?` placeholder represents the complete collection of rows.

MySQL converts the nested array into multiple value sets.

Conceptually, the query becomes:

```sql
INSERT INTO info (id, username, email, password)
VALUES
('abc0', 'abc_00', 'abc0@mail', 'abc0_012'),
('abc1', 'abc_1', 'abc1@mail', 'abc1_012'),
('abc2', 'abc_2', 'abc2@mail', 'abc2_012');
```

All three users are inserted with a single query.

## 4. Understanding the Query Result

When an INSERT query executes successfully, MySQL returns a result object containing information about the operation.

For example:

```javascript
connection.query(q, [users], (err, result) => {
    if (err) throw err;

    console.log(result);
    console.log(result.affectedRows);
    console.log(result.insertId);
});
```

Important properties:

| Property | Purpose |
|---|---|
| `result.affectedRows` | Number of rows affected by the query |
| `result.insertId` | ID of the first inserted row (when applicable) |
| `result.warningCount` | Number of warnings generated |

**Note:** `result` is an object, not an array of inserted records. Therefore, `result[0]` and `result.length` do not give the inserted rows or their count.

For example, if three users are inserted successfully:

```javascript
console.log(result.affectedRows);
```

Output:

```text
3
```

## 5. Difference Between Single Insert and Bulk Insert

| Single Insert | Bulk Insert |
|---|---|
| Inserts one record | Inserts multiple records |
| Uses multiple placeholders | Uses one placeholder for all rows |
| Passes a single array | Passes an array of arrays inside another array |
| `VALUES (?, ?, ?, ?)` | `VALUES ?` |
| `connection.query(q, user, callback)` | `connection.query(q, [users], callback)` |

## 6. Why Use Placeholders?

Consider this query:

```javascript
let username = "random_user";

let q = `INSERT INTO info (username) VALUES ('${username}')`;
```

Here, we directly insert a JavaScript variable into the SQL query.

This approach can expose the application to SQL Injection vulnerabilities.

A safer approach is:

```javascript
let username = "random_user";

let q = "INSERT INTO info (username) VALUES (?)";

connection.query(q, [username], callback);
```

The MySQL driver safely escapes the supplied value rather than treating it as part of the SQL query.

## 7. Key Takeaways

1. `?` is a placeholder used to pass dynamic values into SQL queries.
2. Placeholders help protect against SQL Injection when used correctly.
3. A single user can be inserted using a normal array.
4. Multiple users can be inserted using a nested array (Bulk Insert).
5. `VALUES ?` is used for inserting multiple rows together with the MySQL Node.js driver.
6. `connection.query(q, [users], callback)` passes multiple rows to the query.
7. `result.affectedRows` tells us how many rows were affected.

**Remember:**

- Single Insert → `VALUES (?, ?, ?, ?)`
- Bulk Insert → `VALUES ?`
- Single User → `connection.query(q, user, callback)`
- Multiple Users → `connection.query(q, [users], callback)`