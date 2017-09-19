// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import TableFooter from './TableFooter';
import TablePagination from './TablePagination';

describe('<TablePagination />', () => {
  const noop = () => {};
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a TableRow', () => {
    const wrapper = shallow(
      <TablePagination
        count={1}
        page={0}
        onChangePage={noop}
        onChangeRowsPerPage={noop}
        rowsPerPage={5}
      />,
    );
    assert.strictEqual(wrapper.name(), 'withStyles(TableRow)');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(
      <TablePagination
        count={1}
        page={0}
        onChangePage={noop}
        onChangeRowsPerPage={noop}
        rowsPerPage={5}
        data-my-prop="woofTablePagination"
      />,
    );
    assert.strictEqual(
      wrapper.props()['data-my-prop'],
      'woofTablePagination',
      'custom prop should be woofTablePagination',
    );
  });

  describe('mount', () => {
    it('should use the labelDisplayedRows callback', () => {
      let labelDisplayedRowsCalled = false;
      function labelDisplayedRows({ from, to, count, page }) {
        labelDisplayedRowsCalled = true;
        assert.strictEqual(from, 6);
        assert.strictEqual(to, 10);
        assert.strictEqual(count, 42);
        assert.strictEqual(page, 1);
        return `Page ${page}`;
      }

      const wrapper = mount(
        <table>
          <TableFooter>
            <TablePagination
              count={42}
              page={1}
              onChangePage={noop}
              onChangeRowsPerPage={noop}
              rowsPerPage={5}
              labelDisplayedRows={labelDisplayedRows}
            />
          </TableFooter>
        </table>,
      );
      assert.strictEqual(labelDisplayedRowsCalled, true);
      assert.strictEqual(wrapper.html().includes('Page 1'), true);
    });

    it('should use labelRowsPerPage', () => {
      const wrapper = mount(
        <table>
          <TableFooter>
            <TablePagination
              count={1}
              page={0}
              onChangePage={noop}
              onChangeRowsPerPage={noop}
              rowsPerPage={5}
              labelRowsPerPage="Zeilen pro Seite:"
            />
          </TableFooter>
        </table>,
      );
      assert.strictEqual(wrapper.html().includes('Zeilen pro Seite:'), true);
    });
  });
});
