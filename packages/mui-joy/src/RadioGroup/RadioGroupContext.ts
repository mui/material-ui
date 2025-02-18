import * as React from 'react';
import { RadioProps } from '../Radio/RadioProps';

const RadioGroupContext = React.createContext<
  | undefined
  | (Pick<RadioProps, 'size' | 'disableIcon' | 'overlay'> & {
      orientation?: 'horizontal' | 'vertical';
      name?: string;
      value?: unknown;
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
    })
>(undefined);

if (process.env.NODE_ENV !== 'production') {
  RadioGroupContext.displayName = 'RadioGroupContext';
}

export default RadioGroupContext;
