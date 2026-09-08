import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
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

  describe.skipIf(isJsdom())('focus management', () => {
    it.each(
      ['ltr', 'rtl'].flatMap((direction) =>
        ['first', 'previous', 'next', 'last'].map((type, index) => ({ direction, type, index })),
      ),
    )(
      'moves focus when $type becomes disabled in $direction',
      async ({ direction, type, index }) => {
        function TestCase() {
          const [page, setPage] = React.useState(1);
          return (
            <ThemeProvider theme={createTheme({ direction })}>
              <div style={{ margin: 50 }}>
                <TablePaginationActions
                  {...defaultProps}
                  count={30}
                  page={page}
                  onPageChange={(event, nextPage) => setPage(nextPage)}
                />
              </div>
            </ThemeProvider>
          );
        }
        const { user } = render(<TestCase />);

        for (let tab = 0; tab <= index; tab += 1) {
          // Each Tab must finish moving focus before the next one.
          // eslint-disable-next-line no-await-in-loop
          await user.tab();
        }
        const button = screen.getByRole('button', { name: `Go to ${type} page` });
        expect(button).toHaveFocus();

        await user.keyboard('{Enter}');

        const target = index < 2 ? 'next' : 'previous';
        expect(button).to.have.property('disabled', true);
        expect(screen.getByRole('button', { name: `Go to ${target} page` })).toHaveFocus();
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).to.have.text(`Go to ${target} page`);
        });
      },
    );

    it('moves focus after an external update disables a custom button', async () => {
      let updateProps;
      const buttonRef = React.createRef();
      function TestCase() {
        const [props, setProps] = React.useState({});
        updateProps = setProps;
        return (
          <TablePaginationActions
            {...defaultProps}
            showFirstButton={false}
            showLastButton={false}
            slots={{ previousButton: 'button' }}
            slotProps={{ previousButton: { ref: buttonRef, ...props } }}
          />
        );
      }
      const { user } = render(<TestCase />);
      await user.tab();
      expect(buttonRef.current).toHaveFocus();

      await act(async () => updateProps({ disabled: true }));

      expect(screen.getByRole('button', { name: 'Go to next page' })).toHaveFocus();
    });

    it.each([
      { disabledAction: 'previous', action: 'next', target: 'first' },
      { disabledAction: 'next', action: 'previous', target: 'last' },
    ])(
      'focuses $target when $disabledAction is disabled through slotProps',
      async ({ disabledAction, action, target }) => {
        function TestCase() {
          const [page, setPage] = React.useState(1);
          return (
            <TablePaginationActions
              {...defaultProps}
              count={30}
              page={page}
              slotProps={{ [`${disabledAction}Button`]: { disabled: true } }}
              onPageChange={(event, nextPage) => setPage(nextPage)}
            />
          );
        }
        const { user } = render(<TestCase />);
        await user.tab();
        await user.tab();
        expect(screen.getByRole('button', { name: `Go to ${action} page` })).toHaveFocus();

        await user.keyboard('{Enter}');

        expect(screen.getByRole('button', { name: `Go to ${target} page` })).toHaveFocus();
      },
    );

    it('keeps focus on an action that remains enabled', async () => {
      function TestCase() {
        const [page, setPage] = React.useState(1);
        return (
          <TablePaginationActions
            {...defaultProps}
            page={page}
            showFirstButton={false}
            showLastButton={false}
            onPageChange={(event, nextPage) => setPage(nextPage)}
          />
        );
      }
      const { user } = render(<TestCase />);
      await user.tab();
      await user.tab();
      await user.keyboard('{Enter}');

      expect(screen.getByRole('button', { name: 'Go to next page' })).toHaveFocus();
    });

    it('does not override focus moved by onPageChange', async () => {
      const resultsRef = React.createRef();
      function TestCase() {
        const [page, setPage] = React.useState(1);
        return (
          <React.Fragment>
            <h2 ref={resultsRef} tabIndex={-1}>
              Results
            </h2>
            <TablePaginationActions
              {...defaultProps}
              page={page}
              onPageChange={(event, nextPage) => {
                setPage(nextPage);
                resultsRef.current.focus();
              }}
            />
          </React.Fragment>
        );
      }
      const { user } = render(<TestCase />);
      await user.tab();
      await user.keyboard('{Enter}');

      expect(resultsRef.current).toHaveFocus();
    });

    it('does not move focus when every action becomes disabled', async () => {
      function TestCase() {
        const [disabled, setDisabled] = React.useState(false);
        return (
          <React.Fragment>
            <TablePaginationActions
              {...defaultProps}
              disabled={disabled}
              onPageChange={() => setDisabled(true)}
            />
            <button>Outside</button>
          </React.Fragment>
        );
      }
      const { user } = render(<TestCase />);
      await user.tab();
      await user.keyboard('{Enter}');

      expect(document.activeElement).to.equal(document.body);
    });
  });
});
