import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

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
