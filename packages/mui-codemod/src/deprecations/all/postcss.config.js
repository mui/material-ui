const {
  plugin: accordionSummaryClassesPlugin,
} = require('../accordion-summary-classes/postcss-plugin');
const {
  plugin: paginationItemClassesPlugin,
} = require('../pagination-item-classes/postcss-plugin');
const { plugin: alertClassesPlugin } = require('../alert-classes/postcss-plugin');

module.exports = {
  plugins: [accordionSummaryClassesPlugin, paginationItemClassesPlugin, alertClassesPlugin],
};
