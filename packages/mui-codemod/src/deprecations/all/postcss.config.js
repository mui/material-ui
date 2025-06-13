const {
  plugin: accordionSummaryClassesPlugin,
} = require('../accordion-summary-classes/postcss-plugin');
const { plugin: alertClassesPlugin } = require('../alert-classes/postcss-plugin');
const { plugin: buttonClassesPlugin } = require('../button-classes/postcss-plugin');
const { plugin: buttonGroupClassesPlugin } = require('../button-group-classes/postcss-plugin');
const { plugin: chipClassesPlugin } = require('../chip-classes/postcss-plugin');
const { plugin: drawerClassesPlugin } = require('../drawer-classes/postcss-plugin');
const {
  plugin: paginationItemClassesPlugin,
} = require('../pagination-item-classes/postcss-plugin');
const { plugin: stepConnectorClassesPlugin } = require('../step-connector-classes/postcss-plugin');
const {
  plugin: toggleButtonGroupClassesPlugin,
} = require('../toggle-button-group-classes/postcss-plugin');
const {
  plugin: circularProgressClassesPlugin,
} = require('../circular-progress-classes/postcss-plugin');
const { plugin: inputBaseClassesPlugin } = require('../input-base-classes/postcss-plugin');
const {
  plugin: linearProgressClassesPlugin,
} = require('../linear-progress-classes/postcss-plugin');
const { plugin: tabClassesPlugin } = require('../tab-classes/postcss-plugin');
const {
  plugin: tableSortLabelClassesPlugin,
} = require('../table-sort-label-classes/postcss-plugin');
const { plugin: selectClassesPlugin } = require('../select-classes/postcss-plugin');
const { plugin: sliderClassesPlugin } = require('../slider-classes/postcss-plugin');

module.exports = {
  plugins: [
    accordionSummaryClassesPlugin,
    alertClassesPlugin,
    buttonClassesPlugin,
    buttonGroupClassesPlugin,
    chipClassesPlugin,
    circularProgressClassesPlugin,
    inputBaseClassesPlugin,
    linearProgressClassesPlugin,
    drawerClassesPlugin,
    paginationItemClassesPlugin,
    stepConnectorClassesPlugin,
    toggleButtonGroupClassesPlugin,
    tabClassesPlugin,
    tableSortLabelClassesPlugin,
    selectClassesPlugin,
    sliderClassesPlugin,
  ],
};
