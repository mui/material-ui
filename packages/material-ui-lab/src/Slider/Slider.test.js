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
    classes = getClasses(<Slider value={0} />);
    mount = createMount();
  });

  it('should render a div', () => {
    const wrapper = shallow(<Slider value={0} />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render with the default classes', () => {
    const wrapper = shallow(<Slider value={0} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the default and user classes', () => {
    const wrapper = shallow(<Slider value={0} className="mySliderClass" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('mySliderClass'), true);
  });

  it('should call handlers', () => {
    const handleChange = spy();
    const handleDragStart = spy();
    const handleDragEnd = spy();

    const wrapper = mount(
      <Slider
        onChange={handleChange}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        value={0}
      />,
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
      const wrapper = shallow(<Slider vertical value={0} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.vertical), true);
    });
  });

  describe('prop: reverse', () => {
    it('should render with the default and reverse classes', () => {
      const wrapper = shallow(<Slider reverse value={0} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.reverse), true);
    });
  });

  describe('props: vertical & reverse', () => {
    it('should render with the default, reverse and vertical classes', () => {
      const wrapper = shallow(<Slider reverse vertical value={0} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.reverse), true);
      assert.strictEqual(wrapper.hasClass(classes.vertical), true);
    });
  });

  describe('prop: disabled', () => {
    const handleChange = spy();
    let wrapper;

    before(() => {
      wrapper = mount(<Slider onChange={handleChange} disabled value={0} />);
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

      assert.strictEqual(trackBefore.prop('style').width, '0%');
      assert.strictEqual(trackAfter.prop('style').width, 'calc(100% - 5px)');
    });

    it('after change value should change position of thumb', () => {
      wrapper.setProps({ value: 50 });

      clock.tick(transitionComplexDuration);

      const button = wrapper.find('button');
      assert.strictEqual(button.prop('style').left, '50%');
    });

    it('should render tracks in new state', () => {
      const tracks = wrapper.find('div').filterWhere(n => n.hasClass(classes.track));
      const trackBefore = tracks.at(0);
      const trackAfter = tracks.at(1);

      assert.strictEqual(trackBefore.prop('style').width, '50%');
      assert.strictEqual(trackAfter.prop('style').width, 'calc(100% - 5px)');
    });
  });
});
