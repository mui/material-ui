import * as React from 'react';
import { expect, assert } from 'chai';
import PropTypes from 'prop-types';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { fireEvent, createClientRender } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Select from '../Select';
import IconButton from '../IconButton';
import TableFooter from '../TableFooter';
import TableCell from '../TableCell';
import Typography from '../Typography';
import TableRow from '../TableRow';
import TablePagination from './TablePagination';

describe('<TablePagination />', () => {
  const noop = () => {};
  let classes;
  let mount;
  const render = createClientRender();

  function mountInTable(node) {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>{node}</tr>
        </tbody>
      </table>,
    );
    return wrapper.find('tr').childAt(0);
  }

  before(() => {
    classes = getClasses(
      <TablePagination count={1} onChangePage={() => {}} page={0} rowsPerPage={10} />,
    );
  });

  beforeEach(() => {
    // StrictModeViolation: test uses #html()()
    mount = createMount({ strict: false });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describeConformance(
    <TablePagination count={1} onChangePage={() => {}} page={0} rowsPerPage={10} />,
    () => ({
      classes,
      inheritComponent: TableCell,
      mount: mountInTable,
      refInstanceof: window.HTMLTableCellElement,
      // can only use `td` in a tr so we just fake a different component
      testComponentPropWith: props => <td {...props} />,
    }),
  );

  describe('mount', () => {
    it('should use the labelDisplayedRows callback', () => {
      let labelDisplayedRowsCalled = false;
      function labelDisplayedRows({ from, to, count, page }) {
        labelDisplayedRowsCalled = true;
        assert.strictEqual(from, 11);
        assert.strictEqual(to, 20);
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
                rowsPerPage={10}
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
                rowsPerPage={10}
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
                count={11}
                page={0}
                onChangePage={noop}
                onChangeRowsPerPage={noop}
                rowsPerPage={10}
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
                count={11}
                page={1}
                onChangePage={noop}
                onChangeRowsPerPage={noop}
                rowsPerPage={10}
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
                count={30}
                page={page}
                onChangePage={(event, nextPage) => {
                  page = nextPage;
                }}
                onChangeRowsPerPage={noop}
                rowsPerPage={10}
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
                count={30}
                page={page}
                onChangePage={(event, nextPage) => {
                  page = nextPage;
                }}
                onChangeRowsPerPage={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const nextButton = wrapper.find(IconButton).at(0);
      nextButton.simulate('click');
      assert.strictEqual(page, 0);
    });

    it('should display 0 as start number if the table is empty ', () => {
      const wrapper = mount(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={0}
                page={0}
                rowsPerPage={10}
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

  describe('prop: count=-1', () => {
    it('should display the "of more than" text and keep the nextButton enabled', () => {
      const Test = () => {
        const [page, setPage] = React.useState(0);
        return (
          <table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  page={page}
                  rowsPerPage={10}
                  count={-1}
                  onChangePage={(_, newPage) => {
                    setPage(newPage);
                  }}
                />
              </TableRow>
            </TableFooter>
          </table>
        );
      };

      const { container, getByLabelText } = render(<Test />);

      expect(container).to.have.text('Rows per page:101-10 of more than 10');
      fireEvent.click(getByLabelText('Next page'));
      expect(container).to.have.text('Rows per page:1011-20 of more than 20');
    });
  });

  describe('warnings', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
      PropTypes.resetWarningCache();
    });

    it('should raise a warning if the page prop is out of range', () => {
      assert.strictEqual(consoleErrorMock.callCount(), 0);
      mount(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={2}
                count={20}
                rowsPerPage={10}
                onChangePage={noop}
                onChangeRowsPerPage={noop}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.messages()[0],
        'Material-UI: the page prop of a TablePagination is out of range (0 to 1, but page is 2).',
      );
    });
  });
});
