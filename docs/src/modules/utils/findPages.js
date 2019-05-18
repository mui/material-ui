const find = require('./find');

const pages = find.findPages({
  front: true,
});

module.exports = pages;
