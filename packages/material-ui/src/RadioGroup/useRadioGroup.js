import * as React from 'react';
import RadioGroupContext from './RadioGroupContext';

export default function useRadioGroup() {
  return React.useContext(RadioGroupContext);
}
