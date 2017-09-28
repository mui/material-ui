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

    it('should disable the back button on the first page', () => {
      const wrapper = mount(
        <table>
          <TableFooter>
            <TablePagination
              count={6}
              page={0}
              onChangePage={noop}
              onChangeRowsPerPage={noop}
              rowsPerPage={5}
            />
          </TableFooter>
        </table>,
      );

      const backButton = wrapper.find('withStyles(IconButton)').at(0);
      const nextButton = wrapper.find('withStyles(IconButton)').at(1);
      assert.strictEqual(backButton.props().disabled, true);
      assert.strictEqual(nextButton.props().disabled, false);
    });

    it('should disable the next button on the last page', () => {
      const wrapper = mount(
        <table>
          <TableFooter>
            <TablePagination
              count={6}
              page={1}
              onChangePage={noop}
              onChangeRowsPerPage={noop}
              rowsPerPage={5}
            />
          </TableFooter>
        </table>,
      );

      const backButton = wrapper.find('withStyles(IconButton)').at(0);
      const nextButton = wrapper.find('withStyles(IconButton)').at(1);
      assert.strictEqual(backButton.props().disabled, false);
      assert.strictEqual(nextButton.props().disabled, true);
    });

    it('should handle next button clicks properly', () => {
      let page = 1;
      const wrapper = mount(
        <table>
          <TableFooter>
            <TablePagination
              count={15}
              page={page}
              onChangePage={(event, nextPage) => {
                page = nextPage;
              }}
              onChangeRowsPerPage={noop}
              rowsPerPage={5}
            />
          </TableFooter>
        </table>,
      );

      const nextButton = wrapper.find('withStyles(IconButton)').at(1);
      nextButton.simulate('click');
      assert.strictEqual(page, 2);
    });

    it('should handle back button clicks properly', () => {
      let page = 1;
      const wrapper = mount(
        <table>
          <TableFooter>
            <TablePagination
              count={15}
              page={page}
              onChangePage={(event, nextPage) => {
                page = nextPage;
              }}
              onChangeRowsPerPage={noop}
              rowsPerPage={5}
            />
          </TableFooter>
        </table>,
      );

      const nextButton = wrapper.find('withStyles(IconButton)').at(0);
      nextButton.simulate('click');
      assert.strictEqual(page, 0);
    });

    it('should handle too high pages after changing rowsPerPage', () => {
      let page = 2;
      function ExampleTable(props) {
        // setProps only works on the mounted root element, so wrap the table
        return (
          <table>
            <TableFooter>
              <TablePagination
                count={11}
                page={page}
                onChangePage={(event, nextPage) => {
                  page = nextPage;
                }}
                onChangeRowsPerPage={noop}
                {...props}
              />
            </TableFooter>
          </table>
        );
      }

      const wrapper = mount(<ExampleTable rowsPerPage={5} />);
      wrapper.setProps({ rowsPerPage: 10 });
      // now, the third page doesn't exist anymore
      assert.strictEqual(page, 1);
    });

    it('should display 0 as start number if the table is empty ', () => {
      const wrapper = mount(
        <table>
          <TableFooter>
            <TablePagination
              count={0}
              page={0}
              rowsPerPage={5}
              onChangePage={noop}
              onChangeRowsPerPage={noop}
            />
          </TableFooter>
        </table>,
      );
      assert.strictEqual(
        wrapper
          .find('withStyles(Typography)')
          .at(1)
          .text(),
        '0-0 of 0',
      );
    });

    it('should call onChangePage with 0 if the table becomes empty', () => {
      let page = 1;
      function ExampleTable(props) {
        // setProps only works on the mounted root element, so wrap the table
        return (
          <table>
            <TableFooter>
              <TablePagination
                page={1}
                rowsPerPage={5}
                onChangePage={(event, newPage) => {
                  page = newPage;
                }}
                onChangeRowsPerPage={noop}
                {...props}
              />
            </TableFooter>
          </table>
        );
      }

      const wrapper = mount(<ExampleTable count={10} />);
      wrapper.setProps({ count: 0 });
      // now, there is one page, which is empty
      assert.strictEqual(page, 0);
    });
  });
});
