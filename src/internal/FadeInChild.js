import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';

class FadeInChild extends Component {
  static propTypes = {
    children: PropTypes.node,
    direction: PropTypes.string,
    enterDelay: PropTypes.number,
    leaveDelay: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    enterDelay: 0,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  componentDidAppear() {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    autoPrefix.set(style, 'transition', 'opacity 0.5s ease-in');
  }

  componentWillEnter(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = '0';
    autoPrefix.set(style, 'transition', 'opacity 0.5s ease-in');
    setTimeout(callback, this.props.enterDelay);
  }

  componentDidEnter() {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    autoPrefix.set(style, 'transition', 'opacity 0.5s ease-in');
  }

  componentWillLeave(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = '0';
    autoPrefix.set(style, 'transition', 'opacity 0.5s ease-in');
    setTimeout(callback, this.props.leaveDelay);
  }


  render() {
    const {
      children,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedRootStyles = Object.assign({}, {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: transitions.easeOut(null, ['opacity']),
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedRootStyles)}>
        {children}
      </div>
    );
  }
}

export default FadeInChild;
