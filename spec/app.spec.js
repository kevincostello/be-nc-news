process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const db = require("../db/connection");

describe("/api", () => {
  // beforeEach(() => db.seed.run());
  after(() => db.destroy());
  describe("/topics", () => {
    describe("GET", () => {
      it("status:200 responds with an array of <resource_name> objects", () => {
        console.log("in here");
        return request(app)
          .get("/api/topics")
          .expect(200);
      });
    });
  });
});
