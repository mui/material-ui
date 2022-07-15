import { expect } from 'chai';
import { ActionTypes, ListboxAction, ListboxState } from './useListbox.types';
import defaultReducer from './defaultListboxReducer';

describe('useListbox defaultReducer', () => {
  describe('action: setControlledValue', () => {
    it("assigns the provided value to the state's selectedValue", () => {
      const state: ListboxState<string> = {
        highlightedValue: 'a',
        selectedValue: null,
      };

      const action: ListboxAction<string> = {
        type: ActionTypes.setValue,
        value: 'foo',
      };
      const result = defaultReducer(state, action);
      expect(result.selectedValue).to.equal('foo');
    });
  });

  describe('action: blur', () => {
    it('resets the highlightedIndex', () => {
      const state: ListboxState<string> = {
        highlightedValue: 'a',
        selectedValue: null,
      };

      const action: ListboxAction<string> = {
        type: ActionTypes.blur,
        event: {} as any, // not relevant
        props: {
          options: [],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: () => false,
          optionComparer: (o, v) => o === v,
          optionStringifier: (option) => option,
          multiple: false,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal(null);
    });
  });

  describe('action: optionClick', () => {
    it('sets the selectedValue to the clicked value', () => {
      const state: ListboxState<string> = {
        highlightedValue: 'a',
        selectedValue: null,
      };

      const action: ListboxAction<string> = {
        type: ActionTypes.optionClick,
        event: {} as any, // not relevant
        props: {
          options: ['one', 'two', 'three'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: () => false,
          optionComparer: (o, v) => o === v,
          optionStringifier: (option) => option,
          multiple: false,
        },
        option: 'two',
      };

      const result = defaultReducer(state, action);
      expect(result.selectedValue).to.equal('two');
    });

    it('add the clicked value to the selection if selectMultiple is set', () => {
      const state: ListboxState<string> = {
        highlightedValue: 'one',
        selectedValue: ['one'],
      };

      const action: ListboxAction<string> = {
        type: ActionTypes.optionClick,
        event: {} as any, // not relevant
        props: {
          options: ['one', 'two', 'three'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: () => false,
          optionComparer: (o, v) => o === v,
          optionStringifier: (option) => option,
          multiple: true,
        },
        option: 'two',
      };

      const result = defaultReducer(state, action);
      expect(result.selectedValue).to.deep.equal(['one', 'two']);
    });

    it('remove the clicked value from the selection if selectMultiple is set and it was selected already', () => {
      const state: ListboxState<string> = {
        highlightedValue: 'three',
        selectedValue: ['one', 'two'],
      };

      const action: ListboxAction<string> = {
        type: ActionTypes.optionClick,
        event: {} as any, // not relevant
        props: {
          options: ['one', 'two', 'three'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: () => false,
          optionComparer: (o, v) => o === v,
          optionStringifier: (option) => option,
          multiple: true,
        },
        option: 'two',
      };

      const result = defaultReducer(state, action);
      expect(result.selectedValue).to.deep.equal(['one']);
    });
  });

  describe('action: keyDown', () => {
    describe('Home key is pressed', () => {
      it('highlights the first non-disabled option if the first is disabled', () => {
        const state: ListboxState<string> = {
          highlightedValue: null,
          selectedValue: null,
        };

        const action: ListboxAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'Home',
          } as any,
          props: {
            options: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isOptionDisabled: (_, index) => index === 0,
            optionComparer: (o, v) => o === v,
            optionStringifier: (option) => option,
            multiple: false,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.highlightedValue).to.equal('two');
      });
    });

    describe('End key is pressed', () => {
      it('highlights the last non-disabled option if the last is disabled', () => {
        const state: ListboxState<string> = {
          highlightedValue: null,
          selectedValue: null,
        };

        const action: ListboxAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'End',
          } as any,
          props: {
            options: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isOptionDisabled: (_, index) => index === 4,
            optionComparer: (o, v) => o === v,
            optionStringifier: (option) => option,
            multiple: false,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.highlightedValue).to.equal('four');
      });
    });

    describe('ArrowUp key is pressed', () => {
      it('wraps the highlight around omitting disabled items', () => {
        const state: ListboxState<string> = {
          highlightedValue: null,
          selectedValue: null,
        };

        const action: ListboxAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'ArrowUp',
          } as any,
          props: {
            options: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isOptionDisabled: (_, index) => index === 0 || index === 4,
            optionComparer: (o, v) => o === v,
            optionStringifier: (option) => option,
            multiple: false,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.highlightedValue).to.equal('four');
      });
    });

    describe('ArrowDown key is pressed', () => {
      it('wraps the highlight around omitting disabled items', () => {
        const state: ListboxState<string> = {
          highlightedValue: null,
          selectedValue: null,
        };

        const action: ListboxAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'ArrowDown',
          } as any,
          props: {
            options: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isOptionDisabled: (_, index) => index === 0 || index === 4,
            optionComparer: (o, v) => o === v,
            optionStringifier: (option) => option,
            multiple: false,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.highlightedValue).to.equal('two');
      });

      it('does not highlight any option if all are disabled', () => {
        const state: ListboxState<string> = {
          highlightedValue: null,
          selectedValue: null,
        };

        const action: ListboxAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'ArrowDown',
          } as any,
          props: {
            options: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isOptionDisabled: () => true,
            optionComparer: (o, v) => o === v,
            optionStringifier: (option) => option,
            multiple: false,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.highlightedValue).to.equal(null);
      });
    });

    describe('Enter key is pressed', () => {
      it('selects the highlighted option', () => {
        const state: ListboxState<string> = {
          highlightedValue: 'two',
          selectedValue: null,
        };

        const action: ListboxAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'Enter',
          } as any,
          props: {
            options: ['one', 'two', 'three'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isOptionDisabled: () => false,
            optionComparer: (o, v) => o === v,
            optionStringifier: (option) => option,
            multiple: false,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.selectedValue).to.equal('two');
      });

      it('add the highlighted value to the selection if selectMultiple is set', () => {
        const state: ListboxState<string> = {
          highlightedValue: 'two',
          selectedValue: ['one'],
        };

        const action: ListboxAction<string> = {
          type: ActionTypes.optionClick,
          event: {
            key: 'Enter',
          } as any,
          props: {
            options: ['one', 'two', 'three'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isOptionDisabled: () => false,
            optionComparer: (o, v) => o === v,
            optionStringifier: (option) => option,
            multiple: true,
          },
          option: 'two',
        };

        const result = defaultReducer(state, action);
        expect(result.selectedValue).to.deep.equal(['one', 'two']);
      });
    });
  });

  describe('action: textNavigation', () => {
    it('should navigate to next match', () => {
      const state: ListboxState<string> = {
        highlightedValue: 'two',
        selectedValue: null,
      };

      const action: ListboxAction<string> = {
        type: ActionTypes.textNavigation,
        searchString: 'th',
        props: {
          options: ['one', 'two', 'three', 'four', 'five'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: () => false,
          optionComparer: (o, v) => o === v,
          multiple: false,
          optionStringifier: (option) => option,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal('three');
    });

    it('should not move highlight when no matched options', () => {
      const state: ListboxState<string> = {
        highlightedValue: 'one',
        selectedValue: null,
      };

      const action: ListboxAction<string> = {
        type: ActionTypes.textNavigation,
        searchString: 'z',
        props: {
          options: ['one', 'two', 'three', 'four', 'five'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: () => false,
          optionComparer: (o, v) => o === v,
          multiple: false,
          optionStringifier: (option) => option,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal('one');
    });

    it('should highlight first match that is not disabled', () => {
      const state: ListboxState<string> = {
        highlightedValue: 'one',
        selectedValue: null,
      };

      const action: ListboxAction<string> = {
        type: ActionTypes.textNavigation,
        searchString: 't',
        props: {
          options: ['one', 'two', 'three', 'four', 'five'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: (_, i) => i === 1,
          optionComparer: (o, v) => o === v,
          multiple: false,
          optionStringifier: (option) => option,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal('three');
    });

    it('should move highlight to disabled items if disabledItemsFocusable=true', () => {
      const state: ListboxState<string> = {
        highlightedValue: 'one',
        selectedValue: null,
      };

      const action: ListboxAction<string> = {
        type: ActionTypes.textNavigation,
        searchString: 't',
        props: {
          options: ['one', 'two', 'three', 'four', 'five'],
          disableListWrap: false,
          disabledItemsFocusable: true,
          isOptionDisabled: (_, i) => i === 1,
          optionComparer: (o, v) => o === v,
          multiple: false,
          optionStringifier: (option) => option,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal('two');
    });

    it('should not move highlight when disabled wrap and match is before highlighted option', () => {
      const state: ListboxState<string> = {
        highlightedValue: 'three',
        selectedValue: null,
      };

      const action: ListboxAction<string> = {
        type: ActionTypes.textNavigation,
        searchString: 'one',
        props: {
          options: ['one', 'two', 'three', 'four', 'five'],
          disableListWrap: true,
          disabledItemsFocusable: false,
          isOptionDisabled: (_, i) => i === 1,
          optionComparer: (o, v) => o === v,
          multiple: false,
          optionStringifier: (option) => option,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal('three');
    });
  });
});
