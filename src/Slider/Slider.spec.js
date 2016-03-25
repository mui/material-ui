/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import sinon from 'sinon';
import keycode from 'keycode';
import Slider from './Slider';

describe('<Slider />', () => {
  sinon.assert.expose(assert, {prefix: ''});

  const getThumbElement = function(shallowWrapper) {
    return shallowWrapper.children().at(2).children().at(0).children().at(2);
  };

  const getTrackContainer = function(shallowWrapper) {
    return shallowWrapper.children().at(2);
  };

  it('renders slider and the hidden input', () => {
    const wrapper = shallow(
      <Slider name="slider" />
    );

    assert.ok(wrapper.find('input[type="hidden"]').length, 'should contain a hidden input');
  });

  it('renders slider with an initial value', () => {
    const wrapper = shallow(
      <Slider name="slider" value={0.5} />
    );

    assert.strictEqual(wrapper.state().value, 0.5, 'state.value should be equal the specified property');
    assert.isAtLeast(wrapper.state().percent, wrapper.state().value);
    assert.strictEqual(
      wrapper.find('input[type="hidden"]').props().value,
      wrapper.state().value,
      'the input value should be equal state.value'
    );
  });

  it('renders slider as a required element in a form', () => {
    const wrapper = shallow(
      <Slider name="slider" required={true} />
    );

    assert.isTrue(wrapper.find('input[type="hidden"]').props().required);
  });

  it('checks root node properties', () => {
    const rootStyle = {
      backgroundColor: 'red',
    };
    const wrapper = shallow(
      <Slider name="slider" style={rootStyle} />
    );

    assert.deepEqual(wrapper.props().style, rootStyle, 'root element should have the style object');
  });

  it('checks slider initial state', () => {
    const wrapper = shallow(
      <Slider name="slider" />
    );

    assert.isFalse(wrapper.state().active, 'state.active should be initially false');
    assert.isFalse(wrapper.state().dragging, 'state.dragging should be initially false');
    assert.isFalse(wrapper.state().focused, 'state.focused should be initially false');
    assert.isFalse(wrapper.state().hovered, 'state.hovered should be initially false');
  });

  it('checks drag start state', () => {
    const handleDragStart = sinon.spy();
    const wrapper = shallow(
      <Slider name="slider" onDragStart={handleDragStart} />
    );

    wrapper.instance()._onDragStart();
    assert.calledOnce(handleDragStart);
    assert.isTrue(wrapper.state().active);
    assert.isTrue(wrapper.state().dragging);
  });

  it('checks drag stop state', () => {
    const handleDragStop = sinon.spy();
    const wrapper = shallow(
      <Slider name="slider" onDragStop={handleDragStop} />
    );

    wrapper.instance()._onDragStop();
    assert.calledOnce(handleDragStop);
    assert.isFalse(wrapper.state().active);
    assert.isFalse(wrapper.state().dragging);
  });

  it('checks that percent and value are being updated correctly', () => {
    const wrapper = shallow(
      <Slider
        name="slider"
        step={0.5}
        min={1}
        max={5}
      />
    );

    wrapper.instance().setPercent(1);
    assert.strictEqual(wrapper.state().value, 5, 'state.value should be equal 1');
    assert.strictEqual(wrapper.state().percent, 1, 'state.percent should be equal 1');
  });

  it('checks events do not fire on the handle when the slider is disabled', () => {
    const handleDragStart = sinon.spy();
    const handleChange = sinon.spy();
    const wrapper = shallow(
      <Slider
        name="slider"
        disabled={true}
        onDragStart={handleDragStart}
        onChange={handleChange}
      />
    );
    const event = {
      keyCode: 33,
      preventDefault: function() {},
    };
    const thumbElem = getThumbElement(wrapper);

    thumbElem.simulate('keydown', event);
    thumbElem.simulate('mousedown');
    thumbElem.simulate('touchstart');
    assert.notCalled(handleDragStart);
    assert.notCalled(handleChange);
  });

  it('simulates focus event', () => {
    const handleFocus = sinon.spy();
    const wrapper = shallow(
      <Slider name="slider" onFocus={handleFocus} />
    );

    getTrackContainer(wrapper).simulate('focus');
    assert.calledOnce(handleFocus);
  });

  it('simulates blur event', () => {
    const handleBlur = sinon.spy();
    const wrapper = shallow(
      <Slider name="slider" onBlur={handleBlur} />
    );

    getTrackContainer(wrapper).simulate('blur');
    assert.calledOnce(handleBlur);
  });

  it('simulates onmouseenter event', () => {
    const wrapper = shallow(
      <Slider name="slider" />
    );

    getTrackContainer(wrapper).simulate('mouseenter');
    assert.isTrue(wrapper.state().hovered);
  });

  it('simulates onmouseleave event', () => {
    const wrapper = shallow(
      <Slider name="slider" />
    );

    getTrackContainer(wrapper).simulate('mouseleave');
    assert.isFalse(wrapper.state().hovered);
  });

  it('simulates keydown event with a non tracked key', () => {
    const handleChange = sinon.spy();
    const wrapper = shallow(
      <Slider name="slider" onChange={handleChange} />
    );
    const event = {
      keyCode: keycode('enter'),
      preventDefault: sinon.spy(),
    };

    getThumbElement(wrapper).simulate('keydown', event);
    assert.notCalled(event.preventDefault);
  });

  it('simulates keydown event for the end key', () => {
    const handleChange = sinon.spy();
    const wrapper = shallow(
      <Slider name="slider" onChange={handleChange} />
    );
    const event = {
      keyCode: keycode('end'),
      preventDefault: function() {},
    };

    getThumbElement(wrapper).simulate('keydown', event);
    assert.calledOnce(handleChange);
    assert.strictEqual(wrapper.state().percent, 1);
  });

  it('simulates keydown event for the up arrow key', () => {
    const handleChange = sinon.spy();
    const wrapper = shallow(<Slider name="slider" onChange={handleChange} />);
    const previousPercent = wrapper.state().percent;
    const event = {
      keyCode: keycode('up'),
      preventDefault: function() {},
    };

    getThumbElement(wrapper).simulate('keydown', event);
    assert.calledOnce(handleChange);
    assert.isAbove(wrapper.state().percent, previousPercent);
  });

  it('simulates keydown event for the right arrow key', () => {
    const handleChange = sinon.spy();
    const wrapper = shallow(
      <Slider name="slider" onChange={handleChange} />
    );
    const previousPercent = wrapper.state().percent;
    const event = {
      keyCode: keycode('right'),
      preventDefault: function() {},
    };

    getThumbElement(wrapper).simulate('keydown', event);
    assert.calledOnce(handleChange);
    assert.isAbove(wrapper.state().percent, previousPercent);
  });

  it('simulates keydown event for the home key', () => {
    const handleChange = sinon.spy();
    const wrapper = shallow(
      <Slider name="slider" onChange={handleChange} />
    );
    const event = {
      keyCode: keycode('home'),
      preventDefault: function() {},
    };

    getThumbElement(wrapper).simulate('keydown', event);
    assert.notCalled(handleChange);
    assert.strictEqual(wrapper.state().percent, 0);
  });

  it('simulates keydown event for the down arrow key', () => {
    const handleChange = sinon.spy();
    const wrapper = shallow(
      <Slider name="slider" onChange={handleChange} />
    );
    const event = {
      keyCode: keycode('down'),
      preventDefault: function() {},
    };

    getThumbElement(wrapper).simulate('keydown', event);
    assert.notCalled(handleChange);
    assert.strictEqual(wrapper.state().percent, 0);
  });

  it('simulates keydown event for the left arrow key', () => {
    const handleChange = sinon.spy();
    const wrapper = shallow(
      <Slider name="slider" onChange={handleChange} />
    );
    const event = {
      keyCode: keycode('left'),
      preventDefault: function() {},
    };

    getThumbElement(wrapper).simulate('keydown', event);
    assert.notCalled(handleChange);
    assert.strictEqual(wrapper.state().percent, 0);
  });
});
