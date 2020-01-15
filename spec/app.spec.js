process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const db = require("../db/connection");

// console.log("db:", db);

describe("/api", () => {
  beforeEach(() => db.seed.run());
  after(() => db.destroy());
  describe("/topics", () => {
    it("GET responds with status code of 200 and returns array of topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.topics).to.be.an("array");
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
  });

  describe("/users", () => {
    it("GETS a status code of 200 when a valid username is passed as a parameter in the path", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body).to.be.an("object");
          expect(res.body.users).to.be.an("array");
          expect(res.body.users[0]).to.have.keys([
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
          expect(res.body.msg).to.equal("The username does not exist");
        });
    });

    it("GETS a status code of 400 when passed the path of /api/users", () => {
      return request(app)
        .get("/api/users")
        .expect(400);
    });
  });
});
