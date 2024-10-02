import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import TableCell, { tableCellClasses as classes } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

describe('<TableRow> integration', () => {
  const { render } = createRenderer();
  function renderInTable(node, Variant) {
    return render(
      <Table>
        <Variant>
          <TableRow>{node}</TableRow>
        </Variant>
      </Table>,
    );
  }

  it('should render a th with the head class when in the context of a table head', () => {
    const { getByTestId } = renderInTable(<TableCell data-testid="cell" />, TableHead);
    expect(getByTestId('cell')).to.have.tagName('th');
    expect(getByTestId('cell')).to.have.class(classes.root);
    expect(getByTestId('cell')).to.have.class(classes.head);
    expect(getByTestId('cell')).to.have.attribute('scope', 'col');
  });

  it('should render specified scope attribute even when in the context of a table head', () => {
    const { getByTestId } = renderInTable(<TableCell scope="row" data-testid="cell" />, TableHead);
    expect(getByTestId('cell')).to.have.attribute('scope', 'row');
  });

  it('should render a th with the footer class when in the context of a table footer', () => {
    const { getByTestId } = renderInTable(<TableCell data-testid="cell" />, TableFooter);
    expect(getByTestId('cell')).to.have.tagName('td');
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
    expect(getByTestId('cell')).not.to.have.attribute('scope');
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

  it('does not set `role` when `component` prop is set and used in the context of table head', () => {
    const { getByTestId } = render(
      <TableHead component="div">
        <TableCell component="div" data-testid="cell" />,
      </TableHead>,
    );
    expect(getByTestId('cell')).not.to.have.attribute('role');
  });

  it('does not set `role` when `component` prop is set and used in the context of table body ', () => {
    const { getByTestId } = render(
      <TableBody component="div">
        <TableCell component="div" data-testid="cell" />,
      </TableBody>,
    );
    expect(getByTestId('cell')).not.to.have.attribute('role');
  });

  it('does not set `role` when `component` prop is set and used in the context of table footer ', () => {
    const { getByTestId } = render(
      <TableFooter component="div">
        <TableCell component="div" data-testid="cell" />,
      </TableFooter>,
    );
    expect(getByTestId('cell')).not.to.have.attribute('role');
  });
});
