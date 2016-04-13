import React from 'react';
import transitions from '../styles/transitions';

function getStyles(props, context) {
  const {inkBar} = context.muiTheme;

  return {
    root: {
      left: props.left,
      width: props.width,
      bottom: 0,
      display: 'block',
      backgroundColor: props.color || inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: transitions.easeOut('1s', 'left'),
    },
  };
}

class InkBar extends React.Component {
  static propTypes = {
    color: React.PropTypes.string,
    left: React.PropTypes.string.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    width: React.PropTypes.string.isRequired,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  render() {
    const {style} = this.props;
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))} />
    );
  }
}

export default InkBar;
