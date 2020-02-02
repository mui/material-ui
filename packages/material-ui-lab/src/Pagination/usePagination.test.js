import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import { usePagination } from '.';

describe('usePagination', () => {
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
    const { items } = renderHook(() =>
      usePagination({ showFirstButton: true, count: 2, page: 2 }),
    ).result.current;
    expect(items[0]).to.have.property('type', 'first');
    expect(items[0]).to.have.property('disabled', false);
    expect(items[0]).to.have.property('page', 1);
  });
  it('has an enabled last button when showLastButton === true && page < count', () => {
    const { items } = renderHook(() =>
      usePagination({ showLastButton: true, count: 2 }),
    ).result.current;
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
    const { items } = renderHook(() =>
      usePagination({ count: 7, page: 4, siblingCount: 0 }),
    ).result.current;
    expect(items).to.have.length(7);
    expect(items[2]).to.have.property('type', 'start-ellipsis');
    expect(items[3]).to.have.property('page', 4);
    expect(items[4]).to.have.property('type', 'end-ellipsis');
  });
  it('can have an increased siblingCount', () => {
    const { items } = renderHook(() =>
      usePagination({ count: 11, page: 6, siblingCount: 2 }),
    ).result.current;
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
    const { items } = renderHook(() =>
      usePagination({ count: 11, page: 6, boundaryCount: 2 }),
    ).result.current;
    expect(items).to.have.length(11);
    expect(items[1]).to.have.property('page', 1);
    expect(items[2]).to.have.property('page', 2);
    expect(items[3]).to.have.property('type', 'start-ellipsis');
    expect(items[7]).to.have.property('type', 'end-ellipsis');
    expect(items[8]).to.have.property('page', 10);
    expect(items[9]).to.have.property('page', 11);
  });
});
