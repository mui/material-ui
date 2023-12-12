import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from '@mui-internal/test-utils';
import { CssTransition } from './CssTransition';
import { TransitionContext, TransitionContextValue } from '../useTransition';

const onExitedSpy = spy();
const onEnteredSpy = spy();

function TestTransitionContextProvider(props: {
  requestEnter: boolean;
  children?: React.ReactNode;
}) {
  const contextValue: TransitionContextValue = React.useMemo(
    () => ({
      requestEnter: props.requestEnter,
      onEntering: spy(),
      onEntered: onEnteredSpy,
      onExiting: spy(),
      onExited: onExitedSpy,
      hasExited: false,
      registerTransition: () => () => {},
    }),
    [props.requestEnter],
  );

  return (
    <TransitionContext.Provider value={contextValue}>{props.children}</TransitionContext.Provider>
  );
}

describe('CssTransition', () => {
  beforeEach(() => {
    onExitedSpy.resetHistory();
    onEnteredSpy.resetHistory();
  });

  const { render } = createRenderer();

  describe('prop: className', () => {
    it('applies it unconditionally', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter>
          <CssTransition className="foo" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const root = getByTestId('root');
      expect(root).to.have.class('foo');
    });
  });

  describe('prop: enterClassName', () => {
    it('applies it when requested to enter', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter>
          <CssTransition enterClassName="foo" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const root = getByTestId('root');
      expect(root).to.have.class('foo');
    });

    it('does not apply it when not requested to enter', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter={false}>
          <CssTransition enterClassName="foo" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const root = getByTestId('root');
      expect(root).not.to.have.class('foo');
    });
  });

  describe('prop: exitClassName', () => {
    it('applies it when requested to exit', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter={false}>
          <CssTransition exitClassName="foo" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const root = getByTestId('root');
      expect(root).to.have.class('foo');
    });

    it('does not apply it when not requested to exit', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter>
          <CssTransition exitClassName="foo" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const root = getByTestId('root');
      expect(root).not.to.have.class('foo');
    });
  });
});
