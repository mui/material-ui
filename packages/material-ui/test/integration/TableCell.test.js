import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createClientRender, within } from 'test/utils';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

describe('<TableRow> integration', () => {
  let classes;
  const table = document.createElement('table');
  const render = createClientRender();
  function renderInTable(node, Variant) {
    const InnerWrapper = ({ children }) => (
      <Variant data-testid="outer">
        <tr>{children}</tr>
      </Variant>
    );
    const wrapper = render(node, { wrapper: InnerWrapper, container: table });
    return { ...wrapper, root: within(wrapper.getByRole('row').firstChild) };
  }

  before(() => {
    classes = getClasses(<TableCell />);
  });

  it('should render a th with the head class when in the context of a table head', () => {
    const { getByTestId } = renderInTable(<TableCell data-testid="cell" />, TableHead);
    expect(getByTestId('cell').localName).to.equal('th');
    expect(getByTestId('cell')).to.have.class(classes.root);
    expect(getByTestId('cell')).to.have.class(classes.head);
    expect(getByTestId('cell')).to.have.property('scope', 'col');
  });

  it('should render specified scope attribute even when in the context of a table head', () => {
    const { getByTestId } = renderInTable(<TableCell scope="row" data-testid="cell" />, TableHead);
    expect(getByTestId('cell')).to.have.property('scope', 'row');
  });

  it('should render a th with the footer class when in the context of a table footer', () => {
    const { getByTestId } = renderInTable(<TableCell data-testid="cell" />, TableFooter);
    expect(getByTestId('cell').localName).to.equal('td');
    expect(getByTestId('cell')).to.have.class(classes.root);
    expect(getByTestId('cell')).to.have.class(classes.footer);
  });

  it('should render with the footer class when in the context of a table footer', () => {
    const { getByTestId } = renderInTable(<TableCell data-testid="cell" />, TableFooter);
    expect(getByTestId('cell')).to.have.class(classes.root);
    expect(getByTestId('cell')).to.have.class(classes.footer);
  });

  it('should render with the head class when variant is head, overriding context', () => {
    const { getByTestId } = renderInTable(
      <TableCell variant="head" data-testid="cell" />,
      TableFooter,
    );
    expect(getByTestId('cell')).to.have.class(classes.head);
    expect(getByTestId('cell')).to.have.property('scope', '');
  });

  it('should render without head class when variant is body, overriding context', () => {
    const { getByTestId } = renderInTable(
      <TableCell variant="body" data-testid="cell" />,
      TableFooter,
    );
    expect(getByTestId('cell')).not.to.have.class(classes.head);
  });

  it('should render without footer class when variant is body, overriding context', () => {
    const { getByTestId } = renderInTable(
      <TableCell variant="body" data-testid="cell" />,
      TableFooter,
    );
    expect(getByTestId('cell')).not.to.have.class(classes.footer);
  });

  it('should render with the footer class when variant is footer, overriding context', () => {
    const { getByTestId } = renderInTable(
      <TableCell variant="footer" data-testid="cell" />,
      TableHead,
    );

    expect(getByTestId('cell')).to.have.class(classes.footer);
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
