const db = require("../db/connection");

const { selectUser } = require("../models/user-model");
const { selectTopics } = require("../models/topic-model");

const selectArticle = article => {
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

const patchArticle = (body, params) => {
  console.log("im in the models");
  return db
    .from("articles")
    .where("articles.article_id", params.article_id)
    .increment("votes", body.inc_votes || 0)
    .returning("*")
    .then(result => {
      console.log("patching result is completed");
      return result[0];
    });
  // need to use selectArticles model to return the updated article, how can I do this?
};

const postArticleWithComment = (body, params) => {
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
      return res[0];
    });
};

const selectCommentsByArticleId = (params, query) => {
  console.log("In selectCommentsByArticleId");
  // Accepts queries containing:
  // sort_by -> any valid column (default to created_at)
  // order -> asc or desc (default to desc)

  // (1) - First check if the article_id exists in the database
  const doesArticleExist = selectArticle({ article_id: params.article_id });

  return doesArticleExist
    .then(articleExists => {
      if (articleExists.length > 0) {
        return articleExists;
      }
    })
    .then(checkCommentsExist => {
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
        .orderBy(query.sort_by || "comments.created_at", query.order || "desc");
    })
    .then(result => {
      if (result.length === 0) {
        return result;
      } else if (
        query.order !== undefined &&
        query.order !== "asc" &&
        query.order !== "desc"
      ) {
        return Promise.reject({
          status: 400,
          msg: "Invalid order value"
        });
      } else {
        return result;
      }
    });
};

const selectAllArticles = query => {
  console.log("In selectAllArticles", query);
  const checkUser = () => {
    if (query.author !== undefined) {
      return selectUser({ username: query.author });
    } else return Promise.resolve();
  };

  const selectTopic = topic => {
    console.log("im in the models - new selectTopic");
    return db
      .select("*")
      .from("topics")
      .where("slug", topic)
      .then(result => {
        if (result.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "The query value is not on the database"
          });
        } else {
          return result;
        }
      });
  };

  const checkTopic = () => {
    if (query.topic !== undefined) {
      return selectTopic(query.topic);
    } else return Promise.resolve();
  };

  return checkUser()
    .then(inAuthor => {
      return checkTopic();
    })
    .then(inTopic => {
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
        .orderBy(query.sort_by || "articles.created_at", query.order || "desc")
        .modify(sqlQuery => {
          // need to filter for both query.author and query.topic if passed both in query
          if (query.author) {
            sqlQuery.where("articles.author", query.author);
          }
          if (query.topic) {
            sqlQuery.where("articles.topic", query.topic);
          }
        });
    })
    .then(result => {
      if (
        query.order !== undefined &&
        query.order !== "asc" &&
        query.order !== "desc"
      ) {
        return Promise.reject({
          status: 400,
          msg: "Invalid order value"
        });
      } else if (result.length === 0) {
        return result;
      } else {
        const numericCountArray = result.map(article => {
          article.comment_count = Number(article.comment_count);
          return article;
        });
        return numericCountArray;
      }
    });
  // .then(authorResult => {
  //   console.log("Are we in authorResult?", authorResult);
  //   if (authorResult.length > 0) {
  //     return authorResult;
  //   } else {
  //     return [];
  //   }
  // });
};

module.exports = {
  selectArticle,
  patchArticle,
  postArticleWithComment,
  selectCommentsByArticleId,
  selectAllArticles
};
