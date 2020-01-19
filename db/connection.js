const ENV = process.env.NODE_ENV || "development"; // changed for heroku
const knex = require("knex");
// const dbConfig = require("../knexfile.js");

// changed for heroku

const dbConfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.DATABASE_URL }
    : require("../knexfile");

const db = knex(dbConfig);

module.exports = db;
