import { renderHook } from '@testing-library/react-hooks';
import { assert } from 'chai';
import { usePagination } from '.';

describe('usePagination', () => {
  it('has one page by default', () => {
    const { items } = renderHook(() => usePagination()).result.current;
    assert.strictEqual(items.length, 3);
    assert.strictEqual(items[1].page, 1);
  });

  it('has disabled previous & next buttons by default', () => {
    const { items } = renderHook(() => usePagination()).result.current;
    assert.strictEqual(items[0].type, 'previous');
    assert.strictEqual(items[0].disabled, true);
    assert.strictEqual(items[2].type, 'next');
    assert.strictEqual(items[2].disabled, true);
  });
  it('has a disabled previous button & an enabled next button when count > 1', () => {
    const { items } = renderHook(() => usePagination({ count: 2 })).result.current;
    assert.strictEqual(items[0].type, 'previous');
    assert.strictEqual(items[0].disabled, true);
    assert.strictEqual(items[3].type, 'next');
    assert.strictEqual(items[3].disabled, false);
    assert.strictEqual(items[3].page, 2);
  });
  it('has an enabled previous button & disabled next button when page === count', () => {
    const { items } = renderHook(() => usePagination({ count: 2, page: 2 })).result.current;
    assert.strictEqual(items[0].type, 'previous');
    assert.strictEqual(items[0].disabled, false);
    assert.strictEqual(items[0].page, 1);
    assert.strictEqual(items[3].type, 'next');
    assert.strictEqual(items[3].disabled, true);
  });
  it('has a disabled first button when showFirstButton === true', () => {
    const { items } = renderHook(() => usePagination({ showFirstButton: true })).result.current;
    assert.strictEqual(items[0].type, 'first');
    assert.strictEqual(items[0].disabled, true);
    assert.strictEqual(items[0].page, 1);
  });
  it('has a disabled last button when showLastButton === true', () => {
    const { items } = renderHook(() => usePagination({ showLastButton: true })).result.current;
    assert.strictEqual(items[3].type, 'last');
    assert.strictEqual(items[3].disabled, true);
    assert.strictEqual(items[3].page, 1);
  });
  it('has an enabled first button when showFirstButton === true && page > 1', () => {
    const { items } = renderHook(() =>
      usePagination({ showFirstButton: true, count: 2, page: 2 }),
    ).result.current;
    assert.strictEqual(items[0].type, 'first');
    assert.strictEqual(items[0].disabled, false);
    assert.strictEqual(items[0].page, 1);
  });
  it('has an enabled last button when showLastButton === true && page < count', () => {
    const { items } = renderHook(() =>
      usePagination({ showLastButton: true, count: 2 }),
    ).result.current;
    assert.strictEqual(items[4].type, 'last');
    assert.strictEqual(items[4].disabled, false);
    assert.strictEqual(items[4].page, 2);
  });
  it('has no ellipses when count <= 7', () => {
    const { items } = renderHook(() => usePagination({ count: 7 })).result.current;
    assert.strictEqual(items[1].page, 1);
    assert.strictEqual(items[2].page, 2);
    assert.strictEqual(items[3].page, 3);
    assert.strictEqual(items[4].page, 4);
    assert.strictEqual(items[5].page, 5);
    assert.strictEqual(items[6].page, 6);
    assert.strictEqual(items[7].page, 7);
  });
  it('has an end ellipsis by default when count >= 8', () => {
    const { items } = renderHook(() => usePagination({ count: 8 })).result.current;
    assert.strictEqual(items.length, 9);
    assert.strictEqual(items[2].page, 2);
    assert.strictEqual(items[6].type, 'end-ellipsis');
    assert.strictEqual(items[6].page, null);
  });
  it('has a start ellipsis when page >= 5', () => {
    const { items } = renderHook(() => usePagination({ count: 8, page: 5 })).result.current;
    assert.strictEqual(items[2].type, 'start-ellipsis');
    assert.strictEqual(items[2].page, null);
    assert.strictEqual(items[6].page, 7);
  });
  it('has start & end ellipsis when count >= 9', () => {
    const { items } = renderHook(() => usePagination({ count: 9, page: 5 })).result.current;
    assert.strictEqual(items.length, 9);
    assert.strictEqual(items[2].type, 'start-ellipsis');
    assert.strictEqual(items[2].page, null);
    assert.strictEqual(items[6].type, 'end-ellipsis');
    assert.strictEqual(items[6].page, null);
  });
  it('can have a reduced siblingCount', () => {
    const { items } = renderHook(() =>
      usePagination({ count: 7, page: 4, siblingCount: 0 }),
    ).result.current;
    assert.strictEqual(items.length, 7);
    assert.strictEqual(items[2].type, 'start-ellipsis');
    assert.strictEqual(items[3].page, 4);
    assert.strictEqual(items[4].type, 'end-ellipsis');
  });
  it('can have an increased siblingCount', () => {
    const { items } = renderHook(() =>
      usePagination({ count: 11, page: 6, siblingCount: 2 }),
    ).result.current;
    assert.strictEqual(items.length, 11);
    assert.strictEqual(items[2].type, 'start-ellipsis');
    assert.strictEqual(items[3].page, 4);
    assert.strictEqual(items[4].page, 5);
    assert.strictEqual(items[5].page, 6);
    assert.strictEqual(items[6].page, 7);
    assert.strictEqual(items[7].page, 8);
    assert.strictEqual(items[8].type, 'end-ellipsis');
  });
  it('can have an increased boundaryCount', () => {
    const { items } = renderHook(() =>
      usePagination({ count: 11, page: 6, boundaryCount: 2 }),
    ).result.current;
    assert.strictEqual(items.length, 11);
    assert.strictEqual(items[1].page, 1);
    assert.strictEqual(items[2].page, 2);
    assert.strictEqual(items[3].type, 'start-ellipsis');
    assert.strictEqual(items[7].type, 'end-ellipsis');
    assert.strictEqual(items[8].page, 10);
    assert.strictEqual(items[9].page, 11);
  });
});
