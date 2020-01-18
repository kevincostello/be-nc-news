const db = require("../db/connection");

exports.selectArticle = article => {
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
        // convert comment_count to be a number not a string
        const numericCountArray = result.map(article => {
          article.comment_count = Number(article.comment_count);
          return article;
        });
        return numericCountArray[0];

        // return result[0];
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
  console.log("In selectCommentsByArticleId", params.article_id, query.sort_by);
  // articles and comments tables will need to be joined by article_id
  // need to select comment_id, votes, created_at, author and body from comments table
  // need to accept queries containing:
  // sort_by -> any valid column (default to created_at)
  // order -> asc or desc (default to desc)
  return db
    .select(
      "comments.comment_id",
      "comments.author",
      "comments.article_id",
      "comments.votes",
      "comments.created_at",
      "comments.body"
    )
    .from("comments")
    .where("comments.article_id", params.article_id)
    .orderBy(query.sort_by || "comments.created_at", query.order_by || "desc")
    .then(result => {
      console.log("in models - GET - result");
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "The article id is not in the database"
        });
      } else if (
        query.order_by !== undefined &&
        query.order_by !== "asc" &&
        query.order_by !== "desc"
      ) {
        return Promise.reject({
          status: 400,
          msg: "Invalid order_by value"
        });
      } else {
        return result;
      }
    });
};

exports.selectAllArticles = query => {
  console.log("In selectAllArticles", query);
  // need to return an array of article objects containing:
  // author, title, article_id, topic, created_at, votes and comment_count -> need to join articles and comments
  // Also accepts the following queries:
  // sort_by (defaults to created_at)
  // order (defaults to desc)
  // author - filters by value
  // topic - filters by topic
  return (
    db
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
      .orderBy(query.sort_by || "articles.created_at", query.order_by || "desc")
      .modify(sqlQuery => {
        // console.log("This is the query", user);
        // need to filter for both query.author and query.topic if passed both in query
        if (query.author) {
          sqlQuery.where("articles.author", query.author);
        }
        if (query.topic) {
          sqlQuery.where("articles.topic", query.topic);
        }
      })
      // .where("articles.author", query.author)
      .then(result => {
        if (result.length === 0) {
          // need to check when array is empty because a valid author is passed versus an invalid author - need to do another query to the database to check if the author exists on the database and send a 204 in this situation

          // SELECT users.username, count(articles.article_id)
          // FROM users LEFT JOIN articles ON users.username = articles.author
          // GROUP BY users.username
          // ;

          return Promise.reject({
            status: 404,
            msg: "Invalid query passed"
          });
        } else if (
          query.order_by !== undefined &&
          query.order_by !== "asc" &&
          query.order_by !== "desc"
        ) {
          return Promise.reject({
            status: 400,
            msg: "Invalid order_by value"
          });
        } else {
          // convert comment_count to be a number not a string
          const numericCountArray = result.map(article => {
            article.comment_count = Number(article.comment_count);
            return article;
          });
          return numericCountArray;
        }
      })
  );
};
