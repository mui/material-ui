import React from 'react';
import Transitions from './styles/transitions';
import StylePropable from './mixins/style-propable';
import muiThemeable from './muiThemeable';

let InkBar = React.createClass({

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    color: React.PropTypes.string,
    left: React.PropTypes.string.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    width: React.PropTypes.string.isRequired,
  },

  mixins: [StylePropable],

  render() {
    let {
      _muiTheme,
      color,
      left,
      width,
      style,
      ...other,
    } = this.props;

    let colorStyle = color ? {backgroundColor: color} : undefined;
    let styles = this.prepareStyles({
      left: left,
      width: width,
      bottom: 0,
      display: 'block',
      backgroundColor: _muiTheme.inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left'),
    }, this.props.style, colorStyle);

    return (
      <div style={styles}>
        &nbsp;
      </div>
    );
  },

});

InkBar = muiThemeable(InkBar);

export default InkBar;
