import { expect } from 'chai';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer } from 'test/utils';
import useControllableReducer from './useControllableReducer';
import {
  ActionTypes,
  ListboxAction,
  ListboxState,
  UseListboxPropsWithDefaults,
} from '@mui/base/useListbox';

describe('useControllableReducer', () => {
  const { render } = createRenderer();

  describe('dispatch', () => {
    it('calls the provided internal reducer', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const reducer = spy((state: ListboxState<string>, action: ListboxAction<string>) => {
        return state;
      });

      const actionToDispatch = { type: ActionTypes.setValue as const, value: 'b', event: null };
      const TestComponent = () => {
        const props: UseListboxPropsWithDefaults<string> = {
          options: ['a', 'b', 'c'],
          defaultValue: 'a',
          isOptionDisabled: () => false,
          disableListWrap: false,
          disabledItemsFocusable: false,
          optionComparer: (a, b) => a === b,
          optionStringifier: (option) => option,
          multiple: false,
        };
        const [, dispatch] = useControllableReducer(reducer, undefined, props);
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      };

      render(<TestComponent />);
      expect(reducer.getCalls()[0].args[1]).to.equal(actionToDispatch);
    });

    it('calls the provided external reducer', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const internalReducer = spy((state: ListboxState<string>, action: ListboxAction<string>) => {
        return state;
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const externalReducer = spy((state: ListboxState<string>, action: ListboxAction<string>) => {
        return state;
      });

      const actionToDispatch = { type: ActionTypes.setValue as const, value: 'b', event: null };
      const TestComponent = () => {
        const props: UseListboxPropsWithDefaults<string> = {
          options: ['a', 'b', 'c'],
          defaultValue: 'a',
          isOptionDisabled: () => false,
          disableListWrap: false,
          disabledItemsFocusable: false,
          optionComparer: (a, b) => a === b,
          optionStringifier: (option) => option,
          multiple: false,
        };
        const [, dispatch] = useControllableReducer(internalReducer, externalReducer, props);
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      };

      render(<TestComponent />);
      expect(internalReducer.notCalled).to.equal(true);
      expect(externalReducer.getCalls()[0].args[1]).to.equal(actionToDispatch);
    });

    it('calls onChange when the reducer returns a modified selected value', () => {
      const reducer = spy((state: ListboxState<string>) => {
        return {
          ...state,
          selectedValue: 'b',
        };
      });

      const actionToDispatch = { type: ActionTypes.setValue as const, value: 'b', event: null };
      const handleChange = spy();
      const handleHighlightChange = spy();

      const TestComponent = () => {
        const props: UseListboxPropsWithDefaults<string> = {
          options: ['a', 'b', 'c'],
          defaultValue: 'a',
          isOptionDisabled: () => false,
          disableListWrap: false,
          disabledItemsFocusable: false,
          optionComparer: (a, b) => a === b,
          optionStringifier: (option) => option,
          multiple: false,
          onChange: handleChange,
          onHighlightChange: handleHighlightChange,
        };
        const [, dispatch] = useControllableReducer(reducer, undefined, props);
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      };

      render(<TestComponent />);
      expect(handleChange.getCalls()[0].args[1]).to.equal('b');
      expect(handleHighlightChange.notCalled).to.equal(true);
    });

    it('calls onHighlightChange when the reducer returns a modified highlighted value', () => {
      const reducer = spy((state: ListboxState<string>) => {
        return {
          ...state,
          highlightedValue: 'b',
        };
      });

      const actionToDispatch = {
        type: ActionTypes.setHighlight as const,
        highlight: 'b',
        event: null,
      };
      const handleChange = spy();
      const handleHighlightChange = spy();

      const TestComponent = () => {
        const props: UseListboxPropsWithDefaults<string> = {
          options: ['a', 'b', 'c'],
          defaultValue: 'a',
          isOptionDisabled: () => false,
          disableListWrap: false,
          disabledItemsFocusable: false,
          optionComparer: (a, b) => a === b,
          optionStringifier: (option) => option,
          multiple: false,
          onChange: handleChange,
          onHighlightChange: handleHighlightChange,
        };
        const [, dispatch] = useControllableReducer(reducer, undefined, props);
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      };

      render(<TestComponent />);
      expect(handleHighlightChange.getCalls()[0].args[1]).to.equal('b');
      expect(handleChange.notCalled).to.equal(true);
    });
  });
});
