import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import RootRef from './RootRef';

const Fn = () => <div />;

describe('<RootRef />', () => {
  let mount;

  before(() => {
    // StrictModeViolation: uses findDOMNode
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  it('call rootRef function on mount and unmount', () => {
    const rootRef = spy();
    const wrapper = mount(
      <RootRef rootRef={rootRef}>
        <Fn />
      </RootRef>,
    );
    assert.strictEqual(rootRef.args.length, 1);
    assert.strictEqual(rootRef.args[0][0] instanceof window.HTMLDivElement, true);
    wrapper.unmount();
    assert.strictEqual(rootRef.args.length, 2);
    assert.strictEqual(rootRef.args[1][0], null);
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

  it('should support DOM node updates', () => {
    const rootRef = spy();
    function TestCase(props) {
      const { on } = props;
      return <RootRef rootRef={rootRef}>{on ? <div /> : <span />}</RootRef>;
    }

    TestCase.propTypes = {
      on: PropTypes.bool.isRequired,
    };

    const wrapper = mount(<TestCase on={false} />);
    wrapper.setProps({ on: true });
    assert.strictEqual(rootRef.callCount, 2);
    assert.strictEqual(rootRef.args[0][0].nodeName, 'SPAN');
    assert.strictEqual(rootRef.args[1][0].nodeName, 'DIV');
  });
});
