import * as PropTypes from 'prop-types';
import * as React from 'react';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

export interface CustomMaskedInputProps extends MaskedInputProps {
  mask?: any;
  inputRef: React.Ref<any>;
}

export default class Input extends React.PureComponent<CustomMaskedInputProps> {
  public static propTypes: any = {
    mask: PropTypes.any,
    inputRef: PropTypes.func.isRequired,
  };

  public static defaultProps = {
    mask: undefined,
  };

  public render() {
    const { inputRef, ...rest } = this.props;
    return this.props.mask ? (
      <MaskedInput {...rest} ref={inputRef} />
    ) : (
      <input {...rest} ref={inputRef} />
    );
  }
}
