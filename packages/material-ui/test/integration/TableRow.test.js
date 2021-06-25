import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow, { tableRowClasses as classes } from '@material-ui/core/TableRow';

describe('<TableRow> integration', () => {
  const render = createClientRender();

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
