const {
  plugin: accordionSummaryClassesPlugin,
} = require('../accordion-summary-classes/postcss-plugin');
const { plugin: alertClassesPlugin } = require('../alert-classes/postcss-plugin');
const { plugin: buttonClassesPlugin } = require('../button-classes/postcss-plugin');
const { plugin: buttonGroupClassesPlugin } = require('../button-group-classes/postcss-plugin');
const { plugin: chipClassesPlugin } = require('../chip-classes/postcss-plugin');
const {
  plugin: paginationItemClassesPlugin,
} = require('../pagination-item-classes/postcss-plugin');
const { plugin: stepConnectorClassesPlugin } = require('../step-connector-classes/postcss-plugin');
const {
  plugin: toggleButtonGroupClassesPlugin,
} = require('../toggle-button-group-classes/postcss-plugin');

module.exports = {
  plugins: [
    accordionSummaryClassesPlugin,
    alertClassesPlugin,
    buttonClassesPlugin,
    buttonGroupClassesPlugin,
    chipClassesPlugin,
    paginationItemClassesPlugin,
    stepConnectorClassesPlugin,
    toggleButtonGroupClassesPlugin,
  ],
};
