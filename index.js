const { faker } = require('@faker-js/faker');

const mysql = require('mysql2'); // requiring MySQL

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'USER',
  password: 'J@y$0513'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
  ];
}

// let q = "INSERT INTO INFO (id, username, email, password) VALUES (?, ?, ?, ?)";
// let user = [["abc", "abc_0", "abc@mail", "abc_012"]];
// would be, connection.query(q, users, (err, result) => {

let q = "INSERT INTO INFO (id, username, email, password) VALUES ?";

let data = [];
for(let i=0; i<=100; i++){
  data.push(getRandomUser());
}

// console.log(data);

// let users = [["abc0", "abc_00", "abc0@mail", "abc0_012"],
//              ["abc1", "abc_1", "abc1@mail", "abc1_012"],
//              ["abc2", "abc_2", "abc2@mail", "abc2_012"]];

try{
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result),
    console.log(result[0]),
    console.log(result.length);
  })
} catch(err) {
  console.log(err);
}

connection.end();

