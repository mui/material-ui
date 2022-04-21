import * as React from 'react';
import { RadioProps } from '../Radio/RadioProps';

const RadioGroupContext = React.createContext<
  Pick<RadioProps, 'palette' | 'size' | 'variant' | 'disableIcon' | 'overlay'> & {
    name?: string;
    value?: unknown;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }
>({
  variant: undefined,
  size: undefined,
  palette: undefined,
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
