import type { Menu2TriggerProps } from '@mui/material/Unstable_Menu2Trigger';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import type { Menu2PopupProps } from '@mui/material/Unstable_Menu2Popup';
import Menu2Popup, { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Dialog from '../Dialog';
import type { Theme } from '../styles';
import { createTheme, ThemeProvider } from '../styles';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import Menu2 from './Menu2';

describe.skipIf(isJsdom())('Menu2 inside a Material Dialog', () => {
  const { render } = createRenderer();

  function TestDialog({
    modal,
    menuProps,
    triggerProps,
    onAction,
    onDialogClose,
    onOpenChangeComplete,
  }: {
    modal?: boolean;
    menuProps?: Partial<Menu2PopupProps>;
    triggerProps?: Pick<Menu2TriggerProps, 'openOnHover' | 'delay'>;
    onAction: () => void;
    onDialogClose: () => void;
    onOpenChangeComplete?: (open: boolean) => void;
  }) {
    const [open, setOpen] = React.useState(true);

    return (
      <Dialog
        open={open}
        transitionDuration={0}
        onClose={() => {
          onDialogClose();
          setOpen(false);
        }}
      >
        <div style={{ display: 'flex', gap: 32, padding: 24 }}>
          <Menu2 modal={modal} onOpenChangeComplete={onOpenChangeComplete}>
            <Menu2Trigger {...triggerProps} render={<button type="button">Options</button>} />
            <Menu2Popup {...menuProps}>
              {menuProps?.children ?? <Menu2Item>Profile</Menu2Item>}
            </Menu2Popup>
          </Menu2>
          <button type="button" onClick={onAction}>
            Other action
          </button>
        </div>
      </Dialog>
    );
  }

  function getCenter(element: Element) {
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  // Synthetic clicks do not perform hit testing. Use the actual topmost element
  // at the click point so these tests also check the modal layer's stacking.
  function getClickTarget({ x, y }: { x: number; y: number }) {
    return document.elementFromPoint(x, y) as HTMLElement;
  }

  [
    { name: 'default', zIndex: 1300 },
    { name: 'raised', zIndex: 2600 },
  ].forEach(({ name, zIndex }) => {
    const theme = createTheme({
      zIndex: { modal: zIndex },
      motion: { reducedMotion: 'always' },
    });

    it(`blocks the first click on another dialog button with the ${name} modal z-index`, async () => {
      const onAction = vi.fn();
      const onDialogClose = vi.fn();
      const { user } = render(
        <ThemeProvider theme={theme}>
          <TestDialog onAction={onAction} onDialogClose={onDialogClose} />
        </ThemeProvider>,
      );
      const action = screen.getByRole('button', { name: 'Other action' });
      const point = getCenter(action);

      await user.click(screen.getByRole('button', { name: 'Options' }));
      const menu = await screen.findByRole('menu');
      const item = screen.getByRole('menuitem', { name: 'Profile' });
      await waitFor(() => expect(menu.contains(getClickTarget(getCenter(item)))).to.equal(true));

      await user.click(getClickTarget(point));
      await waitFor(() => expect(menu.isConnected).to.equal(false));
      expect(onAction).not.toHaveBeenCalled();
      expect(onDialogClose).not.toHaveBeenCalled();
      expect(screen.getByRole('dialog')).not.to.equal(null);

      expect(getClickTarget(point)).to.equal(action);
      await user.click(getClickTarget(point));
      expect(onAction).toHaveBeenCalledTimes(1);
      expect(onDialogClose).not.toHaveBeenCalled();
    });

    it(`blocks the first click outside the dialog with the ${name} modal z-index`, async () => {
      const onDialogClose = vi.fn();
      const { user } = render(
        <ThemeProvider theme={theme}>
          <TestDialog onAction={vi.fn()} onDialogClose={onDialogClose} />
        </ThemeProvider>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));
      const menu = await screen.findByRole('menu');
      const point = { x: 10, y: 10 };

      await user.click(getClickTarget(point));
      await waitFor(() => expect(menu.isConnected).to.equal(false));
      expect(onDialogClose).not.toHaveBeenCalled();
      expect(screen.getByRole('dialog')).not.to.equal(null);

      await user.click(getClickTarget(point));
      expect(onDialogClose).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(screen.queryByRole('dialog')).to.equal(null));
    });
  });

  it('allows the first outside click to activate another dialog button when non-modal', async () => {
    const onAction = vi.fn();
    const onDialogClose = vi.fn();
    const { user } = render(
      <TestDialog modal={false} onAction={onAction} onDialogClose={onDialogClose} />,
    );
    const action = screen.getByRole('button', { name: 'Other action' });
    const point = getCenter(action);

    await user.click(screen.getByRole('button', { name: 'Options' }));
    const menu = await screen.findByRole('menu');
    expect(getClickTarget(point)).to.equal(action);

    await user.click(getClickTarget(point));
    await waitFor(() => expect(menu.isConnected).to.equal(false));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onDialogClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).not.to.equal(null);
  });

  it('allows the first outside click when opened on hover', async () => {
    const onAction = vi.fn();
    const onDialogClose = vi.fn();
    const { user } = render(
      <TestDialog
        triggerProps={{ openOnHover: true, delay: 0 }}
        onAction={onAction}
        onDialogClose={onDialogClose}
      />,
    );
    const action = screen.getByRole('button', { name: 'Other action' });
    const point = getCenter(action);

    await user.hover(screen.getByRole('button', { name: 'Options' }));
    const menu = await screen.findByRole('menu');
    await user.hover(action);
    await waitFor(() => expect(getClickTarget(point) === action).to.equal(true));

    await user.click(getClickTarget(point));
    await waitFor(() => expect(menu.isConnected).to.equal(false));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onDialogClose).not.toHaveBeenCalled();
  });

  it('closes on a second trigger click through the modal click blocker', async () => {
    const onDialogClose = vi.fn();
    const { user } = render(<TestDialog onAction={vi.fn()} onDialogClose={onDialogClose} />);
    const trigger = screen.getByRole('button', { name: 'Options' });
    const point = getCenter(trigger);

    await user.click(trigger);
    const menu = await screen.findByRole('menu');

    await user.click(getClickTarget(point));
    await waitFor(() => expect(menu.isConnected).to.equal(false));
    expect(screen.queryByRole('menu')).to.equal(null);
    expect(onDialogClose).not.toHaveBeenCalled();
  });

  it('keeps submenu items clickable above the parent modal layer', async () => {
    const onSelect = vi.fn();
    const onDialogClose = vi.fn();
    const { user } = render(
      <TestDialog
        onAction={vi.fn()}
        onDialogClose={onDialogClose}
        menuProps={{
          children: (
            <Menu2Submenu>
              <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item onClick={onSelect}>Export</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          ),
        }}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    const menu = await screen.findByRole('menu');
    await user.click(screen.getByRole('menuitem', { name: 'More' }));
    const item = await screen.findByRole('menuitem', { name: 'Export' });
    await waitFor(() => expect(item.contains(getClickTarget(getCenter(item)))).to.equal(true));

    await user.click(getClickTarget(getCenter(item)));
    await waitFor(() => expect(menu.isConnected).to.equal(false));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onDialogClose).not.toHaveBeenCalled();
  });

  // Focus on the body during the exit lets the Dialog FocusTrap take it before the menu returns it.
  [
    { name: 'Grow', menuProps: undefined },
    {
      name: 'a CSS transition',
      menuProps: {
        slots: { transition: null },
        slotProps: {
          root: {
            sx: {
              transition: 'opacity 300ms linear',
              '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
            },
          },
        },
      },
    },
  ].forEach(({ name, menuProps }: { name: string; menuProps?: Partial<Menu2PopupProps> }) => {
    it(`returns focus to the trigger after an outside click with ${name}`, async () => {
      const onDialogClose = vi.fn();
      const completed = vi.fn();
      const { user } = render(
        <TestDialog
          menuProps={menuProps}
          onAction={vi.fn()}
          onDialogClose={onDialogClose}
          onOpenChangeComplete={completed}
        />,
      );
      const trigger = screen.getByRole('button', { name: 'Options' });

      await user.click(trigger);
      const menu = await screen.findByRole('menu');
      // A close during the enter transition can skip the exit.
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
      expect(menu).toHaveFocus();

      await user.click(getClickTarget({ x: 10, y: 10 }));
      await waitFor(() => expect(menu.isConnected).to.equal(false), { timeout: 3000 });
      await waitFor(() => expect(trigger).toHaveFocus());
      expect(onDialogClose).not.toHaveBeenCalled();
    });
  });

  [
    { name: 'a held outside press', keys: ['[MouseLeft>]', '[/MouseLeft]'] },
    { name: 'an outside right click', keys: ['[MouseRight>]', '[/MouseRight]'] },
    { name: 'an outside touch', keys: ['[TouchA>]', '[/TouchA]'] },
  ].forEach(({ name, keys: [press, release] }) => {
    it(`returns focus to the trigger after ${name}`, async () => {
      const completed = vi.fn();
      const { user } = render(
        <TestDialog onAction={vi.fn()} onDialogClose={vi.fn()} onOpenChangeComplete={completed} />,
      );
      const trigger = screen.getByRole('button', { name: 'Options' });

      await user.click(trigger);
      const menu = await screen.findByRole('menu');
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
      expect(menu).toHaveFocus();

      const point = { x: 10, y: 10 };
      await user.pointer({ keys: press, target: getClickTarget(point) });
      // Hold the press longer than one 50 ms FocusTrap poll.
      await act(async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 100);
        });
      });
      // The closed menu's blocker lets the release through.
      await user.pointer({ keys: release, target: getClickTarget(point) });
      await waitFor(() => expect(menu.isConnected).to.equal(false), { timeout: 3000 });
      await waitFor(() => expect(trigger).toHaveFocus());
    });
  });

  [false, true].forEach((nested) => {
    it(`does not activate ${nested ? 'a submenu item' : 'an item'} on Enter after an outside click`, async () => {
      const onSelect = vi.fn();
      const completed = vi.fn();
      const { user } = render(
        <TestDialog
          onAction={vi.fn()}
          onDialogClose={vi.fn()}
          onOpenChangeComplete={completed}
          menuProps={{
            // A long exit, so the Enter press lands before the unmount.
            transitionDuration: { enter: 0, exit: 1000 },
            children: nested ? (
              <Menu2Submenu>
                <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup>
                  <Menu2Item onClick={onSelect}>Export</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            ) : (
              <Menu2Item onClick={onSelect}>Profile</Menu2Item>
            ),
          }}
        />,
      );
      const trigger = screen.getByRole('button', { name: 'Options' });
      await act(async () => trigger.focus());
      await user.keyboard('{Enter}');
      const menu = await screen.findByRole('menu');
      if (nested) {
        await waitFor(() => expect(screen.getByRole('menuitem', { name: 'More' })).toHaveFocus());
        await user.keyboard('{ArrowRight}');
      }
      const item = await screen.findByRole('menuitem', { name: nested ? 'Export' : 'Profile' });
      await waitFor(() => expect(item).toHaveFocus());
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));

      await user.click(getClickTarget({ x: 10, y: 10 }));
      expect(menu.isConnected).to.equal(true);
      await user.keyboard('{Enter}');
      await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null), { timeout: 3000 });
      expect(onSelect).not.toHaveBeenCalled();
      await waitFor(() => expect(trigger).toHaveFocus());
    });
  });
});

