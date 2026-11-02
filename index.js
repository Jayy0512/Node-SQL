const { faker } = require('@faker-js/faker');

const mysql = require('mysql2'); // requiring MySQL

let getRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

console.log(getRandomUser());