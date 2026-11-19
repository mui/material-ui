'use client';
// Temporary playground for https://github.com/mui/material-ui/pull/49601. Remove before merging.
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import emotionStyled from '@emotion/styled';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import GlobalStyles from '@mui/material/GlobalStyles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider as MaterialThemeProvider, createTheme, styled } from '@mui/material/styles';
import { ThemeProvider as SystemThemeProvider, styled as systemStyled } from '@mui/system';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';

// The CSS variables props (`colorSchemeNode`, `storageManager`, …) are only typed with the CSS variables augmentation.
const ThemeProvider = MaterialThemeProvider as React.ComponentType<any>;

const RED = 'rgb(255, 0, 0)';
const GREEN = 'rgb(0, 128, 0)';
const PRIMARY = 'rgb(25, 118, 210)';
const LIGHT_GREEN = 'rgb(200, 230, 201)';

// `'none'` stands for v9 without layers. The frame takes the styles of the default theme out of
// `@layer mui`, see `removeMuiLayer()`.
type LayersMode = 'none' | 'single' | 'sub';

function createOverridesTheme(modularCssLayers: boolean) {
  return createTheme({
    modularCssLayers,
    components: {
      MuiButton: { styleOverrides: { root: { backgroundColor: RED } } },
      MuiAccordion: { styleOverrides: { root: { margin: 0 } } },
    },
  });
}

const overridesThemes = {
  sub: createOverridesTheme(true),
  single: createOverridesTheme(false),
  none: createOverridesTheme(false),
};
const defaultTheme = createTheme();
const subLayersTheme = createTheme({ modularCssLayers: true });
const themes = { sub: subLayersTheme, single: defaultTheme, none: defaultTheme };

const TAILWIND_ORDER = '@layer theme, base, mui, components, utilities;';
const modularStringTheme = createTheme({ modularCssLayers: TAILWIND_ORDER });

// ---------------------------------------------------------------------------
// Readouts

// Returns the layer names in the order they're first declared, which is their precedence order,
// from lowest to highest. `mui.global` declares `mui` first.
function getLayerNames(doc: Document) {
  // A frame's rules are instances of the frame window's classes.
  const win = doc.defaultView as typeof window;
  const names: string[] = [];
  const add = (name: string) => {
    name.split('.').forEach((_, index, parts) => {
      const prefix = parts.slice(0, index + 1).join('.');
      if (!names.includes(prefix)) {
        names.push(prefix);
      }
    });
  };
  const visit = (rules: CSSRuleList, parent: string) => {
    Array.from(rules).forEach((rule) => {
      if (rule instanceof win.CSSLayerStatementRule) {
        rule.nameList.forEach((name) => add(parent + name));
      } else if (rule instanceof win.CSSLayerBlockRule) {
        add(parent + rule.name);
        visit(rule.cssRules, `${parent}${rule.name}.`);
      } else if ('cssRules' in rule) {
        visit((rule as CSSGroupingRule).cssRules, parent);
      }
    });
  };
  Array.from(doc.styleSheets).forEach((sheet) => {
    try {
      visit(sheet.cssRules, '');
    } catch {
      // Cross-origin style sheets can't be read.
    }
  });
  return names;
}

// Reads the value once the styles are inserted, and again in case a late style changes it.
function useLateValue<T>(read: () => T | undefined): T | undefined {
  const [value, setValue] = React.useState<T>();
  const readRef = React.useRef(read);
  readRef.current = read;
  React.useEffect(() => {
    const update = () => setValue(readRef.current());
    const frame = requestAnimationFrame(update);
    const timeouts = [300, 1000, 2500].map((delay) => setTimeout(update, delay));
    return () => {
      cancelAnimationFrame(frame);
      timeouts.forEach(clearTimeout);
    };
  }, []);
  return value;
}

const FrameContext = React.createContext<{ doc: Document; baseline: boolean } | null>(null);

function useFrame() {
  const frame = React.useContext(FrameContext);
  if (!frame) {
    throw new Error('Render the demos in a <Frame>.');
  }
  return frame;
}

const readoutStyle: React.CSSProperties = {
  display: 'block',
  marginTop: 8,
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: 12,
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap',
};

