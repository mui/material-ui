const { findPages } = require('./find');

const pages = findPages({
  front: true,
});

module.exports = pages;
