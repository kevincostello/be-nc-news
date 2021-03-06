const formatDates = list => {
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

const makeRefObj = list => {
  if (list.length === 0) {
    return {};
  } else {
    const refObj = {}; // create empty reference object

    // loop through array of input objects
    list.forEach(article => {
      const refObjKey = article.title; // set the key of the reference object to be the article title
      const refObjValue = article.article_id; // set the value of the reference object to be the article id
      refObj[refObjKey] = refObjValue; // set the reference key to be the reference value created above
    });
    // console.log("This is the reference object:", refObj);
    return refObj; // return the reference object
  }
};

const formatComments = (comments, articleRef) => {
  if (comments.length === 0) {
    return [];
  } else {
    // const refObj = {};
    const outArrayOfComments = comments.map(comment => {
      const newComment = { ...comment };
      // Its created_by property renamed to an author key
      newComment.author = newComment.created_by;

      if (articleRef) {
        // Its belongs_to property renamed to an article_id key
        // The value of the new article_id key must be the id corresponding to the original title value provided
        newComment.article_id = articleRef[newComment.belongs_to];
        delete newComment.belongs_to;
      }

      delete newComment.created_by;
      if (newComment.hasOwnProperty("created_at")) {
        newComment.created_at = new Date(newComment.created_at);
      }

      return newComment;
    });

    // Its created_at value converted into a javascript date object
    return outArrayOfComments;
  }

  // The rest of the comment's properties must be maintained
};

module.exports = { formatDates, makeRefObj, formatComments };
