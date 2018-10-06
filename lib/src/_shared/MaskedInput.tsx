import * as React from 'react';
import * as PropTypes from 'prop-types';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

export interface CustomMaskedInputProps extends React.InputHTMLAttributes<MaskedInputProps> {
  mask?: any;
  inputRef: React.Ref<any>;
}

export default class Input extends React.PureComponent<CustomMaskedInputProps> {
  static propTypes = {
    mask: PropTypes.any,
    inputRef: PropTypes.func.isRequired,
  }

  static defaultProps = {
    mask: undefined,
  }

  render() {
    const { inputRef, ...rest } = this.props;
    return (
      this.props.mask
        ? <MaskedInput {...rest} ref={inputRef} />
        : <input {...rest} ref={inputRef} />
    );
  }
}
