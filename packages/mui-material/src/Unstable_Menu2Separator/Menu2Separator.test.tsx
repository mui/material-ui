import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import type { Menu2SeparatorProps } from '@mui/material/Unstable_Menu2Separator';
import Menu2Separator, {
  menu2SeparatorClasses as classes,
} from '@mui/material/Unstable_Menu2Separator';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Separator />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2Separator />, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>{node}</Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    muiName: 'MuiMenu2Separator',
    testVariantProps: { orientation: 'vertical' },
  }));

  it('merges custom render props, refs, and handlers without private props', async () => {
    const separatorRef = React.createRef<HTMLElement>();
    const renderRef = React.createRef<HTMLSpanElement>();
    const onClick = vi.fn();
    const onRenderClick = vi.fn();
    let received: string[] = [];
    const CustomRoot = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
      function CustomRoot(props, ref) {
        received = Object.keys(props);
        return <span {...props} ref={ref} />;
      },
    );
    const { container, user, unmount } = render(
      <Menu2Separator
        ref={separatorRef}
        onClick={onClick}
        className="external-separator"
        title="Section boundary"
        render={
          <CustomRoot
            ref={renderRef}
            onClick={onRenderClick}
            className="custom-separator"
            data-custom="value"
          />
        }
      />,
    );
    const separator = screen.getByRole('separator');
    expect(separator.tagName).to.equal('SPAN');
    expect(container.firstElementChild).to.equal(separator);
    expect(separator.childElementCount).to.equal(0);
    expect(separatorRef.current).to.equal(separator);
    expect(renderRef.current).to.equal(separator);
    expect(separator).to.have.attribute('title', 'Section boundary');
    expect(separator).to.have.attribute('data-custom', 'value');
    [classes.root, 'MuiDivider-root', 'external-separator', 'custom-separator'].forEach(
      (className) => expect(separator).to.have.class(className),
    );
    [
      'component',
      'orientation',
      'variant',
      'absolute',
      'flexItem',
      'ownerState',
      'sx',
      'internalRender',
      'internalRenderState',
    ].forEach((prop) => expect(received).not.to.include(prop));
    await user.click(separator);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onRenderClick).toHaveBeenCalledTimes(1);
    unmount();
    expect(separatorRef.current).to.equal(null);
    expect(renderRef.current).to.equal(null);
  });

  (['horizontal', 'vertical'] as const).forEach((orientation) => {
    (['default', 'element', 'Divider callback'] as const).forEach((root) => {
      it(`keeps ${orientation} semantics and styles with a ${root} root`, () => {
        const states: object[] = [];
        let renderProp: Menu2SeparatorProps['render'];
        if (root === 'element') {
          renderProp = <span />;
        } else if (root === 'Divider callback') {
          renderProp = (props, state) => {
            states.push(state);
            return <Divider {...props} orientation={state.orientation} />;
          };
        }
        render(<Menu2Separator orientation={orientation} render={renderProp} />);
        const separator = screen.getByRole('separator');
        expect(separator).to.have.attribute('aria-orientation', orientation);
        expect(separator).to.have.attribute('data-orientation', orientation);
        expect(separator).to.have.attribute('data-mui-menu-separator');
        expect(separator).to.have.class('MuiDivider-root');
        const styles = getComputedStyle(separator);
        if (orientation === 'vertical') {
          expect(separator).to.have.class('MuiDivider-vertical');
          expect(styles.borderBottomWidth).to.equal('0px');
          expect(styles.borderRightWidth).not.to.equal('0px');
        } else {
          expect(separator).not.to.have.class('MuiDivider-vertical');
          expect(styles.borderBottomWidth).not.to.equal('0px');
          expect(styles.borderRightWidth).to.equal('0px');
        }
        if (root === 'Divider callback') {
          expect(states.length).to.be.greaterThan(0);
          states.forEach((state) => expect(state).to.deep.equal({ orientation }));
        }
      });
    });
  });

  it('keeps theme defaults, variants, and sx with the resolved render orientation', () => {
    const states: object[] = [];
    const theme = createTheme({
      spacing: 10,
      components: {
        MuiMenu2Separator: {
          defaultProps: {
            render: (props, state) => {
              states.push(state);
              return <span {...props} />;
            },
          },
          styleOverrides: { root: { marginLeft: '13px' } },
          variants: [{ props: { title: 'Section' }, style: { marginBottom: '19px' } }],
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Menu2Separator title="Section" sx={[false, (t) => ({ marginRight: t.spacing(3) })]} />
      </ThemeProvider>,
    );
    const separator = screen.getByRole('separator');
    expect(separator.tagName).to.equal('SPAN');
    expect(separator).to.have.class(classes.root);
    expect(separator).to.have.class('MuiDivider-root');
    const styles = getComputedStyle(separator);
    expect(styles.marginTop).to.equal('10px');
    expect(styles.marginLeft).to.equal('13px');
    expect(styles.marginBottom).to.equal('19px');
    expect(styles.marginRight).to.equal('30px');
    expect(states.length).to.be.greaterThan(0);
    states.forEach((state) => expect(state).to.deep.equal({ orientation: 'horizontal' }));
    expect(separator).not.to.have.attribute('ownerState');
    expect(separator).not.to.have.attribute('sx');
  });

  it('applies flexItem to a vertical separator with a custom host root', () => {
    render(<Menu2Separator orientation="vertical" flexItem render={<span />} />);
    const separator = screen.getByRole('separator');
    expect(separator.tagName).to.equal('SPAN');
    expect(separator).to.have.attribute('aria-orientation', 'vertical');
    expect(separator).to.have.class('MuiDivider-vertical');
    expect(separator).to.have.class('MuiDivider-flexItem');
    expect(getComputedStyle(separator).alignSelf).to.equal('stretch');
    expect(getComputedStyle(separator).borderBottomWidth).to.equal('0px');
    expect(getComputedStyle(separator).borderRightWidth).not.to.equal('0px');
    expect(separator).not.to.have.attribute('flexItem');
  });

  it('uses classic visual defaults unless the Menu2 props override them', () => {
    const theme = createTheme({
      spacing: 10,
      components: {
        MuiDivider: {
          defaultProps: { absolute: true, flexItem: true, textAlign: 'right', variant: 'middle' },
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Menu2Separator data-testid="default-separator" render={<span />}>
          Default
        </Menu2Separator>
        <Menu2Separator
          absolute={false}
          flexItem={false}
          textAlign="left"
          variant="inset"
          data-testid="override-separator"
          render={<span />}
        >
          Override
        </Menu2Separator>
      </ThemeProvider>,
    );
    const defaultSeparator = screen.getByTestId('default-separator');
    [
      'MuiDivider-absolute',
      'MuiDivider-flexItem',
      'MuiDivider-textAlignRight',
      'MuiDivider-middle',
    ].forEach((className) => expect(defaultSeparator).to.have.class(className));
    expect(getComputedStyle(defaultSeparator).position).to.equal('absolute');
    expect(getComputedStyle(defaultSeparator).alignSelf).to.equal('stretch');
    expect(getComputedStyle(defaultSeparator).marginLeft).to.equal('20px');

    const overrideSeparator = screen.getByTestId('override-separator');
    expect(overrideSeparator).to.have.class('MuiDivider-textAlignLeft');
    expect(overrideSeparator).to.have.class('MuiDivider-inset');
    [
      'MuiDivider-absolute',
      'MuiDivider-flexItem',
      'MuiDivider-textAlignRight',
      'MuiDivider-middle',
    ].forEach((className) => expect(overrideSeparator).not.to.have.class(className));
    expect(getComputedStyle(overrideSeparator).position).not.to.equal('absolute');
    expect(getComputedStyle(overrideSeparator).alignSelf).not.to.equal('stretch');
    expect(getComputedStyle(overrideSeparator).marginLeft).to.equal('72px');
    expect(defaultSeparator).to.have.text('Default');
    expect(overrideSeparator).to.have.text('Override');
    [defaultSeparator, overrideSeparator].forEach((separator) => {
      expect(separator.querySelectorAll('.MuiDivider-wrapper')).to.have.length(1);
    });
  });

  describe.skipIf(isJsdom())('vertical spacing', () => {
    const cases: {
      name: string;
      props?: Menu2SeparatorProps;
      overrides?: { marginTop: number; marginBottom: number };
      expected: { marginTop: string; marginBottom: string };
    }[] = [
      { name: 'default', expected: { marginTop: '10px', marginBottom: '10px' } },
      {
        name: 'sx',
        props: { sx: { mt: 2, mb: 3 } },
        expected: { marginTop: '20px', marginBottom: '30px' },
      },
      {
        name: 'render element with top-level sx',
        props: { render: <Divider />, sx: { mt: 2, mb: 3 } },
        expected: { marginTop: '20px', marginBottom: '30px' },
      },
      {
        name: 'theme overrides',
        overrides: { marginTop: 13, marginBottom: 17 },
        expected: { marginTop: '13px', marginBottom: '17px' },
      },
    ];

    [false, true].forEach((modularCssLayers) => {
      cases.forEach(({ name, props, overrides, expected }) => {
        it(`uses ${name} margins beside items and submenus (modularCssLayers: ${modularCssLayers})`, async () => {
          const theme = createTheme({
            spacing: 10,
            modularCssLayers,
            components: { MuiMenu2Separator: { styleOverrides: { root: overrides } } },
          });
          const { user } = render(
            <StyledEngineProvider enableCssLayer={modularCssLayers}>
              <ThemeProvider theme={theme}>
                <Menu2 defaultOpen modal={false}>
                  <Menu2Trigger render={<button type="button">Options</button>} />
                  <Menu2Popup>
                    <Menu2Item>Item</Menu2Item>
                    <Menu2Separator {...props} />
                    <Menu2Submenu>
                      <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                      <Menu2SubmenuPopup>
                        <Menu2Item>Nested item</Menu2Item>
                      </Menu2SubmenuPopup>
                    </Menu2Submenu>
                    <Menu2Separator {...props} />
                    <Menu2Item>After</Menu2Item>
                  </Menu2Popup>
                </Menu2>
                <MenuList>
                  <MenuItem>Classic item</MenuItem>
                  <Menu2Separator {...props} />
                </MenuList>
              </ThemeProvider>
            </StyledEngineProvider>,
          );

          function expectMargins() {
            screen.getAllByRole('separator').forEach((separator) => {
              expect(separator).toHaveComputedStyle(expected);
            });
          }

          expectMargins();
          await user.click(screen.getByRole('menuitem', { name: 'More' }));
          const nestedItem = await screen.findByRole('menuitem', { name: 'Nested item' });
          expectMargins();

          await user.keyboard('{Escape}');
          await waitFor(() => expect(nestedItem.isConnected).to.equal(false));
          expectMargins();
        });
      });

      it(`uses top-level sx with a custom Divider (modularCssLayers: ${modularCssLayers})`, () => {
        const CustomRoot = styled(Divider)({ marginTop: 31, marginBottom: 37 });
        render(
          <StyledEngineProvider enableCssLayer={modularCssLayers}>
            <ThemeProvider theme={createTheme({ modularCssLayers })}>
              <Menu2 defaultOpen modal={false}>
                <Menu2Popup anchor={document.body}>
                  <Menu2Item>Item</Menu2Item>
                  <Menu2Separator
                    render={<CustomRoot />}
                    sx={{ marginTop: '13px', marginBottom: '17px' }}
                  />
                </Menu2Popup>
              </Menu2>
            </ThemeProvider>
          </StyledEngineProvider>,
        );

        expect(screen.getByRole('separator')).toHaveComputedStyle({
          marginTop: '13px',
          marginBottom: '17px',
        });
      });

      it(`preserves plain Divider spacing and inset margins (modularCssLayers: ${modularCssLayers})`, () => {
        render(
          <StyledEngineProvider enableCssLayer={modularCssLayers}>
            <ThemeProvider theme={createTheme({ modularCssLayers, spacing: 10 })}>
              <MenuList>
                <MenuItem>Classic item</MenuItem>
                <Divider />
                <MenuItem>Classic item before inset</MenuItem>
                <Divider variant="inset" data-testid="classic-inset" />
              </MenuList>
              <Menu2 defaultOpen modal={false}>
                <Menu2Popup anchor={document.body}>
                  <Menu2Item>Item</Menu2Item>
                  <Divider />
                  <Menu2Item>Item before inset</Menu2Item>
                  <Menu2Separator variant="inset" data-testid="menu2-inset" />
                </Menu2Popup>
              </Menu2>
            </ThemeProvider>
          </StyledEngineProvider>,
        );

        screen.getAllByRole('separator').forEach((separator) => {
          expect(separator).toHaveComputedStyle({ marginTop: '10px', marginBottom: '10px' });
        });
        expect(screen.getByTestId('classic-inset')).toHaveComputedStyle({ marginLeft: '52px' });
        expect(screen.getByTestId('menu2-inset')).toHaveComputedStyle({ marginLeft: '52px' });
      });

      it(`preserves a standalone Divider inset margin (modularCssLayers: ${modularCssLayers})`, () => {
        render(
          <StyledEngineProvider enableCssLayer={modularCssLayers}>
            <ThemeProvider theme={createTheme({ modularCssLayers })}>
              <Menu2Separator variant="inset" render={<Divider />} />
            </ThemeProvider>
          </StyledEngineProvider>,
        );

        const separator = screen.getByRole('separator');
        expect(separator).to.have.class('MuiDivider-inset');
        expect(separator).toHaveComputedStyle({ marginLeft: '72px' });
      });
    });
  });
});