// Shows the computed value next to the v9 value. The v9 frames check the v9 value instead.
function Computed(props: {
  target: React.RefObject<HTMLElement | null>;
  property:
    'backgroundColor' | 'color' | 'paddingTop' | 'marginBottom' | 'textTransform' | 'fontSize';
  v9: string;
}) {
  const { target, property, v9 } = props;
  const { baseline } = useFrame();
  const value = useLateValue(() => {
    // A frame's document has no window once the frame is removed.
    const view = target.current?.ownerDocument.defaultView;
    return view ? view.getComputedStyle(target.current!)[property] : undefined;
  });
  let note: React.ReactNode = null;
  if (value !== undefined) {
    if (baseline) {
      note = value === v9 ? null : <span style={{ color: '#c62828' }}> ✗ expected {v9}</span>;
    } else {
      note =
        value === v9 ? (
          <span style={{ color: '#757575' }}> (same as v9)</span>
        ) : (
          <strong style={{ color: '#b45309' }}> (v9: {v9})</strong>
        );
    }
  }
  return (
    <code style={readoutStyle}>
      {property}: {value ?? '…'}
      {note}
    </code>
  );
}

function LayerNames(props: { target: React.RefObject<HTMLElement | null> }) {
  const { target } = props;
  const names = useLateValue(() => {
    const doc = target.current?.ownerDocument;
    return doc?.defaultView ? getLayerNames(doc) : undefined;
  });
  const shown = names?.filter((name) => !name.includes('.'));
  return (
    <code style={readoutStyle}>
      layers, lowest first: {shown ? shown.join(', ') || 'none' : '…'}
    </code>
  );
}

// ---------------------------------------------------------------------------
// Frames with their own document, React root and Emotion cache, so that this page's styles and
// layer order don't change the results. React context would cross a portal.

let frameCount = 0;

// Emotion keys only allow lowercase letters and hyphens.
function createFrameKey() {
  frameCount += 1;
  let key = '';
  for (let n = frameCount; n > 0; n = Math.floor((n - 1) / 26)) {
    key = String.fromCharCode(97 + ((n - 1) % 26)) + key;
  }
  return `frame-${key}`;
}

const MUI_LAYER_START = '@layer mui{';

// Without sub-layers, Material UI's styles are in `@layer mui{…}` blocks at the top level, each
// around the whole styles of a component, so taking the blocks' content out gives v9's CSS.
function removeMuiLayer(css: string) {
  let result = '';
  // The depths of the blocks that were taken out.
  const removed: number[] = [];
  let depth = 0;
  let quote: string | null = null;
  for (let index = 0; index < css.length; index += 1) {
    const char = css[index];
    if (char === '\\') {
      result += css.slice(index, index + 2);
      index += 1;
      continue;
    }
    if (quote) {
      if (char === quote) {
        quote = null;
      }
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (css.startsWith(MUI_LAYER_START, index)) {
      removed.push(depth);
      depth += 1;
      index += MUI_LAYER_START.length - 1;
      continue;
    } else if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (removed[removed.length - 1] === depth) {
        removed.pop();
        continue;
      }
    }
    result += char;
  }
  return result;
}

