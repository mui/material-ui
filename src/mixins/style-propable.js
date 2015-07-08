let React = require('react/addons');
let AutoPrefix = require('../styles/auto-prefix');
let Extend = require('../utils/extend');


/**
 *	@params:
 *	styles = Current styles.
 *  props = New style properties that will override the current style.
 */
module.exports = {

  propTypes: {
    style: React.PropTypes.object,
  },

  mergeStyles() {
    let args = Array.prototype.slice.call(arguments, 0);
    let base = args[0];
    for (let i = 1; i < args.length; i++) {
      if (args[i]) {
        base = Extend(base, args[i]);
      }
    }

    return base;
  },

  /**
   * loops through all properties defined in the first argument, so overrides
   * of undefined properties will not take place.
   */
  mergeAndPrefix() {
    let mergedStyles = this.mergeStyles.apply(this, arguments);
    return AutoPrefix.all(mergedStyles);
  },
};
