// @flow

import { assert } from 'chai';
import createBroadcast from 'brcast';
import themeListener, { CHANNEL } from './themeListener';

describe('themeListener', () => {
  it('should be able to get the initial state', () => {
    const broadcast = createBroadcast();
    const initialState = {};
    broadcast.setState(initialState);

    assert.strictEqual(themeListener.initial({ [CHANNEL]: broadcast }), initialState);
  });

  it('should not complain if the context is not defined', () => {
    assert.strictEqual(themeListener.initial({}), null);
  });

  it('should be able to subscribe to the event stream', done => {
    const broadcast = createBroadcast();
    const initialState = {};
    const secondState = {};
    broadcast.setState(initialState);

    themeListener.subscribe(
      {
        [CHANNEL]: broadcast,
      },
      state => {
        assert.strictEqual(state, secondState);
        done();
      },
    );

    broadcast.setState(secondState);
  });
});
