/* eslint-disable testing-library/no-unnecessary-act -- raw react-dom/client rendering (no Testing Library); React.act is required */
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { expect } from 'chai';
import { createTheme, ThemeProvider, enhanceHighDensity } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import { densityRow } from './densityFields';
import { buildOverrides, mergeOntoPreset } from './buildDensityOverrides';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const TOOLBAR_MIN_HEIGHT_ID =
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar|minHeight';
const ICON_BUTTON_MEDIUM_PADDING_ID = 'MuiIconButton|root|size=medium||padding';

function mount(theme: unknown, element: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);
  React.act(() => {
    root.render(
      <ThemeProvider theme={theme as Parameters<typeof ThemeProvider>[0]['theme']}>
        {element}
      </ThemeProvider>,
    );
  });
  return {
    container,
    unmount: () => {
      React.act(() => root.unmount());
      container.remove();
    },
  };
}

function mountPagination(theme: unknown) {
  return mount(
    theme,
    <TablePagination
      component="div"
      count={64}
      page={1}
      onPageChange={() => {}}
      rowsPerPage={10}
      rowsPerPageOptions={[10, 25]}
    />,
  );
}

const documentCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((tag) => tag.textContent ?? '')
    .join('\n');

// Emotion content-hashes classnames, so a css-<hash>-<Semantic> class is UNIQUE
// per render (different override values -> different hash) even though earlier
// tests' <style> tags remain in the document (never torn down between tests in
// the same file). Extracting the hash class off THIS render's own element and
// using it as the selector discriminator scopes every assertion to exactly
// what THIS render produced, immune to accumulation from other tests.
function hashClassOf(el: Element, semanticSuffix: string): string {
  const token = el.className
    .split(' ')
    .find((c) => c.startsWith('css-') && c.includes(semanticSuffix));
  expect(
    token,
    `expected a css-hash class containing "${semanticSuffix}" on <${el.tagName}>`,
  ).to.be.a('string');
  return token!;
}

// Every leaf "selector{declarations}" rule in a stylesheet, with its full
// selector chain (parent @media/@supports preludes included, space-joined).
// A naive `/([^{}]+)\{([^{}]*)\}/g` walk over the WHOLE concatenated
// stylesheet silently misaligns the instant it crosses a NESTED construct
// like `@media (hover: none){ .sel:hover{...} }` — its outer `{` isn't
// followed by a matching `}` before the next rule's `{`, so every match
// after that point pairs the wrong selector with the wrong declarations.
// This tracks brace depth with an explicit stack instead, so nesting of any
// depth parses correctly.
function leafRules(css: string): Array<{ selector: string; decls: string }> {
  const rules: Array<{ selector: string; decls: string }> = [];
  const stack: string[] = [];
  let buffer = '';
  for (const ch of css) {
    if (ch === '{') {
      stack.push(buffer.trim());
      buffer = '';
    } else if (ch === '}') {
      if (buffer.trim()) {
        rules.push({ selector: stack.join(' '), decls: buffer });
      }
      stack.pop();
      buffer = '';
    } else {
      buffer += ch;
    }
  }
  return rules;
}

// CSS lets the SAME rule declare a property twice (e.g. master's literal
// `padding:8px` followed by our override's `padding:var(--mui-density-small)`) —
// the LAST one wins. A plain `.match()` only proves our value is present
// somewhere, not that it's the one actually applied. This finds every leaf
// rule whose selector chain contains ALL of `mustInclude` and returns the
// winning (last, in document order) value for `prop` among those rules, so
// tests assert on what the browser would actually compute.
function winningDeclaration(css: string, mustInclude: string[], prop: string): string | undefined {
  let winner: string | undefined;
  const prefix = `${prop}:`;
  for (const { selector, decls } of leafRules(css)) {
    if (!mustInclude.every((s) => selector.includes(s))) {
      continue;
    }
    // Skip the broken `<hash> 1{...}` artifact from spreading an array-form
    // override: a trailing space+digits is an invalid selector matching no
    // real element, so it must never count as a "winning" declaration.
    if (/\s\d+$/.test(selector)) {
      continue;
    }
    // Split on ';' rather than a regex loop with a `;`-anchored prefix: two
    // BACK-TO-BACK declarations of the same prop (master's literal, then our
    // override) share exactly ONE separating `;` — a regex that consumes the
    // trailing `;` as part of match N leaves match N+1 with no `;` left to
    // anchor its own prefix on, silently skipping every other occurrence.
    for (const decl of decls.split(';')) {
      const trimmed = decl.trim();
      if (trimmed.startsWith(prefix)) {
        winner = trimmed.slice(prefix.length);
      }
    }
  }
  return winner;
}

