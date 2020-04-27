import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

describe('<TableRow> integration', () => {
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<TableRow />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with the head class when in the context of a table head', () => {
    const wrapper = mount(
      <table>
        <TableHead>
          <TableRow />
        </TableHead>
      </table>,
    );
    expect(wrapper.find('tr').hasClass(classes.root)).to.equal(true);
    expect(wrapper.find('tr').hasClass(classes.head)).to.equal(true);
  });

  it('should render with the footer class when in the context of a table footer', () => {
    const wrapper = mount(
      <table>
        <TableFooter>
          <TableRow />
        </TableFooter>
      </table>,
    );
    expect(wrapper.find('tr').hasClass(classes.root)).to.equal(true);
    expect(wrapper.find('tr').hasClass(classes.footer)).to.equal(true);
  });
});
