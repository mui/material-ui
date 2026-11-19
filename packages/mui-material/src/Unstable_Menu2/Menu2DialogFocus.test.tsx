import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import type { Menu2PopupProps } from '@mui/material/Unstable_Menu2Popup';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Dialog from '../Dialog';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import Popover from '../Popover';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import Menu2SubmenuPopup from '../Unstable_Menu2SubmenuPopup';
import Menu2 from './Menu2';

describe.skipIf(isJsdom())('Menu2 opening a Material Dialog', () => {
  const { render } = createRenderer();

  [
    { name: 'default Grow', props: {} },
    { name: 'default Grow with keepMounted', props: { keepMounted: true } },
    { name: 'no menu transition', props: { slots: { transition: null } } },
    {
      name: 'zero-duration menu and dialog transitions',
      props: { transitionDuration: 0 },
      dialogTransitionDuration: 0,
    },
    { name: 'a controlled menu', props: {}, controlled: true },
  ].forEach(
    ({
      name,
      props,
      dialogTransitionDuration,
      controlled,
    }: {
      name: string;
      props: Partial<Menu2PopupProps>;
      dialogTransitionDuration?: number;
      controlled?: boolean;
    }) => {
      [false, true].forEach((autoFocus) => {
        it(`returns focus to the trigger with ${name}, child autoFocus=${autoFocus}`, async () => {
          const menuCompleted = vi.fn();
          const dialogExited = vi.fn();

          function Demo() {
            const [dialogOpen, setDialogOpen] = React.useState(false);
            const [menuOpen, setMenuOpen] = React.useState(false);

            return (
              <React.Fragment>
                <Menu2
                  onOpenChangeComplete={menuCompleted}
                  {...(controlled ? { open: menuOpen, onOpenChange: setMenuOpen } : {})}
                >
                  <Menu2Trigger render={<button type="button">Options</button>} />
                  <Menu2Popup {...props}>
                    <Menu2Item onClick={() => setDialogOpen(true)}>Open dialog</Menu2Item>
                  </Menu2Popup>
                </Menu2>
                <Dialog
                  open={dialogOpen}
                  transitionDuration={dialogTransitionDuration}
                  slotProps={{ transition: { onExited: dialogExited } }}
                >
                  <button type="button" autoFocus={autoFocus} onClick={() => setDialogOpen(false)}>
                    Close dialog
                  </button>
                </Dialog>
              </React.Fragment>
            );
          }

          const { user } = render(<Demo />);
          const trigger = screen.getByRole('button', { name: 'Options' });
          await user.tab();
          expect(trigger).toHaveFocus();
          await user.keyboard('{Enter}');
          const menu = await screen.findByRole('menu');
          await waitFor(() => expect(menuCompleted).toHaveBeenCalledExactlyOnceWith(true));
          expect(screen.getByRole('menuitem', { name: 'Open dialog' })).toHaveFocus();
          menuCompleted.mockClear();

          await user.keyboard('{Enter}');
          const dialog = await screen.findByRole('dialog');
          const closeButton = screen.getByRole('button', { name: 'Close dialog' });
          expect(dialog.contains(document.activeElement)).to.equal(true);

          // The menu's completed exit must not take focus from the open dialog.
          await waitFor(() => expect(menuCompleted).toHaveBeenCalledExactlyOnceWith(false));
          expect(menu.isConnected).to.equal(Boolean(props.keepMounted));
          expect(dialog.contains(document.activeElement)).to.equal(true);
          expect(dialogExited).not.toHaveBeenCalled();

          // The StrictMode effect replay of FocusTrap can move focus from the autoFocus child.
          if (document.activeElement !== closeButton) {
            await user.tab();
          }
          expect(closeButton).toHaveFocus();
          await user.keyboard('{Enter}');
          await waitFor(() => expect(dialogExited).toHaveBeenCalledTimes(1));
          expect(dialog.isConnected).to.equal(false);
          expect(trigger).toHaveFocus();
        });
      });
    },
  );

  [false, true].forEach((autoFocus) => {
    it(`restores focus with classic Menu without an explicit target, child autoFocus=${autoFocus}`, async () => {
      const menuExited = vi.fn();

      function Demo() {
        const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
        const [dialogOpen, setDialogOpen] = React.useState(false);

        return (
          <React.Fragment>
            <button type="button" onClick={(event) => setAnchorEl(event.currentTarget)}>
              Options
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              slotProps={{ transition: { onExited: menuExited } }}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  setDialogOpen(true);
                }}
              >
                Open dialog
              </MenuItem>
            </Menu>
            <Dialog open={dialogOpen}>
              <button type="button" autoFocus={autoFocus} onClick={() => setDialogOpen(false)}>
                Close dialog
              </button>
            </Dialog>
          </React.Fragment>
        );
      }

      const { user } = render(<Demo />);
      const trigger = screen.getByRole('button', { name: 'Options' });
      await user.tab();
      expect(trigger).toHaveFocus();
      await user.keyboard('{Enter}');
      const menu = await screen.findByRole('menu');
      expect(screen.getByRole('menuitem', { name: 'Open dialog' })).toHaveFocus();

      await user.keyboard('{Enter}');
      const dialog = await screen.findByRole('dialog');
      const closeButton = screen.getByRole('button', { name: 'Close dialog' });
      expect(dialog.contains(document.activeElement)).to.equal(true);

      await waitFor(() => expect(menuExited).toHaveBeenCalledTimes(1));
      expect(menu.isConnected).to.equal(false);
      expect(dialog.contains(document.activeElement)).to.equal(true);

      if (document.activeElement !== closeButton) {
        await user.tab();
      }
      expect(closeButton).toHaveFocus();
      await user.keyboard('{Enter}');
      await waitFor(() => expect(dialog.isConnected).to.equal(false));
      expect(trigger).toHaveFocus();
    });
  });

  it('returns focus to the trigger after a Popover opened from an item closes', async () => {
    const menuCompleted = vi.fn();
    const popoverExited = vi.fn();

    function Demo() {
      const triggerRef = React.useRef<HTMLButtonElement>(null);
      const [popoverOpen, setPopoverOpen] = React.useState(false);

      return (
        <React.Fragment>
          <Menu2 onOpenChangeComplete={menuCompleted}>
            <Menu2Trigger
              render={
                <button type="button" ref={triggerRef}>
                  Options
                </button>
              }
            />
            <Menu2Popup>
              <Menu2Item onClick={() => setPopoverOpen(true)}>Open popover</Menu2Item>
            </Menu2Popup>
          </Menu2>
          <Popover
            open={popoverOpen}
            anchorEl={() => triggerRef.current!}
            onClose={() => setPopoverOpen(false)}
            slotProps={{ transition: { onExited: popoverExited } }}
          >
            <button type="button" onClick={() => setPopoverOpen(false)}>
              Close popover
            </button>
          </Popover>
        </React.Fragment>
      );
    }

    const { user } = render(<Demo />);
    const trigger = screen.getByRole('button', { name: 'Options' });
    await user.click(trigger);
    await waitFor(() => expect(menuCompleted).toHaveBeenCalledExactlyOnceWith(true));
    menuCompleted.mockClear();

    await user.click(screen.getByRole('menuitem', { name: 'Open popover' }));
    const closeButton = await screen.findByRole('button', { name: 'Close popover' });
    await waitFor(() => expect(menuCompleted).toHaveBeenCalledExactlyOnceWith(false));
    expect(screen.queryByRole('menu')).to.equal(null);
    const paper = closeButton.parentElement!;
    expect(paper.contains(document.activeElement)).to.equal(true);

    await user.click(closeButton);
    await waitFor(() => expect(popoverExited).toHaveBeenCalledTimes(1));
    expect(closeButton.isConnected).to.equal(false);
    expect(trigger).toHaveFocus();
  });

  it('returns focus to the trigger after a Dialog opened from a submenu item closes', async () => {
    const dialogExited = vi.fn();

    function Demo() {
      const [dialogOpen, setDialogOpen] = React.useState(false);

      return (
        <React.Fragment>
          <Menu2>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup>
              <Menu2Submenu>
                <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup>
                  <Menu2Item onClick={() => setDialogOpen(true)}>Rename</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>
          <Dialog open={dialogOpen} slotProps={{ transition: { onExited: dialogExited } }}>
            <button type="button" onClick={() => setDialogOpen(false)}>
              Close dialog
            </button>
          </Dialog>
        </React.Fragment>
      );
    }

    const { user } = render(<Demo />);
    const trigger = screen.getByRole('button', { name: 'Options' });
    await user.tab();
    await user.keyboard('{Enter}');
    const menu = await screen.findByRole('menu');
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'More' })).toHaveFocus());
    await user.keyboard('{ArrowRight}');
    const item = await screen.findByRole('menuitem', { name: 'Rename' });
    await waitFor(() => expect(item).toHaveFocus());

    await user.keyboard('{Enter}');
    const dialog = await screen.findByRole('dialog');
    await waitFor(() => expect(menu.isConnected).to.equal(false), { timeout: 3000 });
    expect(item.isConnected).to.equal(false);
    expect(dialog.contains(document.activeElement)).to.equal(true);

    const closeButton = screen.getByRole('button', { name: 'Close dialog' });
    if (document.activeElement !== closeButton) {
      await user.tab();
    }
    expect(closeButton).toHaveFocus();
    await user.keyboard('{Enter}');
    await waitFor(() => expect(dialogExited).toHaveBeenCalledTimes(1));
    expect(trigger).toHaveFocus();
  });

  describe('item press with finalFocus', () => {
    async function pressItem(user: ReturnType<typeof render>['user'], onTriggerFocus: () => void) {
      const trigger = screen.getByRole('button', { name: 'Options' });
      await user.tab();
      expect(trigger).toHaveFocus();
      await user.keyboard('{Enter}');
      await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Save' })).toHaveFocus());
      trigger.addEventListener('focus', onTriggerFocus);
      await user.keyboard('{Enter}');
      await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
      trigger.removeEventListener('focus', onTriggerFocus);
      return trigger;
    }

    it('does not focus the trigger with finalFocus={false}', async () => {
      const onTriggerFocus = vi.fn();
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup finalFocus={false}>
            <Menu2Item>Save</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );

      const trigger = await pressItem(user, onTriggerFocus);
      expect(onTriggerFocus).not.toHaveBeenCalled();
      expect(trigger).not.toHaveFocus();
    });

    it('moves focus to a finalFocus ref without focusing the trigger', async () => {
      const onTriggerFocus = vi.fn();
      const otherRef = React.createRef<HTMLButtonElement>();
      const { user } = render(
        <React.Fragment>
          <Menu2>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup finalFocus={otherRef}>
              <Menu2Item>Save</Menu2Item>
            </Menu2Popup>
          </Menu2>
          <button type="button" ref={otherRef}>
            Other
          </button>
        </React.Fragment>,
      );

      await pressItem(user, onTriggerFocus);
      await waitFor(() => expect(otherRef.current).toHaveFocus());
      expect(onTriggerFocus).not.toHaveBeenCalled();
    });
  });

  describe('finalFocus after focus leaves the menu', () => {
    (['keyboard', 'pointer'] as const).forEach((input) => {
      it(`keeps the autoFocus field of a Dialog that an item opens in a menu without a trigger, ${input}`, async () => {
        const menuCompleted = vi.fn();

        function Demo() {
          const anchorRef = React.useRef<HTMLButtonElement>(null);
          const [open, setOpen] = React.useState(false);
          const [dialogOpen, setDialogOpen] = React.useState(false);

          return (
            <React.Fragment>
              <button
                type="button"
                ref={anchorRef}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                Options
              </button>
              <Menu2 open={open} onOpenChange={setOpen} onOpenChangeComplete={menuCompleted}>
                <Menu2Popup anchor={anchorRef} finalFocus={anchorRef} aria-label="Options">
                  <Menu2Item onClick={() => setDialogOpen(true)}>Rename</Menu2Item>
                </Menu2Popup>
              </Menu2>
              <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <input aria-label="Name" autoFocus />
              </Dialog>
            </React.Fragment>
          );
        }

        // The StrictMode effect replay of FocusTrap moves focus from the autoFocus field.
        // https://github.com/mui/material-ui/issues/33004
        const { user } = render(<Demo />, { strictEffects: false });
        if (input === 'keyboard') {
          await user.tab();
          await user.keyboard('{Enter}');
        } else {
          await user.click(screen.getByRole('button', { name: 'Options' }));
        }
        const menu = await screen.findByRole('menu');
        await waitFor(() => expect(menuCompleted).toHaveBeenCalledExactlyOnceWith(true));
        const item = screen.getByRole('menuitem', { name: 'Rename' });
        if (input === 'keyboard') {
          // Without a trigger, Enter opens the menu with focus on its container.
          await user.keyboard('{ArrowDown}');
          await waitFor(() => expect(item).toHaveFocus());
          await user.keyboard('{Enter}');
        } else {
          await user.click(item);
        }

        await screen.findByRole('dialog');
        await waitFor(() => expect(menu.isConnected).to.equal(false), { timeout: 3000 });
        expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus();
      });
    });

    function NonModalMenu({
      targetRef,
      onOpenChangeComplete,
    }: {
      targetRef: React.RefObject<HTMLButtonElement | null>;
      onOpenChangeComplete: (open: boolean) => void;
    }) {
      return (
        <React.Fragment>
          <button type="button" ref={targetRef}>
            Target
          </button>
          <Menu2 modal={false} onOpenChangeComplete={onOpenChangeComplete}>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup finalFocus={targetRef}>
              <Menu2Item>Save</Menu2Item>
            </Menu2Popup>
          </Menu2>
          <input aria-label="Search" />
        </React.Fragment>
      );
    }

    it('does not take focus from an outside input that the user clicks', async () => {
      const targetRef = React.createRef<HTMLButtonElement>();
      const menuCompleted = vi.fn();
      const { user } = render(
        <NonModalMenu targetRef={targetRef} onOpenChangeComplete={menuCompleted} />,
      );
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const menu = await screen.findByRole('menu');
      // A close during the enter transition can skip the exit.
      await waitFor(() => expect(menuCompleted).toHaveBeenCalledExactlyOnceWith(true));

      const outsideInput = screen.getByRole('textbox', { name: 'Search' });
      await user.click(outsideInput);
      await waitFor(() => expect(menu.isConnected).to.equal(false), { timeout: 3000 });
      expect(outsideInput).toHaveFocus();
    });

    it('focuses the target when the body has focus at close', async () => {
      const targetRef = React.createRef<HTMLButtonElement>();
      const menuCompleted = vi.fn();
      const { user } = render(
        <NonModalMenu targetRef={targetRef} onOpenChangeComplete={menuCompleted} />,
      );
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const menu = await screen.findByRole('menu');
      await waitFor(() => expect(menuCompleted).toHaveBeenCalledExactlyOnceWith(true));

      await user.click(document.body);
      await waitFor(() => expect(menu.isConnected).to.equal(false), { timeout: 3000 });
      await waitFor(() => expect(targetRef.current).toHaveFocus());
    });

    it('focuses a submenu target when focus moved to the parent menu', async () => {
      const shareRef = React.createRef<HTMLDivElement>();
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup>
            <Menu2Item ref={shareRef}>Share</Menu2Item>
            <Menu2Submenu>
              <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup finalFocus={shareRef}>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      );
      await user.tab();
      await user.keyboard('{Enter}');
      await waitFor(() => expect(shareRef.current).toHaveFocus());
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowRight}');
      const nested = await screen.findByRole('menuitem', { name: 'Nested' });
      await waitFor(() => expect(nested).toHaveFocus());

      // ArrowLeft focuses the submenu trigger in the parent menu before the submenu closes.
      await user.keyboard('{ArrowLeft}');
      await waitFor(() => expect(nested.isConnected).to.equal(false), { timeout: 3000 });
      await waitFor(() => expect(shareRef.current).toHaveFocus());
    });
  });

  it('keeps focus on the item when a controlled menu ignores the item press close', async () => {
    const menuCompleted = vi.fn();

    function Demo() {
      const [open, setOpen] = React.useState(false);

      return (
        <Menu2
          open={open}
          onOpenChange={(nextOpen, eventDetails) => {
            if (eventDetails.reason !== 'item-press') {
              setOpen(nextOpen);
            }
          }}
          onOpenChangeComplete={menuCompleted}
        >
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup>
            <Menu2Item>Save</Menu2Item>
            <Menu2Item>Share</Menu2Item>
          </Menu2Popup>
        </Menu2>
      );
    }

    const { user } = render(<Demo />);
    await user.tab();
    await user.keyboard('{Enter}');
    await waitFor(() => expect(menuCompleted).toHaveBeenCalledExactlyOnceWith(true));
    const saveItem = screen.getByRole('menuitem', { name: 'Save' });
    expect(saveItem).toHaveFocus();
    menuCompleted.mockClear();

    await user.keyboard('{Enter}');
    expect(saveItem).toHaveFocus();
    // Wait past the menu exit time to check that the menu stays open.
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(menuCompleted).not.toHaveBeenCalled();
    expect(screen.getByRole('menu')).not.to.equal(null);
    expect(saveItem).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Share' })).toHaveFocus();
  });
});