// TablePagination's toolbar/select slots have SPREAD-based overridesResolvers
// ({ ...styles.toolbar }) — an array-form slot override (what addRootOverride and
// the playground's mergeOntoPreset layering both produce) spreads into numeric
// keys and is silently dropped. All pagination geometry must therefore ride the
// ROOT slot (default resolver, array-safe) as descendant selectors. These tests
// render the real component and assert the CSS actually reaches the document —
// a static emit-table check cannot catch a resolver eating the styles.
describe('density render — TablePagination root-slot emission', () => {
  it('spread-resolver slots (toolbar/select) stay empty in the preset emission', () => {
    const theme = enhanceHighDensity(createTheme({ cssVariables: true })) as unknown as {
      components: Record<string, { styleOverrides?: Record<string, unknown> }>;
    };
    const slots = Object.keys(theme.components.MuiTablePagination?.styleOverrides ?? {});
    expect(slots).to.deep.equal(['root']);
  });

  it('high preset lands the toolbar minHeight in rendered CSS at root-class specificity', () => {
    const { container, unmount } = mountPagination(
      enhanceHighDensity(createTheme({ cssVariables: true })),
    );
    const rootHash = hashClassOf(container.querySelector('.MuiTablePagination-root')!, 'root');
    expect(
      winningDeclaration(documentCss(), [rootHash, 'MuiTablePagination-toolbar'], 'min-height'),
    ).to.equal('44px');
    unmount();
  });

  it('a knob edit on the toolbar minHeight row reaches rendered CSS (playground apply path)', () => {
    const preset = enhanceHighDensity(createTheme({ cssVariables: true }));
    const row = densityRow(TOOLBAR_MIN_HEIGHT_ID);
    expect(Boolean(row), `${TOOLBAR_MIN_HEIGHT_ID} resolves`).to.equal(true);
    const components = mergeOntoPreset(
      (preset as unknown as { components: Record<string, unknown> }).components ?? {},
      buildOverrides([{ row: row!, value: '30px' }]),
    );
    const { container, unmount } = mountPagination({ ...preset, components });
    const rootHash = hashClassOf(container.querySelector('.MuiTablePagination-root')!, 'root');
    expect(
      winningDeclaration(documentCss(), [rootHash, 'MuiTablePagination-toolbar'], 'min-height'),
    ).to.equal('30px');
    unmount();
  });

  it('control: an array-form toolbar-slot override is eaten by the spread resolver', () => {
    // Pins the constraint. If this starts FAILING, upstream fixed the resolver —
    // the root-slot detour can migrate back to plain toolbar/select emissions.
    const preset = enhanceHighDensity(createTheme({ cssVariables: true })) as unknown as {
      components: Record<string, { styleOverrides?: Record<string, unknown> }>;
    };
    const components = {
      ...preset.components,
      MuiTablePagination: {
        ...preset.components.MuiTablePagination,
        styleOverrides: {
          ...preset.components.MuiTablePagination?.styleOverrides,
          toolbar: [undefined, { minHeight: '997px' }],
        },
      },
    };
    const { container, unmount } = mountPagination({ ...preset, components });
    const toolbarHash = hashClassOf(
      container.querySelector('.MuiTablePagination-toolbar')!,
      'toolbar',
    );
    const css = documentCss();
    // The array index leaks into the selector: `.<toolbarHash> 1{min-height:997px}`
    // — present in the stylesheet but matching nothing real. That dead rule is the pin.
    expect(css).to.match(
      new RegExp(`${toolbarHash} 1\\{min-height:997px`),
      'expected the broken `… 1{` serialization — resolver behavior changed upstream?',
    );
    expect(winningDeclaration(css, [toolbarHash], 'min-height')).to.not.equal(
      '997px',
      'array-form toolbar override landed on the element — resolver fixed upstream, migrate back to slot emissions',
    );
    unmount();
  });
});

// IconButton's root overridesResolver returns `styles.root` directly (array-safe,
// same default shape as Button/TableCell) — unlike TablePagination's spread-based
// toolbar/select resolvers, so no root-slot detour is needed here. Still render to
// prove it, per the TablePagination lesson: static emit-table checks can't see a
// resolver eating styles.
describe('density render — IconButton padding emission', () => {
  it("high preset padding WINS over master's literal in the same rule block", () => {
    const { container, unmount } = mount(
      enhanceHighDensity(createTheme({ cssVariables: true })),
      <IconButton aria-label="more" />,
    );
    const rootHash = hashClassOf(container.querySelector('.MuiIconButton-root')!, 'root');
    // cssVariables mode: the step resolves to a var() ref, not a literal — the
    // literal only appears in the separate `:root{--mui-density-small:8px}` block.
    expect(winningDeclaration(documentCss(), [rootHash], 'padding')).to.equal(
      'var(--mui-density-small)',
    );
    expect(documentCss()).to.match(/--mui-density-small:\s*8px/, 'expected high small step = 8px');
    unmount();
  });

  it('a knob edit on the medium padding row WINS in rendered CSS (playground apply path)', () => {
    const preset = enhanceHighDensity(createTheme({ cssVariables: true }));
    const row = densityRow(ICON_BUTTON_MEDIUM_PADDING_ID);
    expect(Boolean(row), `${ICON_BUTTON_MEDIUM_PADDING_ID} resolves`).to.equal(true);
    const components = mergeOntoPreset(
      (preset as unknown as { components: Record<string, unknown> }).components ?? {},
      buildOverrides([{ row: row!, value: '19px' }]),
    );
    const { container, unmount } = mount(
      { ...preset, components },
      <IconButton aria-label="more" />,
    );
    const rootHash = hashClassOf(container.querySelector('.MuiIconButton-root')!, 'root');
    // A raw CSS value (not a density key) is user input, not a step ref — it
    // lands as the literal the user typed.
    expect(winningDeclaration(documentCss(), [rootHash], 'padding')).to.equal('19px');
    unmount();
  });
});
