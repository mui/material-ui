import Transitions from '../styles/transitions';
import React from 'react';
import PropTypes from '../utils/prop-types';
import StylePropable from '../mixins/style-propable';
import Paper from '../paper';
import muiThemeable from '../muiThemeable';

let PopoverAnimationFromTop = React.createClass({
  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    children: React.PropTypes.node,
    className: React.PropTypes.string,
    open: React.PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    targetOrigin: PropTypes.origin,
    zDepth: PropTypes.zDepth,
  },

  getInitialState() {
    return {
      open: false,
    };
  },

  getDefaultProps() {
    return {
      style: {},
      zDepth: 1,
    };
  },

  componentDidMount() {
    this.setState({open: true}); //eslint-disable-line react/no-did-mount-set-state
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
    });
  },

  getStyles() {
    let {targetOrigin} = this.props;
    let horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

    return {
      base: {
        opacity: 0,
        transform: 'scaleY(0)',
        transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
        position: 'fixed',
        zIndex: this.props._muiTheme.zIndex.popover,
        transition: Transitions.easeOut('450ms', ['transform', 'opacity']),
        maxHeight: '100%',
      },

    };
  },

  getOpenStyles() {
    return {
      base: {
        opacity: 1,
        transform: 'scaleY(1)',
      },
    };
  },

  render() {
    let {
      className,
      style,
      zDepth,
    } = this.props;

    let styles = this.getStyles();
    let openStyles = {};
    if (this.state.open)
      openStyles = this.getOpenStyles();

    return (
      <Paper
        style={this.mergeStyles(styles.base, style, openStyles.base)}
        zDepth={zDepth}
        className={className}>
          {this.props.children}
      </Paper>
    );
  },
});

PopoverAnimationFromTop = muiThemeable(PopoverAnimationFromTop);

export default PopoverAnimationFromTop;
