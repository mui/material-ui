import React from 'react';
import { assert } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import TableCell from './TableCell';

describe('<TableCell />', () => {
  let mount;
  let classes;
  function mountInTable(node) {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>{node}</tr>
        </tbody>
      </table>,
    );
    return wrapper
      .childAt(0)
      .childAt(0)
      .childAt(0);
  }

  before(() => {
    mount = createMount();
    classes = getClasses(<TableCell />);
  });

  it('should render a td', () => {
    const wrapper = mountInTable(<TableCell />);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'TD');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = mountInTable(<TableCell data-my-prop="woofTableCell" />);
    assert.strictEqual(
      wrapper.find('td').props()['data-my-prop'],
      'woofTableCell',
      'custom prop should be woofTableCell',
    );
  });

  it('should render with the user, root and padding classes', () => {
    const wrapper = mountInTable(<TableCell className="woofTableCell" />);
    assert.strictEqual(wrapper.find('td').hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.find('td').hasClass(classes.root), true);
    assert.strictEqual(wrapper.find('td').hasClass(classes.paddingDefault), false);
  });

  it('should render with the user, root and without the padding classes', () => {
    const wrapper = mountInTable(<TableCell className="woofTableCell" padding="none" />);
    assert.strictEqual(wrapper.find('td').hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.find('td').hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.find('td').hasClass(classes.paddingDefault),
      false,
      'should not have the padding class',
    );
  });

  it('should render with the user, root, padding, and checkbox classes', () => {
    const wrapper = mountInTable(<TableCell className="woofTableCell" padding="checkbox" />);
    assert.strictEqual(wrapper.find('td').hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.find('td').hasClass(classes.root), true);
    assert.strictEqual(wrapper.find('td').hasClass(classes.paddingCheckbox), true);
  });

  it('should render with the user, root, padding, and small classes', () => {
    const wrapper = mountInTable(<TableCell className="woofTableCell" size="small" />);
    assert.strictEqual(wrapper.find('td').hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.find('td').hasClass(classes.root), true);
    assert.strictEqual(wrapper.find('td').hasClass(classes.sizeSmall), true);
  });

  it('should render children', () => {
    const children = <p className="test">Hello</p>;
    const wrapper = mountInTable(<TableCell>{children}</TableCell>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  it('should render a div when custom component prop is used', () => {
    const wrapper = mount(<TableCell component="div" />);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'DIV');
    assert.strictEqual(wrapper.find('div').hasClass(classes.root), true);
  });

  it('should render aria-sort="ascending" when prop sortDirection="asc" provided', () => {
    const wrapper = mountInTable(<TableCell sortDirection="asc" />);
    assert.strictEqual(wrapper.find('td').props()['aria-sort'], 'ascending');
  });

  it('should render aria-sort="descending" when prop sortDirection="desc" provided', () => {
    const wrapper = mountInTable(<TableCell sortDirection="desc" />);
    assert.strictEqual(wrapper.find('td').props()['aria-sort'], 'descending');
  });

  it('should center content', () => {
    const wrapper = mountInTable(<TableCell align="center" />);
    assert.strictEqual(wrapper.find('td').hasClass(classes.alignCenter), true);
  });
});
