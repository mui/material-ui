import { expect } from 'chai';
import { spy } from 'sinon';
import mergeEventHandlers from './mergeEventHandlers';

describe('mergeEventHandlers', () => {
  it('calls the provided event handlers', () => {
    const callLog: string[] = [];

    const ownHandlers = {
      onClick: (_: any, next: () => void) => {
        callLog.push('own');
        next();
      },
    };

    const externalHandlers = {
      onClick: () => callLog.push('external'),
    };

    const mergedHandlers = mergeEventHandlers(ownHandlers, externalHandlers);
    mergedHandlers.onClick(null);

    expect(callLog).to.deep.equal(['own', 'external']);
  });

  it('calls the last provided handler if there is more than one available', () => {
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

    const mergedHandlers = mergeEventHandlers(ownHandlers, externalHandlers1, externalHandlers2);
    mergedHandlers.onClick(null);

    expect(callLog).to.deep.equal(['own', 'external2']);
  });

  it('does not execute external handlers if own one does not call them explicitly', () => {
    const callLog: string[] = [];

    const ownHandlers = {
      onClick: () => callLog.push('own'),
    };

    const externalHandlers = {
      onClick: () => callLog.push('external'),
    };

    const mergedHandlers = mergeEventHandlers(ownHandlers, externalHandlers);
    mergedHandlers.onClick(null);

    expect(callLog).to.deep.equal(['own']);
  });

  it('does not require external handlers to be defined', () => {
    const ownHandlers = {
      onClick: spy(),
    };

    const mergedHandlers = mergeEventHandlers(ownHandlers, {});
    mergedHandlers.onClick(null);
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

    const mergedHandlers = mergeEventHandlers({}, externalHandlers1, externalHandlers2);
    mergedHandlers.onClick(null);

    expect(callLog).to.deep.equal(['external2']);
  });
});
