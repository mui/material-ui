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
        wrapper.find('Paper').at(0).node.props.style.visibility,
        'hidden',
        'The element should be hidden.'
      );
    });
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
