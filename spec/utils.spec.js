const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("when given an empty array return a new empty array", () => {
    expect(formatDates([])).to.deep.equal([]);
  });
  it("when given an array of one object with only a date field, return a new array with one object with the date converted to a Javascript date object", () => {
    const onlyDate = [{ created_at: 1468087638932 }];
    const convertDate = new Date(onlyDate[0].created_at);
    const expectedArray = [{ created_at: convertDate }];
    expect(formatDates(onlyDate)).to.deep.equal(expectedArray);
  });

  it("when given an array of one element with all fields, return a new array with the element and all fields plus the date converted field", () => {
    const articleObject = [
      {
        article_id: 1,
        title: "Peanuts",
        topic: "Comedy",
        body: "This is a comic strip about a boy and his dog and friends",
        votes: 34,
        author: "Charles Schultz",
        created_at: 1509866563519
      }
    ];
    const outputObject = [
      {
        article_id: 1,
        title: "Peanuts",
        topic: "Comedy",
        body: "This is a comic strip about a boy and his dog and friends",
        votes: 34,
        author: "Charles Schultz"
      }
    ];
    outputObject[0].created_at = new Date(articleObject[0].created_at);
    expect(formatDates(articleObject)).to.deep.equal(outputObject);
  });
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
