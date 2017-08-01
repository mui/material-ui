import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
    iconStyle: PropTypes.object,
    onExpanding: PropTypes.func.isRequired,
    openIcon: PropTypes.node,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static defaultProps = {
    closeIcon: <CloseIcon />,
    openIcon: <OpenIcon />,
  };

  render() {
    const styles = getStyles(this.props, this.context);

    return (
      <IconButton
        style={Object.assign(styles.root, this.props.style)}
        onClick={this.props.onExpanding}
        iconStyle={this.props.iconStyle}
      >
        {this.props.expanded ? this.props.openIcon : this.props.closeIcon}
      </IconButton>
    );
  }
}

export default CardExpandable;
