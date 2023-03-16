import * as React from 'react';
import { expect } from 'chai';
import { ListReducerAction, ListState } from './useListbox.types';
import { ActionTypes } from './actions.types';
import defaultReducer from './defaultListboxReducer';

describe('useListbox defaultReducer', () => {
  describe('action: setControlledValue', () => {
    it("assigns the provided value to the state's selectedValues", () => {
      const state: ListState<string> = {
        highlightedValue: 'a',
        selectedValues: [],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.setValue,
        values: ['foo'],
        event: null,
        props: {
          items: ['foo', 'bar'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isItemDisabled: () => false,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: null,
        },
      };
      const result = defaultReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['foo']);
    });
  });

  describe('action: blur', () => {
    it('resets the highlightedIndex', () => {
      const state: ListState<string> = {
        highlightedValue: 'a',
        selectedValues: [],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.blur,
        event: {} as any, // not relevant
        props: {
          items: [],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isItemDisabled: () => false,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: null,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal(null);
    });
  });

  describe('action: optionClick', () => {
    it('sets the selectedValues to the clicked value', () => {
      const state: ListState<string> = {
        highlightedValue: 'a',
        selectedValues: [],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.itemClick,
        event: {} as any, // not relevant
        props: {
          items: ['one', 'two', 'three'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isItemDisabled: () => false,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: null,
        },
        item: 'two',
      };

      const result = defaultReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['two']);
    });

    it('replaces the selectedValues with the clicked value if selectionLimit = 1', () => {
      const state: ListState<string> = {
        highlightedValue: 'a',
        selectedValues: ['one'],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.itemClick,
        event: {} as any, // not relevant
        props: {
          items: ['one', 'two', 'three'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isItemDisabled: () => false,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: 1,
        },
        item: 'two',
      };

      const result = defaultReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['two']);
    });

    it('add the clicked value to the selection if selectionLimit is not set', () => {
      const state: ListState<string> = {
        highlightedValue: 'one',
        selectedValues: ['one'],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.itemClick,
        event: {} as any, // not relevant
        props: {
          items: ['one', 'two', 'three'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isItemDisabled: () => false,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: null,
        },
        item: 'two',
      };

      const result = defaultReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['one', 'two']);
    });

    it('remove the clicked value from the selection if selectionLimit is not set and it was selected already', () => {
      const state: ListState<string> = {
        highlightedValue: 'three',
        selectedValues: ['one', 'two'],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.itemClick,
        event: {} as any, // not relevant
        props: {
          items: ['one', 'two', 'three'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isItemDisabled: () => false,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: null,
        },
        item: 'two',
      };

      const result = defaultReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['one']);
    });
  });

  describe('action: keyDown', () => {
    describe('Home key is pressed', () => {
      it('highlights the first non-disabled option if the first is disabled', () => {
        const state: ListState<string> = {
          highlightedValue: null,
          selectedValues: [],
        };

        const action: ListReducerAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'Home',
          } as any,
          props: {
            items: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isItemDisabled: (_, index) => index === 0,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.highlightedValue).to.equal('two');
      });
    });

    describe('End key is pressed', () => {
      it('highlights the last non-disabled option if the last is disabled', () => {
        const state: ListState<string> = {
          highlightedValue: null,
          selectedValues: [],
        };

        const action: ListReducerAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'End',
          } as any,
          props: {
            items: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isItemDisabled: (_, index) => index === 4,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.highlightedValue).to.equal('four');
      });
    });

    describe('ArrowUp key is pressed', () => {
      it('wraps the highlight around omitting disabled items', () => {
        const state: ListState<string> = {
          highlightedValue: null,
          selectedValues: [],
        };

        const action: ListReducerAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'ArrowUp',
          } as any,
          props: {
            items: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isItemDisabled: (_, index) => index === 0 || index === 4,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.highlightedValue).to.equal('four');
      });
    });

    describe('ArrowDown key is pressed', () => {
      it('wraps the highlight around omitting disabled items', () => {
        const state: ListState<string> = {
          highlightedValue: null,
          selectedValues: [],
        };

        const action: ListReducerAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'ArrowDown',
          } as any,
          props: {
            items: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isItemDisabled: (_, index) => index === 0 || index === 4,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.highlightedValue).to.equal('two');
      });

      it('does not highlight any option if all are disabled', () => {
        const state: ListState<string> = {
          highlightedValue: null,
          selectedValues: [],
        };

        const action: ListReducerAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'ArrowDown',
          } as any,
          props: {
            items: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isItemDisabled: () => true,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.highlightedValue).to.equal(null);
      });
    });

    describe('Enter key is pressed', () => {
      it('selects the highlighted option', () => {
        const state: ListState<string> = {
          highlightedValue: 'two',
          selectedValues: [],
        };

        const action: ListReducerAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'Enter',
          } as any,
          props: {
            items: ['one', 'two', 'three'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.selectedValues).to.deep.equal(['two']);
      });

      it('replaces the selectedValues with the highlighted value if selectionLimit = 1', () => {
        const state: ListState<string> = {
          highlightedValue: 'two',
          selectedValues: ['one'],
        };

        const action: ListReducerAction<string> = {
          type: ActionTypes.keyDown,
          event: {
            key: 'Enter',
          } as any,
          props: {
            items: ['one', 'two', 'three'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: 1,
          },
        };

        const result = defaultReducer(state, action);
        expect(result.selectedValues).to.deep.equal(['two']);
      });

      it('add the highlighted value to the selection if selectionLimit is not set', () => {
        const state: ListState<string> = {
          highlightedValue: 'two',
          selectedValues: ['one'],
        };

        const action: ListReducerAction<string> = {
          type: ActionTypes.itemClick,
          event: {
            key: 'Enter',
          } as any,
          props: {
            items: ['one', 'two', 'three'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
          item: 'two',
        };

        const result = defaultReducer(state, action);
        expect(result.selectedValues).to.deep.equal(['one', 'two']);
      });
    });
  });

  describe('action: textNavigation', () => {
    it('should navigate to next match', () => {
      const state: ListState<string> = {
        highlightedValue: 'two',
        selectedValues: [],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.textNavigation,
        searchString: 'th',
        event: {} as React.KeyboardEvent,
        props: {
          items: ['one', 'two', 'three', 'four', 'five'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isItemDisabled: () => false,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: null,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal('three');
    });

    it('should not move the highlight when there are no matched items', () => {
      const state: ListState<string> = {
        highlightedValue: 'one',
        selectedValues: [],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.textNavigation,
        searchString: 'z',
        event: {} as React.KeyboardEvent,
        props: {
          items: ['one', 'two', 'three', 'four', 'five'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isItemDisabled: () => false,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: null,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal('one');
    });

    it('should highlight first match that is not disabled', () => {
      const state: ListState<string> = {
        highlightedValue: 'one',
        selectedValues: [],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.textNavigation,
        searchString: 't',
        event: {} as React.KeyboardEvent,
        props: {
          items: ['one', 'two', 'three', 'four', 'five'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isItemDisabled: (_, i) => i === 1,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: null,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal('three');
    });

    it('should move highlight to disabled items if disabledItemsFocusable=true', () => {
      const state: ListState<string> = {
        highlightedValue: 'one',
        selectedValues: [],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.textNavigation,
        searchString: 't',
        event: {} as React.KeyboardEvent,
        props: {
          items: ['one', 'two', 'three', 'four', 'five'],
          disableListWrap: false,
          disabledItemsFocusable: true,
          isItemDisabled: (_, i) => i === 1,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: null,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal('two');
    });

    it('should not move highlight when disabled wrap and match is before highlighted option', () => {
      const state: ListState<string> = {
        highlightedValue: 'three',
        selectedValues: [],
      };

      const action: ListReducerAction<string> = {
        type: ActionTypes.textNavigation,
        searchString: 'one',
        event: {} as React.KeyboardEvent,
        props: {
          items: ['one', 'two', 'three', 'four', 'five'],
          disableListWrap: true,
          disabledItemsFocusable: false,
          isItemDisabled: () => false,
          itemComparer: (o, v) => o === v,
          itemStringifier: (option) => option,
          orientation: 'vertical',
          selectionLimit: null,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedValue).to.equal('three');
    });
  });
});
