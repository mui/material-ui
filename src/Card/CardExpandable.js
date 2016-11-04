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
    closeIcon: PropTypes.node,
    expanded: PropTypes.bool,
    onExpanding: PropTypes.func.isRequired,
    openIcon: PropTypes.node,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getCorrectIcon(isExpanded, propIconOpen, propIconClose) {
    if (isExpanded) {
      if (propIconOpen) return propIconOpen;
      return <OpenIcon />;
    } else {
      if (propIconClose) return propIconClose;
      return <CloseIcon />;
    }
  }

  render() {
    const styles = getStyles(this.props, this.context);

    return (
      <IconButton
        style={Object.assign(styles.root, this.props.style)}
        onTouchTap={this.props.onExpanding}
      >
        {this.getCorrectIcon(this.props.expanded, this.props.openIcon, this.props.closeIcon)}
      </IconButton>
    );
  }
}

export default CardExpandable;
