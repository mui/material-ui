import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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
    expect(button).to.have.attribute('title', 'Custom tooltip');
    await user.hover(button);

    expect(screen.queryByRole('tooltip')).to.equal(null);
    expect(handleMouseOver).toHaveBeenCalled();
    expect(button).toHaveAccessibleName('Custom action');

    await user.click(button);

    expect(handlePageChange).toHaveBeenCalledWith(expect.anything(), direction === 'rtl' ? 0 : 2);
  });

  it.each(
    ['ltr', 'rtl'].flatMap((direction) =>
      ['default', 'native'].map((slot) => ({ direction, slot })),
    ),
  )(
    'respects an explicit undefined title for $slot slots in $direction',
    async ({ direction, slot }) => {
      const types = ['first', 'previous', 'next', 'last'];
      const { user } = render(
        <ThemeProvider
          theme={createTheme({
            direction,
            components: { MuiTooltip: { defaultProps: { enterDelay: 0 } } },
          })}
        >
          <TablePaginationActions
            {...defaultProps}
            slots={
              slot === 'native'
                ? Object.fromEntries(types.map((type) => [`${type}Button`, 'button']))
                : undefined
            }
            slotProps={Object.fromEntries(
              types.map((type) => [`${type}Button`, { title: undefined }]),
            )}
          />
        </ThemeProvider>,
      );

      for (const type of types) {
        const label = `Go to ${type} page`;
        const button = screen.getByRole('button', { name: label });
        expect(button).not.to.have.attribute('title');
        // eslint-disable-next-line no-await-in-loop
        await user.hover(button);
        expect(screen.queryByRole('tooltip')).to.equal(null);
        expect(button).toHaveAccessibleName(label);
      }
    },
  );

  it('uses the slotProps title for a default button tooltip', async () => {
    const { user } = render(
      <TablePaginationActions
        {...defaultProps}
        slotProps={{ nextButton: { title: 'Custom tooltip' } }}
      />,
    );
    const button = screen.getByRole('button', { name: 'Go to next page' });
    expect(button).not.to.have.attribute('title');

    await user.hover(button);

    expect(await screen.findByRole('tooltip')).to.have.text('Custom tooltip');
  });

  it.each(
    ['ltr', 'rtl'].flatMap((direction) =>
      ['first', 'previous', 'next', 'last'].map((type) => ({ direction, type })),
    ),
  )('preserves a plain function $type slot in $direction', async ({ direction, type }) => {
    const handlePageChange = vi.fn();
    function CustomButton(props) {
      return <button {...props} data-testid="custom-button" />;
    }
    const { user } = render(
      <ThemeProvider theme={createTheme({ direction })}>
        <TablePaginationActions
          {...defaultProps}
          slots={{ [`${type}Button`]: CustomButton }}
          onPageChange={handlePageChange}
        />
      </ThemeProvider>,
    );
    const button = screen.getByTestId('custom-button');
    const action =
      direction === 'rtl'
        ? { first: 'last', previous: 'next', next: 'previous', last: 'first' }[type]
        : type;
    expect(button).to.have.attribute('title', `Go to ${action} page`);
    expect(button).toHaveAccessibleName(`Go to ${action} page`);

    await user.hover(button);
    expect(screen.queryByRole('tooltip')).to.equal(null);
    await user.click(button);

    expect(handlePageChange).toHaveBeenCalledWith(
      expect.anything(),
      { first: 0, previous: 0, next: 2, last: 9 }[action],
    );
  });

  it('lets a plain function slot provide its own tooltip', async () => {
    function CustomButton({ title, ...props }) {
      return (
        <Tooltip title={title}>
          <IconButton {...props} />
        </Tooltip>
      );
    }
    const { user } = render(
      <TablePaginationActions
        {...defaultProps}
        slots={{ nextButton: CustomButton }}
        slotProps={{ nextButton: { title: 'Consumer tooltip' } }}
      />,
    );

    await user.hover(screen.getByRole('button', { name: 'Go to next page' }));

    expect(await screen.findByRole('tooltip')).to.have.text('Consumer tooltip');
  });
});
