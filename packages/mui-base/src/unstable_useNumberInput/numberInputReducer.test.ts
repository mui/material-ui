import { expect } from 'chai';
import { NumberInputState, NumberInputReducerAction } from './useNumberInput.types';
import { NumberInputActionTypes } from './numberInputAction.types';
import { numberInputReducer } from './numberInputReducer';
import { getInputValueAsString as defaultGetInputValueAsString } from './useNumberInput';

describe('numberInputReducer', () => {
  describe('action: blur', () => {
    it('snaps the inputValue based on min, max, and step', () => {
      const state: NumberInputState = {
        value: 0,
        inputValue: '2',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.blur,
        event: {
          currentTarget: {
            value: '2',
          },
        } as unknown as React.FocusEvent<HTMLInputElement>,
        context: {
          step: 3,
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(3);
      expect(result.inputValue).to.equal('3');
    });
  });
});
