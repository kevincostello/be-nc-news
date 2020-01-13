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
  it("when given an array of one object with only a date property, return a new array with one object with the date converted to a Javascript date object", () => {
    const onlyDate = [{ created_at: 1468087638932 }];
    const convertDate = new Date(onlyDate[0].created_at);
    const expectedArray = [{ created_at: convertDate }];
    expect(formatDates(onlyDate)).to.deep.equal(expectedArray);
  });

  it("when given an array of one object with all poperties, return a new array with the object and all properties plus the date converted field", () => {
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

  it("when given an array of multiple objects, return a new array with multiple objects and the modified Javascript date property", () => {
    const articleArrayOfObjects = [
      {
        article_id: 1,
        title: "Peanuts",
        topic: "Comedy",
        body: "This is a comic strip about a boy and his dog and friends",
        votes: 34,
        author: "Charles Schultz",
        created_at: 1509866563519
      },
      {
        article_id: 2,
        title: "Beano",
        topic: "Comedy",
        body: "This is a comic about various characters who get up to no good",
        votes: 16,
        author: "DC Thomson",
        created_at: 1509866563512
      }
    ];

    const articleOutputArrayOfObjects = [
      {
        article_id: 1,
        title: "Peanuts",
        topic: "Comedy",
        body: "This is a comic strip about a boy and his dog and friends",
        votes: 34,
        author: "Charles Schultz"
      },
      {
        article_id: 2,
        title: "Beano",
        topic: "Comedy",
        body: "This is a comic about various characters who get up to no good",
        votes: 16,
        author: "DC Thomson"
      }
    ];
    articleOutputArrayOfObjects[0].created_at = new Date(
      articleArrayOfObjects[0].created_at
    );
    articleOutputArrayOfObjects[1].created_at = new Date(
      articleArrayOfObjects[1].created_at
    );
    expect(formatDates(articleArrayOfObjects)).to.deep.equal(
      articleOutputArrayOfObjects
    );
  });

  it("returns an unmutated array when passed an array of multiple objects", () => {
    const articleArrayOfObjects = [
      {
        article_id: 1,
        title: "Peanuts",
        topic: "Comedy",
        body: "This is a comic strip about a boy and his dog and friends",
        votes: 34,
        author: "Charles Schultz",
        created_at: 1509866563519
      },
      {
        article_id: 2,
        title: "Beano",
        topic: "Comedy",
        body: "This is a comic about various characters who get up to no good",
        votes: 16,
        author: "DC Thomson",
        created_at: 1509866563512
      }
    ];

    const arrayCopy = [...articleArrayOfObjects];
    formatDates(articleArrayOfObjects);

    expect(articleArrayOfObjects).to.deep.equal(arrayCopy);
  });

  it("article object in array has a different reference to original article object", () => {
    const articleArrayOfObjects = [
      {
        article_id: 1,
        title: "Peanuts",
        topic: "Comedy",
        body: "This is a comic strip about a boy and his dog and friends",
        votes: 34,
        author: "Charles Schultz",
        created_at: 1509866563519
      },
      {
        article_id: 2,
        title: "Beano",
        topic: "Comedy",
        body: "This is a comic about various characters who get up to no good",
        votes: 16,
        author: "DC Thomson",
        created_at: 1509866563512
      }
    ];

    expect(formatDates(articleArrayOfObjects)[0]).to.not.equal(
      articleArrayOfObjects[0]
    );
  });

  it("original article is not mutated", () => {
    const articleArrayOfObjects = [
      {
        article_id: 1,
        title: "Peanuts",
        topic: "Comedy",
        body: "This is a comic strip about a boy and his dog and friends",
        votes: 34,
        author: "Charles Schultz",
        created_at: 1509866563519
      },
      {
        article_id: 2,
        title: "Beano",
        topic: "Comedy",
        body: "This is a comic about various characters who get up to no good",
        votes: 16,
        author: "DC Thomson",
        created_at: 1509866563512
      }
    ];
    // this check the article in the array was not affected by the function and still looks the same\
    const copyArray = [...articleArrayOfObjects];

    formatDates(articleArrayOfObjects);
    expect(articleArrayOfObjects[0]).to.eql(copyArray[0]);
  });
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
