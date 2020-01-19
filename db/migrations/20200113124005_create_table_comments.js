exports.up = function(knex) {
  console.log("creating comments table", process.env.NODE_ENV);
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id");
    commentsTable
      .string("author")
      .references("username")
      .inTable("users")
      .notNullable();
    commentsTable
      .integer("article_id")
      .references("article_id")
      .inTable("articles");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.text("body").notNullable();
  });
};

exports.down = function(knex) {
  console.log("removing comments table", process.env.NODE_ENV);
  return knex.schema.dropTable("comments");
};
