import { describe, it, expect } from 'vitest';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { act, createRenderer, fireEvent, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider } from '../i18n';
import { DemoToolbar, useToolbarKeyboard } from './DemoToolbar';
import type { DemoToolbarProps } from './DemoToolbar';

const noop = () => {};
const asyncNoop = async () => {};
const LANGUAGE_SLOT_SIZE = { width: 75, height: 26 };
const SOURCE_LINK_HIDE_DELAY = 3000;

function Toolbar(props: Partial<DemoToolbarProps>) {
  const keyboard = useToolbarKeyboard();
  return (
    <div
      ref={keyboard.toolbarRef}
      role="toolbar"
      aria-label="Demo actions"
      onKeyDown={keyboard.handleKeyDown}
      onFocus={keyboard.handleFocus}
    >
      <DemoToolbar
        gaLabel="example-demo"
        demoSourceId="demo-source"
        expanded={false}
        onToggleExpand={noop}
        toggleRef={React.createRef()}
        showCodeLabel="Show source"
        hasJsTransform
        isJsSelected={false}
        onLanguageClick={noop}
        variants={['Default']}
        selectedVariant="Default"
        onSelectVariant={noop}
        openMuiChat={asyncNoop}
        onOpenStackBlitz={noop}
        onOpenCodeSandbox={noop}
        onCopySource={asyncNoop}
        onResetFocus={noop}
        {...props}
      />
    </div>
  );
}

