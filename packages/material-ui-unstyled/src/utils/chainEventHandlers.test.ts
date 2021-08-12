import { expect } from 'chai';
import { spy } from 'sinon';
import chainEventHandlers from './chainEventHandlers';

describe('chainEventHandlers', () => {
  it('calls the provided event handlers in order', () => {
    const callLog: string[] = [];

    const ownHandlers = {
      onClick: (_: any, next: () => void) => {
        callLog.push('own');
        next();
      },
    };

    const externalHandlers1 = {
      onClick: () => callLog.push('external1'),
    };

    const externalHandlers2 = {
      onClick: () => callLog.push('external2'),
    };

    const chainedHandlers = chainEventHandlers(ownHandlers, externalHandlers1, externalHandlers2);
    chainedHandlers.onClick(null);

    expect(callLog).to.deep.equal(['own', 'external1', 'external2']);
  });

  it('does not execute external handlers if own one does not call them explicitly', () => {
    const callLog: string[] = [];

    const ownHandlers = {
      onClick: () => callLog.push('own'),
    };

    const externalHandlers = {
      onClick: () => callLog.push('external1'),
    };

    const chainedHandlers = chainEventHandlers(ownHandlers, externalHandlers);
    chainedHandlers.onClick(null);

    expect(callLog).to.deep.equal(['own']);
  });

  it('does not require external handlers to be defined', () => {
    const ownHandlers = {
      onClick: spy(),
    };

    const chainedHandlers = chainEventHandlers(ownHandlers, {});
    chainedHandlers.onClick(null);
    expect(ownHandlers.onClick.calledOnce).to.equal(true);
  });

  it('does not require own handlers to be defined', () => {
    const callLog: string[] = [];

    const externalHandlers1 = {
      onClick: () => callLog.push('external1'),
    };

    const externalHandlers2 = {
      onClick: () => callLog.push('external2'),
    };

    const chainedHandlers = chainEventHandlers({}, externalHandlers1, externalHandlers2);
    chainedHandlers.onClick(null);

    expect(callLog).to.deep.equal(['external1', 'external2']);
  });
});
