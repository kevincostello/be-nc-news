exports.formatDates = list => {
  if (list.length === 0) {
    return [];
  } else {
    const listOut = list.map(article => {
      // loop through each article in the array
      const newArticle = { ...article };
      const listDate = new Date(newArticle.created_at); // format unix date to be a Javascript date object
      newArticle.created_at = listDate; // replace created_at property with new Javascript date object
      return newArticle; // return the updated object
    });
    return listOut; // return the updated array
  }
};

exports.makeRefObj = list => {
  if (list.length === 0) {
    return {};
  } else {
    const refObj = {}; // create empty reference object

    // loop through array of input objects
    const newList = list.forEach(article => {
      console.log("This is the article", article);
      const refObjKey = article.title; // set the key of the reference object to be the article title
      const refObjValue = article.article_id; // set the value of the reference object to be the article id
      refObj[refObjKey] = refObjValue; // set the reference key to be the reference value created above
    });
    // console.log("This is the reference object:", refObj);
    return refObj; // return the reference object
  }
};

exports.formatComments = (comments, articleRef) => {
  if (comments.length === 0) {
    return [];
  } else {
    // Its created_by property renamed to an author key
    comments[0].author = comments[0].created_by;

    if (articleRef) {
      // Its belongs_to property renamed to an article_id key
      // The value of the new article_id key must be the id corresponding to the original title value provided
      comments[0].article_id = articleRef[comments[0].belongs_to];
      delete comments[0].belongs_to;
    }
    delete comments[0].created_by;
    return comments;
  }

  // Its created_at value converted into a javascript date object
  // The rest of the comment's properties must be maintained
};
