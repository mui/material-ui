// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import TablePagination from './TablePagination';

describe('<TablePagination />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render a TableRow', () => {
    const wrapper = shallow(
      <TablePagination
        count={1}
        page={0}
        onChangePage={() => {}}
        onChangeRowsPerPage={() => {}}
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
        onChangePage={() => {}}
        onChangeRowsPerPage={() => {}}
        rowsPerPage={5}
        data-my-prop="woofTablePagination"
      />,
    );
    assert.strictEqual(
      wrapper.prop('data-my-prop'),
      'woofTablePagination',
      'custom prop should be woofTablePagination',
    );
  });

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

    const wrapper = shallow(
      <TablePagination
        count={42}
        page={1}
        onChangePage={() => {}}
        onChangeRowsPerPage={() => {}}
        rowsPerPage={5}
        labelDisplayedRows={labelDisplayedRows}
      />,
    );
    assert.isTrue(labelDisplayedRowsCalled);
    assert.isTrue(wrapper.html().includes('Page 1'));
  });

  it('should use labelRowsPerPage', () => {
    const wrapper = shallow(
      <TablePagination
        count={1}
        page={0}
        onChangePage={() => {}}
        onChangeRowsPerPage={() => {}}
        rowsPerPage={5}
        labelRowsPerPage="Zeilen pro Seite:"
      />,
    );
    assert.isTrue(wrapper.html().includes('Zeilen pro Seite:'));
  });
});
