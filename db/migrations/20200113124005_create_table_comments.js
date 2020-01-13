exports.up = function(knex) {
  console.log("creating comments table", process.env.NODE_ENV);
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id");
    commentsTable
      .string("author")
      .references("username")
      .inTable("users");
    commentsTable
      .integer("article_id")
      .references("article_id")
      .inTable("articles");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at");
    commentsTable.string("body");
  });
};

exports.down = function(knex) {
  console.log("removing comments table", process.env.NODE_ENV);
  return knex.schema.dropTable("comments");
};
