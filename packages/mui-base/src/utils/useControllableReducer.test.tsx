import { expect } from 'chai';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer } from 'test/utils';
import useControllableReducer from './useControllableReducer';
import {
  ControllableReducerParameters,
  SetStateAction,
  setStateActionType,
} from './useControllableReducer.types';

interface TestState {
  make: string;
  model: string;
  productionYear: number;
  features?: string[];
}

interface UpdateProductionYearAction {
  type: 'updateProductionYear';
  value: number;
  event: null;
}

interface UpdateFeaturesAction {
  type: 'updateFeatures';
  value: string[];
}

describe('useControllableReducer', () => {
  const { render } = createRenderer();

  describe('param: reducer', () => {
    it('calls the provided reducer', () => {
      const reducer = spy((state: TestState, action: SetStateAction<TestState>) => {
        return {
          ...state,
          ...action.value,
        };
      });

      const actionToDispatch: SetStateAction<TestState> = {
        type: setStateActionType,
        value: { make: 'BMW' },
        event: null,
      };

      const reducerParameters: ControllableReducerParameters<
        TestState,
        SetStateAction<TestState>
      > = {
        reducer,
        controlledProps: {},
        initialState: { make: 'Mazda', model: '3', productionYear: 2022 },
      };

      function TestComponent() {
        const [state, dispatch] = useControllableReducer(reducerParameters);
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return (
          <p>
            {state.make} {state.model} ({state.productionYear})
          </p>
        );
      }

      const { container } = render(<TestComponent />);
      expect(reducer.getCalls()[0].args[1]).to.deep.equal({ ...actionToDispatch });
      expect(container.firstChild).to.have.text('BMW 3 (2022)');
    });
  });

  describe('param: initialProps', () => {
    it('sets the initial state', () => {
      const reducerParameters: ControllableReducerParameters<
        TestState,
        SetStateAction<TestState>
      > = {
        reducer: (state) => state,
        controlledProps: {},
        initialState: { make: 'Mazda', model: '3', productionYear: 2022 },
      };

      function TestComponent() {
        const [state] = useControllableReducer(reducerParameters);
        return (
          <p>
            {state.make} {state.model} ({state.productionYear})
          </p>
        );
      }

      const { container } = render(<TestComponent />);
      expect(container.firstChild).to.have.text('Mazda 3 (2022)');
    });
  });

  describe('param: controlledProps', () => {
    it('overwrites the state field with the corresponding controlled prop value', () => {
      const reducer = (state: TestState, action: SetStateAction<TestState>) => {
        // Even though the initial state is set to 'Mazda', the controlled prop overwrites it.
        expect(state.make).to.equal('Tesla');

        return {
          ...state,
          ...action.value,
        };
      };

      const actionToDispatch: SetStateAction<TestState> = {
        type: setStateActionType,
        value: { make: 'BMW' },
        event: null,
      };

      const reducerParameters: ControllableReducerParameters<
        TestState,
        SetStateAction<TestState>
      > = {
        reducer,
        initialState: { make: 'Mazda', model: '3', productionYear: 2022 },
      };

      function TestComponent(props: { make: string }) {
        const [state, dispatch] = useControllableReducer<TestState, SetStateAction<TestState>>({
          ...reducerParameters,
          controlledProps: { make: props.make },
        });

        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return (
          <p>
            {state.make} {state.model} ({state.productionYear})
          </p>
        );
      }

      const { container, setProps } = render(<TestComponent make="Tesla" />);
      expect(container.firstChild).to.have.text('Tesla 3 (2022)');

      setProps({ make: 'Mazda' });
      expect(container.firstChild).to.have.text('Mazda 3 (2022)');
    });
  });

  describe('param: stateComparers', () => {
    it('uses the provided state comparers', () => {
      const reducer = (state: TestState, action: UpdateFeaturesAction) => {
        return {
          ...state,
          features: action.value,
        };
      };

      const actionToDispatch: UpdateFeaturesAction = {
        type: 'updateFeatures',
        value: ['ABS', 'Traction control'],
      };

      const onStateChangeSpy = spy();

      const reducerParameters: ControllableReducerParameters<TestState, UpdateFeaturesAction> = {
        reducer,
        controlledProps: {},
        initialState: {
          make: 'Mazda',
          model: '3',
          productionYear: 2022,
          features: ['ABS', 'Traction control'],
        },
        stateComparers: {
          // deep comparison of the features array
          features: (a, b) =>
            a !== undefined &&
            b !== undefined &&
            a.length === b.length &&
            a.every((v, i) => v === b[i]),
        },
        onStateChange: onStateChangeSpy,
      };

      function TestComponent() {
        const [, dispatch] = useControllableReducer(reducerParameters);

        // The features array is new, but it contents remain the same.
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      }

      render(<TestComponent />);
      expect(onStateChangeSpy.callCount).to.equal(0);
    });
  });

  describe('param: onStateChange', () => {
    it('calls onStateChange when the reducer returns a modified selected value', () => {
      const reducer = spy((state: TestState, action: UpdateProductionYearAction) => {
        return {
          ...state,
          productionYear: action.value,
        };
      });

      const actionToDispatch = {
        type: 'updateProductionYear' as const,
        event: null,
        value: 2010,
      };

      const handleChange = spy();

      const reducerParameters: ControllableReducerParameters<
        TestState,
        UpdateProductionYearAction
      > = {
        reducer,
        controlledProps: {},
        initialState: { make: 'Mazda', model: '3', productionYear: 2022 },
        onStateChange: handleChange,
      };

      function TestComponent() {
        const [, dispatch] = useControllableReducer(reducerParameters);
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      }

      render(<TestComponent />);
      expect(handleChange.called).to.equal(true);
      expect(handleChange.getCalls()[0].args).to.deep.equal([
        null,
        'productionYear',
        2010,
        'updateProductionYear',
        {
          make: 'Mazda',
          model: '3',
          productionYear: 2010,
        },
      ]);
    });

    it('does not call onStateChange when the state is updated via the SetStateAction', () => {
      const reducer = spy((state: TestState, action: SetStateAction<TestState>) => {
        return {
          ...state,
          ...action.value,
        };
      });

      const actionToDispatch: SetStateAction<TestState> = {
        type: setStateActionType,
        event: null,
        value: { productionYear: 2010 },
      };

      const handleChange = spy();

      const reducerParameters: ControllableReducerParameters<
        TestState,
        SetStateAction<TestState>
      > = {
        reducer,
        controlledProps: {},
        initialState: { make: 'Mazda', model: '3', productionYear: 2022 },
        onStateChange: handleChange,
      };

      function TestComponent() {
        const [, dispatch] = useControllableReducer(reducerParameters);
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return null;
      }

      render(<TestComponent />);
      expect(handleChange.called).to.equal(false);
    });
  });

  describe('param: actionAddOn', () => {
    it('augments actions with the object provided to the reducer', () => {
      const reducer = (
        state: TestState,
        action: SetStateAction<TestState> & { overrideProductionYear: number },
      ) => {
        return {
          ...state,
          ...action.value,
          productionYear: action.overrideProductionYear,
        };
      };

      const actionToDispatch: SetStateAction<TestState> = {
        type: setStateActionType,
        event: null,
        value: { productionYear: 2010, make: 'BMW' },
      };

      const reducerParameters: ControllableReducerParameters<
        TestState,
        SetStateAction<TestState>,
        { overrideProductionYear: number }
      > = {
        reducer,
        controlledProps: {},
        initialState: { make: 'Mazda', model: '3', productionYear: 2022 },
        actionAddOn: { overrideProductionYear: 2016 },
      };

      function TestComponent() {
        const [state, dispatch] = useControllableReducer(reducerParameters);
        React.useEffect(() => dispatch(actionToDispatch), [dispatch]);
        return (
          <p>
            {state.make} {state.model} ({state.productionYear})
          </p>
        );
      }

      const { container } = render(<TestComponent />);
      expect(container.firstChild).to.have.text('BMW 3 (2016)');
    });
  });
});