const LAYER_ORDER_STATEMENT = /^@layer\s[^{]*$/;

// `speedy` is what Emotion uses in production: rules go in with `insertRule`, so the style tags
// have no text. Setting it here makes the dev server behave like the deploy preview.
function createFrameCache(doc: Document, unlayered: boolean, globalStylesFirst: boolean) {
  const cache = createCache({ key: createFrameKey(), container: doc.head, speedy: true });
  if (globalStylesFirst) {
    // What v9's `StyledEngineProvider` did with `enableCssLayer`: the `GlobalStyles` sheets go
    // before an insertion point at the start of `<head>`, so before the app's CSS, in the order
    // they're rendered. `GlobalStyles` creates its sheets with the cache's sheet class.
    const insertionPoint = doc.createElement('meta');
    insertionPoint.setAttribute('name', 'emotion-insertion-point');
    insertionPoint.setAttribute('content', '');
    doc.head.prepend(insertionPoint);
    const Sheet = cache.sheet.constructor as new (options: {
      key: string;
      container: Node;
      speedy?: boolean;
    }) => EmotionCache['sheet'];
    class GlobalStylesFirstSheet extends Sheet {
      insert(rule: string) {
        if (this.key.endsWith('global')) {
          this.before = insertionPoint;
        }
        super.insert(rule);
      }
    }
    cache.sheet = new GlobalStylesFirstSheet({
      key: cache.key,
      container: doc.head,
      speedy: true,
    });
  }
  const { insert } = cache;
  cache.insert = (selector, serialized, sheet, shouldCache) => {
    // On the client, `useLayerOrder` prepends the sub-layer order to the `<head>` of the top-level
    // document, even when the styles render in a frame, so the frame does it for itself. Chrome
    // doesn't restyle elements that already have styles when a style sheet that only reorders
    // layers is added, so copy the ThemeProvider's statement as soon as Emotion inserts it.
    if (
      LAYER_ORDER_STATEMENT.test(serialized.styles) &&
      serialized.styles.includes('mui.') &&
      !doc.head.querySelector('style[data-mui-layer-order]')
    ) {
      const style = doc.createElement('style');
      style.setAttribute('data-mui-layer-order', '');
      style.textContent = serialized.styles;
      doc.head.prepend(style);
    }
    const styles = unlayered ? removeMuiLayer(serialized.styles) : serialized.styles;
    return insert(
      selector,
      styles === serialized.styles ? serialized : { ...serialized, styles },
      sheet,
      shouldCache,
    );
  };
  return cache;
}

function Frame(props: {
  title: string;
  // The app's CSS, inserted before Material UI's styles.
  css?: string;
  // Takes Material UI's styles out of `@layer mui`, as in v9.
  unlayered?: boolean;
  // Inserts `GlobalStyles` at the start of `<head>`, as v9's `enableCssLayer` did.
  globalStylesFirst?: boolean;
  // Whether this frame shows the v9 behavior that the other frames compare to.
  baseline?: boolean;
  children: React.ReactNode;
}) {
  const {
    title,
    css,
    unlayered = false,
    globalStylesFirst = false,
    baseline = false,
    children,
  } = props;
  const ref = React.useRef<HTMLIFrameElement>(null);
  const rootRef = React.useRef<ReactDOMClient.Root | null>(null);
  const cacheRef = React.useRef<EmotionCache | null>(null);
  const [doc, setDoc] = React.useState<Document | null>(null);
  const [height, setHeight] = React.useState(40);
  const context = React.useMemo(() => (doc ? { doc, baseline } : null), [doc, baseline]);

  React.useEffect(() => {
    const iframe = ref.current!;
    let observer: ResizeObserver | undefined;
    const init = () => {
      const frameDoc = iframe.contentDocument!;
      if (css) {
        const style = frameDoc.createElement('style');
        style.setAttribute('data-app-css', '');
        style.textContent = css;
        frameDoc.head.appendChild(style);
      }
      cacheRef.current = createFrameCache(frameDoc, unlayered, globalStylesFirst);
      const container = frameDoc.body.appendChild(frameDoc.createElement('div'));
      rootRef.current = ReactDOMClient.createRoot(container, {
        identifierPrefix: cacheRef.current.key,
      });
      // The frame fits its content, plus the body margins.
      observer = new ResizeObserver(() =>
        setHeight(Math.ceil(frameDoc.body.getBoundingClientRect().height) + 24),
      );
      observer.observe(frameDoc.body);
      setDoc(frameDoc);
    };
    // Before `srcDoc` loads, the frame has an `about:blank` document that is replaced on load.
    const currentDoc = iframe.contentDocument;
    if (currentDoc?.readyState === 'complete' && currentDoc.URL === 'about:srcdoc') {
      init();
    } else {
      iframe.addEventListener('load', init);
    }
    return () => {
      iframe.removeEventListener('load', init);
      observer?.disconnect();
      const root = rootRef.current;
      rootRef.current = null;
      // Unmounting synchronously during a parent render isn't allowed.
      setTimeout(() => root?.unmount());
    };
  }, [css, unlayered, globalStylesFirst]);

  React.useEffect(() => {
    if (context && rootRef.current && cacheRef.current) {
      rootRef.current.render(
        <CacheProvider value={cacheRef.current}>
          <FrameContext.Provider value={context}>{children}</FrameContext.Provider>
        </CacheProvider>,
      );
    }
  });

  return (
    <Box sx={{ flex: '1 1 220px', minWidth: 0 }}>
      <Typography variant="subtitle2" component="h3" gutterBottom>
        {title}
      </Typography>
      <iframe
        ref={ref}
        title={title}
        srcDoc="<!DOCTYPE html><html><head></head><body style='margin:12px;font-family:Roboto,Helvetica,Arial,sans-serif'></body></html>"
        style={{ width: '100%', height, border: '1px solid #ccc', borderRadius: 4 }}
      />
    </Box>
  );
}

// v9 and the two ways this PR can ship Material UI's styles.
const SETUPS: Array<{ title: string; layers: LayersMode; baseline?: boolean }> = [
  { title: 'v9: no layers', layers: 'none', baseline: true },
  { title: 'Single @layer mui (default)', layers: 'single' },
  { title: 'Sub-layers (modularCssLayers: true)', layers: 'sub' },
];

// ---------------------------------------------------------------------------
// Verdicts

type Verdict = 'intended' | 'breaking' | 'same';

const VERDICTS = {
  intended: { label: 'Intended', color: 'success' },
  breaking: { label: 'Breaking', color: 'error' },
  same: { label: 'Same as v9', color: 'default' },
} as const;

function Tag(props: { verdict: Verdict }) {
  const { verdict } = props;
  const { label, color } = VERDICTS[verdict];
  return <Chip size="small" variant="outlined" label={label} color={color} />;
}

function ForApps(props: { verdict: Verdict; who: string; children: React.ReactNode }) {
  const { verdict, who, children } = props;
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', mb: 1, maxWidth: 800 }}>
      <Box sx={{ flexShrink: 0, minWidth: 96 }}>
        <Tag verdict={verdict} />
      </Box>
      <Typography variant="body2">
        <strong>{who}:</strong> {children}
      </Typography>
    </Stack>
  );
}

