import Slider, { defaultValueReducer, ValueReducer } from '@material-ui/lab/Slider';
import * as React from 'react';

{
  // round to 1 digit instead of 3
  const valueReducer: ValueReducer = (rawValue, props, event) => {
    const { disabled, step } = props;
    if (!disabled && !step) {
      return +rawValue.toFixed(1);
    }
    return defaultValueReducer(rawValue, props, event);
  };

  <Slider value={5} valueReducer={valueReducer} />;
}
