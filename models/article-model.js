const db = require("../db/connection");

exports.selectArticles = article => {
  console.log("im in the models");
  return db
    .select("articles.*")
    .from("articles")
    .count("comments.comment_id as comment_count")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", article.article_id)
    .groupBy("articles.article_id")
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "The article id is not in the database"
        });
      } else {
        return result;
      }
    });
};

exports.patchArticles = (body, params) => {
  console.log("im in the models");
  return db
    .from("articles")
    .where("articles.article_id", params.article_id)
    .increment("votes", body.inc_votes || 0)
    .returning("*")
    .then(result => {
      console.log("patching result is completed");
      return result;
    });
  // need to use selectArticles model to return the updated article, how can I do this?
};

exports.postArticleWithComment = (body, params) => {
  console.log("im in the models - post");
  // votes and created_at will be given default values so they do not need to be inserted
  const toInsert = {
    author: body.username,
    article_id: params.article_id,
    body: body.body
  };
  return db
    .insert(toInsert)
    .into("comments")
    .returning("*")
    .then(res => {
      console.log("Am I in the post then?");
      return res;
    });
};

exports.selectCommentsByArticleId = (params, query) => {
  // articles and comments tables will need to be joined by article_id
  // need to select comment_id, votes, created_at, author and body from comments table
  // need to accept queries containing:
  // sort_by -> any valid column (default to created_at)
  // order -> asc or desc (default to desc)
  return db
    .select(
      "articles.article_id",
      "comments.comment_id",
      "comments.votes",
      "comments.created_at",
      "comments.author",
      "comments.body"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", params.article_id)
    .orderBy(query.sort_by || "comments.created_at", query.order_by || "desc")
    .then(result => {
      console.log("in models - GET - result");
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "The article id is not in the database"
        });
      } else if (query.order_by !== undefined && query.order_by !== "asc") {
        return Promise.reject({
          status: 400,
          msg: "Invalid order_by value"
        });
      } else {
        return result;
      }
    });
};

exports.selectAllArticles = () => {
  console.log("In selectAllArticles");
  // need to return an array of article objects containing:
  // author, title, article_id, topic, created_at, votes and comment_count -> need to join articles and comments
  // Also accepts the following queries:
  // sort_by (defaults to created_at)
  // order (defaults to desc)
  // author - filters by value
  // topic - filters by topic
  return db
    .select(
      "articles.article_id",
      "articles.author",
      "articles.title",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .count("comments.comment_id as comment_count")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .then(result => {
      // if (result.length === 0) {
      //   return Promise.reject({
      //     status: 404,
      //     msg: "The article id is not in the database"
      //   });
      // } else {
      return result;
      // }
    });
};
