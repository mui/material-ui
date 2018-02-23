/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';
import getMuiTheme from '../styles/getMuiTheme';
import ClockMinutes from './ClockMinutes';

describe('<ClockMinutes />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('prop: onChange', () => {
    let wrapper;
    let onChange;

    beforeEach(() => {
      onChange = spy();
      wrapper = shallowWithContext(
        <ClockMinutes onChange={onChange} />
      );

      wrapper.instance().center = {x: 100, y: 100};
      wrapper.instance().basePoint = {x: 100, y: 0};
    });

    it('should have finished true on touchEnd', () => {
      const mask = wrapper.find('div').at(1);

      mask.simulate('touchEnd', {
        preventDefault() {},
        type: 'touchend',
        changedTouches: [{offsetX: 50, offsetY: 70}],
      });
      assert.strictEqual(onChange.callCount, 1);
      assert.deepEqual(onChange.args[0], [50, true]);
    });

    it('should have finished true on mouseEnd', () => {
      const mask = wrapper.find('div').at(1);
      mask.simulate('mouseUp', {
        preventDefault() {},
        type: 'mouseUp',
        nativeEvent: {offsetX: 50, offsetY: 70},
      });
      assert.strictEqual(onChange.callCount, 1);
      assert.deepEqual(onChange.args[0], [50, true]);
    });
  });
});
