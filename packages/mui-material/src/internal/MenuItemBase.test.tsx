import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

describe.skipIf(isJsdom())('MenuItem shared styled base', () => {
  const { render } = createRenderer();

  [false, true].forEach((modularCssLayers) => {
    describe(`modularCssLayers: ${modularCssLayers}`, () => {
      [false, true].forEach((dense) => {
        it(`preserves dividers and gutters for every item with dense: ${dense}`, () => {
          const itemProps = { dense, divider: true, disableGutters: dense };
          render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={createTheme({ modularCssLayers })}>
                <MenuList>
                  <MenuItem {...itemProps} data-testid="classic">
                    Classic
                  </MenuItem>
                </MenuList>
                <Menu2
                  defaultOpen
                  modal={false}
                  anchor={document.body}
                  slots={{ transition: null }}
                >
                  <Menu2Item {...itemProps} data-testid="item">
                    Item
                  </Menu2Item>
                  <Menu2LinkItem {...itemProps} href="#target" data-testid="link">
                    Link
                  </Menu2LinkItem>
                  <Menu2CheckboxItem {...itemProps} data-testid="checkbox">
                    Checkbox
                  </Menu2CheckboxItem>
                  <Menu2RadioGroup>
                    <Menu2RadioItem {...itemProps} value="one" data-testid="radio">
                      Radio
                    </Menu2RadioItem>
                  </Menu2RadioGroup>
                  <Menu2Submenu
                    trigger={
                      <Menu2SubmenuTrigger {...itemProps} data-testid="submenu">
                        More
                      </Menu2SubmenuTrigger>
                    }
                  >
                    <Menu2Item>Nested</Menu2Item>
                  </Menu2Submenu>
                </Menu2>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          ['classic', 'item', 'link', 'checkbox', 'radio', 'submenu'].forEach((id) => {
            const element = screen.getByTestId(id);
            const styles = getComputedStyle(element);
            expect(styles.borderBottomWidth).to.equal('1px');
            expect(styles.borderBottomStyle).to.equal('solid');
            expect(styles.borderTopWidth).to.equal('0px');
            expect(styles.paddingTop).to.equal(dense ? '4px' : '6px');
            expect(styles.paddingLeft).to.equal(dense ? '0px' : '16px');
            expect(element).not.to.have.attribute('ownerState');
          });
        });
      });

      [false, true].forEach((focusVisible) => {
        it(`keeps focus and highlight classes separate with focusVisible: ${focusVisible}`, () => {
          render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={createTheme({ modularCssLayers, focusVisible })}>
                <MenuList>
                  <MenuItem selected className="Mui-focusVisible" data-testid="classic">
                    Classic
                  </MenuItem>
                </MenuList>
                <Menu2
                  defaultOpen
                  modal={false}
                  anchor={document.body}
                  slots={{ transition: null }}
                >
                  <Menu2Item selected className="Mui-focusVisible" data-testid="focus-only">
                    Focus only
                  </Menu2Item>
                  <Menu2Item
                    selected
                    className={menu2ItemClasses.highlighted}
                    data-testid="highlighted"
                  >
                    Highlighted
                  </Menu2Item>
                </Menu2>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          const selectedColor = 'rgba(25, 118, 210, 0.08)';
          const highlightedColor = focusVisible ? selectedColor : 'rgba(25, 118, 210, 0.2)';
          expect(getComputedStyle(screen.getByTestId('classic')).backgroundColor).to.equal(
            highlightedColor,
          );
          expect(getComputedStyle(screen.getByTestId('focus-only')).backgroundColor).to.equal(
            selectedColor,
          );
          expect(getComputedStyle(screen.getByTestId('highlighted')).backgroundColor).to.equal(
            highlightedColor,
          );
        });
      });

      it('inherits ButtonBase overrides and keeps item theme keys, variants, and sx separate', () => {
        const theme = createTheme({
          modularCssLayers,
          components: {
            MuiButtonBase: {
              styleOverrides: { root: { color: 'rgb(10, 20, 30)', borderRadius: 9 } },
            },
            MuiMenuItem: {
              styleOverrides: { root: { paddingTop: 21 }, divider: { borderBottomWidth: 2 } },
              variants: [{ props: { dense: true }, style: { paddingTop: 22 } }],
            },
            MuiMenu2Item: {
              styleOverrides: { root: { paddingTop: 31 }, divider: { borderBottomWidth: 3 } },
              variants: [{ props: { dense: true }, style: { paddingTop: 32 } }],
            },
          },
        });
        render(
          <StyledEngineProvider enableCssLayer={modularCssLayers}>
            <ThemeProvider theme={theme}>
              <MenuList>
                <MenuItem dense divider data-testid="classic">
                  Classic
                </MenuItem>
              </MenuList>
              <Menu2 defaultOpen modal={false} anchor={document.body} slots={{ transition: null }}>
                <Menu2Item dense divider data-testid="item">
                  Item
                </Menu2Item>
                <Menu2Item
                  dense
                  divider
                  sx={{ paddingTop: '42px', borderBottomWidth: 4 }}
                  data-testid="sx"
                >
                  Sx
                </Menu2Item>
                <Menu2LinkItem dense divider data-testid="link">
                  Link
                </Menu2LinkItem>
              </Menu2>
            </ThemeProvider>
          </StyledEngineProvider>,
        );
        const expected = [
          ['classic', '22px', '2px'],
          ['item', '32px', '3px'],
          ['sx', '42px', '4px'],
          ['link', '4px', '1px'],
        ];
        expected.forEach(([id, paddingTop, borderBottomWidth]) => {
          const styles = getComputedStyle(screen.getByTestId(id));
          expect(styles.paddingTop).to.equal(paddingTop);
          expect(styles.borderBottomWidth).to.equal(borderBottomWidth);
          expect(styles.color).to.equal('rgb(10, 20, 30)');
          expect(styles.borderRadius).to.equal('9px');
        });
      });
    });
  });
});
