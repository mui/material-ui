import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider, CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Drawer, { drawerClasses as classes } from '@mui/joy/Drawer';
import describeConformance from '../../test/describeConformance';

describe('<Drawer />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Drawer open>
      <div />
    </Drawer>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      ThemeProvider,
      muiName: 'JoyDrawer',
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'header',
      testVariantProps: { hideBackdrop: true },
      slots: {
        root: { expectedClassName: classes.root },
        backdrop: { expectedClassName: classes.backdrop },
      },
      skip: [
        'classesRoot',
        'rootClass', // portal, can't determine the root
        'componentsProp', // TODO isRTL is leaking, why do we even have it in the first place?
        'themeDefaultProps', // portal, can't determine the root
        'themeStyleOverrides', // portal, can't determine the root
      ],
    }),
  );

  it('renders children', () => {
    const { getByText } = render(
      <Drawer open>
        <span>test</span>
      </Drawer>,
    );

    expect(getByText('test')).toBeVisible();
  });

  describe('slots: content', () => {
    it('has tabIndex={-1} by default', () => {
      const { getByTestId } = render(
        <Drawer open slotProps={{ content: { 'data-testid': 'content' } }}>
          <span>test</span>
        </Drawer>,
      );

      expect(getByTestId('content').getAttribute('tabIndex')).to.equal('-1');
    });

    it('can override tabIndex', () => {
      const { getByTestId } = render(
        <Drawer open slotProps={{ content: { 'data-testid': 'content', tabIndex: 0 } }}>
          <span>test</span>
        </Drawer>,
      );

      expect(getByTestId('content').getAttribute('tabIndex')).to.equal('0');
    });

    it('should apply content theme styles for content slot', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const theme = extendTheme({
        components: {
          JoyDrawer: {
            styleOverrides: {
              content: {
                backgroundColor: 'var(--joy-palette-primary-500)',
              },
            },
          },
        },
      });

      const { getByTestId } = render(
        <CssVarsProvider theme={theme}>
          <Drawer open slotProps={{ content: { 'data-testid': 'content' } }}>
            <span>test</span>
          </Drawer>
        </CssVarsProvider>,
      );

      expect(getByTestId('content')).toHaveComputedStyle({
        backgroundColor: 'rgb(11, 107, 203)',
      });
    });
  });
});
