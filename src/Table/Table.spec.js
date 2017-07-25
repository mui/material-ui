// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Table, { styleSheet } from './Table';

describe('<Table />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render a table', () => {
    const wrapper = shallow(<Table />);
    assert.strictEqual(wrapper.name(), 'table');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<Table data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<Table className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render children', () => {
    const children = <tbody className="test" />;
    const wrapper = shallow(
      <Table>
        {children}
      </Table>,
    );
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
});
