/* eslint-env mocha */
import React from 'react';
import { assert } from 'chai';
import Table, { styleSheet } from './Table';
import { createShallowWithContext } from 'test/utils';

describe('<Table>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });

  it('should render a table', () => {
    const wrapper = shallow(
      <Table />
    );
    assert.strictEqual(wrapper.is('table'), true, 'should be a table');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<Table data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<Table className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render children', () => {
    const children = <tbody className="test"></tbody>;
    const wrapper = shallow(<Table>{children}</Table>);
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
});
