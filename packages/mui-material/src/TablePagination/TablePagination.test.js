import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import PropTypes from 'prop-types';
import { fireEvent, createRenderer } from '@mui/internal-test-utils';
import TableFooter from '@mui/material/TableFooter';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TablePagination, { tablePaginationClasses as classes } from '@mui/material/TablePagination';
import { inputClasses } from '@mui/material/Input';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { filledInputClasses } from '@mui/material/FilledInput';
import IconButton, { iconButtonClasses } from '@mui/material/IconButton';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { createSvgIcon } from '@mui/material/utils';
import describeConformance from '../../test/describeConformance';

const ArrowBackIcon = createSvgIcon(<path d="M3 3h18v18H3z" />, 'ArrowBack');
const ArrowForwardIcon = createSvgIcon(<path d="M3 3h18v18H3z" />, 'ArrowForward');
const KeyboardDoubleArrowLeftRoundedIcon = createSvgIcon(
  <path d="M3 3h18v18H3z" />,
  'KeyboardDoubleArrowLeftRounded',
);
const KeyboardDoubleArrowRightRoundedIcon = createSvgIcon(
  <path d="M3 3h18v18H3z" />,
  'KeyboardDoubleArrowRightRounded',
);

describe('<TablePagination />', () => {
  const noop = () => {};
  const { render } = createRenderer();

  describeConformance(
    <TablePagination count={1} onPageChange={noop} page={0} rowsPerPage={10} />,
    () => ({
      classes,
      inheritComponent: TableCell,
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
      muiName: 'MuiTablePagination',
      refInstanceof: window.HTMLTableCellElement,
      testComponentPropWith: 'td',
      testComponentsRootPropWith: 'td',
      testDeepOverrides: { slotName: 'toolbar', slotClassName: classes.toolbar },
      skip: ['themeVariants', 'componentsProps'],
    }),
  );

  describe('prop: labelDisplayedRows', () => {
    it('should use the labelDisplayedRows callback', () => {
      let labelDisplayedRowsCalled = false;
      function labelDisplayedRows({ from, to, count, page }) {
        labelDisplayedRowsCalled = true;
        expect(from).to.equal(11);
        expect(to).to.equal(20);
        expect(count).to.equal(42);
        expect(page).to.equal(1);
        return `Page ${page}`;
      }

      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={42}
                page={1}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                labelDisplayedRows={labelDisplayedRows}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
      expect(labelDisplayedRowsCalled).to.equal(true);
      expect(container.innerHTML.includes('Page 1')).to.equal(true);
    });
  });

  describe('prop: labelRowsPerPage', () => {
    it('labels the select for the current page', () => {
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                labelRowsPerPage="lines per page:"
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const combobox = getByRole('combobox');
      expect(combobox).toHaveAccessibleName('lines per page:');
    });

    it('accepts React nodes', () => {
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                labelRowsPerPage={
                  <React.Fragment>
                    <em>lines</em> per page:
                  </React.Fragment>
                }
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const combobox = getByRole('combobox');
      expect(combobox).toHaveAccessibleName('lines per page:');
    });
  });

  describe('prop: page', () => {
    it('should disable the back button on the first page', () => {
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={11}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const backButton = getByRole('button', { name: 'Go to previous page' });
      const nextButton = getByRole('button', { name: 'Go to next page' });
      expect(backButton).to.have.property('disabled', true);
      expect(nextButton).to.have.property('disabled', false);
    });

    it('should disable the next button on the last page', () => {
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={11}
                page={1}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const backButton = getByRole('button', { name: 'Go to previous page' });
      const nextButton = getByRole('button', { name: 'Go to next page' });
      expect(backButton).to.have.property('disabled', false);
      expect(nextButton).to.have.property('disabled', true);
    });
  });

  describe('prop: onPageChange', () => {
    it('should handle next button clicks properly', () => {
      let page = 1;
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={30}
                page={page}
                onPageChange={(event, nextPage) => {
                  page = nextPage;
                }}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const nextButton = getByRole('button', { name: 'Go to next page' });
      fireEvent.click(nextButton);
      expect(page).to.equal(2);
    });

    it('should handle back button clicks properly', () => {
      let page = 1;
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={30}
                page={page}
                onPageChange={(event, nextPage) => {
                  page = nextPage;
                }}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const backButton = getByRole('button', { name: 'Go to previous page' });
      fireEvent.click(backButton);
      expect(page).to.equal(0);
    });
  });

  describe('label', () => {
    it('should display 0 as start number if the table is empty ', () => {
      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={0}
                page={0}
                rowsPerPage={10}
                onPageChange={noop}
                onRowsPerPageChange={noop}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
      expect(container.querySelectorAll('p')[1]).to.have.text('0–0 of 0');
    });

    it('should hide the rows per page selector if there are less than two options', () => {
      const { container, queryByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={0}
                rowsPerPage={5}
                rowsPerPageOptions={[5]}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                count={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      expect(container).not.to.include.text('Rows per page');
      expect(queryByRole('listbox')).to.equal(null);
    });
  });

  describe('prop: count=-1', () => {
    it('should display the "of more than" text and keep the nextButton enabled', () => {
      function Test() {
        const [page, setPage] = React.useState(0);
        return (
          <table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  page={page}
                  rowsPerPage={10}
                  count={-1}
                  onPageChange={(_, newPage) => {
                    setPage(newPage);
                  }}
                />
              </TableRow>
            </TableFooter>
          </table>
        );
      }

      const { container, getByRole } = render(<Test />);

      expect(container).to.have.text('Rows per page:101–10 of more than 10');
      fireEvent.click(getByRole('button', { name: 'Go to next page' }));
      expect(container).to.have.text('Rows per page:1011–20 of more than 20');
    });
  });

  describe('prop: showFirstButton', () => {
    it('should change the page', () => {
      const handleChangePage = spy();
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                showFirstButton
                page={1}
                rowsPerPage={10}
                count={98}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      fireEvent.click(getByRole('button', { name: 'Go to first page' }));
      expect(handleChangePage.args[0][1]).to.equal(0);
    });
  });

  describe('prop: showLastButton', () => {
    it('should change the page', () => {
      const handleChangePage = spy();
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                showLastButton
                page={0}
                rowsPerPage={10}
                count={98}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      fireEvent.click(getByRole('button', { name: 'Go to last page' }));
      expect(handleChangePage.args[0][1]).to.equal(9);
    });
  });

  describe('prop: backIconButtonProps', () => {
    it('should apply props to the back button', () => {
      const backIconButtonPropsDisabled = true;

      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                backIconButtonProps={{ disabled: backIconButtonPropsDisabled }}
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const backButton = getByRole('button', { name: 'Go to previous page' });
      expect(backButton).to.have.property('disabled', backIconButtonPropsDisabled);
    });
  });

  describe('prop: nextIconButtonProps', () => {
    it('should apply props to the next button', () => {
      const nextIconButtonPropsDisabled = true;

      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                nextIconButtonProps={{ disabled: nextIconButtonPropsDisabled }}
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const nextButton = getByRole('button', { name: 'Go to next page' });
      expect(nextButton).to.have.property('disabled', nextIconButtonPropsDisabled);
    });
  });

  describe('prop: disabled', () => {
    it('should disable the first, last, next, and back buttons', () => {
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                disabled
                showFirstButton
                showLastButton
                count={30}
                page={1}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const firstButton = getByRole('button', { name: 'Go to first page' });
      const lastButton = getByRole('button', { name: 'Go to last page' });
      const nextButton = getByRole('button', { name: 'Go to next page' });
      const backButton = getByRole('button', { name: 'Go to previous page' });
      expect(firstButton).to.have.property('disabled', true);
      expect(lastButton).to.have.property('disabled', true);
      expect(nextButton).to.have.property('disabled', true);
      expect(backButton).to.have.property('disabled', true);
    });

    it('should disable TablePaginationSelect', () => {
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                disabled
                count={10}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const combobox = getByRole('combobox');
      expect(combobox.parentElement).to.have.class(inputClasses.disabled);
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('should raise a warning if the page prop is out of range', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          TablePagination.propTypes,
          {
            classes: {},
            page: 2,
            count: 20,
            rowsPerPage: 10,
            onPageChange: noop,
            onRowsPerPageChange: noop,
          },
          'prop',
          'MockedTablePagination',
        );
      }).toErrorDev(
        'MUI: The page prop of a TablePagination is out of range (0 to 1, but page is 2).',
      );
    });
  });

  describe('prop: SelectProps', () => {
    it('does allow manual label ids', () => {
      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                SelectProps={{ id: 'foo', labelId: 'bar' }}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const combobox = getByRole('combobox');
      expect(combobox).toHaveAccessibleName('Rows per page:');
    });

    ['standard', 'outlined', 'filled'].forEach((variant) => {
      it(`should be able to apply the ${variant} variant to select`, () => {
        const { getByRole } = render(
          <table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={1}
                  page={0}
                  onPageChange={noop}
                  onRowsPerPageChange={noop}
                  rowsPerPage={10}
                  SelectProps={{ variant }}
                />
              </TableRow>
            </TableFooter>
          </table>,
        );

        const combobox = getByRole('combobox');
        const comboboxContainer = combobox.parentElement;

        if (variant === 'standard') {
          expect(comboboxContainer).to.have.class(inputClasses.root);
        } else if (variant === 'outlined') {
          expect(comboboxContainer).to.have.class(outlinedInputClasses.root);
        } else if (variant === 'filled') {
          expect(comboboxContainer).to.have.class(filledInputClasses.root);
        }
      });
    });
  });

  describe('prop: rowsPerPage', () => {
    it('should display max number of rows text when prop is -1', () => {
      const { container } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={25}
                page={0}
                rowsPerPage={-1}
                onPageChange={noop}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      expect(container).to.include.text('All');
      expect(container).to.include.text('1–25 of 25');
    });
  });

  describe('prop: slotProps', () => {
    describe('actions', () => {
      describe('previousButton', () => {
        it('should override backIconButtonProps', () => {
          const slotPropsDisabled = false;
          const backIconButtonPropsDisabled = true;

          const { getByRole } = render(
            <table>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    backIconButtonProps={{ disabled: backIconButtonPropsDisabled }}
                    slotProps={{
                      actions: {
                        previousButton: { disabled: slotPropsDisabled },
                      },
                    }}
                    count={1}
                    page={0}
                    onPageChange={noop}
                    onRowsPerPageChange={noop}
                    rowsPerPage={10}
                  />
                </TableRow>
              </TableFooter>
            </table>,
          );

          const backButton = getByRole('button', { name: 'Go to previous page' });
          expect(slotPropsDisabled).not.to.equal(backIconButtonPropsDisabled);
          expect(backButton).to.have.property('disabled', slotPropsDisabled);
        });
      });

      describe('nextButton', () => {
        it('should override nextIconButtonProps', () => {
          const slotPropsDisabled = false;
          const nextIconButtonPropsDisabled = true;

          const { getByRole } = render(
            <table>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    nextIconButtonProps={{ disabled: nextIconButtonPropsDisabled }}
                    slotProps={{
                      actions: { nextButton: { disabled: slotPropsDisabled } },
                    }}
                    count={1}
                    page={0}
                    onPageChange={noop}
                    onRowsPerPageChange={noop}
                    rowsPerPage={10}
                  />
                </TableRow>
              </TableFooter>
            </table>,
          );

          const nextButton = getByRole('button', { name: 'Go to next page' });
          expect(slotPropsDisabled).not.to.equal(nextIconButtonPropsDisabled);
          expect(nextButton).to.have.property('disabled', slotPropsDisabled);
        });
      });

      it('should pass props to button icons', () => {
        const { getByTestId } = render(
          <table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={1}
                  page={0}
                  onPageChange={noop}
                  onRowsPerPageChange={noop}
                  rowsPerPage={10}
                  showFirstButton
                  showLastButton
                  slotProps={{
                    actions: {
                      firstButtonIcon: {
                        fontSize: 'small',
                      },
                      lastButtonIcon: {
                        fontSize: 'large',
                      },
                      previousButtonIcon: {
                        fontSize: 'inherit',
                      },
                    },
                  }}
                />
              </TableRow>
            </TableFooter>
          </table>,
        );

        expect(getByTestId('FirstPageIcon')).to.have.class(svgIconClasses.fontSizeSmall);
        expect(getByTestId('LastPageIcon')).to.have.class(svgIconClasses.fontSizeLarge);
        expect(getByTestId('KeyboardArrowLeftIcon')).to.have.class(svgIconClasses.fontSizeInherit);
        expect(getByTestId('KeyboardArrowRightIcon')).to.have.class(svgIconClasses.fontSizeMedium);
      });
    });

    describe('select', () => {
      it('should override SelectProps', () => {
        const slotPropsDisabled = false;
        const SelectPropsDisabled = true;

        const { getByRole } = render(
          <table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  SelectProps={{ disabled: SelectPropsDisabled }}
                  slotProps={{ select: { disabled: slotPropsDisabled } }}
                  count={1}
                  page={0}
                  onPageChange={noop}
                  onRowsPerPageChange={noop}
                  rowsPerPage={10}
                />
              </TableRow>
            </TableFooter>
          </table>,
        );

        const combobox = getByRole('combobox');
        expect(slotPropsDisabled).not.to.equal(SelectPropsDisabled);
        expect(combobox.parentElement).not.to.have.class(inputClasses.disabled);
      });
    });
  });

  describe('prop: slots', () => {
    it('should render custom action buttons', () => {
      function CustomIconButton(props) {
        const { children, ...other } = props;
        return (
          <IconButton {...other} color="secondary">
            {children}
          </IconButton>
        );
      }

      const { getByRole } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                showFirstButton
                showLastButton
                slots={{
                  actions: {
                    firstButton: CustomIconButton,
                    lastButton: CustomIconButton,
                    nextButton: CustomIconButton,
                    previousButton: CustomIconButton,
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      const firstButton = getByRole('button', { name: 'Go to first page' });
      const lastButton = getByRole('button', { name: 'Go to last page' });
      const nextButton = getByRole('button', { name: 'Go to next page' });
      const previousButton = getByRole('button', { name: 'Go to previous page' });

      expect(firstButton).to.have.class(iconButtonClasses.colorSecondary);
      expect(lastButton).to.have.class(iconButtonClasses.colorSecondary);
      expect(nextButton).to.have.class(iconButtonClasses.colorSecondary);
      expect(previousButton).to.have.class(iconButtonClasses.colorSecondary);
    });

    it('should render custom action button icons', () => {
      const { getByTestId } = render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={1}
                page={0}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                rowsPerPage={10}
                showFirstButton
                showLastButton
                slots={{
                  actions: {
                    firstButtonIcon: KeyboardDoubleArrowLeftRoundedIcon,
                    lastButtonIcon: KeyboardDoubleArrowRightRoundedIcon,
                    previousButtonIcon: ArrowBackIcon,
                    nextButtonIcon: ArrowForwardIcon,
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );

      expect(getByTestId('KeyboardDoubleArrowLeftRoundedIcon')).not.to.equal(null);
      expect(getByTestId('KeyboardDoubleArrowRightRoundedIcon')).not.to.equal(null);
      expect(getByTestId('ArrowBackIcon')).not.to.equal(null);
      expect(getByTestId('ArrowForwardIcon')).not.to.equal(null);
    });
  });

  describe('duplicated keys', () => {
    it('should not raise a warning due to duplicated keys', () => {
      render(
        <table>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: 'All', value: 10 }]}
                count={10}
                rowsPerPage={10}
                page={0}
                onPageChange={noop}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
              />
            </TableRow>
          </TableFooter>
        </table>,
      );
    });
  });

  it('should not have "variant" attribute on TablePaginationSelect', () => {
    const { getAllByRole } = render(
      <table>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={1}
              page={0}
              onPageChange={noop}
              onRowsPerPageChange={noop}
              rowsPerPage={10}
            />
          </TableRow>
        </TableFooter>
      </table>,
    );

    const [combobox] = getAllByRole('button');

    expect(combobox.parentElement).not.to.have.attribute('variant');
  });
});
