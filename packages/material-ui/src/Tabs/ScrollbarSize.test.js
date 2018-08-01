import React from 'react';
import { assert } from 'chai';
import { mount, shallow } from 'enzyme';
import EventListener from 'react-event-listener';
import { spy, useFakeTimers } from 'sinon';
import ScrollbarSize from './ScrollbarSize';

describe('<ScrollbarSize />', () => {
  const defaultProps = {
    onLoad: () => {},
    onChange: () => {},
  };
  let clock;

  before(() => {
    clock = useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  describe('prop: onLoad', () => {
    let wrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it('should not call on initial load', () => {
      const onLoad = spy();
      wrapper = mount(<ScrollbarSize {...defaultProps} />);
      assert.strictEqual(onLoad.callCount, 0, 'should not have been called');
    });

    it('should call on initial load', () => {
      const onLoad = spy();
      wrapper = mount(<ScrollbarSize {...defaultProps} onLoad={onLoad} />);
      assert.strictEqual(onLoad.callCount, 1, 'should have been called once');
      assert.strictEqual(
        onLoad.calledWith({ scrollbarHeight: 0, scrollbarWidth: 0 }),
        true,
        'should have been called with expected sizes',
      );
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
        offsetWidth: 17,
        clientWidth: 0,
      };
    });

    it('should call on first resize event', () => {
      wrapper.find(EventListener).simulate('resize');
      clock.tick(166);
      assert.strictEqual(onChange.callCount, 1, 'should have been called once');
      assert.strictEqual(
        onChange.calledWith({ scrollbarHeight: 17, scrollbarWidth: 17 }),
        true,
        'should have been called with expected sizes',
      );
    });

    it('should not call on second resize event', () => {
      wrapper.find(EventListener).simulate('resize');
      clock.tick(166);
      assert.strictEqual(onChange.callCount, 1, 'should only have been called once');
    });
  });
});
