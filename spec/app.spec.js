const db = require("../db/connection.js");

describe("/api", () => {
  beforeEach(() => db.seed.run());
  after(() => db.destroy());
  describe("/topics", () => {
    describe("GET", () => {
      it("status:200 responds with an array of <resource_name> objects", () => {});
    });
  });
});
