import * as React from 'react';
import { expect } from 'chai';
import { findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createClientRender } from 'test/utils/createClientRender';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

describe('<TableRow> integration', () => {
  let classes;
  const mount = createMount();
  const render = createClientRender();
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
  });

  it('should render a th with the head class when in the context of a table head', () => {
    const wrapper = mountInTable(<TableCell />, TableHead);
    const root = findOutermostIntrinsic(wrapper);
    expect(root.type()).to.equal('th');
    expect(root.hasClass(classes.root)).to.equal(true);
    expect(root.hasClass(classes.head)).to.equal(true);
    expect(root.props().scope).to.equal('col');
  });

  it('should render specified scope attribute even when in the context of a table head', () => {
    const wrapper = mountInTable(<TableCell scope="row" />, TableHead);
    expect(wrapper.props().scope).to.equal('row');
  });

  it('should render a th with the footer class when in the context of a table footer', () => {
    const wrapper = mountInTable(<TableCell />, TableFooter);
    const root = findOutermostIntrinsic(wrapper);
    expect(root.type()).to.equal('td');
    expect(root.hasClass(classes.root)).to.equal(true);
    expect(root.hasClass(classes.footer)).to.equal(true);
  });

  it('should render with the footer class when in the context of a table footer', () => {
    const wrapper = mountInTable(<TableCell />, TableFooter);
    expect(wrapper.find('td').hasClass(classes.root)).to.equal(true);
    expect(wrapper.find('td').hasClass(classes.footer)).to.equal(true);
  });

  it('should render with the head class when variant is head, overriding context', () => {
    const wrapper = mountInTable(<TableCell variant="head" />, TableFooter);
    expect(wrapper.find('td').hasClass(classes.head)).to.equal(true);
    expect(wrapper.find('td').props().scope).to.equal(undefined);
  });

  it('should render without head class when variant is body, overriding context', () => {
    const wrapper = mountInTable(<TableCell variant="body" />, TableFooter);
    expect(wrapper.find('td').hasClass(classes.head)).to.equal(false);
  });

  it('should render without footer class when variant is body, overriding context', () => {
    const wrapper = mountInTable(<TableCell variant="body" />, TableFooter);
    expect(wrapper.find('td').hasClass(classes.footer)).to.equal(false);
  });

  it('should render with the footer class when variant is footer, overriding context', () => {
    const wrapper = mountInTable(<TableCell variant="footer" />, TableHead);
    expect(wrapper.find('th').hasClass(classes.footer)).to.equal(true);
  });

  it('sets role="columnheader" when "component" prop is set and used in the context of table head', () => {
    const { getByTestId } = render(
      <TableHead component="div">
        <TableCell component="div" data-testid="cell" />,
      </TableHead>,
    );
    expect(getByTestId('cell')).to.have.attribute('role', 'columnheader');
  });

  it('sets role="cell" when "component" prop is set and used in the context of table body ', () => {
    const { getByTestId } = render(
      <TableBody component="div">
        <TableCell component="div" data-testid="cell" />,
      </TableBody>,
    );
    expect(getByTestId('cell')).to.have.attribute('role', 'cell');
  });

  it('sets role="cell" when "component" prop is set and used in the context of table footer ', () => {
    const { getByTestId } = render(
      <TableFooter component="div">
        <TableCell component="div" data-testid="cell" />,
      </TableFooter>,
    );
    expect(getByTestId('cell')).to.have.attribute('role', 'cell');
  });
});
