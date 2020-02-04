import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { spy, useFakeTimers, stub } from 'sinon';
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
      wrapper = mount(<ScrollbarSize {...defaultProps} onChange={onChange} />);
      // find internal div and simulate scrollbar
      stub(wrapper.find('div').instance(), 'offsetHeight').get(() => 17);
      stub(wrapper.find('div').instance(), 'clientHeight').get(() => 0);
    });

    it('should call on first resize event', () => {
      assert.strictEqual(onChange.callCount, 1);
      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      assert.strictEqual(onChange.callCount, 2);
      assert.strictEqual(onChange.calledWith(17), true);
    });

    it('should not call on second resize event', () => {
      assert.strictEqual(onChange.callCount, 1);
      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      assert.strictEqual(onChange.callCount, 2);
    });
  });
});
