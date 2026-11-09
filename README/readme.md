# Node-SQL: User Management App

A small full-stack app built while learning how to connect **Node.js** with a **MySQL** database. It lists users stored in MySQL, shows the total user count, and lets you edit a username after verifying the user's password.

This is a learning project. The goal was to understand how Express, EJS templates and raw SQL queries work together, so it's intentionally simple.

## Features

- **Home page** showing the total number of users (`SELECT count(*)`)
- **Users page** listing every user's id, username and email in a table
- **Edit username** form with password verification before the update is applied
- **Fake data generation** with Faker.js and bulk insert into MySQL
- **PATCH requests from HTML forms** using `method-override`

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Server framework | Express 5 |
| Database | MySQL (via the `mysql2` driver) |
| Templating | EJS |
| Form method support | method-override |
| Test data | @faker-js/faker |

## Project Structure

```text
Node - SQL/
├── index.js          # Express server, DB connection and all routes
├── schema.sql        # SQL for creating the INFO table
├── package.json
├── views/
│   ├── home.ejs      # Total user count
│   ├── showuser.ejs  # Table of all users
│   └── edit.ejs      # Edit username form
└── README/
    └── readme.md     # My learning notes (mysql2, SQL files, placeholders)
```

## Database Schema

Table: `INFO`

| Column | Type | Constraints |
|---|---|---|
| `id` | `VARCHAR(50)` | Primary key |
| `username` | `VARCHAR(50)` | Unique |
| `email` | `VARCHAR(100)` | Unique, not null |
| `password` | `VARCHAR(50)` | Unique, not null |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MySQL Server](https://dev.mysql.com/downloads/) installed and running

### 1. Clone the repository

```bash
git clone https://github.com/Jayy0512/Node-SQL.git
cd Node-SQL
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the database and table

`schema.sql` only creates the table, so create the database first. Open the MySQL CLI:

```bash
mysql -u root -p
```

Then run:

```sql
CREATE DATABASE `USER`;
USE `USER`;
SOURCE path/to/schema.sql;
```

You can check it worked with `SHOW TABLES;` and `DESCRIBE INFO;`.

### 4. Configure the database connection

In `index.js`, update the connection settings with your own MySQL details:

```javascript
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "USER",
  password: "your_mysql_password",
});
```

### 5. Add some data (optional)

The table starts empty. To fill it with random users, add this temporarily to `index.js`, run the app once, then remove it:

```javascript
let q = "INSERT INTO INFO (id, username, email, password) VALUES ?";

let data = [];
for (let i = 0; i < 100; i++) {
  data.push(getRandomUser());
}

connection.query(q, [data], (err, result) => {
  if (err) throw err;
  console.log(result.affectedRows);
});
```

`getRandomUser()` is already defined in `index.js` and uses Faker.js to generate an id, username, email and password.

### 6. Run the app

```bash
node index.js
```

Open [http://localhost:8080](http://localhost:8080).

## Routes

| Method | Route | Description |
|---|---|---|
| GET | `/` | Home page with the total user count |
| GET | `/users` | Lists all users |
| GET | `/users/:id/edit` | Shows the edit form for one user |
| PATCH | `/users/:id` | Updates the username if the password matches |

## What I Learned

- Connecting Node.js to MySQL with `mysql2` and running queries from callbacks
- Running `.sql` files from the MySQL CLI with `SOURCE`
- Single and bulk inserts using `?` placeholders
- Generating realistic test data with Faker.js
- Building RESTful routes (show, edit, update) with Express
- Rendering dynamic pages with EJS
- Sending `PATCH` requests from HTML forms using `method-override`

My detailed notes on these topics are in [`README/readme.md`](./README/readme.md).

## Known Limitations and Next Steps

Since this was built for learning, a few things are deliberately basic. Things I plan to improve:

- [ ] Use `?` placeholders in the route queries (`/users/:id/edit` and `PATCH /users/:id`) instead of template strings, to prevent SQL injection
- [ ] Hash passwords (for example with bcrypt) instead of storing and comparing plain text
- [ ] Move database credentials into environment variables using `dotenv`
- [ ] Add routes to create and delete users
- [ ] Add proper error handling for database failures
- [ ] Use a connection pool instead of a single connection

## Author

**Jayy**: Final-year BTech IT student, learning the MERN stack and backend development.

GitHub: [@Jayy0512](https://github.com/Jayy0512)
