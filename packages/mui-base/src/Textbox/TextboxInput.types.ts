import { TextboxOwnerState } from './Textbox.types';

type TextboxInputRenderFunction = (
  props: React.ComponentPropsWithRef<'input'>,
  ownerState: TextboxOwnerState,
) => React.ReactNode;

export interface TextboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  render?: TextboxInputRenderFunction;
}
