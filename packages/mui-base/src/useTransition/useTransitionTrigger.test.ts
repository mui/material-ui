import { expect } from 'chai';
import { renderHook } from '@testing-library/react';
import { act } from '@mui/internal-test-utils';
import { useTransitionTrigger } from './useTransitionTrigger';

describe('useTransitionTrigger', () => {
  [true, false].forEach((requestEnter) =>
    it(`should not be in transition and have exited = ${!requestEnter} initially when requestEnter = ${requestEnter}`, () => {
      const { result } = renderHook(() => useTransitionTrigger(requestEnter));
      const { hasExited } = result.current;
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

      rerender(false);
      expect(result.current.hasExited).to.equal(true);
    });
  });

  describe('when a child transition is registered', () => {
    it('should wait for onExited callback to change its state', () => {
      const { result, rerender } = renderHook((requestEnter: boolean = false) =>
        useTransitionTrigger(requestEnter),
      );

      act(() => {
        result.current.contextValue.registerTransition();
      });

      rerender(true);
      expect(result.current.hasExited).to.equal(false);

      rerender(false);
      expect(result.current.hasExited).to.equal(false);

      act(() => {
        result.current.contextValue.onExited();
      });

      expect(result.current.hasExited).to.equal(true);
    });
  });
});
