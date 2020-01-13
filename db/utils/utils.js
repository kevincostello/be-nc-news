exports.formatDates = list => {
  if (list.length === 0) return [];
  else {
    // console.log("list:", list[0]);
    const listNew = [];
    const listDate = new Date(list[0].created_at); // parse values into a javascript Date object

    const newObj = { created_at: listDate };
    delete list[0].created_at;
    listNew.push(newObj); // push ISO date onto new array
    // listNew.push(...list[0], newObj.created_at);
    const spreadNew = [...list];
    spreadNew[0].created_at = newObj.created_at;
    console.log("This is spreadNew", spreadNew);
    return spreadNew;
  }
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
