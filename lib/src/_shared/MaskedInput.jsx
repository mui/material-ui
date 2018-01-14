import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

export default class Input extends PureComponent {
  static propTypes = {
    mask: PropTypes.any,
  }

  static defaultProps = {
    mask: undefined,
  }

  render() {
    return (
      this.props.mask
        ? <MaskedInput {...this.props} />
        : <input {...this.props} />
    );
  }
}

