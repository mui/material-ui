// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import TableRow, { styleSheet } from './TableRow';

describe('<TableRow />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render a tr', () => {
    const wrapper = shallow(<TableRow />);
    assert.strictEqual(wrapper.name(), 'tr');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<TableRow data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<TableRow className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render children', () => {
    const children = <td className="test" />;
    const wrapper = shallow(
      <TableRow>
        {children}
      </TableRow>,
    );
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });

  it('should render with the head class when in the context of a table head', () => {
    const wrapper = shallow(<TableRow />);
    wrapper.setContext({ ...wrapper.options.context, table: { head: true } });
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.head), true, 'should have the head class');
  });

  it('should render with the footer class when in the context of a table footer', () => {
    const wrapper = shallow(<TableRow />);
    wrapper.setContext({ ...wrapper.options.context, table: { footer: true } });
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.footer), true, 'should have the footer class');
  });
});
