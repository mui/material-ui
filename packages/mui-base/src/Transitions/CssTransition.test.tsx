import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import { CssTransition } from './CssTransition';
import { TransitionContext, TransitionContextValue } from '../useTransition';

const onExitedSpy = spy();

function TestTransitionContextProvider(props: {
  requestEnter: boolean;
  children?: React.ReactNode;
}) {
  const contextValue: TransitionContextValue = React.useMemo(
    () => ({
      requestedEnter: props.requestEnter,
      onExited: onExitedSpy,
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
  });

  const { render, clock } = createRenderer();

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

  describe('prop: enterClassName, exitClassName', () => {
    clock.withFakeTimers();

    it('applies exitClassName when requested to exit', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter={false}>
          <CssTransition enterClassName="enter" exitClassName="exit" data-testid="root" />
        </TestTransitionContextProvider>,
      );

      const root = getByTestId('root');

      expect(root).to.have.class('exit');
      expect(root).not.to.have.class('enter');
      clock.runToLast();
    });

    it('applies exitClassName, then immediately enterClassName when requested to enter', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter>
          <CssTransition enterClassName="enter" exitClassName="exit" data-testid="root" />
        </TestTransitionContextProvider>,
      );

      const root = getByTestId('root');

      // briefly after mounting
      expect(root).to.have.class('exit');
      expect(root).not.to.have.class('enter');

      clock.runToLast();
      expect(root).to.have.class('enter');
      expect(root).not.to.have.class('exit');
    });
  });
});
