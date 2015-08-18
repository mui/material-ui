let React = require('react');
let Extend = require('../utils/extend');
let OpenIcon = require('../svg-icons/hardware/keyboard-arrow-up');
let CloseIcon = require('../svg-icons/hardware/keyboard-arrow-down');
let IconButton = require('../icon-button');
let StylePropable = require('../mixins/style-propable');


let CardExpandable = React.createClass({
  mixins: [StylePropable],

  getStyles() {
    const contextProps = this.getContextProps();

    const directionStyle = contextProps.isRtl ? {
      left: 4,
    } : {
      right: 4,
    };

    return {
      root: Extend({
        top: 0,
        bottom: 0,
        margin: 'auto',
        position: 'absolute',
      }, directionStyle),
    };
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    onExpanding: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.bool,
  },

  getContextProps() {
    const theme = this.context.muiTheme;

    return {
      isRtl: theme.isRtl,
    };
  },

  _onExpanding() {
    if (this.props.expanded === true)
      this.props.onExpanding(false);
    else
      this.props.onExpanding(true);
  },

  render() {
    let styles = this.getStyles();

    let expandable;
    if (this.props.expanded === true)
      expandable = <OpenIcon/>;
    else
      expandable = <CloseIcon/>;

    let mergedStyles = this.mergeAndPrefix(styles.root, this.props.style);

    let expandableBtn = (
      <IconButton
        style={mergedStyles}
        onClick={this._onExpanding}>
        {expandable}
      </IconButton>
    );


    return expandableBtn;
  },
});

module.exports = CardExpandable;