describe('DemoToolbar', () => {
  const { render } = createRenderer();

  function toolbarElement(props: Partial<DemoToolbarProps> = {}, theme = brandingLightTheme) {
    return (
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={theme}>
          <Toolbar {...props} />
        </ThemeProvider>
      </UserLanguageProvider>
    );
  }

  function renderToolbar(props: Partial<DemoToolbarProps> = {}, theme = brandingLightTheme) {
    return render(toolbarElement(props, theme));
  }

  it('defers overlay initialization until first intent', () => {
    let menuRenders = 0;
    let snackbarRenders = 0;
    const theme = createTheme(brandingLightTheme, {
      components: {
        MuiMenu: {
          defaultProps: {
            slotProps: {
              root: () => {
                menuRenders += 1;
                return {};
              },
            },
          },
        },
        MuiSnackbar: {
          defaultProps: {
            slotProps: {
              root: () => {
                snackbarRenders += 1;
                return {};
              },
            },
          },
        },
      },
    });

    renderToolbar({ openMuiChat: undefined }, theme);

    expect(menuRenders).to.equal(0);
    expect(snackbarRenders).to.equal(0);
  });

  it('opens the menu, completes its exit, restores focus and reopens', async () => {
    let exits = 0;
    const theme = createTheme(brandingLightTheme, {
      components: {
        MuiMenu: {
          defaultProps: {
            slotProps: {
              transition: {
                onExited: () => {
                  exits += 1;
                },
              },
            },
          },
        },
      },
    });
    const { user } = renderToolbar({ githubLocation: 'https://example.com/Example.tsx' }, theme);
    const more = screen.getByRole('button', { name: 'See more' });

    await user.click(more);
    const source = screen.getByRole('menuitem', { name: 'View the source on GitHub' });
    await waitFor(() => expect(document.activeElement).to.equal(source));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(exits).to.be.greaterThan(0));
    expect(screen.queryByRole('menu')).to.equal(null);
    expect(document.activeElement).to.equal(more);

    await user.click(more);
    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  describe('source link feedback', () => {
    const { clock, render: renderTimed } = createRenderer({ clock: 'fake' });

    it('copies links, completes snackbar auto-hide and shows feedback again', async () => {
      let exits = 0;
      const theme = createTheme(brandingLightTheme, {
        components: {
          MuiSnackbar: {
            defaultProps: {
              slotProps: {
                transition: {
                  onExited: () => {
                    exits += 1;
                  },
                },
              },
            },
          },
        },
      });
      renderTimed(toolbarElement({ tsSourceAnchor: 'Example.tsx', openMuiChat: undefined }, theme));
      const more = screen.getByRole('button', { name: 'See more' });
      const copyLink = async () => {
        fireEvent.click(more);
        fireEvent.click(screen.getByRole('menuitem', { name: 'Copy link to TypeScript source' }));
        let copied = '';
        await act(async () => {
          copied = await navigator.clipboard.readText();
        });
        return copied;
      };

      expect(await copyLink()).to.contain('#Example.tsx');
      expect(screen.getByRole('alert')).to.have.text(
        'Link to the source code has been copied to your clipboard.',
      );
      act(() => clock.tick(SOURCE_LINK_HIDE_DELAY));
      expect(screen.getByRole('alert')).not.to.equal(null);
      act(() => clock.tick(theme.transitions.duration.leavingScreen));
      expect(exits).to.be.greaterThan(0);
      expect(screen.queryByRole('alert')).to.equal(null);

      await copyLink();
      expect(screen.getByRole('alert')).not.to.equal(null);
    });
  });

  it('uses one roving tab stop across all toolbar controls', () => {
    renderToolbar();
    const toolbar = screen.getByRole('toolbar');
    const buttons = Array.from(toolbar.querySelectorAll('button'));

    expect(buttons.filter((button) => button.tabIndex === 0)).to.have.length(1);
    act(() => buttons[0].focus());
    fireEvent.keyDown(buttons[0], { key: 'ArrowRight' });
    const expand = screen.getByRole('button', { name: 'Show source' });
    expect(document.activeElement).to.equal(expand);
    expect(expand.tabIndex).to.equal(0);
  });

  it('marks one tab stop and omits collapsed language controls in server markup', () => {
    // Master baked `tabIndex` into the markup; querying visibility after mount
    // forces a style flush per button on every demo.
    const view = ReactDOMServer.renderToStaticMarkup(toolbarElement());
    const buttons = view.match(/<button[^>]*>/g) ?? [];
    const tabStops = buttons.filter((button) => !button.includes('tabindex="-1"'));

    expect(buttons.length).to.be.greaterThan(2);
    expect(tabStops).to.have.length(1);
    expect(view).not.to.contain('aria-label="Show JavaScript source"');
    expect(view).not.to.contain('aria-label="Show TypeScript source"');
  });

  it('keeps expanded language controls selectable and keyboard reachable', async () => {
    const selections: Array<string | null> = [];
    const { user } = renderToolbar({
      expanded: true,
      onLanguageClick: (_event, value) => selections.push(value),
    });
    const javascript = screen.getByRole('button', { name: 'Show JavaScript source' });
    const typescript = screen.getByRole('button', { name: 'Show TypeScript source' });
    const chat = screen.getByRole('button', { name: 'Edit in Chat' });

    expect(typescript).to.have.attribute('aria-pressed', 'true');
    act(() => chat.focus());
    fireEvent.keyDown(chat, { key: 'ArrowRight' });
    expect(document.activeElement).to.equal(javascript);
    await user.click(javascript);
    expect(selections).to.deep.equal(['js']);

    fireEvent.keyDown(javascript, { key: 'ArrowRight' });
    expect(document.activeElement).to.equal(typescript);
  });

  it.skipIf(isJsdom())('preserves the language slot dimensions when expanding', () => {
    const languageToggleRef = React.createRef<HTMLDivElement>();
    const { rerender } = renderToolbar({ languageToggleRef });
    const bounds = () => {
      const { width, height } = languageToggleRef.current!.getBoundingClientRect();
      return { width, height };
    };

    expect(bounds()).to.deep.equal(LANGUAGE_SLOT_SIZE);
    rerender(toolbarElement({ languageToggleRef, expanded: true }));
    expect(bounds()).to.deep.equal(LANGUAGE_SLOT_SIZE);
  });

  it('routes reset controls and preserves legacy analytics actions', async () => {
    let resetCount = 0;
    let resetFocusCount = 0;
    const onReset = () => {
      resetCount += 1;
    };
    const onResetFocus = () => {
      resetFocusCount += 1;
    };
    const { user } = renderToolbar({ onReset, onResetFocus });

    const expand = screen.getByRole('button', { name: 'Show source' });
    expect(expand.getAttribute('data-ga-event-action')).to.equal('expand');
    expect(
      screen.getByRole('button', { name: 'Edit in Chat' }).getAttribute('data-ga-event-category'),
    ).to.equal('mui-chat');

    await user.click(screen.getByRole('button', { name: /Reset focus/ }));
    await user.click(screen.getByRole('button', { name: 'Reset demo' }));
    expect(resetFocusCount).to.equal(1);
    expect(resetCount).to.equal(1);
  });

  it('renders deployment links with legacy analytics actions', async () => {
    const { user } = renderToolbar({
      deploymentLinks: {
        pullRequest: 'https://preview.example.com/guide/#ExampleDemo',
        next: 'https://next.example.com/guide/#ExampleDemo',
        permalink: 'https://deploy.example.com/guide/#ExampleDemo',
        master: 'https://master.example.com/guide/#ExampleDemo',
      },
    });

    await user.click(screen.getByRole('button', { name: 'See more' }));
    expect(
      screen.getByRole('menuitem', { name: 'demo on PR' }).getAttribute('data-ga-event-action'),
    ).to.equal('link-deploy-preview');
    expect(screen.getByRole('menuitem', { name: 'demo permalink' }).getAttribute('href')).to.equal(
      'https://deploy.example.com/guide/#ExampleDemo',
    );
  });
});
