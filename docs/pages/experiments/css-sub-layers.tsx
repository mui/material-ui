'use client';
// Temporary playground for https://github.com/mui/material-ui/pull/49601. Remove before merging.
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import createCache, { type EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider as MaterialThemeProvider, createTheme, styled } from '@mui/material/styles';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

// The CSS variables props (`colorSchemeNode`, `storageManager`, …) are only typed with the CSS variables augmentation.
const ThemeProvider = MaterialThemeProvider as React.ComponentType<any>;

const RED = 'rgb(255, 0, 0)';
const PRIMARY = 'rgb(25, 118, 210)';
const LIGHT_GREEN = 'rgb(200, 230, 201)';

function createOverridesTheme(cssLayers: boolean) {
  return createTheme({
    cssLayers,
    components: {
      MuiButton: { styleOverrides: { root: { backgroundColor: RED } } },
      MuiAccordion: { styleOverrides: { root: { margin: 0 } } },
    },
  });
}

const layeredOverridesTheme = createOverridesTheme(true);
const v9OverridesTheme = createOverridesTheme(false);
const defaultTheme = createTheme();
const v9Theme = createTheme({ cssLayers: false });

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
  property: 'backgroundColor' | 'paddingTop' | 'marginBottom' | 'textTransform' | 'fontSize';
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

function LayerNames(props: { target: React.RefObject<HTMLElement | null>; filter?: string }) {
  const { target, filter } = props;
  const names = useLateValue(() => {
    const doc = target.current?.ownerDocument;
    return doc?.defaultView ? getLayerNames(doc) : undefined;
  });
  const shown = filter
    ? names?.filter((name) => name.includes(filter))
    : names?.filter((name) => !name.includes('.'));
  return (
    <code style={readoutStyle}>
      {filter ? `layers matching "${filter}": ` : 'layers, lowest first: '}
      {shown ? shown.join(', ') || 'none' : '…'}
    </code>
  );
}

// ---------------------------------------------------------------------------
// Frames with their own document, React root and Emotion cache. This page's cache wraps every
// style in `@layer mui`, and React context would cross a portal.

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

// Where the frame puts a copy of Material UI's layer order statement:
// - `top`: the start of `<head>`. On the client, `useLayerOrder` prepends the statement to the
//   `<head>` of the top-level document, even when the styles render in a frame, so the frame does
//   it for itself.
// - `before-mui`: right before Material UI's first style tag, after the app's CSS. A possible fix,
//   not in the PR.
// - `none`: no copy.
type LayerOrderPlacement = 'top' | 'before-mui' | 'none';

const LAYER_ORDER_STATEMENT = /^@layer\s[^{]*$/;

// `speedy` is what Emotion uses in production: rules go in with `insertRule`, so the style tags
// have no text. Setting it here makes the dev server behave like the deploy preview.
function createFrameCache(doc: Document, enableCssLayer: boolean, layerOrder: LayerOrderPlacement) {
  const cache = createCache({ key: createFrameKey(), container: doc.head, speedy: true });
  const { insert } = cache;
  cache.insert = (selector, serialized, sheet, shouldCache) => {
    const isStatement = LAYER_ORDER_STATEMENT.test(serialized.styles);
    // Chrome doesn't restyle elements that already have styles when a style sheet that only
    // reorders layers is added, so copy the ThemeProvider's statement as soon as Emotion inserts it.
    if (
      layerOrder !== 'none' &&
      isStatement &&
      serialized.styles.includes('mui.') &&
      !doc.head.querySelector('style[data-mui-layer-order]')
    ) {
      const style = doc.createElement('style');
      style.setAttribute('data-mui-layer-order', layerOrder);
      style.textContent = serialized.styles;
      if (layerOrder === 'top') {
        doc.head.prepend(style);
      } else {
        doc.head.insertBefore(style, doc.head.querySelector('style[data-emotion]'));
      }
    }
    // Same as `StyledEngineProvider enableCssLayer`, whose cache only works on the top-level document.
    const layered =
      enableCssLayer && !isStatement && !serialized.styles.includes('@layer mui.')
        ? { ...serialized, styles: `@layer mui {${serialized.styles}}` }
        : serialized;
    return insert(selector, layered, sheet, shouldCache);
  };
  return cache;
}

function Frame(props: {
  title: string;
  // The app's CSS, inserted before Material UI's styles.
  css?: string;
  enableCssLayer?: boolean;
  layerOrder?: LayerOrderPlacement;
  // Whether this frame shows the v9 behavior that the other frames compare to.
  baseline?: boolean;
  children: React.ReactNode;
}) {
  const {
    title,
    css,
    enableCssLayer = false,
    layerOrder = 'top',
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
      cacheRef.current = createFrameCache(frameDoc, enableCssLayer, layerOrder);
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
  }, [css, enableCssLayer, layerOrder]);

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

// The three ways Material UI can ship its styles.
const SETUPS = [
  { title: 'v9: no layers', cssLayers: false, enableCssLayer: false, baseline: true },
  { title: 'Single @layer mui (v9 enableCssLayer)', cssLayers: false, enableCssLayer: true },
  { title: 'Sub-layers (this PR)', cssLayers: true, enableCssLayer: false },
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
      <Box sx={{ mb: 2 }}>{verdicts}</Box>
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 3 }}>
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
    id: 'css-vars',
    label: (
      <React.Fragment>
        <code>--mui-*</code> variables set in plain CSS
      </React.Fragment>
    ),
    single: 'intended',
    sub: 'intended',
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
            Single @layer mui
          </Box>
          <Box component="th" sx={cellSx}>
            Sub-layers (this PR)
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