function Scenario(props: {
  id: string;
  title: string;
  description: React.ReactNode;
  verdicts: React.ReactNode;
  children: React.ReactNode;
}) {
  const { id, title, description, verdicts, children } = props;
  return (
    <Box component="section" id={id} sx={{ mb: 6, scrollMarginTop: 80 }}>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Typography
        variant="body2"
        component="div"
        sx={{ color: 'text.secondary', mb: 2, maxWidth: 800 }}
      >
        {description}
      </Typography>
      {verdicts ? <Box sx={{ mb: 2 }}>{verdicts}</Box> : null}
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 3 }}>
        {children}
      </Stack>
    </Box>
  );
}

const SUMMARY: Array<{ id: string; label: React.ReactNode; single: Verdict; sub: Verdict }> = [
  {
    id: 'overrides',
    label: (
      <React.Fragment>
        Theme overrides and <code>sx</code> vs. state styles
      </React.Fragment>
    ),
    single: 'same',
    sub: 'breaking',
  },
  { id: 'global-css', label: 'Plain CSS class overrides', single: 'intended', sub: 'intended' },
  {
    id: 'global-css',
    label: 'Element resets (normalize.css, starter CSS)',
    single: 'breaking',
    sub: 'breaking',
  },
  { id: 'tailwind', label: 'Tailwind CSS v4 setup from our docs', single: 'same', sub: 'breaking' },
  {
    id: 'tailwind-global-styles',
    label: (
      <React.Fragment>
        Tailwind CSS v4 with the order in <code>GlobalStyles</code> (v9&apos;s Vite setup)
      </React.Fragment>
    ),
    single: 'breaking',
    sub: 'breaking',
  },
  {
    id: 'css-vars',
    label: (
      <React.Fragment>
        <code>--mui-*</code> variables set in plain CSS
      </React.Fragment>
    ),
    single: 'intended',
    sub: 'intended',
  },
  {
    id: 'emotion',
    label: (
      <React.Fragment>
        Styles written with Emotion directly (<code>@emotion/styled</code>, <code>css</code>)
      </React.Fragment>
    ),
    single: 'breaking',
    sub: 'breaking',
  },
];

function Summary() {
  const cellSx = {
    py: 0.75,
    pr: 3,
    textAlign: 'left',
    borderBottom: 1,
    borderColor: 'divider',
  } as const;
  return (
    <Box component="table" sx={{ borderCollapse: 'collapse', mb: 5, typography: 'body2' }}>
      <thead>
        <tr>
          <Box component="th" sx={cellSx}>
            Case
          </Box>
          <Box component="th" sx={cellSx}>
            Single @layer mui (default)
          </Box>
          <Box component="th" sx={cellSx}>
            Sub-layers (opt-in)
          </Box>
        </tr>
      </thead>
      <tbody>
        {SUMMARY.map((row, index) => (
          <tr key={index}>
            <Box component="td" sx={cellSx}>
              <a href={`#${row.id}`}>{row.label}</a>
            </Box>
            <Box component="td" sx={cellSx}>
              <Tag verdict={row.single} />
            </Box>
            <Box component="td" sx={cellSx}>
              <Tag verdict={row.sub} />
            </Box>
          </tr>
        ))}
      </tbody>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Demos

function OverridesDemo(props: { layers: LayersMode }) {
  const { layers } = props;
  const disabledRef = React.useRef<HTMLButtonElement>(null);
  const listItemRef = React.useRef<HTMLDivElement>(null);
  const accordionRef = React.useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider theme={overridesThemes[layers]}>
      <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
        <Button variant="contained" disabled ref={disabledRef}>
          Disabled
        </Button>
        <Computed target={disabledRef} property="backgroundColor" v9="rgba(0, 0, 0, 0.12)" />
        <ListItemButton
          selected
          ref={listItemRef}
          sx={{ backgroundColor: LIGHT_GREEN, width: '100%' }}
        >
          <ListItemText primary="Selected, sx background" />
        </ListItemButton>
        <Computed target={listItemRef} property="backgroundColor" v9="rgba(25, 118, 210, 0.08)" />
        <Box sx={{ width: '100%' }}>
          <Accordion defaultExpanded ref={accordionRef}>
            <AccordionSummary>Expanded</AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Collapsed</AccordionSummary>
          </Accordion>
        </Box>
        <Computed target={accordionRef} property="marginBottom" v9="16px" />
      </Stack>
    </ThemeProvider>
  );
}

const CLASS_CSS = '.my-button { padding-top: 3px; }';
const RESET_CSS =
  'button { font-family: inherit; font-size: 100%; line-height: 1.15; margin: 0; text-transform: none; }';
const GLOBAL_CSS = [CLASS_CSS, '/* normalize.css */', RESET_CSS].join('\n');
const LAYERED_RESET_CSS = [
  '@layer reset, mui;',
  CLASS_CSS,
  '/* normalize.css */',
  '@layer reset {',
  `  ${RESET_CSS}`,
  '}',
].join('\n');

function GlobalCssDemo(props: { layers: LayersMode }) {
  const { layers } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <ThemeProvider theme={themes[layers]}>
      <Button variant="contained" className="my-button" ref={ref}>
        Contained
      </Button>
      <Computed target={ref} property="paddingTop" v9="6px" />
      <Computed target={ref} property="textTransform" v9="uppercase" />
      <Computed target={ref} property="fontSize" v9="14px" />
    </ThemeProvider>
  );
}

