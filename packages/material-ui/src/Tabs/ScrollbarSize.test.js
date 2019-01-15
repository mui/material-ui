import React from 'react';
import { assert } from 'chai';
import { mount, shallow } from 'enzyme';
import EventListener from 'react-event-listener';
import { spy, useFakeTimers } from 'sinon';
import ScrollbarSize from './ScrollbarSize';

describe('<ScrollbarSize />', () => {
  const defaultProps = {
    onChange: () => {},
  };
  let clock;

  before(() => {
    clock = useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  describe('mount', () => {
    let wrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it('should not call on initial load', () => {
      const onChange = spy();
      wrapper = mount(<ScrollbarSize {...defaultProps} />);
      assert.strictEqual(onChange.callCount, 0);
    });

    it('should call on initial load', () => {
      const onChange = spy();
      wrapper = mount(<ScrollbarSize {...defaultProps} onChange={onChange} />);
      assert.strictEqual(onChange.callCount, 1);
      assert.strictEqual(onChange.calledWith(0), true);
    });
  });

  describe('prop: onChange', () => {
    let onChange;
    let wrapper;

    beforeEach(() => {
      onChange = spy();
      wrapper = shallow(<ScrollbarSize {...defaultProps} onChange={onChange} />);
      const instance = wrapper.instance();
      instance.nodeRef = {
        offsetHeight: 17,
        clientHeight: 0,
      };
    });

    it('should call on first resize event', () => {
      assert.strictEqual(onChange.callCount, 1);
      wrapper.find(EventListener).simulate('resize');
      clock.tick(166);
      assert.strictEqual(onChange.callCount, 2);
      assert.strictEqual(onChange.calledWith(17), true);
    });

    it('should not call on second resize event', () => {
      assert.strictEqual(onChange.callCount, 1);
      wrapper.find(EventListener).simulate('resize');
      clock.tick(166);
      assert.strictEqual(onChange.callCount, 2);
    });
  });
});