function OverridesDemo(props: { cssLayers: boolean }) {
  const { cssLayers } = props;
  const disabledRef = React.useRef<HTMLButtonElement>(null);
  const listItemRef = React.useRef<HTMLDivElement>(null);
  const accordionRef = React.useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider theme={cssLayers ? layeredOverridesTheme : v9OverridesTheme}>
      <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
        <Button variant="contained">Hover me</Button>
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

const GLOBAL_CSS = [
  '.my-button { padding-top: 3px; }',
  '/* normalize.css */',
  'button { font-family: inherit; font-size: 100%; line-height: 1.15; margin: 0; text-transform: none; }',
].join('\n');

function GlobalCssDemo(props: { cssLayers: boolean }) {
  const { cssLayers } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <ThemeProvider theme={cssLayers ? defaultTheme : v9Theme}>
      <Button variant="contained" className="my-button" ref={ref}>
        Contained
      </Button>
      <Computed target={ref} property="paddingTop" v9="6px" />
      <Computed target={ref} property="textTransform" v9="uppercase" />
      <Computed target={ref} property="fontSize" v9="14px" />
    </ThemeProvider>
  );
}

const TAILWIND_CSS = [
  TAILWIND_ORDER,
  '/* Preflight */',
  '@layer base {',
  '  button { padding: 0; border-radius: 0; color: inherit; background-color: transparent; }',
  '}',
].join('\n');

function TailwindDemo(props: { theme: object }) {
  const { theme } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" ref={ref}>
        Contained
      </Button>
      <Computed target={ref} property="backgroundColor" v9={PRIMARY} />
      <LayerNames target={ref} />
    </ThemeProvider>
  );
}

const VARS_CSS = ':root { --mui-palette-primary-main: rgb(255, 0, 0); }';

