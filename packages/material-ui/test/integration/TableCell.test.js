import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  findOutermostIntrinsic,
  getClasses,
} from 'packages/material-ui/src/test-utils';
import TableCell from 'packages/material-ui/src/TableCell';
import TableFooter from 'packages/material-ui/src/TableFooter';
import TableHead from 'packages/material-ui/src/TableHead';

describe('<TableRow> integration', () => {
  let classes;
  let mount;
  function mountInTable(node, Variant) {
    const wrapper = mount(
      <table>
        <Variant>
          <tr>{node}</tr>
        </Variant>
      </table>,
    );
    return wrapper.find('tr').childAt(0);
  }

  before(() => {
    classes = getClasses(<TableCell />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a th with the head class when in the context of a table head', () => {
    const wrapper = mountInTable(<TableCell />, TableHead);
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.type(), 'th');
    assert.strictEqual(root.hasClass(classes.root), true);
    assert.strictEqual(root.hasClass(classes.head), true);
    assert.strictEqual(root.props().scope, 'col');
  });

  it('should render specified scope attribute even when in the context of a table head', () => {
    const wrapper = mountInTable(<TableCell scope="row" />, TableHead);
    assert.strictEqual(wrapper.props().scope, 'row');
  });

  it('should render a th with the footer class when in the context of a table footer', () => {
    const wrapper = mountInTable(<TableCell />, TableFooter);
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.type(), 'td');
    assert.strictEqual(root.hasClass(classes.root), true);
    assert.strictEqual(root.hasClass(classes.footer), true);
  });

  it('should render with the footer class when in the context of a table footer', () => {
    const wrapper = mountInTable(<TableCell />, TableFooter);
    assert.strictEqual(wrapper.find('td').hasClass(classes.root), true);
    assert.strictEqual(wrapper.find('td').hasClass(classes.footer), true);
  });

  it('should render with the head class when variant is head, overriding context', () => {
    const wrapper = mountInTable(<TableCell variant="head" />, TableFooter);
    assert.strictEqual(wrapper.find('td').hasClass(classes.head), true);
    assert.strictEqual(wrapper.find('td').props().scope, undefined);
  });

  it('should render without head class when variant is body, overriding context', () => {
    const wrapper = mountInTable(<TableCell variant="body" />, TableFooter);
    assert.strictEqual(wrapper.find('td').hasClass(classes.head), false);
  });

  it('should render without footer class when variant is body, overriding context', () => {
    const wrapper = mountInTable(<TableCell variant="body" />, TableFooter);
    assert.strictEqual(wrapper.find('td').hasClass(classes.footer), false);
  });

  it('should render with the footer class when variant is footer, overriding context', () => {
    const wrapper = mountInTable(<TableCell variant="footer" />, TableHead);
    assert.strictEqual(wrapper.find('th').hasClass(classes.footer), true);
  });
});
