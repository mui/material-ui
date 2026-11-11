import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import ListItemButton from '@mui/material/ListItemButton';
import { __unsafe_useEmotionCache } from '@emotion/react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { THEME_ID, ThemeProvider, createTheme, css, styled } from '@mui/material/styles';

function getLayerNames() {
  const names = new Set<string>();
  function collect(rules: CSSRuleList) {
    Array.from(rules).forEach((rule) => {
      if (rule instanceof CSSLayerStatementRule) {
        rule.nameList.forEach((name) => names.add(name));
      } else if (rule instanceof CSSLayerBlockRule) {
        names.add(rule.name);
        collect(rule.cssRules);
      }
    });
  }
  Array.from(document.styleSheets).forEach((sheet) => collect(sheet.cssRules));
  return Array.from(names);
}

const MediaDiv = styled('div')({ width: 10, '@media (min-width: 0px)': { width: 20 } });

// jsdom doesn't implement cascade layers, so these only run in browsers.
describe.skipIf(isJsdom())('CSS layers', () => {
  const { render } = createRenderer();

  const accordionTheme = (modularCssLayers?: boolean) =>
    createTheme({
      modularCssLayers,
      components: { MuiAccordion: { styleOverrides: { root: { margin: 0 } } } },
    });

  // Keep this test first: it needs a document where no layer order was declared yet.
  it('keeps the sub-layer order without a ThemeProvider', () => {
    // Inserted first, so without an order statement `mui.custom` would come before `mui.components`.
    const Plain = styled('div')({ color: 'rgb(255, 0, 0)' });
    const CustomButton = styled(Button)({ paddingTop: '3px' });
    render(
      <React.Fragment>
        <Plain />
        <CustomButton>Hello</CustomButton>
      </React.Fragment>,
    );

    expect(screen.getByRole('button')).toHaveComputedStyle({ paddingTop: '3px' });
  });

  it('puts the styles in the mui sub-layers by default', () => {
    render(<Button sx={{ color: 'rgb(255, 0, 0)' }}>Hello</Button>);

    expect(getLayerNames()).to.include.members(['mui.components', 'mui.sx']);
  });

  it('lets unlayered CSS override the component styles', () => {
    render(
      <React.Fragment>
        <style>{'.MuiButton-root { padding-top: 3px; }'}</style>
        <Button>Hello</Button>
      </React.Fragment>,
    );

    expect(screen.getByRole('button')).toHaveComputedStyle({ paddingTop: '3px' });
  });

  it("lets the app's GlobalStyles override the component styles with a more specific selector", () => {
    render(
      <React.Fragment>
        <GlobalStyles styles={{ 'body .MuiButton-root': { paddingTop: 3 } }} />
        <Button>Hello</Button>
      </React.Fragment>,
    );

    expect(screen.getByRole('button')).toHaveComputedStyle({ paddingTop: '3px' });
  });

  it("keeps the component styles over the app's GlobalStyles resets", () => {
    render(
      <React.Fragment>
        <GlobalStyles styles={{ button: { paddingTop: 0 } }} />
        <Button>Hello</Button>
      </React.Fragment>,
    );

    expect(screen.getByRole('button')).toHaveComputedStyle({ paddingTop: '6px' });
  });

  it("lets CssBaseline and the app's GlobalStyles compete by order, as without layers", () => {
    const { unmount } = render(
      <React.Fragment>
        <GlobalStyles styles={{ strong: { fontWeight: 300 } }} />
        <CssBaseline />
        <strong data-testid="strong">Hello</strong>
      </React.Fragment>,
    );
    // CssBaseline's `strong { font-weight: 700 }` comes after the app's rule.
    expect(screen.getByTestId('strong')).toHaveComputedStyle({ fontWeight: '700' });
    unmount();

    render(
      <React.Fragment>
        <CssBaseline />
        <GlobalStyles styles={{ strong: { fontWeight: 300 } }} />
        <strong data-testid="strong">Hello</strong>
      </React.Fragment>,
    );
    expect(screen.getByTestId('strong')).toHaveComputedStyle({ fontWeight: '300' });
  });

  it('lets the CssBaseline theme overrides override the component styles with a more specific selector', () => {
    render(
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiCssBaseline: { styleOverrides: { 'body .MuiButton-root': { paddingTop: 3 } } },
          },
        })}
      >
        <CssBaseline />
        <Button>Hello</Button>
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveComputedStyle({ paddingTop: '3px' });
  });

  it('applies theme overrides that are less specific than the base styles', () => {
    render(
      <ThemeProvider theme={accordionTheme()}>
        <Accordion defaultExpanded data-testid="accordion">
          <AccordionSummary>Summary</AccordionSummary>
        </Accordion>
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
        </Accordion>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('accordion')).toHaveComputedStyle({ marginBottom: '0px' });
  });

  it('lets `sx` win over state styles', () => {
    render(
      <ListItemButton selected sx={{ backgroundColor: 'rgb(255, 0, 0)' }}>
        Item
      </ListItemButton>,
    );

    expect(screen.getByRole('button')).toHaveComputedStyle({
      backgroundColor: 'rgb(255, 0, 0)',
    });
  });

  it('lets `sx` win over the media queries of the component', () => {
    render(<MediaDiv data-testid="sx" sx={{ width: 30 }} />);

    expect(screen.getByTestId('sx')).toHaveComputedStyle({ width: '30px' });
  });

  it('keeps the declarations before the media queries with `modularCssLayers: false`', () => {
    // As in v9, where Emotion puts the declarations of a component's styles first, `sx` included.
    const ComposedDiv = styled(MediaDiv)({ width: 30 });
    render(
      <ThemeProvider theme={createTheme({ modularCssLayers: false })}>
        <MediaDiv data-testid="sx" sx={{ width: 30 }} />
        <ComposedDiv data-testid="composed" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('sx')).toHaveComputedStyle({ width: '20px' });
    expect(screen.getByTestId('composed')).toHaveComputedStyle({ width: '20px' });
  });

  it('keeps the v9 precedence with `modularCssLayers: false`', () => {
    render(
      <ThemeProvider theme={accordionTheme(false)}>
        <Accordion defaultExpanded data-testid="accordion">
          <AccordionSummary>Summary</AccordionSummary>
        </Accordion>
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
        </Accordion>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('accordion')).toHaveComputedStyle({ marginBottom: '16px' });
  });

  it("keeps mui where the app's CSS declares it with `modularCssLayers: false`", () => {
    removeLayerOrders();
    // Tailwind CSS v4's setup: the layer order, then preflight in `base`, before Material UI.
    const appStyles = document.createElement('style');
    appStyles.textContent =
      '@layer theme, base, mui, components, utilities; @layer base { button { padding-top: 0; } }';
    document.head.prepend(appStyles);
    try {
      render(
        <ThemeProvider theme={createTheme({ modularCssLayers: false })}>
          <Button>Hello</Button>
        </ThemeProvider>,
      );

      expect(screen.getByRole('button')).toHaveComputedStyle({ paddingTop: '6px' });
    } finally {
      appStyles.remove();
    }
  });

  it('lets unlayered CSS override the component styles with `modularCssLayers: false`', () => {
    render(
      <ThemeProvider theme={createTheme({ modularCssLayers: false })}>
        <style>{'.MuiButton-root { padding-top: 3px; }'}</style>
        <Button>Hello</Button>
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveComputedStyle({ paddingTop: '3px' });
  });
});

