import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses as classes } from '@mui/material/TableRow';

describe('<TableRow> integration', () => {
  const { render } = createRenderer();

  it('should render with the head class when in the context of a table head', () => {
    const { getByRole } = render(
      <table>
        <TableHead>
          <TableRow />
        </TableHead>
      </table>,
    );
    expect(getByRole('row')).to.have.class(classes.root);
    expect(getByRole('row')).to.have.class(classes.head);
  });

  it('should render with the footer class when in the context of a table footer', () => {
    const { getByRole } = render(
      <table>
        <TableFooter>
          <TableRow />
        </TableFooter>
      </table>,
    );
    expect(getByRole('row')).to.have.class(classes.root);
    expect(getByRole('row')).to.have.class(classes.footer);
  });
});
