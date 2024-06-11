import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import { CssAnimation } from './CssAnimation';
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

describe('CssAnimation', () => {
  beforeEach(() => {
    onExitedSpy.resetHistory();
  });

  const { render } = createRenderer();

  describe('prop: className', () => {
    it('applies it unconditionally', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter>
          <CssAnimation className="foo" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const animationRoot = getByTestId('root');
      expect(animationRoot).to.have.class('foo');
    });
  });

  describe('prop: enterClassName', () => {
    it('applies it when requested to enter', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter>
          <CssAnimation enterClassName="foo" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const animationRoot = getByTestId('root');
      expect(animationRoot).to.have.class('foo');
    });

    it('does not apply it when not requested to enter', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter={false}>
          <CssAnimation enterClassName="foo" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const animationRoot = getByTestId('root');
      expect(animationRoot).not.to.have.class('foo');
    });
  });

  describe('prop: exitClassName', () => {
    it('applies it when requested to exit', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter={false}>
          <CssAnimation exitClassName="foo" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const animationRoot = getByTestId('root');
      expect(animationRoot).to.have.class('foo');
    });

    it('does not apply it when not requested to exit', () => {
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter>
          <CssAnimation exitClassName="foo" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const animationRoot = getByTestId('root');
      expect(animationRoot).not.to.have.class('foo');
    });
  });

  describe('detecting animation end', () => {
    it('calls onExited when the exit animation ends', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const styles = `
        @keyframes exit {}
        .exit {
          animation-name: exit;
          animation-duration: 10ms;
        }
      `;
      const { getByTestId } = render(
        <TestTransitionContextProvider requestEnter={false}>
          <style>{styles}</style>
          <CssAnimation exitClassName="exit" exitAnimationName="exit" data-testid="root" />
        </TestTransitionContextProvider>,
      );
      const animationRoot = getByTestId('root');

      const promise = new Promise<void>((resolve) => {
        animationRoot.addEventListener('animationend', () => {
          // wait for internal event handlers to be called
          requestAnimationFrame(() => {
            expect(onExitedSpy.callCount).to.equal(1);
            resolve();
          });
        });
      });

      return promise;
    });
  });
});
