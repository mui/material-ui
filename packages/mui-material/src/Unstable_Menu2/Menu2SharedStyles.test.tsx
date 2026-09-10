import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';

describe.skipIf(isJsdom())('Menu2 shared styled bases', () => {
  const { render } = createRenderer();

  [false, true].forEach((modularCssLayers) => {
    describe(`modularCssLayers: ${modularCssLayers}`, () => {
      [false, true].forEach((useSx) => {
        it(`keeps popup theme keys separate and applies slot sx: ${useSx}`, async () => {
          const theme = createTheme({
            modularCssLayers,
            components: {
              MuiMenu2: {
                styleOverrides: {
                  positioner: { zIndex: 1401 },
                  paper: ({ ownerState }) => ({
                    maxHeight: ownerState.align === 'center' ? 301 : 302,
                    overflowY: 'scroll',
                  }),
                  list: { outline: '1px solid red' },
                },
              },
              MuiMenu2Submenu: {
                styleOverrides: {
                  positioner: { zIndex: 1402 },
                  paper: ({ ownerState }) => ({
                    maxHeight: ownerState.align === 'end' ? 201 : 202,
                    overflowY: 'scroll',
                  }),
                  list: { outline: '2px solid blue' },
                },
              },
            },
          });
          const { user } = render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={theme}>
                <Menu2
                  defaultOpen
                  modal={false}
                  anchor={document.body}
                  align="center"
                  slots={{ transition: null }}
                  slotProps={{
                    positioner: {
                      'data-testid': 'parent-positioner',
                      sx: useSx ? { zIndex: 1501 } : undefined,
                    },
                    paper: {
                      'data-testid': 'parent-paper',
                      sx: useSx ? { maxHeight: 311, overflowY: 'hidden' } : undefined,
                    },
                    list: {
                      'data-testid': 'parent-list',
                      sx: useSx ? { outlineWidth: '3px' } : undefined,
                    },
                  }}
                >
                  <Menu2Submenu
                    align="end"
                    trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}
                    slots={{ transition: null }}
                    slotProps={{
                      positioner: {
                        'data-testid': 'child-positioner',
                        sx: useSx ? { zIndex: 1502 } : undefined,
                      },
                      paper: {
                        'data-testid': 'child-paper',
                        sx: useSx ? { maxHeight: 211, overflowY: 'hidden' } : undefined,
                      },
                      list: {
                        'data-testid': 'child-list',
                        sx: useSx ? { outlineWidth: '4px' } : undefined,
                      },
                    }}
                  >
                    <Menu2Item>Nested</Menu2Item>
                  </Menu2Submenu>
                </Menu2>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          await user.click(screen.getByRole('menuitem', { name: 'More' }));
          await screen.findByRole('menuitem', { name: 'Nested' });

          ['parent', 'child'].forEach((prefix, index) => {
            const positioner = screen.getByTestId(`${prefix}-positioner`);
            const paper = screen.getByTestId(`${prefix}-paper`);
            const list = screen.getByTestId(`${prefix}-list`);
            expect(getComputedStyle(positioner).zIndex).to.equal(
              String((useSx ? 1501 : 1401) + index),
            );
            expect(getComputedStyle(paper).maxHeight).to.equal(
              `${(useSx ? 311 : 301) - index * 100}px`,
            );
            expect(getComputedStyle(paper).overflowY).to.equal(useSx ? 'hidden' : 'scroll');
            expect(getComputedStyle(list).outlineWidth).to.equal(`${(useSx ? 3 : 1) + index}px`);
            [positioner, paper, list].forEach((element) => {
              expect(element).not.to.have.attribute('ownerState');
              expect(element).not.to.have.attribute('sx');
            });
          });
        });
      });

      (['default', 'theme', 'sx'] as const).forEach((source) => {
        it(`applies indicator styles from ${source}`, () => {
          const theme = createTheme({
            modularCssLayers,
            components:
              source === 'default'
                ? {}
                : {
                    MuiMenu2CheckboxItemIndicator: {
                      styleOverrides: {
                        root: { minWidth: 40, '&[data-checked]': { color: 'rgb(1, 2, 3)' } },
                      },
                      variants: [{ props: { keepMounted: true }, style: { minWidth: 41 } }],
                    },
                    MuiMenu2RadioItemIndicator: {
                      styleOverrides: {
                        root: { minWidth: 44, '&[data-checked]': { color: 'rgb(4, 5, 6)' } },
                      },
                      variants: [{ props: { keepMounted: true }, style: { minWidth: 45 } }],
                    },
                  },
          });
          const indicatorSx =
            source === 'sx'
              ? { minWidth: 51, '&[data-checked]': { color: 'rgb(7, 8, 9)' } }
              : undefined;
          render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={theme}>
                <Menu2
                  defaultOpen
                  modal={false}
                  anchor={document.body}
                  slots={{ transition: null }}
                >
                  <Menu2CheckboxItem
                    defaultChecked
                    slotProps={{ indicator: { 'data-testid': 'checkbox', sx: indicatorSx } }}
                  >
                    Checkbox
                  </Menu2CheckboxItem>
                  <Menu2RadioGroup defaultValue="one">
                    <Menu2RadioItem
                      value="one"
                      slotProps={{ indicator: { 'data-testid': 'radio', sx: indicatorSx } }}
                    >
                      Radio
                    </Menu2RadioItem>
                  </Menu2RadioGroup>
                </Menu2>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          ['checkbox', 'radio'].forEach((id, index) => {
            const indicator = screen.getByTestId(id);
            const styles = getComputedStyle(indicator);
            expect(indicator).to.have.attribute('data-checked');
            expect(styles.minWidth).to.equal(
              source === 'default' ? '36px' : `${source === 'sx' ? 51 : 41 + index * 4}px`,
            );
            const expectedColors = {
              default: 'rgb(25, 118, 210)',
              theme: ['rgb(1, 2, 3)', 'rgb(4, 5, 6)'][index],
              sx: 'rgb(7, 8, 9)',
            };
            expect(styles.color).to.equal(expectedColors[source]);
            // A flex item has a block outer display type.
            expect(styles.display).to.equal('flex');
          });
        });
      });
    });
  });
});
