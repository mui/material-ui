import React from 'react';
import { assert } from 'chai';
import { createMount } from '../test-utils';
import RootRef from './RootRef';

const Fn = () => <div />;

describe('<RootRef />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('call rootRef function on mount and unmount', () => {
    const results = [];
    const wrapper = mount(
      <RootRef rootRef={ref => results.push(ref)}>
        <Fn />
      </RootRef>,
    );
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0] instanceof window.HTMLDivElement, true);
    wrapper.unmount();
    assert.strictEqual(results.length, 2);
    assert.strictEqual(results[1], null);
  });

  it('set rootRef current field on mount and unmount', () => {
    const ref = React.createRef();
    const wrapper = mount(
      <RootRef rootRef={ref}>
        <Fn />
      </RootRef>,
    );
    assert.strictEqual(ref.current instanceof window.HTMLDivElement, true);
    wrapper.unmount();
    assert.strictEqual(ref.current, null);
  });

  it('should support providing a new rootRef', () => {
    const results = [];
    const wrapper = mount(
      <RootRef rootRef={ref => results.push(ref)}>
        <Fn />
      </RootRef>,
    );
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0] instanceof window.HTMLDivElement, true);
    wrapper.setProps({
      rootRef: ref => results.push(ref),
    });
    assert.strictEqual(results.length, 3);
    assert.strictEqual(results[1], null);
    assert.strictEqual(results[2] instanceof window.HTMLDivElement, true);
    wrapper.unmount();
    assert.strictEqual(results.length, 4);
    assert.strictEqual(results[3], null);
  });
});
