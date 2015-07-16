let React = require('react');
let OpenIcon = require('../svg-icons/hardware/keyboard-arrow-up');
let CloseIcon = require('../svg-icons/hardware/keyboard-arrow-down');
let IconButton = require('../icon-button');

let CardExpandable = React.createClass({
  getStyles() {
    return {
      root: {
        right: 4,
        top: 0,
        bottom: 0,
        margin: 'auto',
        position: 'absolute',
      },
    };
  },

  propTypes: {
    onExpanding: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.bool,
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

    let expandableBtn = (
      <IconButton
        style={styles.root}
        onClick={this._onExpanding}>
        {expandable}
      </IconButton>
    );


    return expandableBtn;
  },
});

module.exports = CardExpandable;
