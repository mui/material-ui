// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import ListItemSecondaryAction from './ListItemSecondaryAction';

describe('<ListItemSecondaryAction />', () => {
  let shallow;

  before(() => {
    shallow = createShallowWithContext();
  });

  it('should render a div', () => {
    const wrapper = shallow(
      <ListItemSecondaryAction />,
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
  });

  it('should render with the user and secondaryAction classes', () => {
    const wrapper = shallow(<ListItemSecondaryAction className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
  });
});
