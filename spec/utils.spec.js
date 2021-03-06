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

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    expect(makeRefObj([])).to.deep.equal({});
  });
  it("returns a reference object with the one key value pair when passed an array of one object", () => {
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
    const outputObject = {
      Peanuts: 1
    };
    expect(makeRefObj(articleObject)).to.deep.equal(outputObject);
  });

  it("returns a reference object with multiple key value pairs when passed an array of multiple objects", () => {
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
    const outputObject = {
      Peanuts: 1,
      Beano: 2
    };
    expect(makeRefObj(articleArrayOfObjects)).to.deep.equal(outputObject);
  });
});

describe.only("formatComments", () => {
  it("when given an empty array return a new empty array", () => {
    expect(formatComments([])).to.deep.equal([]);
  });

  it("returns an array of one object when passed one object with the created_by property renamed to author", () => {
    const inputArrayOfComments = [{ created_by: "Stan Lee" }];
    const outputArrayOfComments = [{ author: "Stan Lee" }];
    expect(formatComments(inputArrayOfComments)).to.deep.equal(
      outputArrayOfComments
    );
  });

  it("returns an array of one object when passed one object with the belongs_to property renamed to article_id", () => {
    const inputArrayOfComments = [
      { created_by: "Stan Lee", belongs_to: "Spiderman" }
    ];
    const outputArrayOfComments = [{ author: "Stan Lee", article_id: 1 }];
    const articleObject = [
      {
        article_id: 1,
        title: "Spiderman",
        topic: "Sci-Fi",
        body: "This is a comic strip about a boy with spider-like powers",
        votes: 987,
        author: "Stan Lee",
        created_at: 1509866562412
      }
    ];
    const refObj = makeRefObj(articleObject);
    expect(formatComments(inputArrayOfComments, refObj)).to.deep.equal(
      outputArrayOfComments
    );
  });

  it("returns an array of one object when passed one object with the created_at value converted to a javascript date object", () => {
    const inputArrayOfComments = [
      {
        created_by: "Stan Lee",
        belongs_to: "Spiderman",
        created_at: 1468087638924
      }
    ];
    const outputArrayOfComments = [{ author: "Stan Lee", article_id: 1 }];
    outputArrayOfComments[0].created_at = new Date(1468087638924);

    const articleObject = [
      {
        article_id: 1,
        title: "Spiderman",
        topic: "Sci-Fi",
        body: "This is a comic strip about a boy with spider-like powers",
        votes: 987,
        author: "Stan Lee",
        created_at: 1509866562412
      }
    ];

    const refObj = makeRefObj(articleObject);
    // const formattedComments = formatComments(inputArrayOfComments, refObj);
    // const formattedCommentsAndDate = formatDates(formattedComments);
    // expect(formattedCommentsAndDate).to.deep.equal(outputArrayOfComments);

    expect(formatComments(inputArrayOfComments, refObj)).to.deep.equal(
      outputArrayOfComments
    );
  });

  it("returns an array of one object when passed one object with the created_at value converted to a javascript date object and all other properties passed as is", () => {
    const inputArrayOfComments = [
      {
        body: "Spiderman is an orphan blah blah blah.....",
        votes: 45,
        created_by: "Stan Lee",
        belongs_to: "Spiderman",
        created_at: 1468087638924
      }
    ];
    const outputArrayOfComments = [
      {
        body: "Spiderman is an orphan blah blah blah.....",
        votes: 45,
        author: "Stan Lee",
        article_id: 1
      }
    ];
    outputArrayOfComments[0].created_at = new Date(1468087638924);

    const articleObject = [
      {
        article_id: 1,
        title: "Spiderman",
        topic: "Sci-Fi",
        body: "This is a comic strip about a boy with spider-like powers",
        votes: 987,
        author: "Stan Lee",
        created_at: 1509866562412
      }
    ];

    const refObj = makeRefObj(articleObject);
    expect(formatComments(inputArrayOfComments, refObj)).to.deep.equal(
      outputArrayOfComments
    );
  });

  it("returns an array of multiple objects when passed multiple objects with the created_at value converted to a javascript date object snd all other properties passed as is", () => {
    const inputArrayOfComments = [
      {
        body: "Spiderman is an orphan blah blah blah.....",
        votes: 45,
        created_by: "Stan Lee",
        belongs_to: "Spiderman",
        created_at: 1468087638924
      },
      {
        body: "Spiderman is one of a number of superheroes in the.....",
        votes: 22,
        created_by: "Bruce Wayne",
        belongs_to: "Spiderman",
        created_at: 1468087638234
      },
      {
        body: "The Incredible Hulk is very scary",
        votes: 540,
        created_by: "Dr Bruce Bannon",
        belongs_to: "The Incredible Hulk",
        created_at: 1468087638266
      }
    ];
    const outputArrayOfComments = [
      {
        body: "Spiderman is an orphan blah blah blah.....",
        votes: 45,
        author: "Stan Lee",
        article_id: 1
      },
      {
        body: "Spiderman is one of a number of superheroes in the.....",
        votes: 22,
        author: "Bruce Wayne",
        article_id: 1
      },
      {
        body: "The Incredible Hulk is very scary",
        votes: 540,
        author: "Dr Bruce Bannon",
        article_id: 2
      }
    ];

    outputArrayOfComments[0].created_at = new Date(1468087638924);
    outputArrayOfComments[1].created_at = new Date(1468087638234);
    outputArrayOfComments[2].created_at = new Date(1468087638266);

    const articleObject = [
      {
        article_id: 1,
        title: "Spiderman",
        topic: "Sci-Fi",
        body: "This is a comic strip about a boy with spider-like powers",
        votes: 987,
        author: "Stan Lee",
        created_at: 1509866562412
      },
      {
        article_id: 2,
        title: "The Incredible Hulk",
        topic: "Sci-Fi",
        body:
          "This is a comic strip about a man who is transformed into the Incredible Hulk whenever he gets angry",
        votes: 987,
        author: "Stan Lee",
        created_at: 1509866557230
      }
    ];

    const refObj = makeRefObj(articleObject);
    expect(formatComments(inputArrayOfComments, refObj)).to.deep.equal(
      outputArrayOfComments
    );
  });

  it("checks that the input array is unmutated", () => {
    const inputArrayOfComments = [
      {
        body: "Spiderman is an orphan blah blah blah.....",
        votes: 45,
        created_by: "Stan Lee",
        belongs_to: "Spiderman",
        created_at: 1468087638924
      },
      {
        body: "Spiderman is one of a number of superheroes in the.....",
        votes: 22,
        created_by: "Bruce Wayne",
        belongs_to: "Spiderman",
        created_at: 1468087638234
      },
      {
        body: "The Incredible Hulk is very scary",
        votes: 540,
        created_by: "Dr Bruce Bannon",
        belongs_to: "The Incredible Hulk",
        created_at: 1468087638266
      }
    ];
    const outputArrayOfComments = [
      {
        body: "Spiderman is an orphan blah blah blah.....",
        votes: 45,
        author: "Stan Lee",
        article_id: 1
      },
      {
        body: "Spiderman is one of a number of superheroes in the.....",
        votes: 22,
        author: "Bruce Wayne",
        article_id: 1
      },
      {
        body: "The Incredible Hulk is very scary",
        votes: 540,
        author: "Dr Bruce Bannon",
        article_id: 2
      }
    ];

    outputArrayOfComments[0].created_at = new Date(1468087638924);
    outputArrayOfComments[1].created_at = new Date(1468087638234);
    outputArrayOfComments[2].created_at = new Date(1468087638266);

    const articleObject = [
      {
        article_id: 1,
        title: "Spiderman",
        topic: "Sci-Fi",
        body: "This is a comic strip about a boy with spider-like powers",
        votes: 987,
        author: "Stan Lee",
        created_at: 1509866562412
      },
      {
        article_id: 2,
        title: "The Incredible Hulk",
        topic: "Sci-Fi",
        body:
          "This is a comic strip about a man who is transformed into the Incredible Hulk whenever he gets angry",
        votes: 987,
        author: "Stan Lee",
        created_at: 1509866557230
      }
    ];

    const refObj = makeRefObj(articleObject);

    const arrayCopy = [...inputArrayOfComments];
    formatComments(inputArrayOfComments, refObj);

    expect(inputArrayOfComments).to.deep.equal(arrayCopy);
  });

  it("checks comment object in array has a different reference to original comment object", () => {
    const inputArrayOfComments = [
      {
        body: "Spiderman is an orphan blah blah blah.....",
        votes: 45,
        created_by: "Stan Lee",
        belongs_to: "Spiderman",
        created_at: 1468087638924
      },
      {
        body: "Spiderman is one of a number of superheroes in the.....",
        votes: 22,
        created_by: "Bruce Wayne",
        belongs_to: "Spiderman",
        created_at: 1468087638234
      },
      {
        body: "The Incredible Hulk is very scary",
        votes: 540,
        created_by: "Dr Bruce Bannon",
        belongs_to: "The Incredible Hulk",
        created_at: 1468087638266
      }
    ];

    const copyArray = [...inputArrayOfComments];

    expect(formatDates(inputArrayOfComments)[0]).to.not.equal(
      inputArrayOfComments[0]
    );
  });

  it("checks that each object in the array passed in is unmutated", () => {
    const inputArrayOfComments = [
      {
        body: "Spiderman is an orphan blah blah blah.....",
        votes: 45,
        created_by: "Stan Lee",
        belongs_to: "Spiderman",
        created_at: 1468087638924
      },
      {
        body: "Spiderman is one of a number of superheroes in the.....",
        votes: 22,
        created_by: "Bruce Wayne",
        belongs_to: "Spiderman",
        created_at: 1468087638234
      },
      {
        body: "The Incredible Hulk is very scary",
        votes: 540,
        created_by: "Dr Bruce Bannon",
        belongs_to: "The Incredible Hulk",
        created_at: 1468087638266
      }
    ];

    const articleObject = [
      {
        article_id: 1,
        title: "Spiderman",
        topic: "Sci-Fi",
        body: "This is a comic strip about a boy with spider-like powers",
        votes: 987,
        author: "Stan Lee",
        created_at: 1509866562412
      },
      {
        article_id: 2,
        title: "The Incredible Hulk",
        topic: "Sci-Fi",
        body:
          "This is a comic strip about a man who is transformed into the Incredible Hulk whenever he gets angry",
        votes: 987,
        author: "Stan Lee",
        created_at: 1509866557230
      }
    ];

    const refObj = makeRefObj(articleObject);

    // this check the comment in the array was not affected by the function and still looks the same

    formatComments(inputArrayOfComments, refObj);
    expect(inputArrayOfComments[0]).to.eql({
      body: "Spiderman is an orphan blah blah blah.....",
      votes: 45,
      created_by: "Stan Lee",
      belongs_to: "Spiderman",
      created_at: 1468087638924
    });
  });
});
