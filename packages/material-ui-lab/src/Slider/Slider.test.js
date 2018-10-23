import React from 'react';
import { spy } from 'sinon';
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

    wrapper.simulate('click');
    wrapper.simulate('mousedown');
    // document.simulate('mouseup')
    document.body.dispatchEvent(new window.MouseEvent('mouseup'));

    assert.strictEqual(handleChange.callCount, 1, 'should have called the handleChange cb');
    assert.strictEqual(handleDragStart.callCount, 1, 'should have called the handleDragStart cb');
    assert.strictEqual(handleDragEnd.callCount, 1, 'should have called the handleDragEnd cb');
  });

  describe('unmount', () => {
    it('should not have global event listeners registered after unmount', () => {
      const handleChange = spy();
      const handleDragEnd = spy();

      const wrapper = mount(<Slider onChange={handleChange} onDragEnd={handleDragEnd} value={0} />);

      const callGlobalListeners = () => {
        document.body.dispatchEvent(new window.MouseEvent('mousemove'));
        document.body.dispatchEvent(new window.MouseEvent('mouseup'));
      };

      wrapper.simulate('mousedown');
      callGlobalListeners();
      // pre condition: the dispatched event actually did something when mounted
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleDragEnd.callCount, 1);

      wrapper.unmount();

      // After unmounting global listeners should not be registered aynmore since that would
      // break component encapsulation. If they are still mounted either react will throw warnings
      // or other component logic throws.
      // post condition: the dispatched events dont cause errors/warnings
      callGlobalListeners();
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleDragEnd.callCount, 1);
    });
  });

  describe('prop: vertical', () => {
    it('should render with the default and vertical classes', () => {
      const wrapper = shallow(<Slider vertical value={0} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
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
});
