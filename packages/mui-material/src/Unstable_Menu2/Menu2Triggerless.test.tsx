import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Menu2 from './Menu2';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import { createTheme, ThemeProvider } from '../styles';

describe.skipIf(isJsdom())('Menu2 without a trigger', () => {
  const { render } = createRenderer();

  async function focusTrigger(name: string) {
    const trigger = await screen.findByRole('menuitem', { name });
    await waitFor(() =>
      expect(trigger.closest('[role="menu"]')!.contains(document.activeElement)).to.equal(true),
    );
    await act(async () => trigger.focus());
    return trigger;
  }

  (['ltr', 'rtl'] as const).forEach((direction) => {
    [false, true].forEach((keepMounted) => {
      it(`keeps nested keyboard navigation and Escape local, ${direction}, keepMounted=${keepMounted}`, async () => {
        const changed = vi.fn();
        const completed = vi.fn();
        const { user } = render(
          <ThemeProvider theme={createTheme({ direction })}>
            <Menu2
              defaultOpen
              modal={false}
              anchor={document.body}
              keepMounted={keepMounted}
              onOpenChange={changed}
              onOpenChangeComplete={completed}
            >
              <Menu2Submenu
                keepMounted={keepMounted}
                trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
              >
                <Menu2Submenu
                  keepMounted={keepMounted}
                  trigger={<Menu2SubmenuTrigger openOnHover={false}>Deeper</Menu2SubmenuTrigger>}
                >
                  <Menu2Item>Leaf</Menu2Item>
                </Menu2Submenu>
              </Menu2Submenu>
            </Menu2>
          </ThemeProvider>,
        );
        const more = await focusTrigger('More');
        const root = more.closest('[role="menu"]')!;
        const openKey = direction === 'rtl' ? '{ArrowLeft}' : '{ArrowRight}';
        await user.keyboard(openKey);
        const deeper = await screen.findByRole('menuitem', { name: 'Deeper' });
        await waitFor(() => expect(deeper).toHaveFocus());
        await user.keyboard(openKey);
        const leaf = await screen.findByRole('menuitem', { name: 'Leaf' });
        await waitFor(() => expect(leaf).toHaveFocus());
        expect(changed).not.toHaveBeenCalled();
        expect(root).to.have.attribute('data-open');

        await user.keyboard('{Escape}');
        await waitFor(() =>
          expect(screen.queryByRole('menuitem', { name: 'Leaf' })).to.equal(null),
        );
        expect(deeper).toHaveFocus();
        expect(changed).not.toHaveBeenCalled();
        await user.keyboard('{Escape}');
        await waitFor(() =>
          expect(screen.queryByRole('menuitem', { name: 'Deeper' })).to.equal(null),
        );
        expect(more).toHaveFocus();
        expect(changed).not.toHaveBeenCalled();
        completed.mockClear();
        await user.keyboard('{Escape}');
        await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
        expect(changed).toHaveBeenCalledTimes(1);
        expect(changed.mock.calls[0][1].reason).to.equal('escape-key');
        expect(root.isConnected).to.equal(keepMounted);
      });
    });
  });

  [false, true].forEach((keepMounted) => {
    it(`supports a controlled external anchor across reopen, keepMounted=${keepMounted}`, async () => {
      const changes = vi.fn();
      function Demo() {
        const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
        return (
          <React.Fragment>
            <button type="button" onClick={(event) => setAnchor(event.currentTarget)}>
              Open
            </button>
            <Menu2
              open={Boolean(anchor)}
              anchor={anchor}
              keepMounted={keepMounted}
              onOpenChange={(open, details) => {
                changes(open, details.reason);
                if (!open) {
                  setAnchor(null);
                }
              }}
            >
              <Menu2Submenu
                trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
              >
                <Menu2Item>Nested</Menu2Item>
              </Menu2Submenu>
            </Menu2>
          </React.Fragment>
        );
      }
      const { user } = render(<Demo />);
      const anchor = screen.getByRole('button', { name: 'Open' });
      async function openAndSelect() {
        await user.click(anchor);
        await focusTrigger('More');
        await user.keyboard('{ArrowRight}');
        const nested = await screen.findByRole('menuitem', { name: 'Nested' });
        await waitFor(() => expect(nested).toHaveFocus());
        expect(changes).not.toHaveBeenCalled();
        await user.click(nested);
        await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
        expect(changes).toHaveBeenCalledExactlyOnceWith(false, 'item-press');
        await waitFor(() => expect(anchor).toHaveFocus());
        changes.mockClear();
      }
      await openAndSelect();
      await openAndSelect();
    });
  });

  (['click', 'hover'] as const).forEach((method) => {
    it(`closes a sibling submenu without closing its parent on ${method}`, async () => {
      const changed = vi.fn();
      const firstChanged = vi.fn();
      const { user } = render(
        <Menu2 defaultOpen modal={false} anchor={document.body} onOpenChange={changed}>
          <Menu2Submenu
            onOpenChange={firstChanged}
            trigger={
              <Menu2SubmenuTrigger openOnHover={method === 'hover'} delay={0}>
                First
              </Menu2SubmenuTrigger>
            }
          >
            <Menu2Item>First item</Menu2Item>
          </Menu2Submenu>
          <Menu2Submenu
            trigger={
              <Menu2SubmenuTrigger openOnHover={method === 'hover'} delay={0}>
                Second
              </Menu2SubmenuTrigger>
            }
          >
            <Menu2Item>Second item</Menu2Item>
          </Menu2Submenu>
        </Menu2>,
      );
      const first = await focusTrigger('First');
      const second = screen.getByRole('menuitem', { name: 'Second' });
      await user[method](first);
      await screen.findByRole('menuitem', { name: 'First item' });
      firstChanged.mockClear();
      await user[method](second);
      await screen.findByRole('menuitem', { name: 'Second item' });
      await waitFor(() =>
        expect(screen.queryByRole('menuitem', { name: 'First item' })).to.equal(null),
      );
      expect(firstChanged).toHaveBeenCalledTimes(1);
      expect(firstChanged.mock.calls[0][0]).to.equal(false);
      // Hover can close the first popup when the pointer leaves its trigger,
      // before the second popup sends its sibling-open event.
      expect(firstChanged.mock.calls[0][1].reason).to.be.oneOf(
        method === 'hover' ? ['trigger-hover', 'sibling-open'] : ['sibling-open'],
      );
      expect(changed).not.toHaveBeenCalled();
      expect(first.closest('[role="menu"]')).to.have.attribute('data-open');
    });
  });

  it('keeps an initially open submenu attached to its parent', async () => {
    const changed = vi.fn();
    const completed = vi.fn();
    render(
      <Menu2 defaultOpen modal={false} anchor={document.body} onOpenChange={changed}>
        <Menu2Submenu
          defaultOpen
          onOpenChangeComplete={completed}
          trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );
    await screen.findByRole('menuitem', { name: 'Nested' });
    await waitFor(() => expect(completed).toHaveBeenCalledWith(true));
    expect(changed).not.toHaveBeenCalled();
    expect(screen.getAllByRole('menu')).to.have.length(2);
  });

  it('uses the real trigger tree IDs when a trigger is added to an open menu', async () => {
    const changed = vi.fn();
    function Demo() {
      const [hasTrigger, setHasTrigger] = React.useState(false);
      return (
        <Menu2
          defaultOpen
          modal={false}
          anchor={document.body}
          onOpenChange={changed}
          trigger={hasTrigger ? <button type="button">Options</button> : undefined}
        >
          <Menu2Submenu
            trigger={
              <Menu2SubmenuTrigger
                openOnHover={false}
                onKeyDown={(event) => {
                  if (event.key === 'F2') {
                    setHasTrigger(true);
                  }
                }}
              >
                More
              </Menu2SubmenuTrigger>
            }
          >
            <Menu2Item>Nested</Menu2Item>
          </Menu2Submenu>
        </Menu2>
      );
    }
    const { user } = render(<Demo />);
    await focusTrigger('More');
    await user.keyboard('{F2}');
    const trigger = await screen.findByRole('button', { name: 'Options' });
    await user.keyboard('{ArrowRight}');
    const nested = await screen.findByRole('menuitem', { name: 'Nested' });
    await waitFor(() => expect(nested).toHaveFocus());
    expect(changed).not.toHaveBeenCalled();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});
