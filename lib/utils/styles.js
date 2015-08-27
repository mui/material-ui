'use strict';

var AutoPrefix = require('../styles/auto-prefix');
var ImmutabilityHelper = require('../utils/immutability-helper');

module.exports = {

  mergeAndPrefix: function mergeAndPrefix() {
    var mergedStyles = ImmutabilityHelper.merge.apply(this, arguments);
    return AutoPrefix.all(mergedStyles);
  }

};