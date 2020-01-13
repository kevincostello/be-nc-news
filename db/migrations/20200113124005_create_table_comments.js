exports.up = function(knex) {
  console.log("creating comments table", process.env.NODE_ENV);
};

exports.down = function(knex) {
  console.log("removing comments table", process.env.NODE_ENV);
};
