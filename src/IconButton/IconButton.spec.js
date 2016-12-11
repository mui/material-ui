/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';

import IconButton from './IconButton';
import getMuiTheme from '../styles/getMuiTheme';

describe('<IconButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const dummyChild = <div className="unique">Hello World</div>;

  it('renders an enhanced button', () => {
    const wrapper = shallowWithContext(
      <IconButton>Button</IconButton>
    );
    assert.ok(wrapper.is('EnhancedButton'));
  });

  it('renders children', () => {
    const wrapper = shallowWithContext(
      <IconButton>{dummyChild}</IconButton>
    );
    assert.ok(wrapper.contains(dummyChild), 'should contain the children');
  });
});
