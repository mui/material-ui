import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { normalizedTransitionCallback } from './utils';

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
