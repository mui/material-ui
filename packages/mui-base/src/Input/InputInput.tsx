import * as React from 'react';
import { InputContext } from './InputContext';
import { useInput } from '../useInput';
import { InputOwnerState } from './Input.types';

type InputInputRenderFunction = (
  props: React.ComponentPropsWithRef<'input'>,
  ownerState: InputOwnerState,
) => React.ReactNode;

export interface InputInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  render?: InputInputRenderFunction;
}

function defaultRender(props: React.ComponentPropsWithRef<'input'>) {
  return <input {...props} />;
}

/**
 * @ignore - do not document.
 */
const InputInput = React.forwardRef(function InputInput(
  props: InputInputProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const { render = defaultRender, ...other } = props;

  const context = React.useContext(InputContext);
  if (!context) {
    throw new Error('InputInput must be used within an Input');
  }

  const { getProps, inputRef: ref } = useInput({ ...context, inputRef: forwardedRef });

  const inputProps = {
    ...getProps(other),
    ref,
  };

  return render(inputProps, context.ownerState);
});

export { InputInput };