function CssVarsDemo(props: { cssLayers: boolean }) {
  const { cssLayers } = props;
  const { doc } = useFrame();
  const ref = React.useRef<HTMLButtonElement>(null);
  const theme = React.useMemo(
    () =>
      createTheme({
        cssLayers,
        cssVariables: { colorSchemeSelector: 'class' },
        colorSchemes: { light: true, dark: true },
      }),
    [cssLayers],
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

const PlainDiv = styled('div')({ color: RED });
const CustomButton = styled(Button)({ paddingTop: '3px' });

function NoThemeProviderDemo() {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <React.Fragment>
      <PlainDiv>styled(&apos;div&apos;), inserted first (mui.custom)</PlainDiv>
      <CustomButton variant="outlined" ref={ref}>
        styled(Button)
      </CustomButton>
      <Computed target={ref} property="paddingTop" v9="3px" />
      <LayerNames target={ref} filter="mui." />
    </React.Fragment>
  );
}

function EnableCssLayerDemo() {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="contained" ref={ref}>
        enableCssLayer
      </Button>
      <Computed target={ref} property="backgroundColor" v9={PRIMARY} />
      <LayerNames target={ref} filter="mui.mui" />
    </ThemeProvider>
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

export default function CssSubLayers() {
  return (
    <React.Fragment>
      <Head title="CSS sub-layers playground" description="Temporary playground for CSS layers." />
      <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CSS sub-layers playground
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, maxWidth: 800 }}>
          What changes for apps when Material UI puts its styles in CSS layers by default. Each case
          compares v9 (no layers), a single <code>@layer mui</code> (the other candidate for the
          default) and this PR&apos;s sub-layers. The values come from <code>getComputedStyle</code>
          , next to the v9 value when it&apos;s different.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, maxWidth: 800, color: 'text.secondary' }}>
          Each demo runs in a frame with its own document, React root and Emotion cache in
          production mode, because this page&apos;s cache already wraps styles in{' '}
          <code>@layer mui</code>. <code>useLayerOrder</code> writes the layer order to the
          top-level document, so each frame copies it to the start of its own{' '}
          <code>&lt;head&gt;</code>, as on a page.
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
              in <code>mui.components</code>, whatever their specificity. Hover the first button to
              compare.
            </React.Fragment>
          }
          verdicts={
            <React.Fragment>
              <ForApps verdict="same" who="Single layer">
                Specificity works as in v9.
              </ForApps>
              <ForApps verdict="breaking" who="Sub-layers">
                A <code>root</code> override also applies when hovered or disabled, so the disabled
                Button looks enabled. <code>sx</code> beating <code>.Mui-selected</code> is what
                many people expect, but existing apps still change.
              </ForApps>
            </React.Fragment>
          }
        >
          {SETUPS.map((setup) => (
            <Frame
              key={setup.title}
              title={setup.title}
              enableCssLayer={setup.enableCssLayer}
              baseline={setup.baseline}
            >
              <OverridesDemo cssLayers={setup.cssLayers} />
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
                text and changes size.
              </ForApps>
            </React.Fragment>
          }
        >
          {SETUPS.map((setup) => (
            <Frame
              key={setup.title}
              title={setup.title}
              css={GLOBAL_CSS}
              enableCssLayer={setup.enableCssLayer}
              baseline={setup.baseline}
            >
              <GlobalCssDemo cssLayers={setup.cssLayers} />
            </Frame>
          ))}
        </Scenario>

        <Scenario
          id="tailwind"
          title="3. Tailwind CSS v4 setup from our docs"
          description={
            <React.Fragment>
              Every frame has the setup from the Tailwind CSS v4 guide: <code>enableCssLayer</code>{' '}
              and the layer order in the app&apos;s CSS, before Tailwind&apos;s preflight reset in{' '}
              <code>base</code>. The Button should keep its background.
              <CssBlock>{TAILWIND_CSS}</CssBlock>
            </React.Fragment>
          }
          verdicts={
            <React.Fragment>
              <ForApps verdict="same" who="Single layer">
                <code>mui</code> sits where the app declares it, as in v9.
              </ForApps>
              <ForApps verdict="breaking" who="Sub-layers">
                <code>useLayerOrder</code> puts its statement at the start of{' '}
                <code>&lt;head&gt;</code>, so <code>mui</code> becomes the lowest layer and
                preflight wipes the Button. Today only the <code>modularCssLayers</code> string
                avoids it. Inserting the statement right before Material UI&apos;s first style would
                keep the app&apos;s order.
              </ForApps>
            </React.Fragment>
          }
        >
          <Frame title="v9 (single layer)" css={TAILWIND_CSS} enableCssLayer baseline>
            <TailwindDemo theme={v9Theme} />
          </Frame>
          <Frame title="This PR" css={TAILWIND_CSS} enableCssLayer>
            <TailwindDemo theme={defaultTheme} />
          </Frame>
          <Frame title="This PR + modularCssLayers string" css={TAILWIND_CSS} enableCssLayer>
            <TailwindDemo theme={modularStringTheme} />
          </Frame>
          <Frame
            title="This PR + order before Material UI's styles (possible fix)"
            css={TAILWIND_CSS}
            enableCssLayer
            layerOrder="before-mui"
          >
            <TailwindDemo theme={defaultTheme} />
          </Frame>
        </Scenario>

        <Scenario
          id="css-vars"
          title="4. CSS theme variables set in plain CSS"
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
              enableCssLayer={setup.enableCssLayer}
              baseline={setup.baseline}
            >
              <CssVarsDemo cssLayers={setup.cssLayers} />
            </Frame>
          ))}
        </Scenario>

        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Implementation checks (sub-layers only)
        </Typography>

        <Scenario
          id="no-theme-provider"
          title="5. No ThemeProvider"
          description={
            <React.Fragment>
              Components get the default theme, so each one declares the sub-layer order before its
              styles. The <code>styled(&apos;div&apos;)</code> is inserted first, so without the
              order <code>mui.custom</code> would come before <code>mui.components</code> and the
              button&apos;s base padding would win over <code>styled(Button)</code>.
            </React.Fragment>
          }
          verdicts={null}
        >
          <Frame title="Default theme" layerOrder="none">
            <NoThemeProviderDemo />
          </Frame>
        </Scenario>

        <Scenario
          id="enable-css-layer"
          title="6. StyledEngineProvider enableCssLayer"
          description={
            <React.Fragment>
              The cache wraps unlayered styles in <code>@layer mui</code>, but skips styles that are
              already in a <code>mui.*</code> sub-layer, so there are no <code>mui.mui.*</code>{' '}
              layers.
            </React.Fragment>
          }
          verdicts={null}
        >
          <Frame title="enableCssLayer + sub-layers" enableCssLayer>
            <EnableCssLayerDemo />
          </Frame>
        </Scenario>
      </Box>
    </React.Fragment>
  );
}
