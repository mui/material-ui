/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from '../styles/getMuiTheme';

import IconMenu from './IconMenu';

describe('<IconMenu />', function() {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  it('should not leak an iconStyle property', () => {
    const wrapper = shallowWithContext(
      <IconMenu
        iconButtonElement={<div className="my-icon-button" />}
      >
        <div className="some-div" />
      </IconMenu>
    );
    const buttonProps = wrapper.find('.my-icon-button').props();
    assert.strictEqual(buttonProps.iconStyle, undefined);
  });
});
