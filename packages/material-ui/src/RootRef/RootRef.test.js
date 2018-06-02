import React from 'react';
import { assert } from 'chai';
import { createMount } from '../test-utils';
import RootRef from './RootRef';

describe('<RootRef />', () => {
  it('call rootRef function on mount and unmount', () => {
    const mount = createMount();
    const Fn = () => <div />;
    const results = [];
    mount(
      <RootRef rootRef={node => results.push(node)}>
        <Fn />
      </RootRef>,
    );
    assert.strictEqual(results.length, 1);
    assert.ok(results[0] instanceof window.HTMLDivElement);

    mount.cleanUp();
    assert.strictEqual(results.length, 2);
    assert.strictEqual(results[1], null);
  });

  it('set rootRef current field on mount and unmount', () => {
    const mount = createMount();
    const Fn = () => <div />;
    const ref = { current: null };
    mount(
      <RootRef rootRef={ref}>
        <Fn />
      </RootRef>,
    );
    assert.ok(ref.current instanceof window.HTMLDivElement);

    mount.cleanUp();
    assert.strictEqual(ref.current, null);
  });
});
