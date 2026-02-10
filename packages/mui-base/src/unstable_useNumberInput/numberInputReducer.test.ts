import { expect } from 'chai';
import { NumberInputState, NumberInputReducerAction } from './useNumberInput.types';
import { NumberInputActionTypes } from './numberInputAction.types';
import { numberInputReducer } from './numberInputReducer';
import { getInputValueAsString as defaultGetInputValueAsString } from './useNumberInput';

// the actual event is irrelevant to the reducer
// it's only part of the action object so it can be passed to the state change callback
const MOCK_EVENT: any = {};

describe('numberInputReducer', () => {
  describe('action: clamp', () => {
    it('clamps the inputValue', () => {
      const state: NumberInputState = {
        value: 1,
        inputValue: '1',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.clamp,
        event: MOCK_EVENT,
        inputValue: '1',
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(1);
      expect(result.inputValue).to.equal('1');
    });

    it('clamps the inputValue with a custom step', () => {
      const state: NumberInputState = {
        value: 0,
        inputValue: '0',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.clamp,
        event: MOCK_EVENT,
        inputValue: '3',
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
          step: 4,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(4);
      expect(result.inputValue).to.equal('4');
    });

    it('clamps the inputValue within min if min is set', () => {
      const state: NumberInputState = {
        value: 0,
        inputValue: '0',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.clamp,
        event: MOCK_EVENT,
        inputValue: '0',
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
          min: 5,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(5);
      expect(result.inputValue).to.equal('5');
    });

    it('clamps the inputValue within max if max is set', () => {
      const state: NumberInputState = {
        value: 10,
        inputValue: '10',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.clamp,
        event: MOCK_EVENT,
        inputValue: '10',
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
          max: 9,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(9);
      expect(result.inputValue).to.equal('9');
    });

    it('empty value', () => {
      const state: NumberInputState = {
        value: null,
        inputValue: '',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.clamp,
        event: MOCK_EVENT,
        inputValue: '',
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(null);
      expect(result.inputValue).to.equal('');
    });
  });

  describe('action: inputChange', () => {
    it('value contains integers only', () => {
      const state: NumberInputState = {
        value: 0,
        inputValue: '0',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.inputChange,
        event: MOCK_EVENT,
        inputValue: '1',
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(0);
      expect(result.inputValue).to.equal('1');
    });

    it('value contains invalid characters', () => {
      const state: NumberInputState = {
        value: 1,
        inputValue: '1',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.inputChange,
        event: MOCK_EVENT,
        inputValue: '1a',
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(1);
      expect(result.inputValue).to.equal('1');
    });

    it('value is minus sign', () => {
      const state: NumberInputState = {
        value: -1,
        inputValue: '-1',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.inputChange,
        event: MOCK_EVENT,
        inputValue: '-',
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(-1);
      expect(result.inputValue).to.equal('-');
    });

    it('empty value', () => {
      const state: NumberInputState = {
        value: 1,
        inputValue: '1',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.inputChange,
        event: MOCK_EVENT,
        inputValue: '',
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(1);
      expect(result.inputValue).to.equal('');
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
        event: MOCK_EVENT,
        applyMultiplier: false,
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
        event: MOCK_EVENT,
        applyMultiplier: false,
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
        event: MOCK_EVENT,
        applyMultiplier: true,
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
        event: MOCK_EVENT,
        applyMultiplier: false,
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
        event: MOCK_EVENT,
        applyMultiplier: false,
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
        event: MOCK_EVENT,
        applyMultiplier: true,
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

  describe('action: incrementToMax', () => {
    it('sets the value to max if max is set', () => {
      const state: NumberInputState = {
        value: 20,
        inputValue: '20',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.incrementToMax,
        event: MOCK_EVENT,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          max: 99,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(99);
      expect(result.inputValue).to.equal('99');
    });

    it('does not change the state if max is not set', () => {
      const state: NumberInputState = {
        value: 20,
        inputValue: '20',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.incrementToMax,
        event: MOCK_EVENT,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result).to.equal(state);
    });
  });

  describe('action: decrementToMin', () => {
    it('sets the value to min if min is set', () => {
      const state: NumberInputState = {
        value: 20,
        inputValue: '20',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.decrementToMin,
        event: MOCK_EVENT,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          min: 1,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(1);
      expect(result.inputValue).to.equal('1');
    });

    it('does not change the state if min is not set', () => {
      const state: NumberInputState = {
        value: 20,
        inputValue: '20',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.decrementToMin,
        event: MOCK_EVENT,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result).to.equal(state);
    });
  });
});
