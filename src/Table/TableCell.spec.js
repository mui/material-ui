import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import TableCell from './TableCell';

describe('<TableCell />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: TableCell, context: { table: { footer: true } } });
    classes = getClasses(<TableCell />);
  });

  it('should render a td', () => {
    const wrapper = shallow(<TableCell />);
    assert.strictEqual(wrapper.name(), 'td');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<TableCell data-my-prop="woofTableCell" />);
    assert.strictEqual(
      wrapper.props()['data-my-prop'],
      'woofTableCell',
      'custom prop should be woofTableCell',
    );
  });

  it('should render with the user, root and padding classes', () => {
    const wrapper = shallow(<TableCell className="woofTableCell" />);
    assert.strictEqual(wrapper.hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.paddingDefault),
      true,
      'should have the padding class',
    );
  });

  it('should render with the user, root and without the padding classes', () => {
    const wrapper = shallow(<TableCell className="woofTableCell" padding="none" />);
    assert.strictEqual(wrapper.hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.paddingDefault),
      false,
      'should not have the padding class',
    );
  });

  it('should render with the user, root, padding, and checkbox classes', () => {
    const wrapper = shallow(<TableCell className="woofTableCell" padding="checkbox" />);
    assert.strictEqual(wrapper.hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.paddingDefault), true);
    assert.strictEqual(wrapper.hasClass(classes.paddingCheckbox), true);
  });

  it('should render with the user, root, padding, and dense classes', () => {
    const wrapper = shallow(<TableCell className="woofTableCell" padding="dense" />);
    assert.strictEqual(wrapper.hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.paddingDefault), true);
    assert.strictEqual(wrapper.hasClass(classes.paddingDense), true);
  });

  it('should render children', () => {
    const children = <p className="test">Hello</p>;
    const wrapper = shallow(<TableCell>{children}</TableCell>);
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });

  it('should render a th with the head class when in the context of a table head', () => {
    const wrapper = shallow(<TableCell />);
    wrapper.setContext({ table: { head: true } });
    assert.strictEqual(wrapper.name(), 'th');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.head), true, 'should have the head class');
  });

  it('should render a th with the footer class when in the context of a table footer', () => {
    const wrapper = shallow(<TableCell />);
    wrapper.setContext({ table: { footer: true } });
    assert.strictEqual(wrapper.name(), 'td');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.footer), true, 'should have the footer class');
  });

  it('should render a div when custom component prop is used', () => {
    const wrapper = shallow(<TableCell component="div" />);
    assert.strictEqual(wrapper.name(), 'div', 'should be a div element');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the footer class when in the context of a table footer', () => {
    const wrapper = shallow(<TableCell />);
    wrapper.setContext({ table: { footer: true } });
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.footer), true, 'should have the footer class');
  });

  it('should render with the numeric class', () => {
    const wrapper = shallow(<TableCell numeric />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.numeric), true, 'should have the numeric class');
  });
});
