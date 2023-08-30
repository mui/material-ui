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

  describe('action: increment', () => {
    it('increments the value', () => {
      const state: NumberInputState = {
        value: 0,
        inputValue: '0',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.increment,
        event: {} as any,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(1);
      expect(result.inputValue).to.equal('1');
    });

    it('increments the value based on the step prop', () => {
      const state: NumberInputState = {
        value: 0,
        inputValue: '0',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.increment,
        event: {} as any,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
          step: 5,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(5);
      expect(result.inputValue).to.equal('5');
    });

    it('applys the shiftMultiplier when incrementing with shift+click', () => {
      const state: NumberInputState = {
        value: 0,
        inputValue: '0',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.increment,
        event: {
          shiftKey: true,
        } as React.PointerEvent,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
          step: 1,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(10);
      expect(result.inputValue).to.equal('10');
    });
  });

  describe('action: decrement', () => {
    it('decrements the value', () => {
      const state: NumberInputState = {
        value: 15,
        inputValue: '15',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.decrement,
        event: {} as any,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(14);
      expect(result.inputValue).to.equal('14');
    });

    it('decrements the value based on the step prop', () => {
      const state: NumberInputState = {
        value: 10,
        inputValue: '10',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.decrement,
        event: {} as any,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
          step: 2,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(8);
      expect(result.inputValue).to.equal('8');
    });

    it('applys the shiftMultiplier when decrementing with shift+click', () => {
      const state: NumberInputState = {
        value: 20,
        inputValue: '20',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.decrement,
        event: {
          shiftKey: true,
        } as React.PointerEvent,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
          step: 1,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(10);
      expect(result.inputValue).to.equal('10');
    });
  });
});
