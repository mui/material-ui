import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ListItemIcon from './ListItemIcon';

describe('<ListItemIcon />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );
  });

  it('should render a span inside a div', () => {
    const wrapper = shallow(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.children().name(), 'span');
  });

  it('should render a div with the user and root classes, but not the children classes', () => {
    const wrapper = shallow(
      <ListItemIcon className="foo">
        <span className="bar" />
      </ListItemIcon>,
    );
    assert.strictEqual(wrapper.hasClass('foo'), true);
    assert.strictEqual(wrapper.hasClass('bar'), false);
    assert.strictEqual(wrapper.children().hasClass('bar'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
