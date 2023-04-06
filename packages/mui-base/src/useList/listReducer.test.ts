import * as React from 'react';
import { expect } from 'chai';
import listReducer from './listReducer';
import { ListReducerAction, ListState } from './useList.types';
import { ListActionTypes } from './listActions.types';

describe('listReducer', () => {
  describe('action: setControlledValue', () => {
    it("assigns the provided value to the state's selectedValues", () => {
      const state: ListState<string> = {
        highlightedValue: 'a',
        selectedValues: [],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.setState,
        value: { selectedValues: ['foo'] },
        event: null,
        props: {
          current: {
            items: ['foo', 'bar'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        },
      };
      const result = listReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['foo']);
    });
  });

  describe('action: blur', () => {
    it('resets the highlightedIndex', () => {
      const state: ListState<string> = {
        highlightedValue: 'a',
        selectedValues: [],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.blur,
        event: {} as any, // not relevant
        props: {
          current: {
            items: [],
            disableListWrap: false,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        },
      };

      const result = listReducer(state, action);
      expect(result.highlightedValue).to.equal(null);
    });
  });

  describe('action: optionClick', () => {
    it('sets the selectedValues to the clicked value', () => {
      const state: ListState<string> = {
        highlightedValue: 'a',
        selectedValues: [],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.itemClick,
        event: {} as any, // not relevant
        props: {
          current: {
            items: ['one', 'two', 'three'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        },
        item: 'two',
      };

      const result = listReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['two']);
    });

    it('replaces the selectedValues with the clicked value if selectionLimit = 1', () => {
      const state: ListState<string> = {
        highlightedValue: 'a',
        selectedValues: ['one'],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.itemClick,
        event: {} as any, // not relevant
        props: {
          current: {
            items: ['one', 'two', 'three'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: 1,
          },
        },
        item: 'two',
      };

      const result = listReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['two']);
    });

    it('add the clicked value to the selection if selectionLimit is not set', () => {
      const state: ListState<string> = {
        highlightedValue: 'one',
        selectedValues: ['one'],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.itemClick,
        event: {} as any, // not relevant
        props: {
          current: {
            items: ['one', 'two', 'three'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        },
        item: 'two',
      };

      const result = listReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['one', 'two']);
    });

    it('limits the selection to specified number of items', () => {
      const state: ListState<string> = {
        highlightedValue: 'three',
        selectedValues: ['one', 'two'],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.itemClick,
        event: {} as any,
        item: 'three',
        props: {
          current: {
            items: ['one', 'two', 'three'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: 2,
          },
        },
      };

      const result = listReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['two', 'three']);
    });

    it('remove the clicked value from the selection if selectionLimit is not set and it was selected already', () => {
      const state: ListState<string> = {
        highlightedValue: 'three',
        selectedValues: ['one', 'two'],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.itemClick,
        event: {} as any, // not relevant
        props: {
          current: {
            items: ['one', 'two', 'three'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        },
        item: 'two',
      };

      const result = listReducer(state, action);
      expect(result.selectedValues).to.deep.equal(['one']);
    });
  });

  describe('action: keyDown', () => {
    interface KeydownTestCase {
      name: string;
      key: string;
      initialHighlightedItem: string | null;
      disabledItemFocusable: boolean;
      disabledItems: string[];
      disableListWrap: boolean;
      expected: string | null;
    }

    const testCases: KeydownTestCase[] = [
      {
        name: 'happy path',
        key: 'Home',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: [],
        disableListWrap: false,
        expected: '1',
      },
      {
        name: 'highlights the first enabled item',
        key: 'Home',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: ['1'],
        disableListWrap: false,
        expected: '2',
      },
      {
        name: 'highlights the first enabled item',
        key: 'Home',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: ['1', '2'],
        disableListWrap: false,
        expected: '3',
      },
      {
        name: 'highlights the first item even if it is disabled',
        key: 'Home',
        initialHighlightedItem: null,
        disabledItemFocusable: true,
        disabledItems: ['1'],
        disableListWrap: false,
        expected: '1',
      },
      {
        name: 'all disabled',
        key: 'Home',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: ['1', '2', '3', '4', '5'],
        disableListWrap: false,
        expected: null,
      },
      {
        name: 'all disabled but focusable',
        key: 'Home',
        initialHighlightedItem: null,
        disabledItemFocusable: true,
        disabledItems: ['1', '2', '3', '4', '5'],
        disableListWrap: false,
        expected: '1',
      },
      {
        name: 'happy path',
        key: 'End',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: [],
        disableListWrap: false,
        expected: '5',
      },
      {
        name: 'highlights the last enabled item',
        key: 'End',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: ['5'],
        disableListWrap: false,
        expected: '4',
      },
      {
        name: 'highlights the last enabled item',
        key: 'End',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: ['4', '5'],
        disableListWrap: false,
        expected: '3',
      },
      {
        name: 'highlights the last item even if it is disabled',
        key: 'End',
        initialHighlightedItem: null,
        disabledItemFocusable: true,
        disabledItems: ['5'],
        disableListWrap: false,
        expected: '5',
      },
      {
        name: 'all disabled',
        key: 'End',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: ['1', '2', '3', '4', '5'],
        disableListWrap: false,
        expected: null,
      },
      {
        name: 'all disabled but focusable',
        key: 'End',
        initialHighlightedItem: null,
        disabledItemFocusable: true,
        disabledItems: ['1', '2', '3', '4', '5'],
        disableListWrap: false,
        expected: '5',
      },
      {
        name: 'happy path',
        key: 'ArrowDown',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: [],
        disableListWrap: false,
        expected: '1',
      },
      {
        name: 'happy path',
        key: 'ArrowDown',
        initialHighlightedItem: '1',
        disabledItemFocusable: false,
        disabledItems: [],
        disableListWrap: false,
        expected: '2',
      },
      {
        name: 'skips the disabled item',
        key: 'ArrowDown',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: ['1'],
        disableListWrap: false,
        expected: '2',
      },
      {
        name: 'skips multiple disabled items',
        key: 'ArrowDown',
        initialHighlightedItem: '1',
        disabledItemFocusable: false,
        disabledItems: ['2', '3'],
        disableListWrap: false,
        expected: '4',
      },
      {
        name: 'skips the disabled items and wraps around',
        key: 'ArrowDown',
        initialHighlightedItem: '3',
        disabledItemFocusable: false,
        disabledItems: ['1', '4', '5'],
        disableListWrap: false,
        expected: '2',
      },
      {
        name: 'focuses the disabled item',
        key: 'ArrowDown',
        initialHighlightedItem: null,
        disabledItemFocusable: true,
        disabledItems: ['1'],
        disableListWrap: false,
        expected: '1',
      },
      {
        name: 'does not wrap around',
        key: 'ArrowDown',
        initialHighlightedItem: '5',
        disabledItemFocusable: false,
        disabledItems: [],
        disableListWrap: true,
        expected: '5',
      },
      {
        name: 'remains on the same item when all the next are disabled',
        key: 'ArrowDown',
        initialHighlightedItem: '3',
        disabledItemFocusable: false,
        disabledItems: ['4', '5'],
        disableListWrap: true,
        expected: '3',
      },
      {
        name: 'all disabled',
        key: 'ArrowDown',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: ['1', '2', '3', '4', '5'],
        disableListWrap: false,
        expected: null,
      },
      {
        name: 'all disabled but focusable',
        key: 'ArrowDown',
        initialHighlightedItem: null,
        disabledItemFocusable: true,
        disabledItems: ['1', '2', '3', '4', '5'],
        disableListWrap: false,
        expected: '1',
      },
      {
        name: 'happy path',
        key: 'ArrowUp',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: [],
        disableListWrap: false,
        expected: '5',
      },
      {
        name: 'happy path',
        key: 'ArrowUp',
        initialHighlightedItem: '2',
        disabledItemFocusable: false,
        disabledItems: [],
        disableListWrap: false,
        expected: '1',
      },
      {
        name: 'skips the disabled item',
        key: 'ArrowUp',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: ['5'],
        disableListWrap: false,
        expected: '4',
      },
      {
        name: 'skips multiple disabled items',
        key: 'ArrowUp',
        initialHighlightedItem: '1',
        disabledItemFocusable: false,
        disabledItems: ['4', '5'],
        disableListWrap: false,
        expected: '3',
      },
      {
        name: 'skips the disabled items and wraps around',
        key: 'ArrowUp',
        initialHighlightedItem: '2',
        disabledItemFocusable: false,
        disabledItems: ['1', '4', '5'],
        disableListWrap: false,
        expected: '3',
      },
      {
        name: 'focuses the disabled item',
        key: 'ArrowUp',
        initialHighlightedItem: null,
        disabledItemFocusable: true,
        disabledItems: ['5'],
        disableListWrap: false,
        expected: '5',
      },
      {
        name: 'does not wrap around',
        key: 'ArrowUp',
        initialHighlightedItem: '1',
        disabledItemFocusable: false,
        disabledItems: [],
        disableListWrap: true,
        expected: '1',
      },
      {
        name: 'remains on the same item when all the previous are disabled',
        key: 'ArrowUp',
        initialHighlightedItem: '3',
        disabledItemFocusable: false,
        disabledItems: ['1', '2'],
        disableListWrap: true,
        expected: '3',
      },
      {
        name: 'all disabled',
        key: 'ArrowUp',
        initialHighlightedItem: null,
        disabledItemFocusable: false,
        disabledItems: ['1', '2', '3', '4', '5'],
        disableListWrap: false,
        expected: null,
      },
      {
        name: 'all disabled but focusable',
        key: 'ArrowUp',
        initialHighlightedItem: null,
        disabledItemFocusable: true,
        disabledItems: ['1', '2', '3', '4', '5'],
        disableListWrap: false,
        expected: '5',
      },
    ];

    testCases.forEach((spec: KeydownTestCase) => {
      describe(`given initialHighlightedItem: '${
        spec.initialHighlightedItem
      }', disabledItemsFocusable: ${spec.disabledItemFocusable}, disableListWrap: ${
        spec.disableListWrap
      }, disabledItems: [${spec.disabledItems.join()}]`, () => {
        it(`${spec.name}: should highlight the '${spec.expected}' item after the ${spec.key} is pressed`, () => {
          const state: ListState<string> = {
            highlightedValue: spec.initialHighlightedItem,
            selectedValues: [],
          };

          const action: ListReducerAction<string, ListState<string>> = {
            type: ListActionTypes.keyDown,
            key: spec.key,
            event: null as any, // not relevant
            props: {
              current: {
                items: ['1', '2', '3', '4', '5'],
                disableListWrap: spec.disableListWrap,
                disabledItemsFocusable: spec.disabledItemFocusable,
                focusManagement: 'activeDescendant',
                isItemDisabled: (item) => spec.disabledItems.includes(item),
                itemComparer: (o, v) => o === v,
                itemStringifier: (option) => option,
                orientation: 'vertical',
                selectionLimit: null,
              },
            },
          };

          const result = listReducer(state, action);
          expect(result.highlightedValue).to.equal(spec.expected);
        });
      });
    });

    describe('Enter key is pressed', () => {
      it('selects the highlighted option', () => {
        const state: ListState<string> = {
          highlightedValue: 'two',
          selectedValues: [],
        };

        const action: ListReducerAction<string, ListState<string>> = {
          type: ListActionTypes.keyDown,
          key: 'Enter',
          event: {} as any,
          props: {
            current: {
              items: ['one', 'two', 'three'],
              disableListWrap: false,
              disabledItemsFocusable: false,
              focusManagement: 'activeDescendant',
              isItemDisabled: () => false,
              itemComparer: (o, v) => o === v,
              itemStringifier: (option) => option,
              orientation: 'vertical',
              selectionLimit: null,
            },
          },
        };

        const result = listReducer(state, action);
        expect(result.selectedValues).to.deep.equal(['two']);
      });

      it('replaces the selectedValues with the highlighted value if selectionLimit = 1', () => {
        const state: ListState<string> = {
          highlightedValue: 'two',
          selectedValues: ['one'],
        };

        const action: ListReducerAction<string, ListState<string>> = {
          type: ListActionTypes.keyDown,
          key: 'Enter',
          event: {} as any,
          props: {
            current: {
              items: ['one', 'two', 'three'],
              disableListWrap: false,
              disabledItemsFocusable: false,
              focusManagement: 'activeDescendant',
              isItemDisabled: () => false,
              itemComparer: (o, v) => o === v,
              itemStringifier: (option) => option,
              orientation: 'vertical',
              selectionLimit: 1,
            },
          },
        };

        const result = listReducer(state, action);
        expect(result.selectedValues).to.deep.equal(['two']);
      });

      it('add the highlighted value to the selection if selectionLimit is not set', () => {
        const state: ListState<string> = {
          highlightedValue: 'two',
          selectedValues: ['one'],
        };

        const action: ListReducerAction<string, ListState<string>> = {
          type: ListActionTypes.keyDown,
          key: 'Enter',
          event: {} as any,
          props: {
            current: {
              items: ['one', 'two', 'three'],
              disableListWrap: false,
              disabledItemsFocusable: false,
              focusManagement: 'activeDescendant',
              isItemDisabled: () => false,
              itemComparer: (o, v) => o === v,
              itemStringifier: (option) => option,
              orientation: 'vertical',
              selectionLimit: null,
            },
          },
        };

        const result = listReducer(state, action);
        expect(result.selectedValues).to.deep.equal(['one', 'two']);
      });

      it('limits the selection to specified number of items', () => {
        const state: ListState<string> = {
          highlightedValue: 'three',
          selectedValues: ['one', 'two'],
        };

        const action: ListReducerAction<string, ListState<string>> = {
          type: ListActionTypes.keyDown,
          key: 'Enter',
          event: {} as any,
          props: {
            current: {
              items: ['one', 'two', 'three'],
              disableListWrap: false,
              disabledItemsFocusable: false,
              focusManagement: 'activeDescendant',
              isItemDisabled: () => false,
              itemComparer: (o, v) => o === v,
              itemStringifier: (option) => option,
              orientation: 'vertical',
              selectionLimit: 2,
            },
          },
        };

        const result = listReducer(state, action);
        expect(result.selectedValues).to.deep.equal(['two', 'three']);
      });
    });
  });

  describe('action: textNavigation', () => {
    it('should navigate to next match', () => {
      const state: ListState<string> = {
        highlightedValue: 'two',
        selectedValues: [],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.textNavigation,
        searchString: 'th',
        event: {} as React.KeyboardEvent,
        props: {
          current: {
            items: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        },
      };

      const result = listReducer(state, action);
      expect(result.highlightedValue).to.equal('three');
    });

    it('should not move the highlight when there are no matched items', () => {
      const state: ListState<string> = {
        highlightedValue: 'one',
        selectedValues: [],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.textNavigation,
        searchString: 'z',
        event: {} as React.KeyboardEvent,
        props: {
          current: {
            items: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        },
      };

      const result = listReducer(state, action);
      expect(result.highlightedValue).to.equal('one');
    });

    it('should highlight first match that is not disabled', () => {
      const state: ListState<string> = {
        highlightedValue: 'one',
        selectedValues: [],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.textNavigation,
        searchString: 't',
        event: {} as React.KeyboardEvent,
        props: {
          current: {
            items: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: (_, i) => i === 1,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        },
      };

      const result = listReducer(state, action);
      expect(result.highlightedValue).to.equal('three');
    });

    it('should move highlight to disabled items if disabledItemsFocusable=true', () => {
      const state: ListState<string> = {
        highlightedValue: 'one',
        selectedValues: [],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.textNavigation,
        searchString: 't',
        event: {} as React.KeyboardEvent,
        props: {
          current: {
            items: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: false,
            disabledItemsFocusable: true,
            focusManagement: 'activeDescendant',
            isItemDisabled: (_, i) => i === 1,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        },
      };

      const result = listReducer(state, action);
      expect(result.highlightedValue).to.equal('two');
    });

    it('should not move highlight when disabled wrap and match is before highlighted option', () => {
      const state: ListState<string> = {
        highlightedValue: 'three',
        selectedValues: [],
      };

      const action: ListReducerAction<string, ListState<string>> = {
        type: ListActionTypes.textNavigation,
        searchString: 'one',
        event: {} as React.KeyboardEvent,
        props: {
          current: {
            items: ['one', 'two', 'three', 'four', 'five'],
            disableListWrap: true,
            disabledItemsFocusable: false,
            focusManagement: 'activeDescendant',
            isItemDisabled: () => false,
            itemComparer: (o, v) => o === v,
            itemStringifier: (option) => option,
            orientation: 'vertical',
            selectionLimit: null,
          },
        },
      };

      const result = listReducer(state, action);
      expect(result.highlightedValue).to.equal('three');
    });
  });
});
