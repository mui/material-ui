import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Dialog from '../Dialog';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2 from './Menu2';

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