describe.skipIf(isJsdom())('Menu2 and Material Modal scroll locking', () => {
  const { render } = createRenderer();
  let bodyStyle: string;
  let htmlStyle: string;

  beforeEach(() => {
    bodyStyle = document.body.style.cssText;
    htmlStyle = document.documentElement.style.cssText;
  });

  afterEach(() => {
    document.body.style.cssText = bodyStyle;
    document.documentElement.style.cssText = htmlStyle;
  });

  [
    { container: 'body', overflow: '' },
    { container: 'body', overflow: 'scroll' },
    { container: 'html', overflow: 'scroll' },
  ].forEach(({ container, overflow }) => {
    it(`transfers the scroll lock to a dialog and restores ${container} overflow=${JSON.stringify(overflow)}`, async () => {
      document.body.style.overflow = container === 'body' ? overflow : '';
      document.documentElement.style.overflow = container === 'html' ? overflow : '';
      const scrollContainer = container === 'body' ? document.body : document.documentElement;
      const initialOverflow = {
        body: document.body.style.overflow,
        html: document.documentElement.style.overflow,
      };

      function Demo() {
        const [dialogOpen, setDialogOpen] = React.useState(false);

        return (
          <div style={{ minHeight: '200vh' }}>
            <Menu2>
              <Menu2Trigger render={<button type="button">Options</button>} />
              <Menu2Popup>
                <Menu2Item onClick={() => setDialogOpen(true)}>Open dialog</Menu2Item>
              </Menu2Popup>
            </Menu2>
            <Dialog open={dialogOpen} transitionDuration={0}>
              <button type="button" onClick={() => setDialogOpen(false)}>
                Close dialog
              </button>
            </Dialog>
          </div>
        );
      }

      const { user } = render(<Demo />);
      expect(document.documentElement.scrollHeight).to.be.greaterThan(
        document.documentElement.clientHeight,
      );
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const menu = await screen.findByRole('menu');
      await waitFor(() => expect(scrollContainer.style.overflowY).to.equal('hidden'));

      await user.click(screen.getByRole('menuitem', { name: 'Open dialog' }));
      await screen.findByRole('dialog');
      // Wait for the menu to release its lock and finish its exit transition.
      await waitFor(() => expect(menu.isConnected).to.equal(false));
      const whileDialogOpen = {
        body: document.body.style.overflow,
        html: document.documentElement.style.overflow,
      };

      await user.click(screen.getByRole('button', { name: 'Close dialog' }));
      await waitFor(() => expect(screen.queryByRole('dialog')).to.equal(null));
      const afterDialogClose = {
        body: document.body.style.overflow,
        html: document.documentElement.style.overflow,
      };

      // Check both states, so a stale lock cannot pass as a successful transfer.
      expect({ whileDialogOpen, afterDialogClose }).to.deep.equal({
        whileDialogOpen: { ...initialOverflow, [container]: 'hidden' },
        afterDialogClose: initialOverflow,
      });
    });
  });

  it('keeps an existing dialog locked while its nested menu opens and closes', async () => {
    const initialOverflow = document.body.style.overflow;

    function Demo() {
      const [dialogOpen, setDialogOpen] = React.useState(true);

      return (
        <Dialog open={dialogOpen} transitionDuration={0}>
          <Menu2>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup>
              <Menu2Item>Profile</Menu2Item>
            </Menu2Popup>
          </Menu2>
          <button type="button" onClick={() => setDialogOpen(false)}>
            Close dialog
          </button>
        </Dialog>
      );
    }

    const { user } = render(<Demo />);
    await waitFor(() => expect(document.body.style.overflow).to.equal('hidden'));
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const menu = await screen.findByRole('menu');
    expect(document.body.style.overflow).to.equal('hidden');

    await user.keyboard('{Escape}');
    await waitFor(() => expect(menu.isConnected).to.equal(false));
    expect(screen.getByRole('dialog')).not.to.equal(null);
    expect(document.body.style.overflow).to.equal('hidden');

    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).to.equal(null));
    expect(document.body.style.overflow).to.equal(initialOverflow);
  });

  it('restores the page when a dialog closes under its open menu', async () => {
    const initialOverflow = document.body.style.overflow;
    let setDialogOpen: (open: boolean) => void = () => {};

    function Demo() {
      const [dialogOpen, setOpen] = React.useState(true);
      setDialogOpen = setOpen;

      return (
        <Dialog open={dialogOpen} transitionDuration={0}>
          <Menu2>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup>
              <Menu2Item>Profile</Menu2Item>
            </Menu2Popup>
          </Menu2>
        </Dialog>
      );
    }

    const { user } = render(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Options' }));
    await screen.findByRole('menu');
    expect(document.body.style.overflow).to.equal('hidden');

    await act(async () => setDialogOpen(false));
    await waitFor(() => expect(screen.queryByRole('dialog')).to.equal(null));
    expect(screen.queryByRole('menu')).to.equal(null);
    expect(document.body.style.overflow).to.equal(initialOverflow);
  });
});

