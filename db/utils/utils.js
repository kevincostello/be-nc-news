exports.formatDates = list => {
  if (list.length === 0) return [];
  else {
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

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
