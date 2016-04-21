import React, {Component, PropTypes} from 'react';
import OpenIcon from '../svg-icons/hardware/keyboard-arrow-up';
import CloseIcon from '../svg-icons/hardware/keyboard-arrow-down';
import IconButton from '../IconButton';

function getStyles() {
  return {
    root: {
      top: 0,
      bottom: 0,
      right: 4,
      margin: 'auto',
      position: 'absolute',
    },
  };
}

class CardExpandable extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpanding: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const styles = getStyles(this.props, this.context);

    return (
      <IconButton
        style={Object.assign(styles.root, this.props.style)}
        onTouchTap={this.props.onExpanding}
      >
        {this.props.expanded ? <OpenIcon /> : <CloseIcon />}
      </IconButton>
    );
  }
}

export default CardExpandable;
