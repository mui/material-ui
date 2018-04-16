// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import TableRow from './TableRow';

describe('<TableRow />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableRow />);
  });

  it('should render a tr', () => {
    const wrapper = shallow(<TableRow />);
    assert.strictEqual(wrapper.name(), 'tr');
  });

  it('should render a div', () => {
    const wrapper = shallow(<TableRow component="div" />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<TableRow data-my-prop="woofTableRow" />);
    assert.strictEqual(
      wrapper.prop('data-my-prop'),
      'woofTableRow',
      'custom prop should be woofTableRow',
    );
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<TableRow className="woofTableRow" />);
    assert.strictEqual(wrapper.hasClass('woofTableRow'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render children', () => {
    const children = <td className="test" />;
    const wrapper = shallow(<TableRow>{children}</TableRow>);
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });

  it('should render with the head class when in the context of a table head', () => {
    const wrapper = shallow(<TableRow />);
    wrapper.setContext({ table: { head: true } });
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.head), true, 'should have the head class');
  });

  it('should render with the footer class when in the context of a table footer', () => {
    const wrapper = shallow(<TableRow />);
    wrapper.setContext({ table: { footer: true } });
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.footer), true, 'should have the footer class');
  });
});
