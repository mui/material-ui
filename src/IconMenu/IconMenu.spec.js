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
      <IconMenu iconButtonElement={<div data-test="my-icon-button" />} />
    );

    assert.strictEqual(wrapper.find('[data-test="my-icon-button"]').props().hasOwnProperty('iconStyle'), false,
      'should leak property on the div');
  });
});
