import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger, {
  menu2SubmenuTriggerClasses as classes,
} from '@mui/material/Unstable_Menu2SubmenuTrigger';

// Submenus need layout and real CSS transitions.
describe.skipIf(isJsdom())('Menu2 submenu transitions', () => {
  const { render } = createRenderer();

  async function openSubmenu(user: ReturnType<typeof render>['user']) {
    const trigger = await screen.findByRole('menuitem', { name: 'More' });
    await waitFor(() => {
      expect(trigger.closest('[role="menu"]')!.contains(document.activeElement)).to.equal(true);
    });
    await act(async () => trigger.focus());
    await user.keyboard('{ArrowRight}');
    const item = await screen.findByRole('menuitem', { name: 'Nested' });
    await waitFor(() => expect(item).toHaveFocus());
    const popup = item.closest('[role="menu"]')!;
    await waitFor(() => expect(popup.getAnimations()).to.have.length(0));
    return { trigger, item, popup };
  }

  [false, true].forEach((keepMounted) => {
    it(`tracks external controlled closes without returning focus, keepMounted=${keepMounted}`, async () => {
      const onOpenChange = vi.fn();
      const onOpenChangeComplete = vi.fn();
      function Demo() {
        const [open, setOpen] = React.useState(false);
        return (
          <Menu2 defaultOpen modal={false} trigger={<button type="button">Options</button>}>
            <Menu2Submenu
              open={open}
              keepMounted={keepMounted}
              finalFocus={false}
              onOpenChange={(nextOpen, details) => {
                onOpenChange(nextOpen, details);
                setOpen(nextOpen);
              }}
              onOpenChangeComplete={onOpenChangeComplete}
              trigger={
                <Menu2SubmenuTrigger
                  openOnHover={false}
                  selected={keepMounted}
                  classes={{ closing: 'custom-closing' }}
                  slotProps={{
                    root: (state) => ({
                      'data-owner-open': String(state.open),
                      'data-owner-closing': String(state.closing),
                    }),
                  }}
                >
                  More
                </Menu2SubmenuTrigger>
              }
            >
              <Menu2Item
                onKeyDown={(event) => {
                  if (event.key === 'F2') {
                    setOpen(false);
                  }
                }}
              >
                Nested
              </Menu2Item>
            </Menu2Submenu>
          </Menu2>
        );
      }
      const { user } = render(<Demo />);
      const { trigger, popup } = await openSubmenu(user);
      const openBackground = getComputedStyle(trigger).backgroundColor;
      await waitFor(() => expect(onOpenChangeComplete).toHaveBeenCalledWith(true));
      onOpenChange.mockClear();
      onOpenChangeComplete.mockClear();

      // F2 changes the controlled prop without moving focus or requesting a
      // close through Base UI's interaction handlers.
      await user.keyboard('{F2}');
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(popup).to.have.attribute('data-ending-style');
      expect(trigger).not.to.have.class(classes.open);
      expect(trigger).to.have.class(classes.closing);
      expect(trigger).to.have.class('custom-closing');
      expect(trigger).to.have.attribute('data-owner-open', 'false');
      expect(trigger).to.have.attribute('data-owner-closing', 'true');
      expect(getComputedStyle(trigger).backgroundColor).not.to.equal('rgba(0, 0, 0, 0)');
      expect(getComputedStyle(trigger).backgroundColor).to.equal(openBackground);

      await waitFor(() => {
        expect(onOpenChangeComplete).toHaveBeenCalledExactlyOnceWith(false);
        expect(trigger).not.to.have.class(classes.closing);
      });
      expect(trigger).to.have.attribute('data-owner-closing', 'false');
      expect(trigger).not.to.have.class('custom-closing');
      expect(popup.isConnected).to.equal(keepMounted);
    });
  });

  ['cancel', 'reject controlled'].forEach((mode) => {
    it(`does not enter the closing state for a ${mode} close`, async () => {
      const onOpenChange = vi.fn();
      function Demo() {
        const [open, setOpen] = React.useState(false);
        return (
          <Menu2 defaultOpen modal={false} trigger={<button type="button">Options</button>}>
            <Menu2Submenu
              open={mode === 'reject controlled' ? open : undefined}
              onOpenChange={(nextOpen, details) => {
                onOpenChange(nextOpen, details);
                if (nextOpen) {
                  setOpen(true);
                } else if (mode === 'cancel') {
                  details.cancel();
                }
              }}
              trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
            >
              <Menu2Item>Nested</Menu2Item>
            </Menu2Submenu>
          </Menu2>
        );
      }
      const { user } = render(<Demo />);
      const { trigger, popup } = await openSubmenu(user);
      onOpenChange.mockClear();
      await user.keyboard('{Escape}');
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(trigger).to.have.class(classes.open);
      expect(trigger).not.to.have.class(classes.closing);
      expect(popup).not.to.have.attribute('data-ending-style');
    });
  });

  it('clears the closing state when a controlled submenu reopens during exit', async () => {
    function Demo() {
      const [open, setOpen] = React.useState(false);
      return (
        <Menu2 defaultOpen modal={false} trigger={<button type="button">Options</button>}>
          <Menu2Submenu
            open={open}
            onOpenChange={setOpen}
            trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
          >
            <Menu2Item
              onKeyDown={(event) => {
                if (event.key === 'F2') {
                  setOpen(false);
                }
                if (event.key === 'F3') {
                  setOpen(true);
                }
              }}
            >
              Nested
            </Menu2Item>
          </Menu2Submenu>
        </Menu2>
      );
    }
    const { user } = render(<Demo />);
    const { trigger, popup } = await openSubmenu(user);
    await user.keyboard('{F2}');
    expect(trigger).to.have.class(classes.closing);
    await user.keyboard('{F3}');
    expect(trigger).to.have.class(classes.open);
    expect(trigger).not.to.have.class(classes.closing);
    await waitFor(() => {
      expect(trigger).to.have.class(classes.open);
      expect(trigger).not.to.have.class(classes.closing);
      expect(popup).not.to.have.attribute('data-ending-style');
    });
  });

  it('clears the closing state when transitions are disabled', async () => {
    const onFocus = vi.fn();
    const { user } = render(
      <Menu2 defaultOpen modal={false} trigger={<button type="button">Options</button>}>
        <Menu2Submenu
          keepMounted
          slotProps={{ paper: { sx: { '&, &[data-ending-style]': { transition: 'none' } } } }}
          trigger={
            <Menu2SubmenuTrigger openOnHover={false} onFocus={onFocus}>
              More
            </Menu2SubmenuTrigger>
          }
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );
    const { trigger } = await openSubmenu(user);
    onFocus.mockClear();
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(trigger).toHaveFocus();
      expect(trigger).not.to.have.class(classes.open);
      expect(trigger).not.to.have.class(classes.closing);
    });
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('keeps the closing state local to the submenu that exits', async () => {
    const { user } = render(
      <Menu2 defaultOpen modal={false} trigger={<button type="button">Options</button>}>
        <Menu2Submenu trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}>
          <Menu2Item>Nested</Menu2Item>
          <Menu2Submenu
            trigger={<Menu2SubmenuTrigger openOnHover={false}>Inner</Menu2SubmenuTrigger>}
          >
            <Menu2Item>Deep</Menu2Item>
          </Menu2Submenu>
        </Menu2Submenu>
      </Menu2>,
    );
    const { trigger } = await openSubmenu(user);
    await user.keyboard('{ArrowDown}{ArrowRight}');
    const deep = await screen.findByRole('menuitem', { name: 'Deep' });
    await waitFor(() => {
      expect(deep).toHaveFocus();
      expect(deep.closest('[role="menu"]')!.getAnimations()).to.have.length(0);
    });
    const inner = screen.getByRole('menuitem', { name: 'Inner' });
    await user.keyboard('{Escape}');
    expect(inner).to.have.class(classes.closing);
    expect(trigger).to.have.class(classes.open);
    expect(trigger).not.to.have.class(classes.closing);
    await waitFor(() => {
      expect(inner).toHaveFocus();
      expect(inner).not.to.have.class(classes.closing);
    });
    expect(trigger).to.have.class(classes.open);
  });
});
