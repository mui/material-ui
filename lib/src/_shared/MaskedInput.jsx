import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

export default class Input extends PureComponent {
  static propTypes = {
    mask: PropTypes.any,
    value: PropTypes.string,
    inputRef: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: undefined,
    mask: undefined,
  }

  getMask = () => {
    if (this.props.value) {
      return this.props.mask;
    }

    return [];
  }

  render() {
    const { inputRef, mask, ...props } = this.props;
    return (
      mask
        ? <MaskedInput mask={this.getMask()} {...props} ref={inputRef} />
        : <input {...props} ref={inputRef} />
    );
  }
}

