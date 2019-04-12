import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import setRef from './setRef';

describe('setRef', () => {
  it('can handle callback refs', () => {
    const ref = spy();
    const instance = 'proxy';

    setRef(ref, instance);

    assert.strictEqual(ref.called, true);
    assert.strictEqual(ref.firstCall.args[0], instance);
  });

  it('can handle ref objects', () => {
    const ref = React.createRef();
    const instance = 'proxy';

    setRef(ref, instance);

    assert.strictEqual(ref.current, instance);
  });

  it('ignores falsy refs without errors', () => {
    const instance = 'proxy';

    // all no-ops
    setRef(undefined, instance);
    setRef(null, instance);
  });

  it('throws on legacy string refs', () => {
    assert.throws(() => setRef('stringRef1', 'proxy'));
  });
});
