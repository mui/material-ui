/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import BottomSheet from './BottomSheet';
import BottomSheetBody from './BottomSheetBody';
import getMuiTheme from '../styles/getMuiTheme';

describe('<BottomSheet />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('prop: open', () => {
    it('should be hidden when open is false', () => {
      const wrapper = shallowWithContext(
        <BottomSheet open={false} action="done" />
      );

      assert.strictEqual(
        wrapper.find('div').at(0).node.props.style.visibility,
        'hidden',
        'The element should be hidden.'
      );
    });
  });

  it('should show the next action after an update', (done) => {
    const wrapper = shallowWithContext(
      <BottomSheet open={true} action="favorite"  />
    );

    wrapper.setProps({
      action: 'done',
    });
    assert.strictEqual(wrapper.state('action'), 'favorite');

    setTimeout(() => {
      assert.strictEqual(wrapper.state('action'), 'done',
        'Should take into account the next action');
      done();
    }, 500);
  });

  it('should show the latest action of consecutive updates', (done) => {
    const wrapper = shallowWithContext(
      <BottomSheet open={false} action="favorite" />
    );

    wrapper.setProps({
      open: true,
      action: 'done',
    });
    assert.strictEqual(wrapper.state('action'), 'done');
    wrapper.setProps({
      open: true,
      action: 'star',
    });
    assert.strictEqual(wrapper.state('action'), 'done');

    setTimeout(() => {
      assert.strictEqual(wrapper.state('action'), 'star',
        'Should take into account the latest action');
      done();
    }, 500);
  });

  describe('prop: contentStyle', () => {
    it('should apply the style on the right element', () => {
      const contentStyle = {};
      const wrapper = shallowWithContext(
        <BottomSheet open={false} action="" contentStyle={contentStyle} />
      );

      assert.strictEqual(
        wrapper.find(BottomSheetBody).props().contentStyle,
        contentStyle
      );
    });
  });
});
