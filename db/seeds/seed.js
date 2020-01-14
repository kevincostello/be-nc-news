process.env.NODE_ENV = "development";

const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  const topicsInsertions = knex("topics")
    .insert(topicData)
    .into("topics")
    .returning("*");
  const usersInsertions = knex("users")
    .insert(userData)
    .into("users")
    .returning("*");
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => usersInsertions)
    .then(() => topicsInsertions)
    .then(() => {
      const formattedArticles = formatDates(articleData);
      const articlesInsertions = knex("articles")
        .insert(formattedArticles)
        .into("articles")
        .returning("*");
      return articlesInsertions;
    })
    .then(fromArticles => {
      const refObj = makeRefObj(fromArticles);
      const formattedComments = formatComments(commentData, refObj);
      console.log("formatted comments:", formattedComments);
      const commentsInsertions = knex("comments")
        .insert(formattedComments)
        .into("comments")
        .returning("*");
      return commentsInsertions;
    });
  // .then(() => {
  //   return knex("users")
  //     .insert(userData)
  //     .into("users")
  //     .returning("*");
  // });
  // return (
  //   Promise.all([usersInsertions])
  // return Promise.all([topicsInsertions, usersInsertions]).then(() => {
  /* 
      Your article data is currently in the incorrect format and will violate your SQL schema. 
      
      You will need to write and test the provided formatDate utility function to be able insert your article data.

      Your comment insertions will depend on information from the seeded articles, so make sure to return the data after it's been seeded.
      */
  // });
  // .then(articleRows => {
  /* 
      Your comment data is currently in the incorrect format and will violate your SQL schema. 

      Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id. 
      
      You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.
      */

  //   const articleRef = makeRefObj(articleRows);
  //   const formattedComments = formatComments(commentData, articleRef);
  //   return knex("comments").insert(formattedComments);
  // })
  // );
};
