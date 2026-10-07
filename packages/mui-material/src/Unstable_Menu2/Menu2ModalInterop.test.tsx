import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Dialog from '../Dialog';
import { createTheme, ThemeProvider } from '../styles';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import Menu2, { Menu2Props } from './Menu2';

describe.skipIf(isJsdom())('Menu2 inside a Material Dialog', () => {
  const { render } = createRenderer();

  function TestDialog({
    modal,
    menuProps,
    onAction,
    onDialogClose,
  }: {
    modal?: boolean;
    menuProps?: Partial<Menu2Props>;
    onAction: () => void;
    onDialogClose: () => void;
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
          <Menu2 modal={modal} trigger={<button type="button">Options</button>} {...menuProps}>
            {menuProps?.children ?? <Menu2Item>Profile</Menu2Item>}
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
        menuProps={{ openOnHover: true, delay: 0 }}
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

  it('keeps the trigger clickable through the modal backdrop', async () => {
    const onDialogClose = vi.fn();
    const { user } = render(<TestDialog onAction={vi.fn()} onDialogClose={onDialogClose} />);
    const trigger = screen.getByRole('button', { name: 'Options' });
    const point = getCenter(trigger);

    await user.click(trigger);
    const menu = await screen.findByRole('menu');
    expect(getClickTarget(point)).to.equal(trigger);

    await user.click(getClickTarget(point));
    await waitFor(() => expect(menu.isConnected).to.equal(false));
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
            <Menu2Submenu
              trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
            >
              <Menu2Item onClick={onSelect}>Export</Menu2Item>
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
    { container: 'html', overflow: 'auto' },
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
            <Menu2 trigger={<button type="button">Options</button>}>
              <Menu2Item onClick={() => setDialogOpen(true)}>Open dialog</Menu2Item>
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

  // Without `scrollbar-gutter: stable` and with inset scrollbars, Base UI locks
  // body and gives html `overflow-y: scroll`. The Material lock must wait for
  // the release of that body lock, not for html.
  it('transfers the scroll lock to a dialog under the inset-scrollbar fallback', async () => {
    const innerWidth = Object.getOwnPropertyDescriptor(window, 'innerWidth');
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      get: () => document.documentElement.clientWidth + 15,
    });
    const supports = CSS.supports.bind(CSS);
    vi.spyOn(CSS, 'supports').mockImplementation((property: string, value?: string) =>
      property === 'scrollbar-gutter' ? false : supports(property, value as string),
    );

    function Demo() {
      const [dialogOpen, setDialogOpen] = React.useState(false);

      return (
        <div style={{ minHeight: '200vh' }}>
          <Menu2 trigger={<button type="button">Options</button>}>
            <Menu2Item onClick={() => setDialogOpen(true)}>Open dialog</Menu2Item>
          </Menu2>
          <Dialog open={dialogOpen} transitionDuration={0}>
            <button type="button" onClick={() => setDialogOpen(false)}>
              Close dialog
            </button>
          </Dialog>
        </div>
      );
    }

    try {
      const { user } = render(<Demo />);
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const menu = await screen.findByRole('menu');
      await waitFor(() => expect(document.body.style.overflowY).to.equal('hidden'));
      expect(document.documentElement.style.overflowY).to.equal('scroll');

      await user.click(screen.getByRole('menuitem', { name: 'Open dialog' }));
      await screen.findByRole('dialog');
      await waitFor(() => expect(menu.isConnected).to.equal(false));
      await waitFor(() => expect(document.body.style.overflow).to.equal('hidden'));
      expect(document.documentElement.style.overflow).to.equal('');

      await user.click(screen.getByRole('button', { name: 'Close dialog' }));
      await waitFor(() => expect(screen.queryByRole('dialog')).to.equal(null));
      expect(document.body.style.overflow).to.equal('');
      expect(document.documentElement.style.overflow).to.equal('');
    } finally {
      vi.mocked(CSS.supports).mockRestore();
      if (innerWidth) {
        Object.defineProperty(window, 'innerWidth', innerWidth);
      }
    }
  });

  it('keeps an existing dialog locked while its nested menu opens and closes', async () => {
    const initialOverflow = document.body.style.overflow;

    function Demo() {
      const [dialogOpen, setDialogOpen] = React.useState(true);

      return (
        <Dialog open={dialogOpen} transitionDuration={0}>
          <Menu2 trigger={<button type="button">Options</button>}>
            <Menu2Item>Profile</Menu2Item>
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
});
