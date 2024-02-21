const {
  plugin: accordionSummaryClassesPlugin,
} = require('../accordion-summary-classes/postcss-plugin');
const {
  plugin: paginationItemClassesPlugin,
} = require('../pagination-item-classes/postcss-plugin');

module.exports = {
  plugins: [accordionSummaryClassesPlugin, paginationItemClassesPlugin],
};
