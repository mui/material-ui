// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import ListItemAvatar, { styleSheet } from './ListItemAvatar';
import Avatar from '../Avatar';

describe('<ListItemAvatar />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render an Avatar', () => {
    const wrapper = shallow((
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
    ), {
      context: {
        dense: true,
      },
    });
    assert.strictEqual(wrapper.name(), 'Avatar');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow((
      <ListItemAvatar className="foo">
        <Avatar className="bar" />
      </ListItemAvatar>
    ), {
      context: {
        dense: true,
      },
    });
    assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');
    assert.strictEqual(wrapper.hasClass('bar'), true, 'should have the "bar" class');
    assert.strictEqual(wrapper.hasClass(classes.denseAvatar), true,
      'should have the denseAvatar class');
  });
});