// What `@import 'tailwindcss'` brings: Tailwind CSS's own layer order, preflight in `base` and the
// utility classes in `utilities`.
const TAILWIND_OUTPUT = [
  '@layer theme, base, components, utilities;',
  '/* Preflight */',
  '@layer base {',
  '  button { padding: 0; border-radius: 0; color: inherit; background-color: transparent; }',
  '}',
  '@layer utilities {',
  '  .pt-px { padding-top: 1px; }',
  '}',
].join('\n');
// The setup from the Tailwind CSS v4 guide: the layer order at the top of the CSS file.
const TAILWIND_CSS = [TAILWIND_ORDER, TAILWIND_OUTPUT].join('\n');

function TailwindDemo(props: { theme: object; orderInGlobalStyles?: boolean }) {
  const { theme, orderInGlobalStyles = false } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <ThemeProvider theme={theme}>
      {orderInGlobalStyles ? <GlobalStyles styles={TAILWIND_ORDER} /> : null}
      <Button variant="contained" className="pt-px" ref={ref}>
        Contained
      </Button>
      <Computed target={ref} property="backgroundColor" v9={PRIMARY} />
      <Computed target={ref} property="paddingTop" v9="1px" />
      <LayerNames target={ref} />
    </ThemeProvider>
  );
}

const VARS_CSS = ':root { --mui-palette-primary-main: rgb(255, 0, 0); }';

function CssVarsDemo(props: { layers: LayersMode }) {
  const { layers } = props;
  const { doc } = useFrame();
  const ref = React.useRef<HTMLButtonElement>(null);
  const theme = React.useMemo(
    () =>
      createTheme({
        modularCssLayers: layers === 'sub',
        cssVariables: { colorSchemeSelector: 'class' },
        colorSchemes: { light: true, dark: true },
      }),
    [layers],
  );
  // The provider writes the color scheme class to `colorSchemeNode`, which defaults to the
  // top-level document.
  return (
    <ThemeProvider
      theme={theme}
      defaultMode="dark"
      storageManager={null}
      colorSchemeNode={doc.documentElement}
      documentNode={doc}
      noSsr
    >
      <Button variant="contained" ref={ref}>
        Dark scheme
      </Button>
      <Computed target={ref} property="backgroundColor" v9="rgb(144, 202, 249)" />
    </ThemeProvider>
  );
}

const EmotionButton = emotionStyled(Button)({ backgroundColor: GREEN });
const MaterialStyledButton = styled(Button)({ backgroundColor: GREEN });

function EmotionDemo(props: { layers: LayersMode; materialStyled?: boolean }) {
  const { layers, materialStyled = false } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
  const GreenButton = materialStyled ? MaterialStyledButton : EmotionButton;
  return (
    <ThemeProvider theme={themes[layers]}>
      <GreenButton variant="contained" disabled ref={ref}>
        Disabled
      </GreenButton>
      <Computed target={ref} property="backgroundColor" v9="rgba(0, 0, 0, 0.12)" />
    </ThemeProvider>
  );
}

const ResponsiveText = styled('div')({
  color: 'blue',
  '@media (min-width: 0px)': { color: GREEN },
});
const RedResponsiveText = styled(ResponsiveText)({ color: RED });

function WrappedStyledDemo(props: { layers: LayersMode }) {
  const { layers } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider theme={themes[layers]}>
      <RedResponsiveText ref={ref}>styled(ResponsiveText)</RedResponsiveText>
      <Computed target={ref} property="color" v9={GREEN} />
    </ThemeProvider>
  );
}

