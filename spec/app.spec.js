process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const db = require("../db/connection");
const { selectCommentsByArticleId } = require("../models/article-model");
const endpoints = require("../endpoints.json");
const stringy = JSON.stringify(endpoints);

chai.use(require("sams-chai-sorted"));
// console.log("db:", db);

describe("/api", () => {
  beforeEach(() => db.seed.run());
  after(() => db.destroy());

  it("Returns GET /api with status of 200 and a JSON containing all of the endpoints on the api", () => {
    return request(app)
      .get("/api")
      .send({ endpoints })
      .expect(200)
      .then(res => {
        console.log("In test", res.body, "This is stringy", { endpoints });
        expect(res.body).to.deep.equal({ endpoints });
        // expect(res.body).to.deep.equal({ stringy: stringy });
      });
  });

  it("Returns DELETE /api with an error code of 405 Method Not Allowed", () => {
    return request(app)
      .delete("/api")
      .expect(405)
      .then(res => {
        expect(res.body.msg).to.equal("method not allowed");
      });
  });

  describe("/topics", () => {
    it("GET responds with status code of 200 and returns array of topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body).to.be.an("object");
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics[0]).to.be.an("object");
          expect(res.body.topics[0]).to.have.keys(["slug", "description"]);
        });
    });
    it("GET responds with status code of 404 when the path has a misspelling", () => {
      return request(app)
        .get("/api/topiccs")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Path is misspelt");
        });
    });

    it("Returns PATCH /api/topics with an error code of 405 Method Not Allowed", () => {
      return request(app)
        .patch("/api/topics")
        .expect(405)
        .then(res => {
          expect(res.body.msg).to.equal("method not allowed");
        });
    });
  });

  describe("/users", () => {
    it("GETS a status code of 200 when a valid username is passed as a parameter in the path", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body).to.be.an("object");
          expect(res.body.user).to.be.an("object");
          expect(res.body.user).to.have.keys([
            "username",
            "avatar_url",
            "name"
          ]);
        });
    });

    it("GETS a status code of 404 when passed an invalid username", () => {
      return request(app)
        .get("/api/users/gobbledygook")
        .expect(404)
        .then(res => {
          console.log(res.body);
          expect(res.body.msg).to.equal("The username does not exist");
        });
    });

    it("Returns PATCH /api/users with an error code of 405 Method Not Allowed", () => {
      return request(app)
        .patch("/api/users")
        .expect(405)
        .then(res => {
          expect(res.body.msg).to.equal("method not allowed");
        });
    });

    it("Returns PUT /api/users/butter_bridge with an error code of 405 Method Not Allowed", () => {
      return request(app)
        .put("/api/users/butter_bridge")
        .expect(405)
        .then(res => {
          expect(res.body.msg).to.equal("method not allowed");
        });
    });
  });

  describe("/articles", () => {
    it("GETS a status code of 200 when passed a valid article id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body).to.be.an("object");
          expect(res.body.article).to.be.an("object");
          expect(res.body.article).to.contain.keys([
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          ]);
        });
    });

    it("GETS a status code of 400 when passed an invalid article id", () => {
      return request(app)
        .get("/api/articles/snnn")
        .expect(400)
        .then(res => expect(res.body.msg).to.equal("Invalid article ID"));
    });

    it("GETS a status code of 404 when passed a valid article id which is not in the database", () => {
      return request(app)
        .get("/api/articles/355555")
        .expect(404)
        .then(res =>
          expect(res.body.msg).to.equal("The article id is not in the database")
        );
    });

    it("GETS a status code of 200 and creates the comment count correctly when passed a valid article id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body.article.comment_count).to.equal(13);
        });
    });

    it("GETS a status code of 200 and creates the comment count of zero when passed a valid article id which is not in the comments table", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body.article.comment_count).to.equal(0);
        });
    });

    it("PATCHES with a status code of 200 when passed an object containing the vote count change", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 9999 })
        .expect(200)
        .then(res => {
          console.log(
            "This is the result in the test",
            res.body,
            res.req.ClientRequest
          );
          expect(res.body).to.be.an("object");
          expect(res.body.article).to.be.an("object");
          expect(res.body.article).to.deep.equal({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 10099,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z"
          });
        });
    });

    it("PATCHES with as status code of 400 when passed an object with an invalid value for inc_votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "gobbledygook" })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            "An invalid value for inc_votes was entered"
          );
        });
    });

    it("Returns POST /api/articles/1 with an error code of 405 Method Not Allowed", () => {
      return request(app)
        .post("/api/articles/1")
        .expect(405)
        .then(res => {
          expect(res.body.msg).to.equal("method not allowed");
        });
    });

    describe("/:article_id/comments", () => {
      it("POSTS a comment with status code of 201 when passed an object containing the comment", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ username: "butter_bridge", body: "This is a comment" })
          .expect(201)
          .then(res => {
            console.log("test response is", res.body);
            expect(res.body.msg).to.equal(
              "Your comment was posted on the article"
            );
            expect(res.body.comment).to.be.an("object");
            expect(res.body.comment).to.have.keys([
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            ]);
            // expect(res.body.comment).to.deep.equal({
            //   comment_id: 19,
            //   author: "butter_bridge",
            //   article_id: 1,
            //   votes: 0,
            //   body: "This is a comment"
            // });
            expect(res.body.comment.comment_id).to.equal(19);
            expect(res.body.comment.author).to.equal("butter_bridge");
            expect(res.body.comment.article_id).to.equal(1);
            expect(res.body.comment.votes).to.equal(0);
            expect(res.body.comment.body).to.equal("This is a comment");
          });
      });

      it("POSTS a comment with status code of 400 when passed an object not containing any keys", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({})
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal(
              "Required keys are not supplied in POST"
            );
          });
      });

      it("POSTS a comment with status code of 400 when passed an object not containing the username", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ body: "This is a comment" })
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal(
              "Required keys are not supplied in POST"
            );
          });
      });

      it("POSTS a comment with status code of 400 when passed an object not containing the body", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ username: "butter_bridge" })
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal(
              "Required keys are not supplied in POST"
            );
          });
      });

      it("POSTS a status code of 404 when the passed article_id is not on the database", () => {
        return request(app)
          .post("/api/articles/100/comments")
          .send({ username: "butter_bridge", body: "This is a comment" })
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal(
              "The article id is not in the database"
            );
          });
      });

      it("GETS a status code of 200 and returns an array of comments for a given article id when valid queries are passed in the request", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=author")
          .expect(200)
          .then(res => {
            console.log("The res.body is: ", res.body);
            expect(res.body).to.be.an("object");
            expect(res.body.comments).to.be.an("array");
            expect(res.body.comments[0]).to.be.an("object");
            expect(res.body.comments.length).to.equal(13);
            expect(res.body.comments[0]).to.have.keys([
              "article_id",
              "comment_id",
              "body",
              "votes",
              "author",
              "created_at"
            ]);
          });
      });

      it("GETS a status code of 200 and returns an array of sorted comments by the created_at for a given article id when valid queries are passed in the request with created_at as the sort by column and desc as the order by value", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(res => {
            console.log("The res.body is: ", res.body);
            expect(res.body).to.be.an("object");
            expect(res.body.comments).to.be.an("array");
            expect(res.body.comments[0]).to.be.an("object");
            expect(res.body.comments.length).to.equal(13);
            expect(res.body.comments[0]).to.have.keys([
              "article_id",
              "comment_id",
              "body",
              "votes",
              "author",
              "created_at"
            ]);
            expect(res.body.comments).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });

      it("GETS a status code of 200 and returns an array of sorted comments by the created_at for a given article id when valid queries are passed in the request with a valid column as the sort by column and default order by value", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=author")
          .expect(200)
          .then(res => {
            console.log("The res.body is: ", res.body);
            expect(res.body).to.be.an("object");
            expect(res.body.comments).to.be.an("array");
            expect(res.body.comments[0]).to.be.an("object");
            expect(res.body.comments.length).to.equal(13);
            expect(res.body.comments[0]).to.have.keys([
              "article_id",
              "comment_id",
              "body",
              "votes",
              "author",
              "created_at"
            ]);
            expect(res.body.comments).to.be.sortedBy("author", {
              descending: true
            });
            expect(
              res.body.comments[res.body.comments.length - 1].author
            ).to.equal("butter_bridge");
          });
      });

      it("GETS a status code of 200 and returns an array of sorted comments by the created_at for a given article id when valid queries are passed in the request with a valid column as the sort by column and order by value is desc", () => {
        return request(app)
          .get("/api/articles/1/comments?order_by=desc")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.comments).to.be.an("array");
            expect(res.body.comments[0]).to.be.an("object");
            expect(res.body.comments.length).to.equal(13);
            expect(res.body.comments[0]).to.have.keys([
              "article_id",
              "comment_id",
              "body",
              "votes",
              "author",
              "created_at"
            ]);
            expect(res.body.comments).to.be.sortedBy("created_at", {
              descending: true
            });
            expect(
              res.body.comments[res.body.comments.length - 1].author
            ).to.equal("butter_bridge");
          });
      });

      it("GETS a status code of 200 and returns an array of sorted comments by the created_at for a given article id when valid queries are passed in the request with a default sort by column and order by value is asc", () => {
        return request(app)
          .get("/api/articles/1/comments?order_by=asc")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.comments).to.be.an("array");
            expect(res.body.comments[0]).to.be.an("object");
            expect(res.body.comments.length).to.equal(13);
            expect(res.body.comments[0]).to.have.keys([
              "article_id",
              "comment_id",
              "body",
              "votes",
              "author",
              "created_at"
            ]);
            expect(res.body.comments).to.be.sortedBy("created_at", {
              descending: false
            });
            expect(
              res.body.comments[res.body.comments.length - 1].author
            ).to.equal("butter_bridge");
          });
      });

      it("GETS a status code of 200 and returns an array of sorted comments by the created_at for a given article id when valid queries are passed in the request with a valid column as the sort by column and order by value is asc", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=author&order_by=asc")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.comments).to.be.an("array");
            expect(res.body.comments[0]).to.be.an("object");
            expect(res.body.comments.length).to.equal(13);
            expect(res.body.comments[0]).to.have.keys([
              "article_id",
              "comment_id",
              "body",
              "votes",
              "author",
              "created_at"
            ]);
            expect(res.body.comments).to.be.sortedBy("author", {
              descending: false
            });
            expect(
              res.body.comments[res.body.comments.length - 1].author
            ).to.equal("icellusedkars");
          });
      });

      it("GETS a status code of 400 with message of invalid column for sort_by when passed an invalid column for sort_by ", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=authorrs")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal("Invalid column for sort_by");
          });
      });

      it("GETS a status code of 400 with message of invalid order_by value when passed an invalid order_by value ", () => {
        return request(app)
          .get("/api/articles/1/comments?order_by=gobbledygook")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal("Invalid order_by value");
          });
      });

      it("GETS a status code of 200 and returns an empty articles array when passes an article_id which exists but is has not comments", () => {
        return request(app)
          .get("/api/articles/2/comments")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(res.body.comments).to.be.an("array");
            expect(res.body.comments.length).to.equal(0);
          });
      });

      it("Returns PATCH /api/articles with an error code of 405 Method Not Allowed", () => {
        return request(app)
          .patch("/api/articles/1/comments")
          .expect(405)
          .then(res => {
            expect(res.body.msg).to.equal("method not allowed");
          });
      });
    }); // end of /api/articles/:article_id/comments describe block

    it("GETS a status code of 200 when passed a valid path to /api/articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0]).to.be.an("object");
          expect(res.body.articles[0]).to.have.keys([
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          ]);
          expect(res.body.articles[0].comment_count).to.equal(13);
          expect(res.body.articles[4].comment_count).to.equal(2);
        });
    });

    it("GETS a status code of 404 when passed an invalid path to /api/articles", () => {
      return request(app)
        .get("/api/articless")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Path is misspelt");
        });
    });

    it("GETS a status code of 200 when passed a valid path and sorts by the default column and default order by", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sortedBy("created_at", {
            descending: true
          });
          expect(res.body.articles.length).to.equal(12);
          expect(
            res.body.articles[res.body.articles.length - 1].article_id
          ).to.equal(12);
          expect(res.body.articles[0].article_id).to.equal(1);
          expect(res.body.articles[8].comment_count).to.equal(2);
        });
    });

    it("GETS a status code of 200 and returns an array of sorted articles by the created_at for a given article id when valid queries are passed in the request with a valid column as the sort by column and default order by value", () => {
      return request(app)
        .get("/api/articles?sort_by=title")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sortedBy("title", {
            descending: true
          });
          expect(res.body.articles[0].article_id).to.equal(7);
        });
    });

    it("GETS a status code of 200 and returns an array of sorted articles by the created_at for a given article id when valid queries are passed in the request with order by value of asc", () => {
      return request(app)
        .get("/api/articles?order_by=asc")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sortedBy("created_at", {
            descending: false
          });
          expect(res.body.articles[0].article_id).to.equal(12);
        });
    });

    it("GETS a status code of 200 and returns an array of sorted articles by the title fwhen valid queries are passed in the request with a valid column as the sort by column and order by value is asc", () => {
      return request(app)
        .get("/api/articles/?sort_by=title&order_by=asc")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sortedBy("title", {
            descending: false
          });
          expect(res.body.articles[0].article_id).to.equal(6);
        });
    });

    it("GETS a status code of 200 and returns an array of sorted articles by the title filtered by author when passedwhen valid queries are passed in the request with a valid column as the sort by column and order by value is asc and a valid value for author", () => {
      return request(app)
        .get("/api/articles/?sort_by=title&order_by=asc&author=butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sortedBy("title", {
            descending: false
          });
          expect(res.body.articles[0].author).to.equal("butter_bridge");
          expect(res.body.articles.length).to.equal(3);
          expect(res.body.articles[1].comment_count).to.equal(0);
        });
    });

    it("GETS a status code of 200 and returns an array of sorted articles by the title filtered by topic when passed valid queries are passed in the request with a valid column as the sort by column and order by value is asc and a valid value for topic", () => {
      return request(app)
        .get(
          "/api/articles/?sort_by=title&order_by=asc&topic=mitch&author=butter_bridge"
        )
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sortedBy("title", {
            descending: false
          });
          expect(res.body.articles[0].topic).to.equal("mitch");
          expect(res.body.articles.length).to.equal(3);
          expect(res.body.articles[0].comment_count).to.equal(13);
        });
    });

    it("GETS a status code of 200 and returns an array of sorted articles by the title filtered by topic but not filterd by author when passed valid queries are passed in the request with a valid column as the sort by column and order by value is asc and a valid value for topic", () => {
      return request(app)
        .get("/api/articles/?sort_by=title&order_by=asc&topic=mitch")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sortedBy("title", {
            descending: false
          });
          expect(res.body.articles[0].topic).to.equal("mitch");
          expect(res.body.articles.length).to.equal(11);
          expect(
            res.body.articles[res.body.articles.length - 2].comment_count
          ).to.equal(2);
        });
    });

    it("GETS a status code of 200 and returns an array of sorted articles by the title filtered by topic but not filterd by topic when passed valid queries are passed in the request with a valid column as the sort by column and order by value is asc and a valid value for author", () => {
      return request(app)
        .get("/api/articles/?sort_by=title&order_by=asc&author=rogersop")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sortedBy("title", {
            descending: false
          });
          expect(res.body.articles[2].topic).to.equal("cats");
          expect(res.body.articles.length).to.equal(3);
          expect(res.body.articles[2].comment_count).to.equal(2);
        });
    });

    // I need to recheck all of these
    it("GETS a status code of 404 when passed an author name not in the database", () => {
      return request(app)
        .get("/api/articles/?author=rogersopp")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("The username does not exist");
        });
    });

    it("GETS a status code of 404 when passed a title not in the database", () => {
      return request(app)
        .get("/api/articles/?topic=gobbledygook")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal(
            "The query value is not on the database"
          );
        });
    });

    it("GETS a status code of 404 when passed an author and a title not in the database", () => {
      return request(app)
        .get("/api/articles/?author=noauthor&topic=gobbledygook")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("The username does not exist");
        });
    });

    it("GETS a status code of 400 when passed sort_by column not on the database", () => {
      return request(app)
        .get("/api/articles/?sort_by=gobbledygook")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("Invalid column for sort_by");
        });
    });

    it("GETS a status code of 400 when passed invalid order by value", () => {
      return request(app)
        .get("/api/articles/?order_by=gobbledygook")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("Invalid order_by value");
        });
    });

    it("GET a status code of 200 an empty array when passed a valid author who has no articles", () => {
      return request(app)
        .get("/api/articles/?author=lurker")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles.length).to.equal(0);
        });
    });

    it("GET a status code of 404, author name not in the database", () => {
      return request(app)
        .get("/api/articles/?author=lurkerss")
        .expect(404);
    });
    // end of I need to recheck all of these

    it("Returns PATCH /api/articles with an error code of 405 Method Not Allowed", () => {
      return request(app)
        .patch("/api/articles")
        .expect(405)
        .then(res => {
          expect(res.body.msg).to.equal("method not allowed");
        });
    });
  });

  describe("/comments", () => {
    describe("/:comment_id", () => {
      it("PATCHES with status of 200 when passed a valid votes object, checked against expected object in test", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: 99 })
          .expect(200)
          .then(res => {
            console.log("test response is", res.body);
            expect(res.body.msg).to.equal(
              "The comment was updated with the passed values"
            );
            res.body.comment.created_at = Date.parse(
              res.body.comment.created_at
            );
            expect(res.body.comment).to.deep.equal({
              comment_id: 1,
              body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
              article_id: 9,
              author: "butter_bridge",
              votes: 115,
              created_at: 1511354163389
            });
          });
      });

      it("DELETES with status code of 204, when passed a comment_id", () => {
        return request(app)
          .delete("/api/comments/1")
          .expect(204);
      });

      it("DELETES with status code of 404, when passed a misspelt path", () => {
        return request(app)
          .delete("/api/commentsss/2")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("Path is misspelt");
          });
      });

      it("DELETES with status code of 404, when passed a comment_id that does not exist", () => {
        return request(app)
          .delete("/api/comments/199")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("The comment_id does not exist");
          });
      });

      it("DELETES with status code of 400, when passed an invalid comment_id", () => {
        return request(app)
          .delete("/api/comments/gobbledygook")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal("An invalid comment_id was passed");
          });
      });

      it("Returns PATCH /api/comments/1 with an error code of 405 Method Not Allowed", () => {
        return request(app)
          .put("/api/comments/1")
          .expect(405)
          .then(res => {
            expect(res.body.msg).to.equal("method not allowed");
          });
      });
    });
  });
});
