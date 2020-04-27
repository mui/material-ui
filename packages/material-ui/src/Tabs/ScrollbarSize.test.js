import * as React from 'react';
import { expect } from 'chai';
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
      expect(onChange.callCount).to.equal(0);
    });

    it('should call on initial load', () => {
      const onChange = spy();
      wrapper = mount(<ScrollbarSize {...defaultProps} onChange={onChange} />);
      expect(onChange.callCount).to.equal(1);
      expect(onChange.calledWith(0)).to.equal(true);
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
      expect(onChange.callCount).to.equal(1);
      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      expect(onChange.callCount).to.equal(2);
      expect(onChange.calledWith(17)).to.equal(true);
    });

    it('should not call on second resize event', () => {
      expect(onChange.callCount).to.equal(1);
      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      expect(onChange.callCount).to.equal(2);
    });
  });
});
