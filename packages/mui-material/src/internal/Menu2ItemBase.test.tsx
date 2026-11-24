import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';

describe.skipIf(isJsdom())('Menu2 item styled base', () => {
  const { render } = createRenderer();

  [false, true].forEach((modularCssLayers) => {
    describe(`modularCssLayers: ${modularCssLayers}`, () => {
      [false, true].forEach((disableGutters) => {
        it(`applies dividers and gutters to every item with disableGutters: ${disableGutters}`, () => {
          const itemProps = { divider: true, disableGutters };
          render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={createTheme({ modularCssLayers })}>
                <Menu2 defaultOpen modal={false}>
                  <Menu2Popup anchor={document.body} slots={{ transition: null }}>
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
                    <Menu2Submenu>
                      <Menu2SubmenuTrigger {...itemProps} data-testid="submenu">
                        More
                      </Menu2SubmenuTrigger>
                      <Menu2SubmenuPopup>
                        <Menu2Item>Nested</Menu2Item>
                      </Menu2SubmenuPopup>
                    </Menu2Submenu>
                  </Menu2Popup>
                </Menu2>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          ['item', 'link', 'checkbox', 'radio', 'submenu'].forEach((id) => {
            const element = screen.getByTestId(id);
            const styles = getComputedStyle(element);
            expect(styles.borderBottomWidth).to.equal('1px');
            expect(styles.borderBottomStyle).to.equal('solid');
            expect(styles.borderTopWidth).to.equal('0px');
            expect(styles.paddingTop).to.equal('6px');
            expect(styles.paddingLeft).to.equal(disableGutters ? '0px' : '16px');
            expect(element).not.to.have.attribute('ownerState');
          });
        });
      });

      [false, true].forEach((focusVisible) => {
        it(`keeps focus and highlight classes separate with focusVisible: ${focusVisible}`, () => {
          render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={createTheme({ modularCssLayers, focusVisible })}>
                <Menu2 defaultOpen modal={false}>
                  <Menu2Popup anchor={document.body} slots={{ transition: null }}>
                    <Menu2Item className="Mui-focusVisible" data-testid="focus-only">
                      Focus only
                    </Menu2Item>
                    <Menu2Item className={menu2ItemClasses.highlighted} data-testid="highlighted">
                      Highlighted
                    </Menu2Item>
                  </Menu2Popup>
                </Menu2>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          expect(getComputedStyle(screen.getByTestId('focus-only')).backgroundColor).to.equal(
            focusVisible ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.12)',
          );
          expect(getComputedStyle(screen.getByTestId('highlighted')).backgroundColor).to.equal(
            'rgba(0, 0, 0, 0)',
          );
        });

        it(`has no selected styles with focusVisible: ${focusVisible}`, () => {
          render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={createTheme({ modularCssLayers, focusVisible })}>
                <Menu2 defaultOpen modal={false}>
                  <Menu2Popup anchor={document.body} slots={{ transition: null }}>
                    <Menu2Item data-testid="item">Item</Menu2Item>
                    <Menu2LinkItem href="#target" data-testid="link">
                      Link
                    </Menu2LinkItem>
                    <Menu2CheckboxItem defaultChecked data-testid="checkbox">
                      Checkbox
                    </Menu2CheckboxItem>
                    <Menu2RadioGroup defaultValue="one">
                      <Menu2RadioItem value="one" data-testid="radio">
                        Radio
                      </Menu2RadioItem>
                    </Menu2RadioGroup>
                    <Menu2Submenu>
                      <Menu2SubmenuTrigger data-testid="submenu">More</Menu2SubmenuTrigger>
                      <Menu2SubmenuPopup>
                        <Menu2Item>Nested</Menu2Item>
                      </Menu2SubmenuPopup>
                    </Menu2Submenu>
                  </Menu2Popup>
                </Menu2>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          expect(screen.getByTestId('checkbox')).to.have.attribute('aria-checked', 'true');
          expect(screen.getByTestId('radio')).to.have.attribute('aria-checked', 'true');

          ['item', 'link', 'checkbox', 'radio', 'submenu'].forEach((id) => {
            const element = screen.getByTestId(id);
            expect(element).not.to.have.class('Mui-selected');
            expect(getComputedStyle(element).backgroundColor).to.equal('rgba(0, 0, 0, 0)');

            // A manually added global class must not add selected styles.
            element.classList.add('Mui-selected');
            expect(getComputedStyle(element).backgroundColor).to.equal('rgba(0, 0, 0, 0)');
            element.classList.add('Mui-focusVisible');
            expect(getComputedStyle(element).backgroundColor).to.equal(
              focusVisible ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.12)',
            );
          });
        });
      });

      it('applies ButtonBase overrides before the Menu2 item styles', () => {
        const theme = createTheme({
          modularCssLayers,
          components: {
            MuiButtonBase: {
              styleOverrides: { root: { color: 'rgb(10, 20, 30)', borderRadius: 9 } },
            },
            MuiMenu2Item: {
              styleOverrides: { root: { paddingTop: 31 }, divider: { borderBottomWidth: 3 } },
              variants: [{ props: { divider: true }, style: { paddingTop: 32 } }],
            },
          },
        });
        render(
          <StyledEngineProvider enableCssLayer={modularCssLayers}>
            <ThemeProvider theme={theme}>
              <Menu2 defaultOpen modal={false}>
                <Menu2Popup anchor={document.body} slots={{ transition: null }}>
                  <Menu2Item divider data-testid="item">
                    Item
                  </Menu2Item>
                  <Menu2Item
                    divider
                    sx={{ paddingTop: '42px', borderBottomWidth: 4 }}
                    data-testid="sx"
                  >
                    Sx
                  </Menu2Item>
                  <Menu2LinkItem divider data-testid="link">
                    Link
                  </Menu2LinkItem>
                </Menu2Popup>
              </Menu2>
            </ThemeProvider>
          </StyledEngineProvider>,
        );
        const expected = [
          ['item', '32px', '3px'],
          ['sx', '42px', '4px'],
          ['link', '32px', '3px'],
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
