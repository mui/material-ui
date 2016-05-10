import React, {Component, PropTypes} from 'react';
import OpenIcon from '../svg-icons/hardware/keyboard-arrow-up';
import CloseIcon from '../svg-icons/hardware/keyboard-arrow-down';
import IconButton from '../IconButton';

function getStyles(props, context) {
  const {card} = context.muiTheme;
  
  return {
    root: {
      top: 0,
      bottom: 0,
      right: 4,
      margin: 'auto',
      position: 'absolute'
    },
    icon: {
      color: props.iconColor || card.titleColor
    }
  };
}

class CardExpandable extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpanding: PropTypes.func.isRequired,
    style: PropTypes.object,
    iconColor: PropTypes.bool
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const styles = getStyles(this.props, this.context);
    var iconStyles = Object.assign({}, styles.icon, this.props.iconStyle);
    return (
      <IconButton
        style={Object.assign(styles.root, this.props.style)}
        onTouchTap={this.props.onExpanding}
        iconStyle={{color:'red'}}
      >
        {this.props.expanded ? <OpenIcon color={iconStyles.color}  /> : <CloseIcon color={iconStyles.color} />}
      </IconButton>
    );
  }
}

export default CardExpandable;
