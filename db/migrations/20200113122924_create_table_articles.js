exports.up = function(knex) {
  console.log("creating articles table", process.env.NODE_ENV);
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments().primary();
    articlesTable.string("title");
    articlesTable.string("body");
    articlesTable.integer("votes").defaultTo(0);
    articlesTable
      .string("topic")
      .references("slug")
      .inTable("topics");
    articlesTable
      .string("author")
      .references("username")
      .inTable("users");
    articlesTable.timestamp("created_at");
  });
};

exports.down = function(knex) {
  console.log("removing articles table", process.env.NODE_ENV);
  return knex.schema.dropTable("articles");
};
