// @flow

import { assert } from 'chai';
import createBroadcast from 'brcast';
import themeListener from './themeListener';

const CHANNEL = 'material-ui';

describe('themeListener', () => {
  it('should be able to get the inital state', () => {
    const broadcast = createBroadcast();
    const initalState = {};
    broadcast.setState(initalState);

    assert.strictEqual(
      themeListener.initial({
        [CHANNEL]: broadcast,
      }),
      initalState,
    );
  });

  it('should not complain if the context is not defined', () => {
    assert.strictEqual(themeListener.initial({}), null);
  });

  it('should be able to subscribe to the event stream', done => {
    const broadcast = createBroadcast();
    const initalState = {};
    const secondState = {};
    broadcast.setState(initalState);

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
