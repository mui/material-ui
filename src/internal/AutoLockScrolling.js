import {Component, PropTypes} from 'react';

let originalBodyOverflow = null;
let lockingCounter = 0;

class AutoLockScrolling extends Component {
  static propTypes = {
    lock: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    if (this.props.lock === true) {
      this.preventScrolling();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lock !== nextProps.lock) {
      if (nextProps.lock) {
        this.preventScrolling();
      } else {
        this.allowScrolling();
      }
    }
  }

  componentWillUnmount() {
    this.allowScrolling();
  }

  // force to only lock/unlock once
  locked = false;

  preventScrolling() {
    if (this.locked === true) {
      return;
    }

    lockingCounter = lockingCounter + 1;
    this.locked = true;

    // only lock the first time the component is mounted.
    if (lockingCounter === 1) {
      const body = document.getElementsByTagName('body')[0];
      originalBodyOverflow = body.style.overflow;
      body.style.overflow = 'hidden';
    }
  }

  allowScrolling() {
    if (this.locked === true) {
      lockingCounter = lockingCounter - 1;
      this.locked = false;
    }

    if (lockingCounter === 0 && originalBodyOverflow !== null) {
      const body = document.getElementsByTagName('body')[0];
      body.style.overflow = originalBodyOverflow || '';
      originalBodyOverflow = null;
    }
  }

  render() {
    return null;
  }
}

export default AutoLockScrolling;
