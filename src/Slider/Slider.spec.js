/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';
import keycode from 'keycode';
import Slider from './Slider';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Slider />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const muiThemeRtl = getMuiTheme({isRtl: true});
  const shallowWithRTLContext = (node) => shallow(node, {context: {muiTheme: muiThemeRtl}});

  const getThumbElement = function(shallowWrapper) {
    return shallowWrapper.childAt(0).childAt(0).childAt(2);
  };

  const getTrackContainer = function(shallowWrapper) {
    return shallowWrapper.childAt(0);
  };

  it('renders slider and the hidden input', () => {
    const wrapper = shallowWithContext(
      <Slider name="slider" />
    );

    assert.ok(wrapper.find('input[type="hidden"]').length, 'should contain a hidden input');
  });

  it('renders slider with an initial value', () => {
    const wrapper = shallowWithContext(
      <Slider name="slider" value={0.5} />
    );

    assert.strictEqual(wrapper.state().value, 0.5, 'should use the value property for the value state');
    assert.strictEqual(
      wrapper.find('input[type="hidden"]').props().value,
      wrapper.state().value,
      'the input value should be equal state.value'
    );
  });

  it('renders slider as a required element in a form', () => {
    const wrapper = shallowWithContext(
      <Slider name="slider" required={true} />
    );

    assert.strictEqual(wrapper.find('input[type="hidden"]').props().required, true);
  });

  it('checks root node properties', () => {
    const wrapper = shallowWithContext(
      <Slider
        name="slider"
        style={{
          backgroundColor: 'red',
        }}
      />
    );

    assert.strictEqual(wrapper.props().style.backgroundColor, 'red', 'root element should have the style object');
  });

  it('checks slider initial state', () => {
    const wrapper = shallowWithContext(
      <Slider name="slider" />
    );

    assert.strictEqual(wrapper.state().active, false);
    assert.strictEqual(wrapper.state().dragging, false);
    assert.strictEqual(wrapper.state().focused, false);
    assert.strictEqual(wrapper.state().hovered, false);
  });

  it('checks drag start state', () => {
    const handleDragStart = spy();
    const wrapper = shallowWithContext(
      <Slider name="slider" onDragStart={handleDragStart} />
    );

    wrapper.instance().onDragStart();
    assert.strictEqual(handleDragStart.callCount, 1);
    assert.strictEqual(wrapper.state().active, true);
    assert.strictEqual(wrapper.state().dragging, true);
  });

  it('checks drag stop state', () => {
    const handleDragStop = spy();
    const wrapper = shallowWithContext(
      <Slider name="slider" onDragStop={handleDragStop} />
    );

    wrapper.instance().onDragStop();
    assert.strictEqual(handleDragStop.callCount, 1);
    assert.strictEqual(wrapper.state().active, false);
    assert.strictEqual(wrapper.state().dragging, false);
  });

  describe('percent', () => {
    it('checks that percent and value are being updated correctly', () => {
      const wrapper = shallowWithContext(
        <Slider
          name="slider"
          step={0.5}
          min={1}
          max={5}
        />
      );

      wrapper.setProps({
        value: 1,
      });

      assert.strictEqual(wrapper.state().value, 1);
      assert.strictEqual(getThumbElement(wrapper).props().style.left, '0%');
    });

    it('checks that value and percent are updated correctly when max prop changes', () => {
      const wrapper = shallowWithContext(
        <Slider
          name="slider"
          value={2}
          min={0}
          max={10}
        />
      );

      assert.strictEqual(wrapper.state().value, 2);
      assert.strictEqual(getThumbElement(wrapper).props().style.left, '20%');

      wrapper.setProps({max: 4});

      assert.strictEqual(wrapper.state().value, 2);
      assert.strictEqual(getThumbElement(wrapper).props().style.left, '50%');
    });
  });

  it('checks events do not fire on the handle when the slider is disabled', () => {
    const handleDragStart = spy();
    const handleChange = spy();
    const wrapper = shallowWithContext(
      <Slider
        name="slider"
        disabled={true}
        onDragStart={handleDragStart}
        onChange={handleChange}
      />
    );
    const trackContainer = getTrackContainer(wrapper);

    trackContainer.simulate('keydown', {
      keyCode: 33,
      preventDefault: () => {},
    });
    trackContainer.simulate('mousedown');
    trackContainer.simulate('touchstart');

    assert.strictEqual(handleDragStart.callCount, 0);
    assert.strictEqual(handleChange.callCount, 0);
  });

  it('simulates focus event', () => {
    const handleFocus = spy();
    const wrapper = shallowWithContext(
      <Slider name="slider" onFocus={handleFocus} />
    );

    getTrackContainer(wrapper).simulate('focus');
    assert.strictEqual(handleFocus.callCount, 1);
  });

  it('simulates blur event', () => {
    const handleBlur = spy();
    const wrapper = shallowWithContext(
      <Slider name="slider" onBlur={handleBlur} />
    );

    getTrackContainer(wrapper).simulate('blur');
    assert.strictEqual(handleBlur.callCount, 1);
  });

  it('simulates onmouseenter event', () => {
    const wrapper = shallowWithContext(
      <Slider name="slider" />
    );

    getTrackContainer(wrapper).simulate('mouseenter');
    assert.strictEqual(wrapper.state().hovered, true);
  });

  it('simulates onmouseleave event', () => {
    const wrapper = shallowWithContext(
      <Slider name="slider" />
    );

    getTrackContainer(wrapper).simulate('mouseleave');
    assert.strictEqual(wrapper.state().hovered, false);
  });

  describe('keydown', () => {
    it('simulates keydown event with a non tracked key', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" onChange={handleChange} />
      );
      const event = {
        keyCode: keycode('enter'),
        preventDefault: spy(),
      };

      getTrackContainer(wrapper).simulate('keydown', event);
      assert.strictEqual(event.preventDefault.callCount, 0);
    });

    it('simulates the end key', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('end'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value, 1);
    });

    it('simulates the up arrow key', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('up'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the up arrow key on an x-reverse axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="x-reverse" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('up'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the up arrow key on a rtl slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithRTLContext(
        <Slider name="slider" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('up'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the up arrow key on a y axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="y" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('up'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the up arrow key on a y-reverse axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="y-reverse" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('up'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the right arrow key', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('right'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the right arrow key on an x-reverse axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="x-reverse" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('right'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the right arrow key on a rtl slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithRTLContext(
        <Slider name="slider" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('right'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the right arrow key on an x-reverse rtl slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithRTLContext(
        <Slider name="slider" axis="x-reverse" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('right'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the right arrow key on an y axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="y" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('right'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the right arrow key on an y-reverse axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="y-reverse" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('right'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the home key', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('home'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the home key on a x-reverse axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="x-reverse" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('home'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the home key on a rtl slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithRTLContext(
        <Slider name="slider" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('home'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the home key on a y axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="y" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('home'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the home key on a y-reverse axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="y" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('home'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the down arrow key', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('down'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the down arrow key on a x-reverse axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="x-reverse" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('down'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the down arrow key on a rtl slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithRTLContext(
        <Slider name="slider" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('down'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the down arrow key on a y axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="y" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('down'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the down arrow key on a y-reverse axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="y-reverse" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('down'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the left arrow key', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('left'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the left arrow key for an x-reverse axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="x-reverse" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('left'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the left arrow key on a rtl slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithRTLContext(
        <Slider name="slider" onChange={handleChange} />
      );
      const previousValue = wrapper.state().value;

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('left'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(wrapper.state().value > previousValue, true);
    });

    it('simulates the left arrow key on an x-reverse rtl slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithRTLContext(
        <Slider name="slider" axis="x-reverse" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('left'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the left arrow key for a y axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="y" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('left'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });

    it('simulates the left arrow key for a y-reverse axis slider', () => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <Slider name="slider" axis="y-reverse" onChange={handleChange} />
      );

      getTrackContainer(wrapper).simulate('keydown', {
        keyCode: keycode('left'),
        preventDefault: () => {},
      });
      assert.strictEqual(handleChange.callCount, 0);
      assert.strictEqual(wrapper.state().value, 0);
    });
  });
});
