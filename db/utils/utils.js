exports.formatDates = list => {
  if (list.length === 0) {
    return [];
  } else {
    const listOut = list.map(article => {
      // console.log("The article is:", article);
      // loop through each article in the array
      const newArticle = { ...article };
      const listDate = new Date(newArticle.created_at); // format unix date to be a Javascript date object
      newArticle.created_at = listDate; // replace created_at property with new Javascript date object
      // console.log("the new articles is:", newArticle);
      return newArticle; // return the updated object
    });
    // console.log("This is the output array:", listOut);
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

exports.formatComments = (comments, articleRef) => {};
