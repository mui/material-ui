import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import TableCell, { tableCellClasses as classes } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import describeConformance from '../../test/describeConformance';

describe('<TableCell />', () => {
  const { render } = createRenderer();
  function renderInTable(node) {
    return render(
      <table>
        <tbody>
          <tr>{node}</tr>
        </tbody>
      </table>,
    );
  }

  describeConformance(<TableCell />, () => ({
    classes,
    inheritComponent: 'td',
    render: (node) => {
      const { container, ...other } = render(
        <table>
          <tbody>
            <tr>{node}</tr>
          </tbody>
        </table>,
      );
      return { container: container.firstChild.firstChild.firstChild, ...other };
    },
    muiName: 'MuiTableCell',
    testVariantProps: { variant: 'body' },
    refInstanceof: window.HTMLTableCellElement,
    // invalid nesting otherwise
    testComponentPropWith: 'td',
    skip: ['componentsProp'],
  }));

  describe('prop: padding', () => {
    it("doesn't not have a class for padding by default", () => {
      const { container } = renderInTable(<TableCell padding="normal" />);
      expect(container.querySelector('td')).not.to.have.class(classes.paddingNormal);
    });

    it('has a class when `none`', () => {
      const { container } = renderInTable(<TableCell padding="none" />);
      expect(container.querySelector('td')).to.have.class(classes.paddingNone);
    });

    it('has a class when `checkbox`', () => {
      const { container } = renderInTable(<TableCell padding="checkbox" />);
      expect(container.querySelector('td')).to.have.class(classes.paddingCheckbox);
    });
  });

  it('has a class when `size="small"`', () => {
    const { container } = renderInTable(<TableCell size="small" />);
    expect(container.querySelector('td')).to.have.class(classes.sizeSmall);
  });

  it('should render children', () => {
    const children = <p data-testid="hello">Hello</p>;
    renderInTable(<TableCell>{children}</TableCell>);
    expect(screen.getByTestId('hello')).not.to.equal(null);
  });

  it('should render aria-sort="ascending" when prop sortDirection="asc" provided', () => {
    const { container } = renderInTable(<TableCell sortDirection="asc" />);
    expect(container.querySelector('td')).to.have.attribute('aria-sort', 'ascending');
  });

  it('should render aria-sort="descending" when prop sortDirection="desc" provided', () => {
    const { container } = renderInTable(<TableCell sortDirection="desc" />);
    expect(container.querySelector('td')).to.have.attribute('aria-sort', 'descending');
  });

  it('should center content', () => {
    const { container } = renderInTable(<TableCell align="center" />);
    expect(container.querySelector('td')).to.have.class(classes.alignCenter);
  });

  it('should allow the default role (rowheader) to trigger', () => {
    const { container } = renderInTable(<TableCell component="th" scope="row" />);
    expect(container.querySelector('th')).not.to.have.attribute('role');
  });

  it('should not set scope attribute when TableCell is rendered as <td> within table head', () => {
    const { container } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell component="td" />
          </TableRow>
        </TableHead>
      </Table>,
    );
    expect(container.querySelector('td')).not.to.have.attribute('scope');
  });
});
