import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getTranslateOffsets, normalizedTransitionCallback } from './utils';

describe('getTranslateOffsets', () => {
  it('extracts matrix offsets', () => {
    expect(getTranslateOffsets('matrix(1, 0, 0, 1, 20, 30)')).to.deep.equal({
      offsetX: 20,
      offsetY: 30,
    });
  });

  it('extracts matrix3d offsets', () => {
    expect(
      getTranslateOffsets('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 40, 50, 0, 1)'),
    ).to.deep.equal({
      offsetX: 40,
      offsetY: 50,
    });
  });

  it('extracts translate offsets', () => {
    expect(getTranslateOffsets('translate(60px, 70px)')).to.deep.equal({
      offsetX: 60,
      offsetY: 70,
    });
  });

  it('extracts translate3d offsets', () => {
    expect(getTranslateOffsets('translate3d(80px, 90px, 0px)')).to.deep.equal({
      offsetX: 80,
      offsetY: 90,
    });
  });

  it('extracts single-axis translate offsets', () => {
    expect(getTranslateOffsets('translateX(100px)')).to.deep.equal({
      offsetX: 100,
      offsetY: 0,
    });
    expect(getTranslateOffsets('translateY(110px)')).to.deep.equal({
      offsetX: 0,
      offsetY: 110,
    });
  });

  it('returns zero offsets for empty, none, or unsupported transforms', () => {
    const defaultOffsets = { offsetX: 0, offsetY: 0 };

    expect(getTranslateOffsets(undefined)).to.deep.equal(defaultOffsets);
    expect(getTranslateOffsets('none')).to.deep.equal(defaultOffsets);
    expect(getTranslateOffsets('rotate(45deg)')).to.deep.equal(defaultOffsets);
  });
});

describe('normalizedTransitionCallback', () => {
  it('resolves node from ref and passes it to callback', () => {
    const node = document.createElement('div');
    const nodeRef = { current: node } as React.RefObject<HTMLElement>;
    const callback = spy();

    const handler = normalizedTransitionCallback(nodeRef, callback);
    handler();

    expect(callback.calledOnce).to.equal(true);
    expect(callback.firstCall.args[0]).to.equal(node);
  });

  it('forwards isAppearing boolean when present', () => {
    const node = document.createElement('div');
    const nodeRef = { current: node } as React.RefObject<HTMLElement>;
    const callback = spy();

    const handler = normalizedTransitionCallback(nodeRef, callback);
    handler(true);

    expect(callback.calledOnce).to.equal(true);
    expect(callback.firstCall.args[0]).to.equal(node);
    expect(callback.firstCall.args[1]).to.equal(true);
  });

  it('omits isAppearing when undefined', () => {
    const node = document.createElement('div');
    const nodeRef = { current: node } as React.RefObject<HTMLElement>;
    const callback = spy();

    const handler = normalizedTransitionCallback(nodeRef, callback);
    handler(undefined);

    expect(callback.calledOnce).to.equal(true);
    expect(callback.firstCall.args).to.have.lengthOf(1);
  });

  it('does not throw when callback is undefined', () => {
    const nodeRef = { current: document.createElement('div') } as React.RefObject<HTMLElement>;

    const handler = normalizedTransitionCallback(nodeRef, undefined);
    expect(() => handler()).not.to.throw();
  });
});
