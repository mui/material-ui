import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import createMount from 'test/utils/createMount';
import RootRef from './RootRef';

const Fn = () => <div />;

describe('<RootRef />', () => {
  // StrictModeViolation: uses findDOMNode
  const mount = createMount({ strict: false });

  it('call rootRef function on mount and unmount', () => {
    const rootRef = spy();
    const wrapper = mount(
      <RootRef rootRef={rootRef}>
        <Fn />
      </RootRef>,
    );
    expect(rootRef.args.length).to.equal(1);
    expect(rootRef.args[0][0] instanceof window.HTMLDivElement).to.equal(true);
    wrapper.unmount();
    expect(rootRef.args.length).to.equal(2);
    expect(rootRef.args[1][0]).to.equal(null);
  });

  it('set rootRef current field on mount and unmount', () => {
    const ref = React.createRef();
    const wrapper = mount(
      <RootRef rootRef={ref}>
        <Fn />
      </RootRef>,
    );
    expect(ref.current instanceof window.HTMLDivElement).to.equal(true);
    wrapper.unmount();
    expect(ref.current).to.equal(null);
  });

  it('should support providing a new rootRef', () => {
    const results = [];
    const wrapper = mount(
      <RootRef rootRef={(ref) => results.push(ref)}>
        <Fn />
      </RootRef>,
    );
    expect(results.length).to.equal(1);
    expect(results[0] instanceof window.HTMLDivElement).to.equal(true);
    wrapper.setProps({
      rootRef: (ref) => results.push(ref),
    });
    expect(results.length).to.equal(3);
    expect(results[1]).to.equal(null);
    expect(results[2] instanceof window.HTMLDivElement).to.equal(true);
    wrapper.unmount();
    expect(results.length).to.equal(4);
    expect(results[3]).to.equal(null);
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
    expect(rootRef.callCount).to.equal(2);
    expect(rootRef.args[0][0].nodeName).to.equal('SPAN');
    expect(rootRef.args[1][0].nodeName).to.equal('DIV');
  });
});
