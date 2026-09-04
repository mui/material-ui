import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import usePagination from '@mui/material/usePagination';

describe('usePagination', () => {
  const { render } = createRenderer();
  const serialize = (items) => items.map((item) => (item.type === 'page' ? item.page : item.type));

  const renderHook = (useHook) => {
    const result = React.createRef();
    function TestCase() {
      const hookResult = useHook();
      React.useEffect(() => {
        result.current = hookResult;
      }, [hookResult]);
      return null;
    }
    render(<TestCase />);
    return { result };
  };

  it('has one page by default', () => {
    const { items } = renderHook(() => usePagination()).result.current;
    expect(items).to.have.length(3);
    expect(items[1]).to.have.property('page', 1);
  });

  it('has disabled previous & next buttons by default', () => {
    const { items } = renderHook(() => usePagination()).result.current;
    expect(items[0]).to.have.property('type', 'previous');
    expect(items[0]).to.have.property('disabled', true);
    expect(items[2]).to.have.property('type', 'next');
    expect(items[2]).to.have.property('disabled', true);
  });

  it('has a disabled previous button & an enabled next button when count > 1', () => {
    const { items } = renderHook(() => usePagination({ count: 2 })).result.current;
    expect(items[0]).to.have.property('type', 'previous');
    expect(items[0]).to.have.property('disabled', true);
    expect(items[3]).to.have.property('type', 'next');
    expect(items[3]).to.have.property('disabled', false);
    expect(items[3]).to.have.property('page', 2);
  });

  it('has an enabled previous button & disabled next button when page === count', () => {
    const { items } = renderHook(() => usePagination({ count: 2, page: 2 })).result.current;
    expect(items[0]).to.have.property('type', 'previous');
    expect(items[0]).to.have.property('disabled', false);
    expect(items[0]).to.have.property('page', 1);
    expect(items[3]).to.have.property('type', 'next');
    expect(items[3]).to.have.property('disabled', true);
  });

  it('has a disabled first button when showFirstButton === true', () => {
    const { items } = renderHook(() => usePagination({ showFirstButton: true })).result.current;
    expect(items[0]).to.have.property('type', 'first');
    expect(items[0]).to.have.property('disabled', true);
    expect(items[0]).to.have.property('page', 1);
  });

  it('has a disabled last button when showLastButton === true', () => {
    const { items } = renderHook(() => usePagination({ showLastButton: true })).result.current;
    expect(items[3]).to.have.property('type', 'last');
    expect(items[3]).to.have.property('disabled', true);
    expect(items[3]).to.have.property('page', 1);
  });

  it('has an enabled first button when showFirstButton === true && page > 1', () => {
    const { items } = renderHook(() => usePagination({ showFirstButton: true, count: 2, page: 2 }))
      .result.current;
    expect(items[0]).to.have.property('type', 'first');
    expect(items[0]).to.have.property('disabled', false);
    expect(items[0]).to.have.property('page', 1);
  });

  it('has an enabled last button when showLastButton === true && page < count', () => {
    const { items } = renderHook(() => usePagination({ showLastButton: true, count: 2 })).result
      .current;
    expect(items[4]).to.have.property('type', 'last');
    expect(items[4]).to.have.property('disabled', false);
    expect(items[4]).to.have.property('page', 2);
  });

  it('has no ellipses when count <= 7', () => {
    const { items } = renderHook(() => usePagination({ count: 7 })).result.current;
    expect(items[1]).to.have.property('page', 1);
    expect(items[2]).to.have.property('page', 2);
    expect(items[3]).to.have.property('page', 3);
    expect(items[4]).to.have.property('page', 4);
    expect(items[5]).to.have.property('page', 5);
    expect(items[6]).to.have.property('page', 6);
    expect(items[7]).to.have.property('page', 7);
  });

  it('has an end ellipsis by default when count >= 8', () => {
    const { items } = renderHook(() => usePagination({ count: 8 })).result.current;
    expect(items).to.have.length(9);
    expect(items[2]).to.have.property('page', 2);
    expect(items[6]).to.have.property('type', 'end-ellipsis');
    expect(items[6]).to.have.property('page', null);
  });

  it('has a start ellipsis when page >= 5', () => {
    const { items } = renderHook(() => usePagination({ count: 8, page: 5 })).result.current;
    expect(items[2]).to.have.property('type', 'start-ellipsis');
    expect(items[2]).to.have.property('page', null);
    expect(items[6]).to.have.property('page', 7);
  });

  it('has start & end ellipsis when count >= 9', () => {
    const { items } = renderHook(() => usePagination({ count: 9, page: 5 })).result.current;
    expect(items).to.have.length(9);
    expect(items[2]).to.have.property('type', 'start-ellipsis');
    expect(items[2]).to.have.property('page', null);
    expect(items[6]).to.have.property('type', 'end-ellipsis');
    expect(items[6]).to.have.property('page', null);
  });

  it('can have a reduced siblingCount', () => {
    const { items } = renderHook(() => usePagination({ count: 7, page: 4, siblingCount: 0 })).result
      .current;
    expect(items).to.have.length(7);
    expect(items[2]).to.have.property('type', 'start-ellipsis');
    expect(items[3]).to.have.property('page', 4);
    expect(items[4]).to.have.property('type', 'end-ellipsis');
  });

  it('can have an increased siblingCount', () => {
    const { items } = renderHook(() => usePagination({ count: 11, page: 6, siblingCount: 2 }))
      .result.current;
    expect(items).to.have.length(11);
    expect(items[2]).to.have.property('type', 'start-ellipsis');
    expect(items[3]).to.have.property('page', 4);
    expect(items[4]).to.have.property('page', 5);
    expect(items[5]).to.have.property('page', 6);
    expect(items[6]).to.have.property('page', 7);
    expect(items[7]).to.have.property('page', 8);
    expect(items[8]).to.have.property('type', 'end-ellipsis');
  });

  it('can have an increased boundaryCount', () => {
    const { items } = renderHook(() => usePagination({ count: 11, page: 6, boundaryCount: 2 }))
      .result.current;
    expect(items).to.have.length(11);
    expect(items[1]).to.have.property('page', 1);
    expect(items[2]).to.have.property('page', 2);
    expect(items[3]).to.have.property('type', 'start-ellipsis');
    expect(items[7]).to.have.property('type', 'end-ellipsis');
    expect(items[8]).to.have.property('page', 10);
    expect(items[9]).to.have.property('page', 11);
  });

  it('uses a compact layout when boundaryCount and siblingCount are zero', () => {
    [1, 6, 11].forEach((page) => {
      const items = renderHook(() =>
        usePagination({ count: 11, page, boundaryCount: 0, siblingCount: 0 }),
      ).result.current.items;

      expect(serialize(items)).to.deep.equal(['previous', page, 'next']);
    });
  });

  it('does not render a page when count is zero', () => {
    const items = renderHook(() => usePagination({ count: 0, boundaryCount: 0, siblingCount: 0 }))
      .result.current.items;

    expect(serialize(items)).to.deep.equal(['previous', 'next']);
    expect(items[0]).to.have.property('disabled', true);
    expect(items[1]).to.have.property('disabled', true);
  });

  it('does not render a stale uncontrolled page when count decreases', () => {
    const result = React.createRef();

    function TestCase({ count }) {
      const hookResult = usePagination({
        count,
        defaultPage: 11,
        boundaryCount: 0,
        siblingCount: 0,
      });
      React.useEffect(() => {
        result.current = hookResult;
      }, [hookResult]);
      return null;
    }

    const { rerender } = render(<TestCase count={11} />);
    expect(serialize(result.current.items)).to.deep.equal(['previous', 11, 'next']);

    rerender(<TestCase count={5} />);
    expect(serialize(result.current.items)).to.deep.equal([
      'previous',
      'start-ellipsis',
      4,
      5,
      'next',
    ]);
  });

  it('does not render an out-of-range controlled page', () => {
    const items = renderHook(() =>
      usePagination({ count: 5, page: 0, boundaryCount: 0, siblingCount: 0 }),
    ).result.current.items;

    expect(serialize(items)).to.deep.equal(['previous', 1, 2, 'end-ellipsis', 'next']);
  });

  it('should support boundaryCount={0}', () => {
    const items = renderHook(() =>
      usePagination({ count: 11, page: 6, boundaryCount: 0, siblingCount: 1 }),
    ).result.current.items;

    expect(serialize(items)).to.deep.equal([
      'previous',
      'start-ellipsis',
      5,
      6,
      7,
      'end-ellipsis',
      'next',
    ]);
  });
});
