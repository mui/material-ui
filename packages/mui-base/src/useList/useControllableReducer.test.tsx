import { expect } from 'chai';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer } from 'test/utils';
import { ActionTypes, ListAction } from './actions.types';
import { ListState, UseListParametersWithDefaults } from './useList.types';
import useControllableReducer from './useControllableReducer';

describe('useControllableReducer', () => {
  const { render } = createRenderer();

  describe('dispatch', () => {
    it('calls the provided internal reducer', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const reducer = spy((state: ListState<string>, action: ListAction<string>) => {
        return state;
      });

      const actionToDispatch = { type: ActionTypes.setValue as const, value: ['b'], event: null };
      const props: UseListParametersWithDefaults<string> = {
        items: ['a', 'b', 'c'],
        defaultValue: ['a'],
        isItemDisabled: () => false,
        disableListWrap: false,
        disabledItemsFocusable: false,
        itemComparer: (a, b) => a === b,
        itemStringifier: (item) => item,
        orientation: 'vertical',
        selectionLimit: null,
      };

      function TestComponent() {
        const [, dispatch] = useControllableReducer(reducer, undefined, { current: props });
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      }

      render(<TestComponent />);
      expect(reducer.getCalls()[0].args[1]).to.deep.equal({ ...actionToDispatch, props });
    });

    it('calls the provided external reducer', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const internalReducer = spy((state: ListState<string>, action: ListAction<string>) => {
        return state;
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const externalReducer = spy((state: ListState<string>, action: ListAction<string>) => {
        return state;
      });

      const actionToDispatch = { type: ActionTypes.setValue as const, value: ['b'], event: null };
      const props: UseListParametersWithDefaults<string> = {
        items: ['a', 'b', 'c'],
        defaultValue: ['a'],
        isItemDisabled: () => false,
        disableListWrap: false,
        disabledItemsFocusable: false,
        itemComparer: (a, b) => a === b,
        itemStringifier: (item) => item,
        orientation: 'vertical',
        selectionLimit: null,
      };

      function TestComponent() {
        const [, dispatch] = useControllableReducer(internalReducer, externalReducer, {
          current: props,
        });
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      }

      render(<TestComponent />);
      expect(internalReducer.notCalled).to.equal(true);
      expect(externalReducer.getCalls()[0].args[1]).to.deep.equal({ ...actionToDispatch, props });
    });

    it('calls onChange when the reducer returns a modified selected value', () => {
      const reducer = spy((state: ListState<string>) => {
        return {
          ...state,
          selectedValues: ['b'],
        };
      });

      const actionToDispatch = {
        type: ActionTypes.keyDown as const,
        event: null as unknown as React.KeyboardEvent, // not relevant here
      };
      const handleChange = spy();
      const handleHighlightChange = spy();

      function TestComponent() {
        const props: UseListParametersWithDefaults<string> = {
          items: ['a', 'b', 'c'],
          defaultValue: ['a'],
          isItemDisabled: () => false,
          disableListWrap: false,
          disabledItemsFocusable: false,
          itemComparer: (a, b) => a === b,
          itemStringifier: (item) => item,
          onChange: handleChange,
          onHighlightChange: handleHighlightChange,
          orientation: 'vertical',
          selectionLimit: null,
        };

        const propsRef = React.useRef(props);
        const [, dispatch] = useControllableReducer(reducer, undefined, propsRef);
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      }

      render(<TestComponent />);
      expect(handleChange.called).to.equal(true);
      expect(handleChange.getCalls()[0].args[1]).to.deep.equal(['b']);
      expect(handleHighlightChange.notCalled).to.equal(true);
    });

    it('calls onHighlightChange when the reducer returns a modified highlighted value', () => {
      const reducer = spy((state: ListState<string>) => {
        return {
          ...state,
          highlightedValue: 'b',
        };
      });

      const actionToDispatch = {
        type: ActionTypes.keyDown as const,
        event: null as unknown as React.KeyboardEvent, // not relevant here
      };
      const handleChange = spy();
      const handleHighlightChange = spy();

      function TestComponent() {
        const props: UseListParametersWithDefaults<string> = {
          items: ['a', 'b', 'c'],
          defaultValue: ['a'],
          isItemDisabled: () => false,
          disableListWrap: false,
          disabledItemsFocusable: false,
          itemComparer: (a, b) => a === b,
          itemStringifier: (item) => item,
          onChange: handleChange,
          onHighlightChange: handleHighlightChange,
          orientation: 'vertical',
          selectionLimit: null,
        };

        const propsRef = React.useRef(props);
        const [, dispatch] = useControllableReducer(reducer, undefined, propsRef);
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      }

      render(<TestComponent />);
      expect(handleHighlightChange.getCalls()[0].args[1]).to.equal('b');
      expect(handleChange.notCalled).to.equal(true);
    });
  });
});
