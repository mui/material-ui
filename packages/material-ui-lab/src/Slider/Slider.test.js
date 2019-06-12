import React from 'react';
import { spy } from 'sinon';
import { assert } from 'chai';
import {
  createMount,
  getClasses,
  findOutermostIntrinsic,
  wrapsIntrinsicElement,
} from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import Slider from './Slider';

function touchList(touchArray) {
  touchArray.item = idx => touchArray[idx];
  return touchArray;
}

function fireBodyMouseEvent(name, properties = {}) {
  const event = document.createEvent('MouseEvents');
  event.initEvent(name, true, true);
  Object.keys(properties).forEach(key => {
    event[key] = properties[key];
  });
  document.body.dispatchEvent(event);
  return event;
}

describe('<Slider />', () => {
  let mount;
  let classes;

  before(() => {
    classes = getClasses(<Slider value={0} />);
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Slider value={0} />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
  }));

  function findThumb(wrapper) {
    // Will also match any other react component if not filtered. They won't appear in the DOM
    // and are therefore an implementation detail. We're interested in what the user
    // interacts with.
    return wrapper.find('[role="slider"]').filterWhere(wrapsIntrinsicElement);
  }

  it('should render with the default and user classes', () => {
    const wrapper = mount(<Slider value={0} className="mySliderClass" />);
    assert.strictEqual(
      wrapper
        .find(`.${classes.root}`)
        .first()
        .hasClass('mySliderClass'),
      true,
    );
  });

  it('should call handlers', () => {
    const handleChange = spy();
    const handleChangeCommitted = spy();

    const wrapper = mount(
      <Slider onChange={handleChange} onChangeCommitted={handleChangeCommitted} value={0} />,
    );

    wrapper.simulate('click');
    wrapper.simulate('mousedown');
    // document.simulate('mouseup')
    document.body.dispatchEvent(new window.MouseEvent('mouseup'));

    assert.strictEqual(handleChange.callCount, 1);
    assert.strictEqual(handleChangeCommitted.callCount, 1);

    assert.strictEqual(handleChange.args[0].length, 2);
    assert.strictEqual(handleChangeCommitted.args[0].length, 2);
  });

  it('should only listen to changes from the same touchpoint', () => {
    const handleChange = spy();
    const handleChangeCommitted = spy();
    const touches = [{ pageX: 0, pageY: 0 }];
    const wrapper = mount(
      <Slider onChange={handleChange} onChangeCommitted={handleChangeCommitted} value={0} />,
    );

    const event = fireBodyMouseEvent('touchstart', {
      changedTouches: touchList([{ identifier: 1 }]),
      touches,
    });
    wrapper.getDOMNode().dispatchEvent(event);
    assert.strictEqual(handleChange.callCount, 1);
    assert.strictEqual(handleChangeCommitted.callCount, 0);
    fireBodyMouseEvent('touchend', {
      changedTouches: touchList([{ identifier: 2 }]),
      touches,
    });
    assert.strictEqual(handleChange.callCount, 1);
    assert.strictEqual(handleChangeCommitted.callCount, 0);
    fireBodyMouseEvent('touchmove', {
      changedTouches: touchList([{ identifier: 1 }]),
      touches,
    });
    assert.strictEqual(handleChange.callCount, 2);
    assert.strictEqual(handleChangeCommitted.callCount, 0);
    fireBodyMouseEvent('touchend', {
      changedTouches: touchList([{ identifier: 1 }]),
      touches,
    });
    assert.strictEqual(handleChange.callCount, 2);
    assert.strictEqual(handleChangeCommitted.callCount, 1);
  });

  describe('when mouse leaves window', () => {
    it('should move to the end', () => {
      const handleChange = spy();

      const wrapper = mount(<Slider onChange={handleChange} value={50} />);

      wrapper.simulate('mousedown');
      document.body.dispatchEvent(new window.MouseEvent('mouseleave'));

      assert.strictEqual(handleChange.callCount, 1);
    });
  });

  describe('when mouse reenters window', () => {
    it('should update if mouse is still clicked', () => {
      const handleChange = spy();

      const wrapper = mount(<Slider onChange={handleChange} value={50} />);

      wrapper.simulate('mousedown');
      document.body.dispatchEvent(new window.MouseEvent('mouseleave'));

      const mouseEnter = new window.Event('mouseenter');
      mouseEnter.buttons = 1;
      document.body.dispatchEvent(mouseEnter);
      document.body.dispatchEvent(new window.MouseEvent('mousemove'));

      assert.strictEqual(handleChange.callCount, 2);
    });

    it('should not update if mouse is not clicked', () => {
      const handleChange = spy();

      const wrapper = mount(<Slider onChange={handleChange} value={50} />);

      wrapper.simulate('mousedown');
      document.body.dispatchEvent(new window.MouseEvent('mouseleave'));

      const mouseEnter = new window.Event('mouseenter');
      mouseEnter.buttons = 0;
      document.body.dispatchEvent(mouseEnter);
      document.body.dispatchEvent(new window.MouseEvent('mousemove'));

      assert.strictEqual(handleChange.callCount, 1);
    });
  });

  describe('unmount', () => {
    it('should not have global event listeners registered after unmount', () => {
      const handleChange = spy();
      const handleChangeCommitted = spy();

      const wrapper = mount(
        <Slider onChange={handleChange} onChangeCommitted={handleChangeCommitted} value={0} />,
      );

      const callGlobalListeners = () => {
        document.body.dispatchEvent(new window.MouseEvent('mousemove'));
        document.body.dispatchEvent(new window.MouseEvent('mouseup'));
      };

      wrapper.simulate('mousedown');
      callGlobalListeners();
      // pre condition: the dispatched event actually did something when mounted
      assert.strictEqual(handleChange.callCount, 2);
      assert.strictEqual(handleChangeCommitted.callCount, 1);
      wrapper.unmount();
      // After unmounting global listeners should not be registered anymore since that would
      // break component encapsulation. If they are still mounted either react will throw warnings
      // or other component logic throws.
      // post condition: the dispatched events dont cause errors/warnings
      callGlobalListeners();
      assert.strictEqual(handleChange.callCount, 2);
      assert.strictEqual(handleChangeCommitted.callCount, 1);
    });
  });

  describe('prop: orientation', () => {
    it('should render with the default and vertical classes', () => {
      const wrapper = mount(<Slider orientation="vertical" value={0} />);
      assert.strictEqual(
        wrapper
          .find(`.${classes.root}`)
          .first()
          .hasClass(classes.vertical),
        true,
      );
    });
  });

  describe('prop: disabled', () => {
    it('should render the disabled classes', () => {
      const wrapper = mount(<Slider disabled value={0} />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), true);
    });
  });

  describe('keyboard', () => {
    let wrapper;

    const moveLeftEvent = {
      key: 'ArrowLeft',
    };
    const moveRightEvent = {
      key: 'ArrowRight',
    };

    before(() => {
      const onChange = (_, value) => {
        wrapper.setProps({ value });
      };
      wrapper = mount(<Slider value={90} min={6} max={108} step={10} onChange={onChange} />);
    });

    it('should reach right edge value', () => {
      wrapper.setProps({ value: 90 });
      const thumb = findThumb(wrapper);

      thumb.simulate('keydown', moveRightEvent);
      assert.strictEqual(wrapper.props().value, 100);

      thumb.simulate('keydown', moveRightEvent);
      assert.strictEqual(wrapper.props().value, 108);

      thumb.simulate('keydown', moveLeftEvent);
      assert.strictEqual(wrapper.props().value, 100);

      thumb.simulate('keydown', moveLeftEvent);
      assert.strictEqual(wrapper.props().value, 90);
    });

    it('should reach left edge value', () => {
      wrapper.setProps({ value: 20 });
      const thumb = findThumb(wrapper);
      thumb.simulate('keydown', moveLeftEvent);
      assert.strictEqual(wrapper.props().value, 10);

      thumb.simulate('keydown', moveLeftEvent);
      assert.strictEqual(wrapper.props().value, 6);

      thumb.simulate('keydown', moveRightEvent);
      assert.strictEqual(wrapper.props().value, 20);

      thumb.simulate('keydown', moveRightEvent);
      assert.strictEqual(wrapper.props().value, 30);
    });
  });

  describe('markActive state', () => {
    it('should set the mark active', () => {
      function getActives(wrapper) {
        return wrapper
          .find(`.${classes.markLabel}`)
          .map(node => node.hasClass(classes.markLabelActive));
      }
      const marks = [{ value: 5 }, { value: 10 }, { value: 15 }];

      const wrapper1 = mount(<Slider disabled value={12} marks={marks} />);
      assert.deepEqual(getActives(wrapper1), [true, true, false]);

      const wrapper2 = mount(<Slider disabled value={[8, 12]} marks={marks} />);
      assert.deepEqual(getActives(wrapper2), [false, true, false]);
    });
  });
});
