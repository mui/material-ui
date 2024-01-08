import { expect } from 'chai';
import { renderHook } from '@testing-library/react';
import { act } from '@mui-internal/test-utils';
import { useTransitionTrigger } from './useTransitionTrigger';

describe('useTransitionTrigger', () => {
  [true, false].forEach((requestEnter) =>
    it(`should not be in transition and have exited = ${!requestEnter} initially when requestEnter = ${requestEnter}`, () => {
      const { result } = renderHook(() => useTransitionTrigger(requestEnter));
      const { transitionInProgress, hasExited } = result.current;
      expect(transitionInProgress).to.equal(false);
      expect(hasExited).to.equal(!requestEnter);
    }),
  );

  describe('when no child transitions exist', () => {
    it('should change exited state immediately when requestEnter changes', () => {
      const { result, rerender } = renderHook((requestEnter: boolean = false) =>
        useTransitionTrigger(requestEnter),
      );

      rerender(true);
      expect(result.current.hasExited).to.equal(false);
      expect(result.current.transitionInProgress).to.equal(false);

      rerender(false);
      expect(result.current.hasExited).to.equal(true);
      expect(result.current.transitionInProgress).to.equal(false);
    });
  });

  describe('when a child transition is registered', () => {
    it('should wait for callbacks to change its state', () => {
      const { result, rerender } = renderHook((requestEnter: boolean = false) =>
        useTransitionTrigger(requestEnter),
      );

      result.current.contextValue.registerTransition();

      rerender(true);
      expect(result.current.hasExited).to.equal(true);
      expect(result.current.transitionInProgress).to.equal(false);

      act(() => {
        result.current.contextValue.onEntering();
      });
      expect(result.current.hasExited).to.equal(false);
      expect(result.current.transitionInProgress).to.equal(true);

      act(() => {
        result.current.contextValue.onEntered();
      });
      expect(result.current.hasExited).to.equal(false);
      expect(result.current.transitionInProgress).to.equal(false);

      rerender(false);
      expect(result.current.hasExited).to.equal(false);
      expect(result.current.transitionInProgress).to.equal(false);

      act(() => {
        result.current.contextValue.onExiting();
      });
      expect(result.current.hasExited).to.equal(false);
      expect(result.current.transitionInProgress).to.equal(true);

      act(() => {
        result.current.contextValue.onExited();
      });
      expect(result.current.hasExited).to.equal(true);
      expect(result.current.transitionInProgress).to.equal(false);
    });
  });
});
