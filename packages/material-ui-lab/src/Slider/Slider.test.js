import React from 'react';
import { spy, useFakeTimers } from 'sinon';
import { assert } from 'chai';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import Slider from './Slider';

describe('<Slider />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Slider />);
    mount = createMount();
  });

  it('should render a div', () => {
    const wrapper = shallow(<Slider />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render with the default classes', () => {
    const wrapper = shallow(<Slider />);
    assert.strictEqual(wrapper.hasClass(classes.container), true);
  });

  it('should call handlers', () => {
    const handleChange = spy();
    const handleDragStart = spy();
    const handleDragEnd = spy();

    const wrapper = mount(
      <Slider onChange={handleChange} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />,
    );
    const button = wrapper.find('button');

    wrapper.simulate('click');
    button.simulate('mousedown');
    button.simulate('mouseup');

    assert.strictEqual(handleChange.callCount, 1, 'should have called the handleChange cb');
    assert.strictEqual(handleDragStart.callCount, 1, 'should have called the handleDragStart cb');
    assert.strictEqual(handleDragEnd.callCount, 1, 'should have called the handleDragEnd cb');
  });

  describe('prop: vertical', () => {
    it('should render with the default and vertical classes', () => {
      const wrapper = shallow(<Slider vertical />);
      assert.strictEqual(wrapper.hasClass(classes.container), true);
      assert.strictEqual(wrapper.hasClass(classes.vertical), true);
    });
  });

  describe('prop: reverse', () => {
    it('should render with the default and reverse classes', () => {
      const wrapper = shallow(<Slider reverse />);
      assert.strictEqual(wrapper.hasClass(classes.container), true);
      assert.strictEqual(wrapper.hasClass(classes.reverse), true);
    });
  });

  describe('props: vertical & reverse', () => {
    it('should render with the default, reverse and vertical classes', () => {
      const wrapper = shallow(<Slider reverse vertical />);
      assert.strictEqual(wrapper.hasClass(classes.container), true);
      assert.strictEqual(wrapper.hasClass(classes.reverse), true);
      assert.strictEqual(wrapper.hasClass(classes.vertical), true);
    });
  });

  describe('prop: disabled', () => {
    const handleChange = spy();
    let wrapper;

    before(() => {
      wrapper = mount(<Slider onChange={handleChange} disabled />);
    });

    it('should render thumb with the disabled classes', () => {
      const button = wrapper.find('button');

      assert.strictEqual(button.hasClass(classes.thumb), true);
      assert.strictEqual(button.hasClass(classes.disabled), true);
    });

    it('should render tracks with the disabled classes', () => {
      const tracks = wrapper.find('div').filterWhere(n => n.hasClass(classes.track));

      assert.strictEqual(tracks.everyWhere(n => n.hasClass(classes.disabled)), true);
    });

    it("should not call 'onChange' handler", () => {
      wrapper.simulate('click');

      assert.strictEqual(handleChange.callCount, 0);
    });
  });

  describe('prop: value', () => {
    const transitionComplexDuration = 375;
    let wrapper;
    let clock;

    before(() => {
      clock = useFakeTimers();
      wrapper = mount(<Slider value={0} />);
    });

    after(() => {
      clock.restore();
    });

    it('should render thumb in initial state', () => {
      const button = wrapper.find('button');
      assert.strictEqual(button.prop('style').left, '0%');
    });

    it('should render tracks in initial state', () => {
      const tracks = wrapper.find('div').filterWhere(n => n.hasClass(classes.track));
      const trackBefore = tracks.at(0);
      const trackAfter = tracks.at(1);

      assert.strictEqual(trackBefore.prop('style').width, 'calc(0% - 0px)');
      assert.strictEqual(trackAfter.prop('style').width, 'calc(100% - 5px)');
    });

    it('after change value should change position of thumb', () => {
      wrapper.setProps({ value: 0.5 });

      clock.tick(transitionComplexDuration);

      const button = wrapper.find('button');
      assert.strictEqual(button.prop('style').left, '50%');
    });

    it('should render tracks in new state', () => {
      const tracks = wrapper.find('div').filterWhere(n => n.hasClass(classes.track));
      const trackBefore = tracks.at(0);
      const trackAfter = tracks.at(1);

      assert.strictEqual(trackBefore.prop('style').width, 'calc(50% - 0px)');
      assert.strictEqual(trackAfter.prop('style').width, 'calc(50% - 7px)');
    });
  });
});
