import { expect } from 'chai';
import { NumberInputState, NumberInputReducerAction } from './useNumberInput.types';
import { NumberInputActionTypes } from './numberInputAction.types';
import { numberInputReducer } from './numberInputReducer';
import { getInputValueAsString as defaultGetInputValueAsString } from './useNumberInput';

describe('numberInputReducer', () => {
  describe('action: blur', () => {
    it('clamps the inputValue', () => {
      const state: NumberInputState = {
        value: 1,
        inputValue: '1',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.blur,
        event: {
          currentTarget: {
            value: '1',
          },
        } as unknown as React.FocusEvent<HTMLInputElement>,
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
        type: NumberInputActionTypes.blur,
        event: {
          currentTarget: {
            value: '3',
          },
        } as unknown as React.FocusEvent<HTMLInputElement>,
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
        type: NumberInputActionTypes.blur,
        event: {
          currentTarget: {
            value: '0',
          },
        } as unknown as React.FocusEvent<HTMLInputElement>,
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
        type: NumberInputActionTypes.blur,
        event: {
          currentTarget: {
            value: '10',
          },
        } as unknown as React.FocusEvent<HTMLInputElement>,
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
        value: '',
        inputValue: '',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.blur,
        event: {
          currentTarget: {
            value: '',
          },
        } as unknown as React.FocusEvent<HTMLInputElement>,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal('');
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
        event: {
          currentTarget: {
            value: '1',
          },
        } as React.ChangeEvent<HTMLInputElement>,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal(1);
      expect(result.inputValue).to.equal('1');
    });

    it('value contains invalid characters', () => {
      const state: NumberInputState = {
        value: 1,
        inputValue: '1',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.inputChange,
        event: {
          currentTarget: {
            value: '1a',
          },
        } as React.ChangeEvent<HTMLInputElement>,
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
        event: {
          currentTarget: {
            value: '-',
          },
        } as React.ChangeEvent<HTMLInputElement>,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal('');
      expect(result.inputValue).to.equal('-');
    });

    it('empty value', () => {
      const state: NumberInputState = {
        value: 1,
        inputValue: '1',
      };

      const action: NumberInputReducerAction = {
        type: NumberInputActionTypes.inputChange,
        event: {
          currentTarget: {
            value: '',
          },
        } as React.ChangeEvent<HTMLInputElement>,
        context: {
          getInputValueAsString: defaultGetInputValueAsString,
          shiftMultiplier: 10,
        },
      };

      const result = numberInputReducer(state, action);

      expect(result.value).to.equal('');
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

  describe('action: keyDown', () => {
    describe('key: ArrowUp', () => {
      it('increments', () => {
        const state: NumberInputState = {
          value: 10,
          inputValue: '10',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'ArrowUp',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(11);
        expect(result.inputValue).to.equal('11');
      });

      it('increments based on a custom step', () => {
        const state: NumberInputState = {
          value: 10,
          inputValue: '10',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'ArrowUp',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
            step: 5,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(15);
        expect(result.inputValue).to.equal('15');
      });

      it('increments and applies shiftMultiplier when Shift is held', () => {
        const state: NumberInputState = {
          value: 10,
          inputValue: '10',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {
            shiftKey: true,
          } as React.KeyboardEvent,
          key: 'ArrowUp',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(20);
        expect(result.inputValue).to.equal('20');
      });

      it('sets value to min when there is no value', () => {
        const state: NumberInputState = {
          value: '',
          inputValue: '',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'ArrowUp',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
            min: -20,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(-20);
        expect(result.inputValue).to.equal('-20');
      });
    });

    describe('key: ArrowDown', () => {
      it('decrements', () => {
        const state: NumberInputState = {
          value: 10,
          inputValue: '10',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'ArrowDown',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(9);
        expect(result.inputValue).to.equal('9');
      });

      it('decrements based on a custom step', () => {
        const state: NumberInputState = {
          value: 12,
          inputValue: '12',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'ArrowDown',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
            step: 4,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(8);
        expect(result.inputValue).to.equal('8');
      });

      it('decrements and applies shiftMultiplier when Shift is held', () => {
        const state: NumberInputState = {
          value: 35,
          inputValue: '35',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {
            shiftKey: true,
          } as React.KeyboardEvent,
          key: 'ArrowDown',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(25);
        expect(result.inputValue).to.equal('25');
      });

      it('sets value to max when there is no value', () => {
        const state: NumberInputState = {
          value: '',
          inputValue: '',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'ArrowDown',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
            max: 99,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(99);
        expect(result.inputValue).to.equal('99');
      });
    });

    describe('key: PageUp', () => {
      it('increments and applies shiftMultiplier', () => {
        const state: NumberInputState = {
          value: 10,
          inputValue: '10',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'PageUp',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(20);
        expect(result.inputValue).to.equal('20');
      });
    });

    describe('key: PageDown', () => {
      it('decrements and applies shiftMultiplier', () => {
        const state: NumberInputState = {
          value: 44,
          inputValue: '44',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'PageDown',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(34);
        expect(result.inputValue).to.equal('34');
      });
    });

    describe('key: Home', () => {
      it('increments to max if max is set', () => {
        const state: NumberInputState = {
          value: 44,
          inputValue: '44',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'Home',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
            max: 99,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(99);
        expect(result.inputValue).to.equal('99');
      });

      it('does not change the state if max is not set', () => {
        const state: NumberInputState = {
          value: 44,
          inputValue: '44',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'Home',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(44);
        expect(result.inputValue).to.equal('44');
      });
    });

    describe('key: End', () => {
      it('decrements to min if min is set', () => {
        const state: NumberInputState = {
          value: 44,
          inputValue: '44',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'End',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
            min: 1,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(1);
        expect(result.inputValue).to.equal('1');
      });

      it('does not change the state if min is not set', () => {
        const state: NumberInputState = {
          value: 44,
          inputValue: '44',
        };

        const action: NumberInputReducerAction = {
          type: NumberInputActionTypes.keyDown,
          event: {} as any,
          key: 'End',
          context: {
            getInputValueAsString: defaultGetInputValueAsString,
            shiftMultiplier: 10,
          },
        };

        const result = numberInputReducer(state, action);

        expect(result.value).to.equal(44);
        expect(result.inputValue).to.equal('44');
      });
    });
  });
});
