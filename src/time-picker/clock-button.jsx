import React from 'react';
import StylePropable from '../mixins/style-propable';
import EnhancedButton from '../enhanced-button';
import Transitions from '../styles/transitions';
import muiThemeable from '../muiThemeable';

let ClockButton = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    onTouchTap: React.PropTypes.func,
    position: React.PropTypes.oneOf(['left', 'right']),
    selected: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      position: 'left',
    };
  },

  _handleTouchTap() {
    this.setState({
      selected: true,
    });
    this.props.onTouchTap();
  },

  getTheme() {
    return this.props._muiTheme.timePicker;
  },

  render() {
    let {
      className,
      ...other,
    } = this.props;

    let styles = {
      root: {
        position: 'absolute',
        bottom: 65,
        pointerEvents: 'auto',
        height: 50,
        width: 50,
        borderRadius: '100%',
      },

      label: {
        position: 'absolute',
        top: 17,
        left: 14,
      },

      select: {
        position: 'absolute',
        height: 50,
        width: 50,
        top: 0,
        left: 0,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transitions.easeOut(),
        backgroundColor: this.getTheme().accentColor,
      },
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if (this.props.position === 'right') {
      styles.root.right = 5;
    } else {
      styles.root.left = 5;
    }

    return (
      <EnhancedButton
        {...other}
        style={this.mergeStyles(styles.root)}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onTouchTap={this._handleTouchTap}>
        <span style={this.prepareStyles(styles.select)} />
        <span style={this.prepareStyles(styles.label)}>
          {this.props.children}
        </span>
      </EnhancedButton>
    );
  },
});

ClockButton = muiThemeable(ClockButton);

export default ClockButton;
