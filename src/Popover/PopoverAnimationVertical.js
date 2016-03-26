import React from 'react';
import Paper from '../Paper';
import transitions from '../styles/transitions';
import propTypes from '../utils/propTypes';

function getStyles(props, context, state) {
  const {targetOrigin} = props;
  const {open} = state;
  const {muiTheme} = context;
  const horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

  return {
    root: {
      opacity: open ? 1 : 0,
      transform: open ? 'scaleY(1)' : 'scaleY(0)',
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      position: 'fixed',
      zIndex: muiTheme.zIndex.popover,
      transition: transitions.easeOut('450ms', ['transform', 'opacity']),
      maxHeight: '100%',
    },
  };
}

const PopoverAnimationVertical = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    open: React.PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    targetOrigin: propTypes.origin,
    zDepth: propTypes.zDepth,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      style: {},
      zDepth: 1,
    };
  },

  getInitialState() {
    return {
      open: false,
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

  render() {
    const {
      className,
      style,
      zDepth,
    } = this.props;

    const styles = getStyles(this.props, this.context, this.state);

    return (
      <Paper
        style={Object.assign(styles.root, style)}
        zDepth={zDepth}
        className={className}
      >
          {this.props.children}
      </Paper>
    );
  },
});

export default PopoverAnimationVertical;
