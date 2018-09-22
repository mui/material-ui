import React from 'react';
import { Consumer } from '../ToggleButtonGroup/context';
import isValueSelected from '../ToggleButtonGroup/isValueSelected';

export default function withContext(ToggleButton) {
  return ({ selectedProp, onChangeProp, ...other }) => {
    return (
      <Consumer>
        {ctx => {
          const selected = selectedProp === undefined
            ? isValueSelected(other.value, ctx.value)
            : selectedProp;

          const onChange = onChangeProp || ctx.onChange;

          return (
            <ToggleButton
              selected={selected}
              onChange={onChange}
              {...other}
            />
          );
          }
        }
      </Consumer>
    );
  };
}
