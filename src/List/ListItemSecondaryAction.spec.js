// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ListItemSecondaryAction from './ListItemSecondaryAction';

describe('<ListItemSecondaryAction />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'ListItemSecondaryAction' });
    classes = getClasses(<ListItemSecondaryAction />);
  });

  it('should render a div', () => {
    const wrapper = shallow(<ListItemSecondaryAction />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<ListItemSecondaryAction className="woofListItemSecondaryAction" />);
    assert.strictEqual(wrapper.hasClass('woofListItemSecondaryAction'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
