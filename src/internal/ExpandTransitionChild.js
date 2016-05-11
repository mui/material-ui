import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import transitions from '../styles/transitions';

class ExpandTransitionChild extends Component {
  static propTypes = {
    children: PropTypes.node,
    enterDelay: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    enterDelay: 0,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    this.open();
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  componentWillAppear(callback) {
    this.open();
    callback();
  }

  componentWillEnter(callback) {
    const {enterDelay} = this.props;
    const {style} = ReactDOM.findDOMNode(this);
    style.height = 0;

    if (enterDelay) {
      this.enterTimer = setTimeout(() => callback(), 450);
      return;
    }

    callback();
  }

  componentDidEnter() {
    this.open();
  }

  componentWillLeave(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.height = this.refs.wrapper.clientHeight;
    style.height = 0;
    this.leaveTimer = setTimeout(() => callback(), 450);
  }

  open() {
    const style = ReactDOM.findDOMNode(this).style;
    style.height = `${this.refs.wrapper.clientHeight}px`;
  }

  render() {
    const {
      children,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedRootStyles = Object.assign({
      position: 'relative',
      height: 0,
      width: '100%',
      top: 0,
      left: 0,
      overflow: 'hidden',
      transition: transitions.easeOut(null, ['height', 'opacity']),
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedRootStyles)}>
        <div ref="wrapper">{children}</div>
      </div>
    );
  }
}

export default ExpandTransitionChild;