// Records the styles that reach the Emotion cache, before jsdom drops the rules inside layers.
function CaptureStyles(props: { inserted: string[] }) {
  const { inserted } = props;
  const cache: any = __unsafe_useEmotionCache();
  if (cache && cache.capturedStyles !== inserted) {
    const { insert } = cache;
    cache.capturedStyles = inserted;
    cache.insert = (...args: any[]) => {
      inserted.push(args[1].styles);
      return insert(...args);
    };
  }
  return null;
}

function removeLayerOrders() {
  document.head.querySelectorAll('style[data-mui-layer-order]').forEach((element) => {
    element.remove();
  });
}

const PlainDiv = styled('div')({ color: 'rgb(255, 0, 0)' });
const VariantsDiv = styled('div')<{ tone?: string }>({
  color: 'rgb(255, 0, 0)',
  variants: [{ props: { tone: 'blue' }, style: { color: 'rgb(0, 0, 255)' } }],
});

describe('CSS layers: generated styles', () => {
  const { render } = createRenderer();

  function getClassName(container: HTMLElement) {
    return (container.firstChild as HTMLElement).className;
  }

  function renderWithSubLayersInBetween(element: React.ReactElement) {
    const singleTheme = createTheme({ modularCssLayers: false });
    const { container, unmount } = render(
      <ThemeProvider theme={singleTheme}>{element}</ThemeProvider>,
    );
    const className = getClassName(container);
    unmount();
    render(<ThemeProvider theme={createTheme()}>{element}</ThemeProvider>).unmount();
    const view = render(<ThemeProvider theme={singleTheme}>{element}</ThemeProvider>);
    return [className, getClassName(view.container)];
  }

  it('keeps the styles of a component in a single layer after rendering it with sub-layers', () => {
    const [before, after] = renderWithSubLayersInBetween(<PlainDiv />);
    expect(after).to.equal(before);
  });

  it('keeps the styles with variants in a single layer after rendering them with sub-layers', () => {
    const [before, after] = renderWithSubLayersInBetween(<VariantsDiv tone="blue" />);
    expect(after).to.equal(before);
  });

  it('layers style objects that start with an @layer block', () => {
    const inserted: string[] = [];
    const Div = styled('div')({ '@layer review': { color: 'red' }, paddingTop: 3 });
    render(
      <ThemeProvider theme={createTheme()}>
        <CaptureStyles inserted={inserted} />
        <Div />
      </ThemeProvider>,
    );
    expect(inserted.join('')).to.include(
      '@layer mui.custom{@layer review{color:red;}padding-top:3px;}',
    );
  });

  it("keeps the app's layers, layer order statements and @import out of the layer of GlobalStyles", () => {
    const inserted: string[] = [];
    render(
      <ThemeProvider theme={createTheme()}>
        <CaptureStyles inserted={inserted} />
        <GlobalStyles styles='@import url("a.css"); @layer theme, base; @layer reset { .x { color: red; } } html { color: blue; }' />
      </ThemeProvider>,
    );
    expect(inserted.find((styles) => styles.includes('reset'))).to.equal(
      '@import url("a.css"); @layer theme, base; @layer reset { .x { color: red; } }@layer mui.components{ html { color: blue; }}',
    );
  });

  it("puts the app's GlobalStyles and CssBaseline in mui.components", () => {
    const inserted: string[] = [];
    render(
      <ThemeProvider theme={createTheme()}>
        <CaptureStyles inserted={inserted} />
        <CssBaseline />
        <GlobalStyles styles={{ '.app': { color: 'blue' } }} />
      </ThemeProvider>,
    );
    expect(inserted).to.include('@layer mui.components{.app{color:blue;}}');
    const baseline = inserted.find((styles) => styles.includes('box-sizing:inherit'));
    expect(baseline).to.match(/^@layer mui\.components\{/);
  });

  it('layers styles that are serialized already, without changing them', () => {
    const inserted: string[] = [];
    const shared = css`
      html {
        color: red;
      }
    `;
    const styles = shared.styles;
    render(
      <ThemeProvider theme={createTheme()}>
        <CaptureStyles inserted={inserted} />
        <GlobalStyles styles={shared} />
      </ThemeProvider>,
    );
    expect(inserted).to.include(`@layer mui.components{${styles}}`);
    expect(shared.styles).to.equal(styles);
  });

  it('declares the sub-layer order under a ThemeProvider with a single layer', () => {
    removeLayerOrders();
    render(
      <ThemeProvider theme={createTheme({ modularCssLayers: false })}>
        <ThemeProvider theme={createTheme()}>
          <Button>Hello</Button>
        </ThemeProvider>
      </ThemeProvider>,
    );
    const orders = Array.from(document.head.querySelectorAll('style[data-mui-layer-order]')).map(
      (element) => element.textContent,
    );
    expect(orders).to.include('@layer mui.global, mui.components, mui.theme, mui.custom, mui.sx;');
  });

  it('declares the layer order for a scoped theme', () => {
    removeLayerOrders();
    render(
      <ThemeProvider theme={{ [THEME_ID]: createTheme() }}>
        <Button>Hello</Button>
      </ThemeProvider>,
    );
    expect(document.head.querySelector('style[data-mui-layer-order]')).not.to.equal(null);
  });

  it('puts every style in the mui layer with modularCssLayers: false', () => {
    removeLayerOrders();
    const inserted: string[] = [];
    const theme = createTheme({
      modularCssLayers: false,
      components: { MuiButton: { styleOverrides: { root: { paddingTop: 3 } } } },
    });
    const CustomButton = styled(Button)({ paddingBottom: 3 });
    render(
      <ThemeProvider theme={theme}>
        <CaptureStyles inserted={inserted} />
        <GlobalStyles styles={{ html: { color: 'blue' } }} />
        <CustomButton sx={{ color: 'rgb(255, 0, 0)' }}>Hello</CustomButton>
      </ThemeProvider>,
    );

    const styles = inserted.join('');
    expect(new Set(styles.match(/@layer [^{;]+/g))).to.deep.equal(new Set(['@layer mui']));
    // The global styles, and `styled()` with `sx`.
    expect(styles).to.include('@layer mui{html{color:blue;}}');
    expect(styles).to.match(/@layer mui\{padding-bottom:3px;+color:rgb\(255, 0, 0\);\}/);
    // As with v9's `enableCssLayer`, `mui` takes its place among the app's layers.
    expect(document.head.querySelector('style[data-mui-layer-order]')).to.equal(null);
  });

  it('keeps the styles of a component in one block with modularCssLayers: false', () => {
    const inserted: string[] = [];
    const theme = createTheme({
      modularCssLayers: false,
      components: { MuiButton: { styleOverrides: { root: { paddingTop: 3 } } } },
    });
    const ComposedDiv = styled(VariantsDiv)({ paddingTop: 3 });
    render(
      <ThemeProvider theme={theme}>
        <CaptureStyles inserted={inserted} />
        <Button sx={{ color: 'rgb(255, 0, 0)' }}>Hello</Button>
        <ComposedDiv tone="blue" sx={{ paddingBottom: '3px' }} />
      </ThemeProvider>,
    );

    // The base styles, the theme overrides and `sx`.
    const buttonStyles = inserted.find((styles) => styles.startsWith('label:MuiButton-root;'))!;
    expect(buttonStyles.match(/@layer/g)).to.have.length(1);
    expect(buttonStyles).to.include('padding-top:3px;');
    expect(buttonStyles).to.include('color:rgb(255, 0, 0);');
    // The styles of the styled component it's made from, its own and `sx`.
    expect(inserted.join('')).to.match(
      /@layer mui\{color:rgb\(255, 0, 0\);+color:rgb\(0, 0, 255\);+padding-top:3px;+padding-bottom:3px;\}/,
    );
  });

  it('uses sub-layers by default, and a single layer with modularCssLayers: false', () => {
    expect(createTheme().modularCssLayers).to.equal(true);
    expect(createTheme({ cssVariables: true }).modularCssLayers).to.equal(true);
    expect(createTheme({ modularCssLayers: false }).modularCssLayers).to.equal(false);
    expect(createTheme({ cssVariables: true, modularCssLayers: false }).modularCssLayers).to.equal(
      false,
    );
  });
});
