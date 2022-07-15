import * as React from 'react';
import { RadioProps } from '../Radio/RadioProps';

const RadioGroupContext = React.createContext<
  Pick<RadioProps, 'color' | 'size' | 'variant' | 'disableIcon' | 'overlay'> & {
    row?: boolean;
    name?: string;
    value?: unknown;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }
>({
  row: undefined,
  variant: undefined,
  size: undefined,
  color: undefined,
  name: undefined,
  value: undefined,
  onChange: undefined,
  disableIcon: undefined,
  overlay: undefined,
});

if (process.env.NODE_ENV !== 'production') {
  RadioGroupContext.displayName = 'RadioGroupContext';
}

export default RadioGroupContext;
