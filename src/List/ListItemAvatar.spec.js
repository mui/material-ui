// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import consoleErrorMock from '../../test/utils/consoleErrorMock';
import ListItemAvatar, { styleSheet } from './ListItemAvatar';
import Avatar from '../Avatar';

describe('<ListItemAvatar />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(
      <ListItemAvatar className="foo">
        <Avatar className="bar" />
      </ListItemAvatar>,
      {
        context: {
          dense: true,
        },
      },
    );
    assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');
    assert.strictEqual(wrapper.hasClass('bar'), true, 'should have the "bar" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  describe('List', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should render an Avatar', () => {
      const wrapper = shallow(
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>,
        {
          context: {
            dense: true,
          },
        },
      );
      assert.strictEqual(wrapper.name(), 'withStyles(Avatar)');
      assert.strictEqual(consoleErrorMock.callCount(), 0);
    });

    it('should warn in a wrong context', () => {
      shallow(
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1);
    });
  });
});
