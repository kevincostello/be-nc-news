const knex = require("knex");
const dbConfig = require("../knexfile.js");
console.log("This is dbConfig", dbConfig);

const db = knex(dbConfig);

module.exports = db;
