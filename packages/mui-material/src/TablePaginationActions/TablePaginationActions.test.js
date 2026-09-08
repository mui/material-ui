import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TablePaginationActions, {
  tablePaginationActionsClasses as classes,
} from '@mui/material/TablePaginationActions';
import describeConformance from '../../test/describeConformance';

describe('<TablePaginationActions />', () => {
  const { render } = createRenderer();
  const defaultProps = {
    getItemAriaLabel: (type) => `Go to ${type} page`,
    count: 100,
    onPageChange: () => {},
    page: 1,
    rowsPerPage: 10,
    showFirstButton: true,
    showLastButton: true,
  };

  describeConformance(
    <TablePaginationActions
      getItemAriaLabel={(type) => {
        if (type === 'first') {
          return 'first';
        }
        if (type === 'last') {
          return 'last';
        }
        if (type === 'next') {
          return 'next';
        }
        return 'previous';
      }}
      count={100}
      onPageChange={() => {}}
      page={1}
      rowsPerPage={10}
      showFirstButton
      showLastButton
    />,
    () => ({
      inheritComponent: 'div',
      render,
      classes,
      muiName: 'MuiTablePaginationActions',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'themeVariants'],
    }),
  );

  it.each(['first', 'previous', 'next', 'last'])(
    'shows the %s action tooltip on hover',
    async (type) => {
      const { user } = render(<TablePaginationActions {...defaultProps} />);
      const label = `Go to ${type} page`;
      const button = screen.getByRole('button', { name: label });

      expect(button).not.to.have.attribute('title');
      await user.hover(button);

      expect(await screen.findByRole('tooltip')).to.have.text(label);
      expect(button).toHaveAccessibleName(label);
    },
  );

  it('shows a tooltip on keyboard focus and skips disabled actions', async () => {
    const { user } = render(<TablePaginationActions {...defaultProps} page={0} />);

    await user.tab();

    expect(screen.getByRole('button', { name: 'Go to next page' })).toHaveFocus();
    expect(await screen.findByRole('tooltip')).to.have.text('Go to next page');
    expect(screen.getByRole('button', { name: 'Go to first page' })).to.have.property(
      'disabled',
      true,
    );
    expect(screen.getByRole('button', { name: 'Go to previous page' })).to.have.property(
      'disabled',
      true,
    );
  });

  it.each(['ltr', 'rtl'])('preserves custom button slots and titles in %s', async (direction) => {
    const handlePageChange = vi.fn();
    const handleMouseOver = vi.fn();
    const buttonRef = React.createRef();
    const { user } = render(
      <ThemeProvider theme={createTheme({ direction })}>
        <TablePaginationActions
          {...defaultProps}
          onPageChange={handlePageChange}
          slots={{ nextButton: 'button' }}
          slotProps={{
            nextButton: {
              title: 'Custom tooltip',
              'aria-label': 'Custom action',
              onMouseOver: handleMouseOver,
              ref: buttonRef,
            },
          }}
        />
      </ThemeProvider>,
    );
    const button = screen.getByRole('button', { name: 'Custom action' });

    expect(buttonRef.current).to.equal(button);
    expect(button).not.to.have.attribute('title');
    await user.hover(button);

    expect(await screen.findByRole('tooltip')).to.have.text('Custom tooltip');
    expect(handleMouseOver).toHaveBeenCalled();
    expect(button).toHaveAccessibleName('Custom action');

    await user.click(button);

    expect(handlePageChange).toHaveBeenCalledWith(expect.anything(), direction === 'rtl' ? 0 : 2);
  });

  it.skipIf(isJsdom())(
    'closes the tooltip when navigating disables the focused action',
    async () => {
      function TestCase() {
        const [page, setPage] = React.useState(0);
        return (
          <div style={{ margin: 50 }}>
            <TablePaginationActions
              {...defaultProps}
              count={20}
              page={page}
              onPageChange={(event, nextPage) => setPage(nextPage)}
            />
          </div>
        );
      }
      const { user } = render(<TestCase />);

      await user.tab();
      expect(await screen.findByRole('tooltip')).to.have.text('Go to next page');

      await user.keyboard('{Enter}');

      expect(screen.getByRole('button', { name: 'Go to next page' })).to.have.property(
        'disabled',
        true,
      );
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).to.equal(null);
      });
    },
  );
});
