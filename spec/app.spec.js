process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const db = require("../db/connection");

// console.log("db:", db);

describe("/api", () => {
  // beforeEach(() => db.seed.run());
  after(() => db.destroy());
  describe("/topics", () => {
    describe("/", () => {
      it("GET responds with status code of 200", () => {
        console.log("in here");
        return request(app)
          .get("/api/topics")
          .expect(200);
      });
    });
  });
});
