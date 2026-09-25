import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Menu2Item from '../Unstable_Menu2Item';
import { createTheme, ThemeProvider } from '../styles';
import Menu2, { Menu2Props } from './Menu2';
import { menu2PopupClasses } from './menu2Classes';

describe.skipIf(isJsdom())('Menu2 backdrop slots', () => {
  const { render } = createRenderer();

  ['default', 'host'].forEach((slot) => {
    it(`keeps the ${slot} backdrop in sync with a retained popup`, async () => {
      const completed = vi.fn();
      const { user, unmount } = render(
        <div style={{ paddingTop: 96 }}>
          <Menu2
            keepMounted
            onOpenChangeComplete={completed}
            transitionDuration={{ enter: 0, exit: 300 }}
            slots={slot === 'host' ? { backdrop: 'div' } : undefined}
            slotProps={{
              backdrop: {
                'data-testid': 'backdrop',
                sx: { opacity: 0.5 },
                style: {
                  position: 'fixed',
                  inset: 0,
                  zIndex: 1300,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  pointerEvents: 'auto',
                },
              },
            }}
            trigger={<button type="button">Options</button>}
          >
            <Menu2Item>Profile</Menu2Item>
          </Menu2>
        </div>,
      );

      try {
        const backdrop = screen.getByTestId('backdrop');
        expect(backdrop).not.to.have.attribute('sx');
        expect(backdrop).to.have.attribute('hidden');
        expect(backdrop).to.have.attribute('data-closed');
        expect(document.elementFromPoint(10, 10)).not.to.equal(backdrop);

        const trigger = screen.getByRole('button', { name: 'Options' });
        await user.click(trigger);
        const popup = await screen.findByRole('menu');
        await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
        expect(backdrop).not.to.have.attribute('hidden');
        expect(backdrop).to.have.attribute('data-open');
        expect(document.elementFromPoint(10, 10)).to.equal(backdrop);

        const item = screen.getByRole('menuitem', { name: 'Profile' }).getBoundingClientRect();
        expect(
          popup.contains(document.elementFromPoint(item.left + 8, item.top + item.height / 2)),
        ).to.equal(true);

        completed.mockClear();
        await user.keyboard('{Escape}');
        expect(backdrop).to.have.attribute('data-closed');
        expect(backdrop).to.have.attribute('data-ending-style');
        expect(backdrop).not.to.have.attribute('hidden');
        expect(popup.isConnected).to.equal(true);

        await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
        expect(backdrop).to.have.attribute('hidden');
        expect(backdrop).not.to.have.attribute('data-ending-style');
        expect(document.elementFromPoint(10, 10)).not.to.equal(backdrop);
        expect(popup.isConnected).to.equal(true);

        completed.mockClear();
        await user.click(trigger);
        await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
        expect(screen.getByTestId('backdrop')).to.equal(backdrop);
        expect(backdrop).not.to.have.attribute('hidden');
        expect(backdrop).to.have.attribute('data-open');
        expect(document.elementFromPoint(10, 10)).to.equal(backdrop);
      } finally {
        unmount();
      }
    });
  });

  it('keeps theme overrides and sx on the default backdrop', async () => {
    const { user, unmount } = render(
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiMenu2: {
              styleOverrides: { backdrop: { backgroundColor: 'rgb(12, 34, 56)' } },
            },
          },
        })}
      >
        <Menu2
          slotProps={{ backdrop: { 'data-testid': 'backdrop', sx: { opacity: 0.5 } } }}
          trigger={<button type="button">Options</button>}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2>
      </ThemeProvider>,
    );

    try {
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const backdrop = await screen.findByTestId('backdrop');
      const styles = getComputedStyle(backdrop);
      expect(styles.backgroundColor).to.equal('rgb(12, 34, 56)');
      expect(styles.opacity).to.equal('0.5');
      expect(backdrop).not.to.have.attribute('sx');
      expect(backdrop).to.have.attribute('data-open');
    } finally {
      unmount();
    }
  });

  it('forwards slot props and state to a custom backdrop component', async () => {
    interface CustomBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
      ownerState?: Menu2Props;
      label?: string;
    }

    const backdropRef = React.createRef<HTMLDivElement>();
    let receivedOwnerState: Menu2Props | undefined;
    const CustomBackdrop = React.forwardRef<HTMLDivElement, CustomBackdropProps>(
      function CustomBackdrop({ ownerState, className, label, ...props }, ref) {
        receivedOwnerState = ownerState;

        return (
          <div
            {...props}
            ref={ref}
            className={`custom-backdrop ${className ?? ''}`}
            data-label={label}
          />
        );
      },
    );
    const { user, unmount } = render(
      <Menu2
        defaultOpen
        keepMounted
        side="top"
        slots={{ backdrop: CustomBackdrop }}
        slotProps={{
          backdrop: (ownerState) => ({
            'data-testid': 'backdrop',
            ref: backdropRef,
            className: 'slot-backdrop',
            style: { backgroundColor: 'rgb(1, 2, 3)' },
            label: ownerState.side,
          }),
        }}
        trigger={<button type="button">Options</button>}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    try {
      const backdrop = screen.getByTestId('backdrop');
      expect(backdropRef.current).to.equal(backdrop);
      expect(backdrop).to.have.class(menu2PopupClasses.backdrop);
      expect(backdrop).to.have.class('custom-backdrop');
      expect(backdrop).to.have.class('slot-backdrop');
      expect(backdrop).to.have.attribute('data-label', 'top');
      expect(getComputedStyle(backdrop).backgroundColor).to.equal('rgb(1, 2, 3)');
      expect(receivedOwnerState?.keepMounted).to.equal(true);
      expect(receivedOwnerState?.side).to.equal('top');
      expect(backdrop).not.to.have.attribute('ownerState');
      expect(backdrop).to.have.attribute('role', 'presentation');
      expect(backdrop).to.have.attribute('data-open');

      await user.keyboard('{Escape}');
      await waitFor(() => expect(backdrop).to.have.attribute('hidden'));
      expect(backdropRef.current).to.equal(backdrop);
    } finally {
      unmount();
    }
    expect(backdropRef.current).to.equal(null);
  });
});
