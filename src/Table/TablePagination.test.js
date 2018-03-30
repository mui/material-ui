// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import Select from '../Select';
import IconButton from '../IconButton';
import TableFooter from './TableFooter';
import TableCell from './TableCell';
import TablePagination from './TablePagination';
import Typography from '../Typography';
import TableRow from './TableRow';

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

  it('should render a TableCell', () => {
    const wrapper = shallow(
      <TablePagination
        count={1}
        page={0}
        onChangePage={noop}
        onChangeRowsPerPage={noop}
        rowsPerPage={5}
      />,
    );
    assert.strictEqual(wrapper.type(), TableCell);
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

  describe('prop: component', () => {
    it('should render a TableCell by default', () => {
      const wrapper = shallow(
        <TablePagination
          count={1}
          page={0}
          onChangePage={noop}
          onChangeRowsPerPage={noop}
          rowsPerPage={5}
        />,
      );
      assert.strictEqual(wrapper.type(), TableCell);
      assert.notStrictEqual(wrapper.props().colSpan, undefined);
    });

    it('should be able to use outside of the table', () => {
      const wrapper = shallow(
        <TablePagination
          component="div"
          count={1}
          page={0}
          onChangePage={noop}
          onChangeRowsPerPage={noop}
          rowsPerPage={5}
        />,
      );
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.props().colSpan, undefined);
    });
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
            <TableRow>
              <TablePagination
                count={42}
                page={1}
                onChangePage={noop}
                onChangeRowsPerPage={noop}
                rowsPerPage={5}
                labelDisplayedRows={labelDisplayedRows}
              />
            </TableRow>
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
            <TableRow>
              <TablePagination
                count={1}
                page={0}
                onChangePage={noop}
                onChangeRowsPerPage={noop}
                rowsPerPage={5}
                labelRowsPerPage="Zeilen pro Seite:"
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
      assert.strictEqual(wrapper.html().includes('Zeilen pro Seite:'), true);
    });

    it('should disable the back button on the first page', () => {
      const wrapper = mount(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={6}
                page={0}
                onChangePage={noop}
                onChangeRowsPerPage={noop}
                rowsPerPage={5}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const backButton = wrapper.find(IconButton).at(0);
      const nextButton = wrapper.find(IconButton).at(1);
      assert.strictEqual(backButton.props().disabled, true);
      assert.strictEqual(nextButton.props().disabled, false);
    });

    it('should disable the next button on the last page', () => {
      const wrapper = mount(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={6}
                page={1}
                onChangePage={noop}
                onChangeRowsPerPage={noop}
                rowsPerPage={5}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const backButton = wrapper.find(IconButton).at(0);
      const nextButton = wrapper.find(IconButton).at(1);
      assert.strictEqual(backButton.props().disabled, false);
      assert.strictEqual(nextButton.props().disabled, true);
    });

    it('should handle next button clicks properly', () => {
      let page = 1;
      const wrapper = mount(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={15}
                page={page}
                onChangePage={(event, nextPage) => {
                  page = nextPage;
                }}
                onChangeRowsPerPage={noop}
                rowsPerPage={5}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const nextButton = wrapper.find(IconButton).at(1);
      nextButton.simulate('click');
      assert.strictEqual(page, 2);
    });

    it('should handle back button clicks properly', () => {
      let page = 1;
      const wrapper = mount(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={15}
                page={page}
                onChangePage={(event, nextPage) => {
                  page = nextPage;
                }}
                onChangeRowsPerPage={noop}
                rowsPerPage={5}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const nextButton = wrapper.find(IconButton).at(0);
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
              <TableRow>
                <TablePagination
                  count={11}
                  page={page}
                  onChangePage={(event, nextPage) => {
                    page = nextPage;
                  }}
                  onChangeRowsPerPage={noop}
                  {...props}
                />
              </TableRow>
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
            <TableRow>
              <TablePagination
                count={0}
                page={0}
                rowsPerPage={5}
                onChangePage={noop}
                onChangeRowsPerPage={noop}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
      assert.strictEqual(
        wrapper
          .find(Typography)
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
              <TableRow>
                <TablePagination
                  page={1}
                  rowsPerPage={5}
                  onChangePage={(event, newPage) => {
                    page = newPage;
                  }}
                  onChangeRowsPerPage={noop}
                  {...props}
                />
              </TableRow>
            </TableFooter>
          </table>
        );
      }

      const wrapper = mount(<ExampleTable count={10} />);
      wrapper.setProps({ count: 0 });
      // now, there is one page, which is empty
      assert.strictEqual(page, 0);
    });

    it('should hide the rows per page selector if there are less than two options', () => {
      const wrapper = mount(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={0}
                rowsPerPage={5}
                rowsPerPageOptions={[5]}
                onChangePage={noop}
                onChangeRowsPerPage={noop}
                count={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      assert.strictEqual(wrapper.text().indexOf('Rows per page'), -1);
      assert.strictEqual(wrapper.find(Select).length, 0);
    });
  });
});
