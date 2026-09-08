import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { act, createRenderer, screen, waitFor, isJsdom } from '@mui/internal-test-utils';
import Menu2 from './Menu2';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import { createTheme, ThemeProvider } from '../styles';
import Fade from '../Fade';
import Zoom from '../Zoom';

describe.skipIf(isJsdom())('Menu2 transitions', () => {
  const { render } = createRenderer();
  [
    { duration: { enter: 300, exit: 450 }, slotProps: {}, enter: '0.3s', exit: '0.45s' },
    { duration: 900, slotProps: { transition: { timeout: 300 } }, enter: '0.3s', exit: '0.3s' },
  ].forEach(({ duration, slotProps, enter, exit }, index) => {
    it(`honors configured timing and slot overrides (${index})`, async () => {
      const completed = vi.fn();
      const { user } = render(
        <Menu2
          transitionDuration={duration}
          slotProps={slotProps}
          onOpenChangeComplete={completed}
          trigger={<button type="button">Options</button>}
        >
          <Menu2Item>Item</Menu2Item>
        </Menu2>,
      );
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const popup = await screen.findByRole('menu');
      await waitFor(() =>
        expect(getComputedStyle(popup).transitionDuration.split(',')[0]).to.equal(enter),
      );
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
      completed.mockClear();
      await user.keyboard('{Escape}');
      expect(getComputedStyle(popup).transitionDuration.split(',')[0]).to.equal(exit);
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
    });
  });
  [Fade, Zoom].forEach((TransitionSlot) => {
    it(`supports ${TransitionSlot === Fade ? 'Fade' : 'Zoom'} and transition slot callbacks`, async () => {
      const entering = vi.fn();
      const exiting = vi.fn();
      const completed = vi.fn();
      const { user } = render(
        <Menu2
          slots={{ transition: TransitionSlot }}
          onOpenChangeComplete={completed}
          slotProps={{
            transition: (ownerState) => {
              expect(ownerState.slots?.transition).to.equal(TransitionSlot);
              return { onEntering: entering, onExiting: exiting };
            },
          }}
          trigger={<button type="button">Options</button>}
        >
          <Menu2Item>Item</Menu2Item>
        </Menu2>,
      );
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const popup = await screen.findByRole('menu');
      await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
      expect(entering).toHaveBeenCalledTimes(1);
      completed.mockClear();
      await user.keyboard('{Escape}');
      await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
      expect(exiting).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
      await waitFor(() => expect(popup.isConnected).to.equal(false));
    });
  });

  it('supports CSS-only enter and exit without a transition component', async () => {
    const completed = vi.fn();
    const { user } = render(
      <Menu2
        slots={{ transition: null }}
        onOpenChangeComplete={completed}
        slotProps={{
          paper: {
            sx: {
              transition: 'opacity 300ms linear',
              '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
            },
          },
        }}
        trigger={<button type="button">Options</button>}
      >
        <Menu2Item>Item</Menu2Item>
      </Menu2>,
    );
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
    expect(popup.style.opacity).to.equal('');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
    completed.mockClear();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
    expect(popup.isConnected).to.equal(true);
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
    expect(popup.isConnected).to.equal(false);
  });

  it('disables Grow with transitionDuration=0', async () => {
    const completed = vi.fn();
    const { user } = render(
      <Menu2
        transitionDuration={0}
        onOpenChangeComplete={completed}
        trigger={<button type="button">Options</button>}
      >
        <Menu2Item>Item</Menu2Item>
      </Menu2>,
    );
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
    expect(getComputedStyle(popup).transitionDuration).to.equal('0s, 0s');
    expect(popup.getAnimations()).to.have.length(0);
    completed.mockClear();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
  });
  [false, true].forEach((keepMounted) => {
    it(`animates enter and Escape exit on the actual popup, keepMounted=${keepMounted}`, async () => {
      const completed = vi.fn();
      const { user } = render(
        <Menu2
          keepMounted={keepMounted}
          onOpenChangeComplete={completed}
          trigger={<button type="button">Options</button>}
        >
          <Menu2Item>Item</Menu2Item>
        </Menu2>,
      );
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const popup = await screen.findByRole('menu');
      await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
      expect(completed).not.toHaveBeenCalledWith(true);
      await waitFor(() => {
        expect(popup.getAnimations()).to.have.length(0);
        expect(completed).toHaveBeenCalledExactlyOnceWith(true);
      });
      completed.mockClear();
      await user.keyboard('{Escape}');
      expect(popup).to.have.attribute('data-instant', 'dismiss');
      await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
      expect(popup.isConnected).to.equal(true);
      expect(completed).not.toHaveBeenCalled();
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
      expect(popup.isConnected).to.equal(keepMounted);
    });
  });

  it('cancels the pending close when reopened during exit', async () => {
    const completed = vi.fn();
    let updateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    function Demo() {
      const [open, setOpen] = React.useState(false);
      updateOpen = setOpen;
      return (
        <Menu2
          open={open}
          onOpenChange={setOpen}
          onOpenChangeComplete={completed}
          trigger={<button type="button">Options</button>}
        >
          <Menu2Item>Item</Menu2Item>
        </Menu2>
      );
    }
    const { user } = render(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
    completed.mockClear();
    await act(async () => updateOpen(false));
    await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
    await act(async () => updateOpen(true));
    await waitFor(() => {
      expect(completed).toHaveBeenCalledExactlyOnceWith(true);
      expect(popup.getAnimations()).to.have.length(0);
    });
    expect(screen.getByRole('menu')).to.equal(popup);
    expect(popup).not.to.have.attribute('data-ending-style');
    expect(getComputedStyle(popup).opacity).to.equal('1');
  });

  it('honors the theme reduced-motion policy', async () => {
    const completed = vi.fn();
    const { user } = render(
      <ThemeProvider theme={createTheme({ motion: { reducedMotion: 'always' } })}>
        <Menu2 onOpenChangeComplete={completed} trigger={<button type="button">Options</button>}>
          <Menu2Item>Item</Menu2Item>
        </Menu2>
      </ThemeProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
    expect(popup.getAnimations()).to.have.length(0);
    expect(
      getComputedStyle(popup)
        .transitionDuration.split(',')
        .every((duration) => parseFloat(duration) === 0),
    ).to.equal(true);
    completed.mockClear();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
  });

  it('does not let a plain sx transition override disable the Grow transition', async () => {
    const { user } = render(
      <Menu2
        slotProps={{ paper: { sx: { transition: 'none' } } }}
        trigger={<button type="button">Options</button>}
      >
        <Menu2Item>Item</Menu2Item>
      </Menu2>,
    );
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
    await waitFor(() => expect(popup.getAnimations()).to.have.length(0));
  });

  it('keeps a trigger-less root open when its submenu opens', async () => {
    const changes: unknown[] = [];
    const { user } = render(
      <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
        <Menu2
          defaultOpen
          modal={false}
          anchor={document.body}
          onOpenChange={(open, details) => changes.push({ root: open, reason: details.reason })}
        >
          <Menu2Submenu
            onOpenChange={(open, details) =>
              changes.push({ submenu: open, reason: details.reason })
            }
            trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
          >
            <Menu2Item>Nested</Menu2Item>
          </Menu2Submenu>
        </Menu2>
      </ThemeProvider>,
    );
    const trigger = await screen.findByRole('menuitem', { name: 'More' });
    await waitFor(() =>
      expect(trigger.closest('[role="menu"]')!.contains(document.activeElement)).to.equal(true),
    );
    await act(async () => trigger.focus());
    await user.keyboard('{ArrowLeft}');
    expect(changes).to.deep.equal([{ submenu: true, reason: 'list-navigation' }]);
  });
});
