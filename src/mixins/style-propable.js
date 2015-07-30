const React = require('react/addons');
const update = React.addons.update;
const AutoPrefix = require('../styles/auto-prefix');


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

    const args = Array.prototype.slice.call(arguments, 0);
    let base = args[0];

    for (let i = 1; i < args.length; i++) {
      if (args[i]) {
        base = update(base, {$merge: args[i]});
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
