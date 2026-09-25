import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, enhanceHighContrast, ThemeOptions, ThemeProvider } from '../styles';
import menuItemClasses from '../MenuItem/menuItemClasses';
import Menu2CheckboxItem from '../Unstable_Menu2CheckboxItem';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2LinkItem from '../Unstable_Menu2LinkItem';
import Menu2RadioGroup from '../Unstable_Menu2RadioGroup';
import Menu2RadioItem from '../Unstable_Menu2RadioItem';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger, { menu2SubmenuTriggerClasses } from '../Unstable_Menu2SubmenuTrigger';
import Menu2 from './Menu2';
import { menu2CheckboxItemIndicatorClasses, menu2ItemClasses } from './menu2Classes';

const highlightedCases = [
  {
    name: 'MuiMenu2Item',
    item: <Menu2Item data-testid="target">Target</Menu2Item>,
  },
  {
    name: 'MuiMenu2LinkItem',
    item: (
      <Menu2LinkItem data-testid="target" href="#target">
        Target
      </Menu2LinkItem>
    ),
  },
  {
    name: 'MuiMenu2CheckboxItem',
    item: <Menu2CheckboxItem data-testid="target">Target</Menu2CheckboxItem>,
  },
  {
    name: 'MuiMenu2RadioItem',
    item: (
      <Menu2RadioGroup defaultValue="target">
        <Menu2RadioItem data-testid="target" value="target">
          Target
        </Menu2RadioItem>
      </Menu2RadioGroup>
    ),
  },
  {
    name: 'MuiMenu2SubmenuTrigger',
    item: (
      <Menu2Submenu
        trigger={
          <Menu2SubmenuTrigger data-testid="target" openOnHover={false}>
            Target
          </Menu2SubmenuTrigger>
        }
      >
        <Menu2Item>Nested</Menu2Item>
      </Menu2Submenu>
    ),
  },
  {
    name: 'MuiMenu2CheckboxItemIndicator',
    item: (
      <Menu2CheckboxItem defaultChecked slotProps={{ indicator: { 'data-testid': 'target' } }}>
        Target
      </Menu2CheckboxItem>
    ),
  },
  {
    name: 'MuiMenu2RadioItemIndicator',
    item: (
      <Menu2RadioGroup defaultValue="target">
        <Menu2RadioItem value="target" slotProps={{ indicator: { 'data-testid': 'target' } }}>
          Target
        </Menu2RadioItem>
      </Menu2RadioGroup>
    ),
  },
] as const;

