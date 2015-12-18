import React from 'react';
import styleUtils from '../utils/styles';

const DialogTransitionItem = React.createClass({
  propTypes: {
    _muiTheme: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  },

  getInitialState() {
    return {
      style: {},
    };
  },

  componentWillEnter(callback) {
    this.componentWillAppear(callback);
  },

  componentWillAppear(callback) {
    const spacing = this.props._muiTheme.baseTheme.spacing;

    this.setState({
      style: {
        opacity: 1,
        transform: 'translate3d(0, ' + spacing.desktopKeylineIncrement + 'px, 0)',
      },
    });

    setTimeout(callback, 450); // matches transition duration
  },

  componentWillLeave(callback) {
    this.setState({
      style: {
        opacity: 0,
        transform: 'translate3d(0, 0, 0)',
      },
    });

    setTimeout(() => { // TODO: remove isMounted with cancellation
      if (this.isMounted()) callback();
    }, 450); // matches transition duration
  },

  render() {
    const {
      _muiTheme,
      children,
      style,
      ...other,
    } = this.props;

    return (
      <div {...other} style={styleUtils.prepareStyles(_muiTheme, this.state.style, style)}>
        {children}
      </div>
    );
  },
});

export default DialogTransitionItem;
