import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
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

// jsdom doesn't implement cascade layers, so these only run in browsers.
describe.skipIf(isJsdom())('CSS layers', () => {
  const { render } = createRenderer();

  const accordionTheme = (cssLayers?: boolean) =>
    createTheme({
      cssLayers,
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

  it('keeps the v9 precedence with `cssLayers: false`', () => {
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

  function renderWithLayersInBetween(element: React.ReactElement) {
    const v9Theme = createTheme({ cssLayers: false });
    const { container, unmount } = render(<ThemeProvider theme={v9Theme}>{element}</ThemeProvider>);
    const className = getClassName(container);
    unmount();
    render(<ThemeProvider theme={createTheme()}>{element}</ThemeProvider>).unmount();
    const view = render(<ThemeProvider theme={v9Theme}>{element}</ThemeProvider>);
    return [className, getClassName(view.container)];
  }

  it('keeps the styles of a component without layers after rendering it with layers', () => {
    const [before, after] = renderWithLayersInBetween(<PlainDiv />);
    expect(after).to.equal(before);
  });

  it('keeps the styles with variants without layers after rendering them with layers', () => {
    const [before, after] = renderWithLayersInBetween(<VariantsDiv tone="blue" />);
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

  it("keeps the app's layers, layer order statements and @import out of mui.global", () => {
    const inserted: string[] = [];
    render(
      <ThemeProvider theme={createTheme()}>
        <CaptureStyles inserted={inserted} />
        <GlobalStyles styles='@import url("a.css"); @layer theme, base; @layer reset { .x { color: red; } } html { color: blue; }' />
      </ThemeProvider>,
    );
    expect(inserted.find((styles) => styles.includes('reset'))).to.equal(
      '@import url("a.css"); @layer theme, base; @layer reset { .x { color: red; } }@layer mui.global{ html { color: blue; }}',
    );
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
    expect(inserted).to.include(`@layer mui.global{${styles}}`);
    expect(shared.styles).to.equal(styles);
  });

  it('declares the layer order under a ThemeProvider without layers', () => {
    removeLayerOrders();
    render(
      <ThemeProvider theme={createTheme({ cssLayers: false })}>
        <ThemeProvider theme={createTheme()}>
          <Button>Hello</Button>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(document.head.querySelector('style[data-mui-layer-order]')).not.to.equal(null);
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

  it('turns layers off with modularCssLayers: false', () => {
    expect(createTheme({ modularCssLayers: false }).cssLayers).to.equal(false);
    expect(createTheme({ cssVariables: true, modularCssLayers: false }).cssLayers).to.equal(false);
  });
});