describe.skipIf(isJsdom())('Menu2 state style overrides', () => {
  const { render } = createRenderer();

  // The rules of one class name are listed in cascade order.
  function getRulesFor(className: string) {
    const rules: Array<{ selector: string; media: string; declarations: string }> = [];
    const walk = (list: CSSRuleList, media: string) => {
      Array.from(list).forEach((rule) => {
        if (rule instanceof CSSMediaRule) {
          walk(rule.cssRules, rule.conditionText);
        } else if (rule instanceof CSSStyleRule && rule.selectorText.includes(className)) {
          rules.push({ selector: rule.selectorText, media, declarations: rule.style.cssText });
        }
      });
    };
    Array.from(document.styleSheets).forEach((sheet) => walk(sheet.cssRules, ''));
    return rules;
  }

  it('keeps the forced-colors active rule after a highlighted override', async () => {
    const theme = enhanceHighContrast(
      createTheme({
        components: {
          MuiMenu2Item: {
            styleOverrides: { highlighted: { color: '#111', backgroundColor: '#222' } },
          },
        },
      }),
    );
    render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false} anchor={document.body}>
          <Menu2Item>Target</Menu2Item>
        </Menu2>
      </ThemeProvider>,
    );
    const item = await screen.findByRole('menuitem', { name: 'Target' });
    // The generated class name carries the styles; the utility class does not.
    const rootClassName = Array.from(item.classList).find(
      (name) => name !== menu2ItemClasses.root && name.endsWith('MuiMenu2Item-root'),
    )!;
    const highlightedRules = getRulesFor(rootClassName).filter((rule) =>
      rule.selector.endsWith(`.${menu2ItemClasses.highlighted}`),
    );

    // The last highlighted rule restores the system colors under forced colors.
    // WebKit has no forced colors mode, so it drops `forced-color-adjust`.
    const forcedColorAdjust = CSS.supports('forced-color-adjust', 'none')
      ? 'forced-color-adjust: none; '
      : '';
    expect(highlightedRules.length).to.be.greaterThan(1);
    expect(highlightedRules[highlightedRules.length - 1]).to.deep.equal({
      selector: `.${rootClassName}.${menu2ItemClasses.highlighted}`,
      media: '(forced-colors: active)',
      declarations: `${forcedColorAdjust}color: highlighttext; background-color: highlight;`,
    });
  });

  [false, true].forEach((modularCssLayers) => {
    describe(`modularCssLayers: ${modularCssLayers}`, () => {
      function renderWithTheme(children: React.ReactNode, components: ThemeOptions['components']) {
        return render(
          <StyledEngineProvider enableCssLayer={modularCssLayers}>
            <ThemeProvider theme={createTheme({ modularCssLayers, components })}>
              {children}
            </ThemeProvider>
          </StyledEngineProvider>,
        );
      }

      highlightedCases.forEach(({ name, item }) => {
        it(`applies ${name}.highlighted only while the item is highlighted`, async () => {
          const { user, unmount } = renderWithTheme(
            <Menu2 transitionDuration={0} trigger={<button type="button">Options</button>}>
              <Menu2Item>Before</Menu2Item>
              {item}
              <Menu2Item>After</Menu2Item>
            </Menu2>,
            {
              [name]: {
                styleOverrides: {
                  highlighted: {
                    '--menu2-highlighted-test': 'active',
                    backgroundColor: 'rgb(1, 2, 3)',
                  },
                },
              },
            },
          );

          try {
            await user.click(screen.getByRole('button', { name: 'Options' }));
            const target = await screen.findByTestId('target');
            await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
            const marker = () =>
              getComputedStyle(target).getPropertyValue('--menu2-highlighted-test').trim();
            expect(marker()).to.equal('');
            const idleColor = getComputedStyle(target).backgroundColor;

            await user.keyboard('{ArrowDown}');
            await waitFor(() =>
              expect(screen.getByRole('menuitem', { name: 'Before' })).toHaveFocus(),
            );
            expect(marker()).to.equal('');

            await user.keyboard('{ArrowDown}');
            await waitFor(() => expect(target).to.have.attribute('data-highlighted'));
            expect(marker()).to.equal('active');
            expect(getComputedStyle(target).backgroundColor).to.equal('rgb(1, 2, 3)');

            await user.keyboard('{ArrowDown}');
            await waitFor(() =>
              expect(screen.getByRole('menuitem', { name: 'After' })).toHaveFocus(),
            );
            expect(target).not.to.have.attribute('data-highlighted');
            expect(marker()).to.equal('');
            expect(getComputedStyle(target).backgroundColor).to.equal(idleColor);
          } finally {
            unmount();
          }
        });
      });

      ['item', 'indicator'].forEach((kind) => {
        it(`lets a matching highlighted sx selector override the ${kind} theme`, async () => {
          const name = kind === 'item' ? 'MuiMenu2Item' : 'MuiMenu2CheckboxItemIndicator';
          const highlightedClass =
            kind === 'item'
              ? menu2ItemClasses.highlighted
              : menu2CheckboxItemIndicatorClasses.highlighted;
          const sx = { [`&.${highlightedClass}`]: { backgroundColor: 'rgb(4, 5, 6)' } };
          const { user, unmount } = renderWithTheme(
            <Menu2 transitionDuration={0} trigger={<button type="button">Options</button>}>
              {kind === 'item' ? (
                <Menu2Item data-testid="target" sx={sx}>
                  Target
                </Menu2Item>
              ) : (
                <Menu2CheckboxItem
                  defaultChecked
                  slotProps={{ indicator: { 'data-testid': 'target', sx } }}
                >
                  Target
                </Menu2CheckboxItem>
              )}
            </Menu2>,
            { [name]: { styleOverrides: { highlighted: { backgroundColor: 'rgb(1, 2, 3)' } } } },
          );

          try {
            await user.click(screen.getByRole('button', { name: 'Options' }));
            const target = await screen.findByTestId('target');
            await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
            expect(getComputedStyle(target).backgroundColor).not.to.equal('rgb(4, 5, 6)');
            await user.keyboard('{ArrowDown}');
            await waitFor(() => expect(target).to.have.attribute('data-highlighted'));
            expect(getComputedStyle(target).backgroundColor).to.equal('rgb(4, 5, 6)');
          } finally {
            unmount();
          }
        });
      });

      it('applies the closing override only during a keyboard exit', async () => {
        const completed = vi.fn();
        const { user, unmount } = renderWithTheme(
          <Menu2 transitionDuration={0} trigger={<button type="button">Options</button>}>
            <Menu2Submenu
              onOpenChangeComplete={completed}
              transitionDuration={{ enter: 0, exit: 300 }}
              trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
            >
              <Menu2Item>Nested</Menu2Item>
            </Menu2Submenu>
          </Menu2>,
          {
            MuiMenu2SubmenuTrigger: {
              styleOverrides: {
                closing: { '--menu2-closing-test': 'active', backgroundColor: 'rgb(1, 2, 3)' },
              },
            },
          },
        );

        try {
          await user.click(screen.getByRole('button', { name: 'Options' }));
          const trigger = await screen.findByRole('menuitem', { name: 'More' });
          await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
          const marker = () =>
            getComputedStyle(trigger).getPropertyValue('--menu2-closing-test').trim();
          expect(marker()).to.equal('');

          await user.keyboard('{ArrowDown}{ArrowRight}');
          await waitFor(() =>
            expect(screen.getByRole('menuitem', { name: 'Nested' })).toHaveFocus(),
          );
          await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
          expect(marker()).to.equal('');

          completed.mockClear();
          await user.keyboard('{Escape}');
          expect(trigger).to.have.class(menu2SubmenuTriggerClasses.closing);
          expect(marker()).to.equal('active');
          expect(getComputedStyle(trigger).backgroundColor).to.equal('rgb(1, 2, 3)');

          await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
          expect(trigger).not.to.have.class(menu2SubmenuTriggerClasses.closing);
          expect(marker()).to.equal('');
          expect(getComputedStyle(trigger).backgroundColor).not.to.equal('rgb(1, 2, 3)');
        } finally {
          unmount();
        }
      });

      [false, true].forEach((override) => {
        it(`styles a closing trigger without focus, override=${override}`, async () => {
          const completed = vi.fn();
          function Demo() {
            const [open, setOpen] = React.useState(false);
            return (
              <Menu2 transitionDuration={0} trigger={<button type="button">Options</button>}>
                <Menu2Submenu
                  open={open}
                  onOpenChange={setOpen}
                  onOpenChangeComplete={completed}
                  finalFocus={false}
                  transitionDuration={{ enter: 0, exit: 300 }}
                  trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
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
          const { user, unmount } = renderWithTheme(
            <Demo />,
            override
              ? {
                  MuiMenu2SubmenuTrigger: {
                    styleOverrides: { closing: { backgroundColor: 'rgb(1, 2, 3)' } },
                  },
                }
              : {},
          );

          try {
            await user.click(screen.getByRole('button', { name: 'Options' }));
            const trigger = await screen.findByRole('menuitem', { name: 'More' });
            await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
            await user.keyboard('{ArrowDown}{ArrowRight}');
            await waitFor(() =>
              expect(screen.getByRole('menuitem', { name: 'Nested' })).toHaveFocus(),
            );
            await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
            const openColor = getComputedStyle(trigger).backgroundColor;
            expect(openColor).not.to.equal('rgba(0, 0, 0, 0)');

            completed.mockClear();
            await user.keyboard('{F2}');
            expect(trigger).to.have.class(menu2SubmenuTriggerClasses.closing);
            expect(trigger).not.to.have.class(menuItemClasses.focusVisible);
            expect(getComputedStyle(trigger).backgroundColor).to.equal(
              override ? 'rgb(1, 2, 3)' : openColor,
            );

            await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
            expect(trigger).not.to.have.class(menu2SubmenuTriggerClasses.closing);
            expect(getComputedStyle(trigger).backgroundColor).to.equal('rgba(0, 0, 0, 0)');
          } finally {
            unmount();
          }
        });
      });
    });
  });
});
