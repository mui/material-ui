const AutoPrefix = require('../styles/auto-prefix');
const ImmutabilityHelper = require('../utils/immutability-helper');

module.exports = {

  mergeAndPrefix() {
    let mergedStyles = ImmutabilityHelper.merge.apply(this, arguments);
    return AutoPrefix.all(mergedStyles);
  },

};
