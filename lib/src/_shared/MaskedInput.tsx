import * as PropTypes from 'prop-types';
import * as React from 'react';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

export interface CustomMaskedInputProps extends MaskedInputProps {
  mask?: MaskedInputProps['mask'];
  inputRef: React.Ref<any>;
}

export default class Input extends React.PureComponent<CustomMaskedInputProps> {
  public static propTypes: any = {
    mask: PropTypes.any,
    inputRef: PropTypes.func.isRequired,
  };

  public createInputRef = (ref: MaskedInput | null) => {
    const { inputRef } = this.props;

    if (inputRef && typeof inputRef === 'function') {
      // @ts-ignore inputElement exists in Masked input. Issue in typings
      inputRef(ref ? ref.inputElement : null);
    }
  };

  public render() {
    const { inputRef, keepCharPositions, ...rest } = this.props;

    return this.props.mask ? (
      <MaskedInput {...rest} ref={this.createInputRef} keepCharPositions={keepCharPositions} />
    ) : (
      <input {...rest} ref={inputRef} />
    );
  }
}
