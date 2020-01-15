const knex = require("knex");
const dbConfig = require("../knexfile.js");

const db = knex(dbConfig);

module.exports = db;