describe.skipIf(isJsdom())('Menu2 modal state', () => {
  const { render } = createRenderer();
  let bodyStyle: string;

  beforeEach(() => {
    bodyStyle = document.body.style.cssText;
  });

  afterEach(() => {
    document.body.style.cssText = bodyStyle;
  });

  function TestMenu({
    modal,
    openOnHover = false,
    onOutside = () => {},
    onOpenChange,
    onOpenChangeComplete,
    popupSlots,
    popupProps,
    children,
  }: {
    modal?: boolean;
    openOnHover?: boolean;
    onOutside?: () => void;
    onOpenChange?: (open: boolean, details: { reason: string; cancel: () => void }) => void;
    onOpenChangeComplete?: (open: boolean) => void;
    popupSlots?: Menu2PopupProps['slots'];
    popupProps?: Partial<Menu2PopupProps>;
    children?: React.ReactNode;
  }) {
    return (
      <div
        style={{ minHeight: '200vh', display: 'flex', alignItems: 'start', gap: 32, padding: 24 }}
      >
        <Menu2
          modal={modal}
          onOpenChange={onOpenChange}
          onOpenChangeComplete={onOpenChangeComplete}
        >
          <Menu2Trigger
            openOnHover={openOnHover}
            delay={0}
            render={<button type="button">Options</button>}
          />
          <Menu2Popup slots={popupSlots} {...popupProps}>
            {children ?? <Menu2Item>Profile</Menu2Item>}
          </Menu2Popup>
        </Menu2>
        <button type="button" onClick={onOutside}>
          Outside
        </button>
      </div>
    );
  }

  function getCenter(element: Element) {
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  function getClickTarget(element: Element) {
    const { x, y } = getCenter(element);
    return document.elementFromPoint(x, y) as HTMLElement;
  }

  // The modal click blocker has no class or slot, so find it by hit testing.
  function getBlocker(element: Element) {
    const target = getClickTarget(element);
    return target !== element &&
      target.hasAttribute('data-base-ui-inert') &&
      target.parentElement!.classList.contains(menu2PopupClasses.portal)
      ? target
      : null;
  }

  [
    { name: 'the default transition', popupSlots: undefined },
    { name: 'no transition', popupSlots: { transition: null } },
  ].forEach(({ name, popupSlots }) => {
    it(`locks the page and blocks the first outside click with ${name}`, async () => {
      const initialOverflow = document.body.style.overflow;
      const onOutside = vi.fn();
      const onOpenChangeComplete = vi.fn();
      const { user } = render(
        <TestMenu
          onOutside={onOutside}
          onOpenChangeComplete={onOpenChangeComplete}
          popupSlots={popupSlots}
        />,
      );
      const outside = screen.getByRole('button', { name: 'Outside' });
      const trigger = screen.getByRole('button', { name: 'Options' });

      await user.click(trigger);
      const menu = await screen.findByRole('menu');
      expect(trigger).to.have.attribute('aria-expanded', 'true');
      expect(document.body.style.overflow).to.equal('hidden');
      const blocker = getBlocker(outside);
      expect(blocker).not.to.equal(null);

      await user.click(blocker!);
      await waitFor(() => {
        expect(menu.isConnected).to.equal(false);
        expect(blocker!.isConnected).to.equal(false);
        expect(onOpenChangeComplete).toHaveBeenCalledWith(false);
      });
      expect(getClickTarget(outside)).to.equal(outside);
      expect(trigger).to.have.attribute('aria-expanded', 'false');
      expect(onOutside).not.toHaveBeenCalled();
      expect(document.body.style.overflow).to.equal(initialOverflow);

      await user.click(getClickTarget(outside));
      expect(onOutside).toHaveBeenCalledTimes(1);
    });
  });

  it('does not lock the page or block outside clicks when modal is false', async () => {
    const initialOverflow = document.body.style.overflow;
    const onOutside = vi.fn();
    const { user } = render(<TestMenu modal={false} onOutside={onOutside} />);
    const outside = screen.getByRole('button', { name: 'Outside' });

    await user.click(screen.getByRole('button', { name: 'Options' }));
    const menu = await screen.findByRole('menu');
    expect(document.body.style.overflow).to.equal(initialOverflow);
    expect(getClickTarget(outside)).to.equal(outside);

    await user.click(outside);
    await waitFor(() => expect(menu.isConnected).to.equal(false));
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it('closes on a second trigger click and does not open again', async () => {
    const onOpenChange = vi.fn();
    const { user } = render(<TestMenu onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole('button', { name: 'Options' });

    await user.click(trigger);
    const menu = await screen.findByRole('menu');

    await user.click(getClickTarget(trigger));
    await waitFor(() => expect(menu.isConnected).to.equal(false));
    expect(screen.queryByRole('menu')).to.equal(null);
    expect(onOpenChange.mock.calls.map(([open, details]) => [open, details.reason])).to.deep.equal([
      [true, 'trigger-press'],
      [false, 'outside-press'],
    ]);
  });

  it('keeps focus on the item when an outside press close is canceled', async () => {
    const { user } = render(
      <TestMenu
        onOpenChange={(open, details) => {
          if (details.reason === 'outside-press') {
            details.cancel();
          }
        }}
      >
        <Menu2Item>One</Menu2Item>
        <Menu2Item>Two</Menu2Item>
        <Menu2Item>Three</Menu2Item>
      </TestMenu>,
    );
    const outside = screen.getByRole('button', { name: 'Outside' });

    await act(async () => screen.getByRole('button', { name: 'Options' }).focus());
    await user.keyboard('{Enter}');
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'One' })).toHaveFocus());
    await user.keyboard('{ArrowDown}');
    const two = screen.getByRole('menuitem', { name: 'Two' });
    expect(two).toHaveFocus();

    await user.click(getBlocker(outside)!);
    expect(screen.getByRole('menu')).not.to.have.attribute('data-closed');
    expect(two).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Three' })).toHaveFocus();
  });

  it('does not lock the page or block outside clicks when opened on hover', async () => {
    const initialOverflow = document.body.style.overflow;
    const { user } = render(<TestMenu openOnHover />);

    await user.hover(screen.getByRole('button', { name: 'Options' }));
    const menu = await screen.findByRole('menu');
    expect(document.body.style.overflow).to.equal(initialOverflow);
    // Hover safe areas block body hit testing, so check the portal content instead.
    expect(menu.parentElement!.previousElementSibling).to.equal(null);
  });

  it('keeps one lock and one click blocker for nested menus', async () => {
    const initialOverflow = document.body.style.overflow;
    const { user } = render(
      <TestMenu>
        <Menu2Submenu>
          <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
          <Menu2SubmenuPopup>
            <Menu2Item>Export</Menu2Item>
          </Menu2SubmenuPopup>
        </Menu2Submenu>
      </TestMenu>,
    );

    const outside = screen.getByRole('button', { name: 'Outside' });
    await user.click(screen.getByRole('button', { name: 'Options' }));
    await screen.findByRole('menu');
    const blocker = getBlocker(outside);
    expect(blocker).not.to.equal(null);
    await user.click(screen.getByRole('menuitem', { name: 'More' }));
    const submenuItem = await screen.findByRole('menuitem', { name: 'Export' });
    expect(screen.getAllByRole('menu')).to.have.length(2);
    // The submenu adds no layer above the root blocker.
    expect(getClickTarget(outside)).to.equal(blocker);
    expect(document.body.style.overflow).to.equal('hidden');

    await user.keyboard('{Escape}');
    await waitFor(() => expect(submenuItem.isConnected).to.equal(false));
    expect(screen.getAllByRole('menu')).to.have.length(1);
    expect(document.body.style.overflow).to.equal('hidden');

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
    expect(document.body.style.overflow).to.equal(initialOverflow);
  });

  const PropsDroppingBackdrop = React.forwardRef<HTMLDivElement>(
    function PropsDroppingBackdrop(props, ref) {
      return <div ref={ref} />;
    },
  );

  // The backdrop slot is visual only. No configuration of it removes the click blocker.
  const backdropConfigurations: Array<{
    name: string;
    theme?: Theme;
    popupProps?: Partial<Menu2PopupProps>;
  }> = [
    { name: 'a null backdrop slot', popupProps: { slots: { backdrop: null } } },
    {
      name: 'a null backdrop slot in the theme',
      theme: createTheme({
        components: { MuiMenu2Popup: { defaultProps: { slots: { backdrop: null } } } },
      }),
    },
    {
      name: 'a click-through backdrop style',
      popupProps: { slotProps: { backdrop: { style: { pointerEvents: 'none' } } } },
    },
    {
      name: 'a hidden backdrop in the theme',
      theme: createTheme({
        components: { MuiMenu2Popup: { styleOverrides: { backdrop: { display: 'none' } } } },
      }),
      popupProps: { slotProps: { backdrop: {} } },
    },
    {
      name: 'a custom backdrop that drops its props',
      popupProps: { slots: { backdrop: PropsDroppingBackdrop } },
    },
  ];

  backdropConfigurations.forEach(({ name, theme = createTheme(), popupProps }) => {
    it(`keeps the scroll lock and blocks the first outside click with ${name}`, async () => {
      const initialOverflow = document.body.style.overflow;
      const onOutside = vi.fn();
      const { user } = render(
        <ThemeProvider theme={theme}>
          <TestMenu onOutside={onOutside} popupProps={popupProps} />
        </ThemeProvider>,
      );
      const outside = screen.getByRole('button', { name: 'Outside' });

      await user.click(screen.getByRole('button', { name: 'Options' }));
      const menu = await screen.findByRole('menu');
      expect(document.body.style.overflow).to.equal('hidden');
      const blocker = getBlocker(outside);
      expect(blocker).not.to.equal(null);

      await user.click(blocker!);
      await waitFor(() => expect(menu.isConnected).to.equal(false));
      expect(onOutside).not.toHaveBeenCalled();
      expect(document.body.style.overflow).to.equal(initialOverflow);
    });
  });

  it('locks the page when opened by touch', async () => {
    const initialOverflow = document.body.style.overflow;
    const { user } = render(<TestMenu />);

    await user.pointer({
      keys: '[TouchA]',
      target: screen.getByRole('button', { name: 'Options' }),
    });
    const menu = await screen.findByRole('menu');
    expect(document.body.style.overflow).to.equal('hidden');

    await user.keyboard('{Escape}');
    await waitFor(() => expect(menu.isConnected).to.equal(false));
    expect(document.body.style.overflow).to.equal(initialOverflow);
  });
});
