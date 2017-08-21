// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ListItemIcon from './ListItemIcon';

describe('<ListItemIcon />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = getClasses(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );
  });

  it('should render a span', () => {
    const wrapper = shallow(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );
    assert.strictEqual(wrapper.name(), 'span');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(
      <ListItemIcon className="foo">
        <span className="bar" />
      </ListItemIcon>,
    );
    assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');
    assert.strictEqual(wrapper.hasClass('bar'), true, 'should have the "bar" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
