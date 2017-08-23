// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Table from './Table';

describe('<Table />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Table />);
  });

  it('should render a table', () => {
    const wrapper = shallow(<Table />);
    assert.strictEqual(wrapper.name(), 'table');
  });

  it('should render a div', () => {
    const wrapper = shallow(<Table component="div" />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<Table data-my-prop="woofTable" />);
    assert.strictEqual(
      wrapper.prop('data-my-prop'),
      'woofTable',
      'custom prop should be woofTable',
    );
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<Table className="woofTable" />);
    assert.strictEqual(wrapper.hasClass('woofTable'), true);
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
