const { v4: uuidv4 } = require('uuid');
let Column = [];

function addColumn(title, order = 0) {
  Column.push({
    id: uuidv4(),
    title: title,
    order: order
  });
  return Column[Column.length-1];
}

module.exports.Column = Column;
