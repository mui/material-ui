import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem, { menu2LinkItemClasses } from '@mui/material/Unstable_Menu2LinkItem';
import Menu2CheckboxItem, {
  menu2CheckboxItemClasses,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem, { menu2RadioItemClasses } from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2SubmenuTrigger, {
  menu2SubmenuTriggerClasses,
} from '@mui/material/Unstable_Menu2SubmenuTrigger';

interface AdornmentTestProps {
  children?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inset?: boolean;
}

interface Part {
  name: string;
  role: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio';
  classes: { root: string; inset: string; startAdornment: string; endAdornment: string };
  // The indicator classes that render before the start adornment or after the end adornment.
  startIndicator?: string;
  endIndicator?: string;
  render: (props: AdornmentTestProps) => React.ReactElement;
}

const PARTS: Part[] = [
  {
    name: 'Menu2Item',
    role: 'menuitem',
    classes: menu2ItemClasses,
    render: (props) => <Menu2Item {...props} />,
  },
  {
    name: 'Menu2LinkItem',
    role: 'menuitem',
    classes: menu2LinkItemClasses,
    render: (props) => <Menu2LinkItem href="#" {...props} />,
  },
  {
    name: 'Menu2CheckboxItem',
    role: 'menuitemcheckbox',
    classes: menu2CheckboxItemClasses,
    startIndicator: menu2CheckboxItemClasses.indicator,
    render: (props) => <Menu2CheckboxItem {...props} />,
  },
  {
    name: 'Menu2RadioItem',
    role: 'menuitemradio',
    classes: menu2RadioItemClasses,
    startIndicator: menu2RadioItemClasses.indicator,
    render: (props) => (
      <Menu2RadioGroup defaultValue="a">
        <Menu2RadioItem value="a" {...props} />
      </Menu2RadioGroup>
    ),
  },
  {
    name: 'Menu2SubmenuTrigger',
    role: 'menuitem',
    classes: menu2SubmenuTriggerClasses,
    endIndicator: menu2SubmenuTriggerClasses.indicator,
    render: (props) => (
      <Menu2Submenu>
        <Menu2SubmenuTrigger {...props} />
        <Menu2SubmenuPopup slots={{ transition: null }}>
          <Menu2Item>Child</Menu2Item>
        </Menu2SubmenuPopup>
      </Menu2Submenu>
    ),
  },
];

describe('Menu2 item adornments', () => {
  const { render } = createRenderer();

  function renderInMenu(
    element: React.ReactNode,
    theme: Theme = createTheme(),
    modularCssLayers = false,
  ) {
    return render(
      <StyledEngineProvider enableCssLayer={modularCssLayers}>
        <ThemeProvider theme={theme}>
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body} slots={{ transition: null }}>
              {element}
            </Menu2Popup>
          </Menu2>
        </ThemeProvider>
      </StyledEngineProvider>,
    );
  }

  function getAdornments(name: string, part: Part) {
    const item = screen.getByRole(part.role, { name });
    return {
      item,
      start: item.querySelectorAll<HTMLElement>(`.${part.classes.startAdornment}`),
      end: item.querySelectorAll<HTMLElement>(`.${part.classes.endAdornment}`),
    };
  }

  PARTS.forEach((part) => {
    describe(`${part.name}`, () => {
      it('renders the parts in order', () => {
        renderInMenu(
          part.render({
            startAdornment: <svg data-testid="icon" />,
            endAdornment: '⌘X',
            children: 'Cut',
          }),
        );
        const { item, start, end } = getAdornments('Cut ⌘X', part);
        const nodes = Array.from(item.childNodes);
        const label = nodes.find(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent === 'Cut',
        );
        const ordered: Array<Node | null | undefined> = [start[0], label, end[0]];
        if (part.startIndicator) {
          ordered.unshift(item.querySelector(`.${part.startIndicator}`));
        }
        if (part.endIndicator) {
          ordered.push(item.querySelector(`.${part.endIndicator}`));
        }
        const indexes = ordered.map((node) => (node ? nodes.indexOf(node as ChildNode) : -1));

        expect(indexes).not.to.include(-1);
        expect(indexes).to.deep.equal([...indexes].sort((a, b) => a - b));
        expect(start[0]).to.contain(screen.getByTestId('icon'));
        expect(end[0]).to.have.text('⌘X');
      });

      it('applies the classes', () => {
        renderInMenu(
          part.render({
            startAdornment: <svg />,
            endAdornment: '⌘X',
            children: 'Cut',
          }),
        );
        const { item, start, end } = getAdornments('Cut ⌘X', part);

        expect(start).to.have.length(1);
        expect(start[0]).to.have.class(listItemIconClasses.root);
        expect(start[0].tagName).to.equal('SPAN');
        expect(end).to.have.length(1);
        expect(end[0].tagName).to.equal('SPAN');
        expect(item).not.to.have.class(part.classes.inset);
      });

      it('renders an empty start adornment for inset', () => {
        renderInMenu(part.render({ inset: true, children: 'Paste' }));
        const { item, start, end } = getAdornments('Paste', part);

        expect(start).to.have.length(1);
        expect(start[0].childNodes).to.have.length(0);
        expect(end).to.have.length(0);
        expect(item).to.have.class(part.classes.inset);
      });

      it('renders one start adornment with inset and startAdornment', () => {
        renderInMenu(
          part.render({
            inset: true,
            startAdornment: <svg data-testid="icon" />,
            children: 'Cut',
          }),
        );
        const { start } = getAdornments('Cut', part);

        expect(start).to.have.length(1);
        expect(start[0]).to.contain(screen.getByTestId('icon'));
      });

      it('skips empty adornments', () => {
        renderInMenu(
          <React.Fragment>
            {part.render({ startAdornment: false, children: 'False' })}
            {part.render({ startAdornment: null, endAdornment: null, children: 'Null' })}
            {part.render({ endAdornment: '', children: 'Empty' })}
          </React.Fragment>,
        );

        ['False', 'Null', 'Empty'].forEach((name) => {
          const { start, end } = getAdornments(name, part);
          expect(start).to.have.length(0);
          expect(end).to.have.length(0);
        });
      });

      it('does not forward the adornment props', () => {
        renderInMenu(
          part.render({
            inset: true,
            startAdornment: <svg />,
            endAdornment: '⌘X',
            children: 'Cut',
          }),
        );
        const { item } = getAdornments('Cut ⌘X', part);

        ['inset', 'startadornment', 'endadornment'].forEach((attribute) => {
          expect(item).not.to.have.attribute(attribute);
        });
      });

      describe.skipIf(isJsdom())('layout', () => {
        [false, true].forEach((modularCssLayers) => {
          describe(`modularCssLayers: ${modularCssLayers}`, () => {
            it('aligns an inset label with an adorned label', () => {
              renderInMenu(
                <React.Fragment>
                  {part.render({
                    startAdornment: <svg width="20" height="20" />,
                    children: 'Cut',
                  })}
                  {part.render({ inset: true, children: 'Paste' })}
                </React.Fragment>,
                createTheme({ modularCssLayers }),
                modularCssLayers,
              );
              const adorned = getAdornments('Cut', part).start[0].getBoundingClientRect();
              const inset = getAdornments('Paste', part).start[0].getBoundingClientRect();

              expect(adorned.width).to.equal(36);
              expect(inset.width).to.equal(36);
              expect(inset.right).to.equal(adorned.right);
            });

            it('applies a theme start adornment width to the inset slot', () => {
              renderInMenu(
                <React.Fragment>
                  {part.render({
                    startAdornment: <svg width="20" height="20" />,
                    children: 'Cut',
                  })}
                  {part.render({ inset: true, children: 'Paste' })}
                </React.Fragment>,
                createTheme({
                  modularCssLayers,
                  components: {
                    MuiMenu2Item: { styleOverrides: { startAdornment: { minWidth: 48 } } },
                  },
                }),
                modularCssLayers,
              );

              expect(getAdornments('Cut', part).start[0].getBoundingClientRect().width).to.equal(
                48,
              );
              expect(getAdornments('Paste', part).start[0].getBoundingClientRect().width).to.equal(
                48,
              );
            });

            it('styles the end adornment', () => {
              const theme = createTheme({ modularCssLayers });
              renderInMenu(
                <React.Fragment>
                  {part.render({ endAdornment: '⌘X', children: 'Cut' })}
                  {part.render({ endAdornment: '⌘Y', children: 'A much longer label' })}
                </React.Fragment>,
                theme,
                modularCssLayers,
              );
              const short = getAdornments('Cut ⌘X', part);
              const long = getAdornments('A much longer label ⌘Y', part);
              const style = getComputedStyle(short.end[0]);

              expect(style.color).to.equal('rgba(0, 0, 0, 0.6)');
              expect(style.fontSize).to.equal('14px');
              expect(short.end[0].getBoundingClientRect().right).to.equal(
                long.end[0].getBoundingClientRect().right,
              );
              if (!part.endIndicator) {
                expect(short.end[0].getBoundingClientRect().right).to.equal(
                  short.item.getBoundingClientRect().right - 16,
                );
              }
            });
          });
        });
      });
    });
  });

  describe.skipIf(isJsdom())('part layout', () => {
    [false, true].forEach((modularCssLayers) => {
      describe(`modularCssLayers: ${modularCssLayers}`, () => {
        it('keeps the chevron right after the end adornment', () => {
          renderInMenu(
            <React.Fragment>
              <Menu2Submenu>
                <Menu2SubmenuTrigger endAdornment="3">Recent</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup slots={{ transition: null }}>
                  <Menu2Item>Child</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
              <Menu2Item>A much longer label that adds free space</Menu2Item>
            </React.Fragment>,
            createTheme({ modularCssLayers }),
            modularCssLayers,
          );
          const item = screen.getByRole('menuitem', { name: 'Recent 3' });
          const end = item
            .querySelector(`.${menu2SubmenuTriggerClasses.endAdornment}`)!
            .getBoundingClientRect();
          const indicator = item
            .querySelector(`.${menu2SubmenuTriggerClasses.indicator}`)!
            .getBoundingClientRect();

          expect(Math.abs(indicator.left - end.right)).to.be.lessThan(0.5);
          expect(indicator.right).to.equal(item.getBoundingClientRect().right - 16);
        });

        it('lets indicator overrides set the chevron margin after an end adornment', () => {
          renderInMenu(
            <Menu2Submenu>
              <Menu2SubmenuTrigger
                endAdornment="3"
                slotProps={{ indicator: { sx: { marginLeft: '12px' } } }}
              >
                Recent
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup slots={{ transition: null }}>
                <Menu2Item>Child</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>,
            createTheme({ modularCssLayers }),
            modularCssLayers,
          );
          const indicator = screen
            .getByRole('menuitem', { name: 'Recent 3' })
            .querySelector(`.${menu2SubmenuTriggerClasses.indicator}`)!;

          expect(getComputedStyle(indicator).marginLeft).to.equal('12px');
        });

        it('applies the inset theme key to the root', () => {
          renderInMenu(
            <React.Fragment>
              <Menu2Item inset>Inset</Menu2Item>
              <Menu2Item>Plain</Menu2Item>
              <Menu2CheckboxItem inset>Checkbox</Menu2CheckboxItem>
            </React.Fragment>,
            createTheme({
              modularCssLayers,
              components: {
                MuiMenu2Item: { styleOverrides: { inset: { backgroundColor: 'rgb(7, 8, 9)' } } },
                MuiMenu2CheckboxItem: {
                  styleOverrides: { inset: { backgroundColor: 'rgb(10, 11, 12)' } },
                },
              },
            }),
            modularCssLayers,
          );
          const backgroundColor = (role: Part['role'], name: string) =>
            getComputedStyle(screen.getByRole(role, { name })).backgroundColor;

          expect(backgroundColor('menuitem', 'Inset')).to.equal('rgb(7, 8, 9)');
          expect(backgroundColor('menuitem', 'Plain')).not.to.equal('rgb(7, 8, 9)');
          expect(backgroundColor('menuitemcheckbox', 'Checkbox')).to.equal('rgb(10, 11, 12)');
        });

        it('applies the shared and the part theme keys', () => {
          renderInMenu(
            <React.Fragment>
              <Menu2Item endAdornment="X">Item</Menu2Item>
              <Menu2CheckboxItem endAdornment="X">Checkbox</Menu2CheckboxItem>
              <Menu2RadioGroup defaultValue="a">
                <Menu2RadioItem value="a" endAdornment="X">
                  Radio
                </Menu2RadioItem>
              </Menu2RadioGroup>
            </React.Fragment>,
            createTheme({
              modularCssLayers,
              components: {
                MuiMenu2Item: { styleOverrides: { endAdornment: { color: 'rgb(1, 2, 3)' } } },
                MuiMenu2CheckboxItem: {
                  styleOverrides: { endAdornment: { color: 'rgb(4, 5, 6)' } },
                },
              },
            }),
            modularCssLayers,
          );
          const color = (role: Part['role'], name: string, classes: { endAdornment: string }) =>
            getComputedStyle(
              screen.getByRole(role, { name }).querySelector(`.${classes.endAdornment}`)!,
            ).color;

          expect(color('menuitem', 'Item X', menu2ItemClasses)).to.equal('rgb(1, 2, 3)');
          expect(color('menuitemcheckbox', 'Checkbox X', menu2CheckboxItemClasses)).to.equal(
            'rgb(4, 5, 6)',
          );
          expect(color('menuitemradio', 'Radio X', menu2RadioItemClasses)).to.equal('rgb(1, 2, 3)');
        });
      });
    });
  });
});
