import React from 'react';
import { assert } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import Avatar from '../Avatar';
import ListItemAvatar from './ListItemAvatar';
import ListContext from '../List/ListContext';

describe('<ListItemAvatar />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount();
    classes = getClasses(
      <ListItemAvatar className="foo">
        <Avatar className="bar" />
      </ListItemAvatar>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with the user and root classes', () => {
    const wrapper = mount(
      <ListContext.Provider value={{ dense: true }}>
        <ListItemAvatar className="foo">
          <Avatar className="bar" />
        </ListItemAvatar>
      </ListContext.Provider>,
    );
    const avatar = wrapper.find(Avatar);
    assert.strictEqual(avatar.hasClass('foo'), true);
    assert.strictEqual(avatar.hasClass('bar'), true);
    assert.strictEqual(avatar.hasClass(classes.root), true);
  });

  describe('List', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should render an Avatar', () => {
      const wrapper = mount(
        <ListContext.Provider value={{ dense: true }}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
        </ListContext.Provider>,
      );
      assert.strictEqual(wrapper.type(), ListItemAvatar);
      assert.strictEqual(consoleErrorMock.callCount(), 0);
    });

    it('should warn in a wrong context', () => {
      mount(
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1);
    });
  });
});
