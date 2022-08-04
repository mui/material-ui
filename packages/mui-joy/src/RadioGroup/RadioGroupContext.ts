import * as React from 'react';
import { RadioProps } from '../Radio/RadioProps';

const RadioGroupContext = React.createContext<
  Pick<RadioProps, 'size' | 'disableIcon' | 'overlay'> & {
    orientation?: 'vertical' | 'horizontal';
    name?: string;
    value?: unknown;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }
>({
  orientation: undefined,
  size: undefined,
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
