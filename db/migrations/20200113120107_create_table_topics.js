exports.up = function(knex) {
  console.log("creating topics table", process.env.NODE_ENV);
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable
      .string("slug")
      .primary()
      .unique();
    topicsTable.string("description");
  });
};

exports.down = function(knex) {
  console.log("removing topics table", process.env.NODE_ENV);
  return knex.schema.dropTable("topics");
};
