const knex = require("knex");
const dbConfig = require("../knexfile.js");

const db = knex(dbConfig);
console.log(dbConfig);
module.exports = db;
