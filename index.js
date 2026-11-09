const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const mysql = require("mysql2"); // requiring MySQL
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let port = 8080;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "USER",
  password: "J@y$0513",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.listen(port, () => {
  console.log("Server is listening on port 8080");
});

// Home route:

app.get("/", (req, res) => {
  let q = "SELECT count(*) FROM INFO";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result[0]["count(*)"]);
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    res.send("Some error in DB");
  }
});

// Show route:

app.get("/users", (req, res) => {
  let q = "SELECT * FROM INFO";
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showuser.ejs", { users });
    });
  } catch (err) {
    res.send("Some error in DB");
  }
});

// let q = "INSERT INTO INFO (id, username, email, password) VALUES (?, ?, ?, ?)";
// let user = [["abc", "abc_0", "abc@mail", "abc_012"]];
// would be, connection.query(q, users, (err, result) => {

// let q = "INSERT INTO INFO (id, username, email, password) VALUES ?";

// let data = [];
// for(let i=0; i<=100; i++){
//   data.push(getRandomUser());
// }

// console.log(data);

// let users = [["abc0", "abc_00", "abc0@mail", "abc0_012"],
//              ["abc1", "abc_1", "abc1@mail", "abc1_012"],
//              ["abc2", "abc_2", "abc2@mail", "abc2_012"]];

// connection.end();
