import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import transitions from '../styles/transitions';

class ExpandTransitionChild extends Component {
  static propTypes = {
    children: PropTypes.node,
    enterDelay: PropTypes.number,
    style: PropTypes.object,
    transitionDelay: PropTypes.number,
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    enterDelay: 0,
    transitionDelay: 0,
    transitionDuration: 450,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    this.open();
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.enteredTimer);
    clearTimeout(this.leaveTimer);
  }

  componentWillAppear(callback) {
    this.open();
    callback();
  }

  componentDidAppear() {
    this.setAutoHeight();
  }

  componentWillEnter(callback) {
    const {enterDelay, transitionDelay, transitionDuration} = this.props;
    const {style} = ReactDOM.findDOMNode(this);
    style.height = 0;
    this.enterTimer = setTimeout(() => this.open(), enterDelay);
    this.enteredTimer = setTimeout(() => callback(), enterDelay + transitionDelay + transitionDuration);
  }

  componentDidEnter() {
    this.setAutoHeight();
  }

  componentWillLeave(callback) {
    const {transitionDelay, transitionDuration} = this.props;
    const {style} = ReactDOM.findDOMNode(this);
    // Set fixed height first for animated property value
    style.height = `${this.refs.wrapper.clientHeight}px`;
    style.height = 0;
    this.leaveTimer = setTimeout(() => callback(), transitionDelay + transitionDuration);
  }

  setAutoHeight() {
    const {style} = ReactDOM.findDOMNode(this);
    style.height = 'auto';
  }

  open() {
    const {style} = ReactDOM.findDOMNode(this);
    style.height = `${this.refs.wrapper.clientHeight}px`;
  }

  render() {
    const {
      children,
      style,
      transitionDelay, // eslint-disable-line no-unused-vars
      transitionDuration,
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
      transition: transitions.easeOut(
        `${transitionDuration}ms`,
        ['height'],
        `${transitionDelay}ms`,
      ),
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedRootStyles)}>
        <div ref="wrapper">{children}</div>
      </div>
    );
  }
}

export default ExpandTransitionChild;
