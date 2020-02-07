const db = require("../db/connection");

const { selectUser } = require("../models/user-model");
const { selectTopics } = require("../models/topic-model");

const selectArticle = article => {
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
  return db
    .from("articles")
    .where("articles.article_id", params.article_id)
    .increment("votes", body.inc_votes || 0)
    .returning("*")
    .then(result => {
      return result[0];
    });
  // need to use selectArticles model to return the updated article, how can I do this?
};

const postArticleWithComment = (body, params) => {
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
      return res[0];
    });
};

const selectCommentsByArticleId = (params, query) => {
  // Accepts queries containing:
  // sort_by -> any valid column (default to created_at)
  // order -> asc or desc (default to desc)

  const limitNumeric = Number(query.limit);
  const pNumeric = Number(query.p);
  const calculatePage = (pNumeric - 1) * 10;

  // check if query is valid
  const checkQuery = () => {
    if (query.limit && query.p && (isNaN(limitNumeric) || isNaN(pNumeric))) {
      return Promise.reject({
        status: 400,
        msg: "Invalid limit or p value"
      });
    } else if (query.p && isNaN(pNumeric)) {
      return Promise.reject({
        status: 400,
        msg: "Invalid limit or p value"
      });
    } else if (
      !query.limit ||
      !query.p ||
      (Number.isInteger(limitNumeric) && Number.isInteger(pNumeric))
    ) {
      return Promise.resolve();
    }
  };

  // (1) - First check if the article_id exists in the database
  const doesArticleExist = selectArticle({ article_id: params.article_id });

  return (
    checkQuery()
      .then(moveOn => {
        return doesArticleExist;
      })
      // return doesArticleExist
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
          .orderBy(
            query.sort_by || "comments.created_at",
            query.order || "desc"
          )
          .modify(queryBuilder => {
            // limit and p are present and numeric values
            if (query.limit && limitNumeric && query.p && pNumeric) {
              queryBuilder.limit(query.limit || 10);
              queryBuilder.offset((query.p - 1) * (query.limit || 10));
            } else if (!query.limit && query.p) {
              // p is present but limit is not
              queryBuilder.limit(10);
              queryBuilder.offset(calculatePage);
            } else if (query.limit && !query.p) {
              // limit is present but p is not
              queryBuilder.limit(query.limit);
            } else if (!query.limit && !query.p) {
              // limit and p are not present
              queryBuilder.limit(10);
            }
          });
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
      })
  );
};

const selectAllArticles = query => {
  // check if query is valid

  const limitNumeric = Number(query.limit);
  const pNumeric = Number(query.p);

  const checkQuery = () => {
    if (query.limit && query.p && (isNaN(limitNumeric) || isNaN(pNumeric))) {
      return Promise.reject({
        status: 400,
        msg: "Invalid limit or p value"
      });
    } else if (
      (!query.limit && !query.p) ||
      (Number.isInteger(limitNumeric) && Number.isInteger(pNumeric))
    ) {
      return Promise.resolve();
    }
  };

  // add total_count of articles to articles object returned
  const articleCount = () => {
    return db.count("article_id as total_count").from("articles");
  };

  const checkUser = () => {
    if (query.author !== undefined) {
      return selectUser({ username: query.author });
    } else return Promise.resolve();
  };

  const selectTopic = topic => {
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

  const limitQueryValid = checkQuery();

  return limitQueryValid
    .then(queryValid => {
      return checkUser();
    })
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
          if (
            query.limit &&
            Number.isInteger(Number(query.limit)) &&
            query.p &&
            Number.isInteger(Number(query.p))
          ) {
            sqlQuery.limit(query.limit || 10);
            sqlQuery.offset((query.p - 1) * (query.limit || 10));
          } else if (!query.limit || !query.p) {
            sqlQuery.limit(10);
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
    })
    .then(articlesArray => {
      const totalCount = articleCount();
      return Promise.all([totalCount, articlesArray]);
    })
    .then(([totalCountResponse, articlesArrayResponse]) => {
      const articlesWithCount = articlesArrayResponse.map(article => {
        article.total_count = totalCountResponse[0].total_count;
        return article;
      });
      return articlesWithCount;
    });
};

const deleteArticle = params => {
  return db
    .from("articles")
    .where("article_id", params.article_id)
    .delete()
    .then(res => {
      if (res > 0) {
        return res;
      } else if (res === 0) {
        return Promise.reject({
          status: 404,
          msg: "The article_id does not exist"
        });
      }
    });
};

const insertNewArticle = body => {
  return db
    .from("articles")
    .insert(body)
    .returning("*")
    .then(result => {
      return result[0];
    });
};

module.exports = {
  selectArticle,
  patchArticle,
  postArticleWithComment,
  selectCommentsByArticleId,
  selectAllArticles,
  deleteArticle,
  insertNewArticle
};
