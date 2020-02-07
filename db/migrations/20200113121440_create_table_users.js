exports.up = function(knex) {
  console.log("Creating users table", process.env.NODE_ENV);
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .primary()
      .unique();
    usersTable.string("avatar_url");
    usersTable.string("name").notNullable();
  });
};

exports.down = function(knex) {
  console.log("Dropping users table", process.env.NODE_ENV);
  return knex.schema.dropTable("users");
};