const CustomButton = styled(Button)({ paddingTop: '3px' });

function NoThemeProviderDemo() {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <React.Fragment>
      <CustomButton variant="outlined" ref={ref}>
        styled(Button)
      </CustomButton>
      <Computed target={ref} property="paddingTop" v9="3px" />
      <LayerNames target={ref} />
    </React.Fragment>
  );
}

const ThemedDiv = systemStyled('div')<{ theme?: any }>(({ theme }) => ({
  color: theme.textColor,
}));

function HandMadeThemeDemo() {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <SystemThemeProvider theme={{ textColor: RED }}>
      <ThemedDiv ref={ref}>styled(&apos;div&apos;) from @mui/system</ThemedDiv>
      <Computed target={ref} property="color" v9={RED} />
      <LayerNames target={ref} />
    </SystemThemeProvider>
  );
}

function CssBlock(props: { children: string }) {
  const { children } = props;
  return (
    <Box component="pre" sx={{ m: 0, mt: 1, fontSize: 12, whiteSpace: 'pre-wrap' }}>
      {children}
    </Box>
  );
}

export default function CssLayers() {
  return (
    <BrandingCssVarsProvider>
      <Head title="CSS layers playground" description="Temporary playground for CSS layers." />
      <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CSS layers playground
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, maxWidth: 800 }}>
          What changes for apps now that Material UI always puts its styles in CSS layers. Each case
          compares v9 without layers, the single <code>@layer mui</code> that&apos;s the default,
          and the sub-layers that <code>modularCssLayers: true</code> turns on. The values come from{' '}
          <code>getComputedStyle</code>, next to the v9 value when it&apos;s different.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, maxWidth: 800, color: 'text.secondary' }}>
          Each demo runs in a frame with its own document, React root and Emotion cache in
          production mode, so that this page&apos;s styles and layer order don&apos;t change the
          results. The v9 frames take Material UI&apos;s styles out of <code>@layer mui</code>,
          which gives the CSS that v9 generated. With sub-layers, <code>useLayerOrder</code> writes
          the layer order to the top-level document, so each frame copies it to the start of its own{' '}
          <code>&lt;head&gt;</code>, as on a page.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, maxWidth: 800, color: 'text.secondary' }}>
          The verdicts compare to v9 without layers. The Tailwind CSS cases compare to the setup
          from v9&apos;s docs, which used <code>enableCssLayer</code>, so their v9 frames keep the{' '}
          <code>mui</code> layer. Apps that already used <code>enableCssLayer</code> in v9 get the
          single layer they had, and apps that used <code>modularCssLayers: true</code> get the same
          sub-layers.
        </Typography>
        <Summary />

        <Scenario
          id="overrides"
          title="1. Theme overrides and sx vs. state styles"
          description={
            <React.Fragment>
              The theme sets <code>MuiButton</code> <code>root</code> to a red background and{' '}
              <code>MuiAccordion</code> <code>root</code> to <code>margin: 0</code>, and the
              selected list item has a green <code>sx</code> background. With sub-layers,{' '}
              <code>mui.theme</code> and <code>mui.sx</code> beat the components&apos; state styles
              in <code>mui.components</code>, whatever their specificity.
            </React.Fragment>
          }
          verdicts={
            <React.Fragment>
              <ForApps verdict="same" who="Single layer">
                Specificity works as in v9.
              </ForApps>
              <ForApps verdict="breaking" who="Sub-layers">
                A <code>root</code> override also applies in states, so the disabled Button looks
                enabled. <code>sx</code> beating <code>.Mui-selected</code> is what many people
                expect, but existing apps still change.
              </ForApps>
            </React.Fragment>
          }
        >
          {SETUPS.map((setup) => (
            <Frame
              key={setup.title}
              title={setup.title}
              unlayered={setup.layers === 'none'}
              baseline={setup.baseline}
            >
              <OverridesDemo layers={setup.layers} />
            </Frame>
          ))}
        </Scenario>

        <Scenario
          id="global-css"
          title="2. Global CSS loaded before Material UI"
          description={
            <React.Fragment>
              The app&apos;s CSS comes before Material UI&apos;s styles. Unlayered CSS beats any
              layer, whatever the specificity.
              <CssBlock>{GLOBAL_CSS}</CssBlock>
            </React.Fragment>
          }
          verdicts={
            <React.Fragment>
              <ForApps verdict="intended" who="Class overrides, both">
                <code>.my-button</code> wins without specificity tricks or <code>injectFirst</code>.
              </ForApps>
              <ForApps verdict="breaking" who="Element resets, both">
                Resets from normalize.css, a CSS framework or a starter template&apos;s{' '}
                <code>index.css</code> now beat Material UI: here every Button loses its uppercase
                text and changes size. Putting them in a layer declared before <code>mui</code>, as
                the upgrade guide shows, keeps the v9 look.
              </ForApps>
            </React.Fragment>
          }
        >
          {SETUPS.map((setup) => (
            <Frame
              key={setup.title}
              title={setup.title}
              css={GLOBAL_CSS}
              unlayered={setup.layers === 'none'}
              baseline={setup.baseline}
            >
              <GlobalCssDemo layers={setup.layers} />
            </Frame>
          ))}
          <Frame title="Single layer + resets in @layer reset" css={LAYERED_RESET_CSS}>
            <GlobalCssDemo layers="single" />
          </Frame>
        </Scenario>

        <Scenario
          id="tailwind"
          title="3. Tailwind CSS v4 setup from our docs"
          description={
            <React.Fragment>
              Every frame has the setup from the Tailwind CSS v4 guide: the layer order at the top
              of the app&apos;s CSS, before Tailwind CSS&apos;s own order, its preflight reset in{' '}
              <code>base</code> and its utility classes. The Button should keep its background, and
              the <code>pt-px</code> utility class should override its padding. In v9,{' '}
              <code>enableCssLayer</code> put the styles in the same single <code>mui</code> layer,
              so the first frame is also v9&apos;s output.
              <CssBlock>{TAILWIND_CSS}</CssBlock>
            </React.Fragment>
          }
          verdicts={
            <React.Fragment>
              <ForApps verdict="same" who="Single layer">
                <code>mui</code> sits where the app declares it, as in v9.
              </ForApps>
              <ForApps verdict="breaking" who="Sub-layers">
                With <code>modularCssLayers: true</code>, the <code>ThemeProvider</code> declares
                the sub-layers at the start of <code>&lt;head&gt;</code>, so <code>mui</code>{' '}
                becomes the lowest layer and preflight wipes the Button. Passing the app&apos;s
                layer order as the <code>modularCssLayers</code> string, as the CSS layers page
                shows, keeps it.
              </ForApps>
            </React.Fragment>
          }
        >
          <Frame title="Single layer (default), as v9" css={TAILWIND_CSS} baseline>
            <TailwindDemo theme={defaultTheme} />
          </Frame>
          <Frame title="modularCssLayers: true" css={TAILWIND_CSS}>
            <TailwindDemo theme={subLayersTheme} />
          </Frame>
          <Frame title="modularCssLayers string" css={TAILWIND_CSS}>
            <TailwindDemo theme={modularStringTheme} />
          </Frame>
        </Scenario>

        <Scenario
          id="tailwind-global-styles"
          title="4. Tailwind CSS v4 with the order in GlobalStyles (v9's Vite setup)"
          description={
            <React.Fragment>
              v9&apos;s guide declared the layer order with <code>GlobalStyles</code> inside{' '}
              <code>&lt;StyledEngineProvider enableCssLayer&gt;</code>, which inserted it at the top
              of <code>&lt;head&gt;</code>. Without <code>enableCssLayer</code>,{' '}
              <code>GlobalStyles</code> comes after Tailwind CSS&apos;s own order, which has already
              named its layers, so <code>mui</code> goes after <code>utilities</code>. The
              app&apos;s CSS is what <code>@import &apos;tailwindcss&apos;</code> brings:
              <CssBlock>{TAILWIND_OUTPUT}</CssBlock>
            </React.Fragment>
          }
          verdicts={
            <React.Fragment>
              <ForApps verdict="breaking" who="Single layer">
                Material UI beats the utility classes, so <code>pt-px</code> no longer applies.
                Declaring the order at the top of the CSS file, as the upgrade guide shows, restores
                it.
              </ForApps>
              <ForApps verdict="breaking" who="Sub-layers">
                As in case 3, <code>mui</code> is the lowest layer and preflight wipes the Button.
                Passing the order as the <code>modularCssLayers</code> string keeps it.
              </ForApps>
            </React.Fragment>
          }
        >
          <Frame
            title="v9: GlobalStyles first in <head>"
            css={TAILWIND_OUTPUT}
            globalStylesFirst
            baseline
          >
            <TailwindDemo theme={defaultTheme} orderInGlobalStyles />
          </Frame>
          <Frame title="Single layer: GlobalStyles after Tailwind CSS" css={TAILWIND_OUTPUT}>
            <TailwindDemo theme={defaultTheme} orderInGlobalStyles />
          </Frame>
          <Frame title="Sub-layers: GlobalStyles after Tailwind CSS" css={TAILWIND_OUTPUT}>
            <TailwindDemo theme={subLayersTheme} orderInGlobalStyles />
          </Frame>
          <Frame title="Single layer: order at the top of the CSS file" css={TAILWIND_CSS}>
            <TailwindDemo theme={defaultTheme} />
          </Frame>
        </Scenario>

        <Scenario
          id="css-vars"
          title="5. CSS theme variables set in plain CSS"
          description={
            <React.Fragment>
              The app&apos;s CSS comes before Material UI&apos;s styles, and the frames use the dark
              scheme.
              <CssBlock>{VARS_CSS}</CssBlock>
            </React.Fragment>
          }
          verdicts={
            <ForApps verdict="intended" who="Both">
              Plain CSS overrides the theme variables without specificity tricks. A{' '}
              <code>:root</code> override applies to every color scheme; scope it with the scheme
              selector, like <code>.dark</code>, for one scheme.
            </ForApps>
          }
        >
          {SETUPS.map((setup) => (
            <Frame
              key={setup.title}
              title={setup.title}
              css={VARS_CSS}
              unlayered={setup.layers === 'none'}
              baseline={setup.baseline}
            >
              <CssVarsDemo layers={setup.layers} />
            </Frame>
          ))}
        </Scenario>

        <Scenario
          id="emotion"
          title="6. Styles written with Emotion directly"
          description={
            <React.Fragment>
              The Button is wrapped with <code>styled()</code> from <code>@emotion/styled</code> and
              given a green background. Emotion&apos;s own styles aren&apos;t in a layer, so they
              beat Material UI&apos;s styles, as plain CSS does. In v9, they competed by
              specificity, also with <code>enableCssLayer</code>, which put them in the{' '}
              <code>mui</code> layer. The last two frames use <code>styled()</code> from{' '}
              <code>@mui/material/styles</code> instead.
            </React.Fragment>
          }
          verdicts={
            <React.Fragment>
              <ForApps verdict="breaking" who="Single layer">
                The override also applies in states, so the disabled Button stays green.{' '}
                <code>styled()</code> from <code>@mui/material/styles</code> puts the styles in the{' '}
                <code>mui</code> layer, with v9&apos;s precedence.
              </ForApps>
              <ForApps verdict="breaking" who="Sub-layers">
                The same, and <code>styled()</code> from <code>@mui/material/styles</code>{' '}
                doesn&apos;t help: it puts the styles in <code>mui.custom</code>, which beats the
                state styles in <code>mui.components</code>, as theme overrides do in case 1.
              </ForApps>
            </React.Fragment>
          }
        >
          {SETUPS.map((setup) => (
            <Frame
              key={setup.title}
              title={setup.title}
              unlayered={setup.layers === 'none'}
              baseline={setup.baseline}
            >
              <EmotionDemo layers={setup.layers} />
            </Frame>
          ))}
          <Frame title="Single layer: styled() from @mui/material/styles">
            <EmotionDemo layers="single" materialStyled />
          </Frame>
          <Frame title="Sub-layers: styled() from @mui/material/styles">
            <EmotionDemo layers="sub" materialStyled />
          </Frame>
        </Scenario>

        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Implementation checks
        </Typography>

        <Scenario
          id="wrapped-styled"
          title="7. styled() around a styled component"
          description={
            <React.Fragment>
              Emotion puts the wrapped component&apos;s styles first, in the same class. In v9, the
              declarations of both come before the media queries, so the wrapped component&apos;s
              green media query beats the wrapper&apos;s red. The single layer keeps one{' '}
              <code>@layer mui</code> block around both to keep that order. With sub-layers, each
              part goes in its own <code>mui.custom</code> block, so the wrapper&apos;s red comes
              last and wins.
            </React.Fragment>
          }
          verdicts={null}
        >
          {SETUPS.map((setup) => (
            <Frame
              key={setup.title}
              title={setup.title}
              unlayered={setup.layers === 'none'}
              baseline={setup.baseline}
            >
              <WrappedStyledDemo layers={setup.layers} />
            </Frame>
          ))}
        </Scenario>

        <Scenario
          id="no-create-theme"
          title="8. Without createTheme()"
          description={
            <React.Fragment>
              Components without a <code>ThemeProvider</code> get the default theme, and a theme
              object made by hand has no <code>modularCssLayers</code>, so both put their styles in
              the single <code>mui</code> layer. <code>styled(Button)</code> still beats the
              Button&apos;s padding.
            </React.Fragment>
          }
          verdicts={null}
        >
          <Frame title="No ThemeProvider">
            <NoThemeProviderDemo />
          </Frame>
          <Frame title="Theme object made by hand">
            <HandMadeThemeDemo />
          </Frame>
        </Scenario>
      </Box>
    </BrandingCssVarsProvider>
  );
}
