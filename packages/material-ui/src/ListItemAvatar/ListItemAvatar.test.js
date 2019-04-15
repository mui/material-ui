import React from 'react';
import { assert } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import Avatar from '../Avatar';
import ListItemAvatar from './ListItemAvatar';
import ListContext from '../List/ListContext';

describe('<ListItemAvatar />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
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
});
