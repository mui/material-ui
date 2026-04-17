import { expect } from 'chai';
import { act, renderHook } from '@mui/internal-test-utils';
import { vi } from 'vitest';
import useQueryParameterState from './useQueryParameterState';

const useRouter = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => useRouter(),
}));

describe('useQueryParameterState', () => {
  const originalLocation = window.location;

  describe.skipIf(typeof navigator !== 'undefined' && !navigator.userAgent.includes('jsdom'))(
    'jsdom-only',
    () => {
      afterEach(() => {
        useRouter.mockReset();
        window.history.replaceState({}, '', '/');
      });

      afterAll(() => {
        Object.defineProperty(window, 'location', {
          configurable: true,
          value: originalLocation,
        });
      });

      it('syncs the state when the query parameter is removed externally', () => {
        const replace = vi.fn();
        const router = {
          pathname: '/material-ui/material-icons/',
          query: { selected: 'AreaChartTwoTone' },
          replace,
        };

        useRouter.mockImplementation(() => router);
        window.history.replaceState({}, '', '/material-ui/material-icons/?selected=AreaChartTwoTone');

        const { result, rerender } = renderHook(() => useQueryParameterState('selected', ''));

        expect(result.current[0]).to.equal('AreaChartTwoTone');

        act(() => {
          result.current[1]('');
        });

        expect(result.current[0]).to.equal('');

        act(() => {
          router.query = {};
          window.history.replaceState({}, '', '/material-ui/material-icons/');
          rerender();
        });

        expect(result.current[0]).to.equal('');
      });
    },
  );
});
