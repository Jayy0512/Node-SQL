const { faker } = require('@faker-js/faker');

const mysql = require('mysql2'); // requiring MySQL

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'USER',
  password: 'J@y$0513'
});

try{
  connection.query("SHOW TABLES", (err, result) => {
    if (err) throw err;
    console.log(result);
  })
} catch(err) {
  console.log(err);
}

connection.end();

let getRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

console.log(getRandomUser());