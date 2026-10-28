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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  StyledEngineProvider,
  ThemeProvider as MaterialThemeProvider,
  createTheme,
  styled,
} from '@mui/material/styles';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

// The CSS variables props (`colorSchemeNode`, `storageManager`, …) are only typed with the CSS variables augmentation.
const ThemeProvider = MaterialThemeProvider as React.ComponentType<any>;

const RED = 'rgb(255, 0, 0)';

function createOverridesTheme(cssLayers: boolean) {
  return createTheme({
    cssLayers,
    components: {
      MuiButton: { styleOverrides: { root: { backgroundColor: RED } } },
      MuiAccordion: { styleOverrides: { root: { margin: 0 } } },
    },
  });
}

const layersOnTheme = createOverridesTheme(true);
const layersOffTheme = createOverridesTheme(false);
const defaultTheme = createTheme();
const v9Theme = createTheme({ cssLayers: false });

// ---------------------------------------------------------------------------
// Readouts

// Returns the layer names in the order they're first declared, which is their precedence order,
// from lowest to highest, for each parent layer.
function getLayerNames(doc: Document) {
  // A frame's rules are instances of the frame window's classes.
  const win = doc.defaultView as typeof window;
  const names: string[] = [];
  const add = (name: string) => {
    if (!names.includes(name)) {
      names.push(name);
    }
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
    const timeout = setTimeout(update, 500);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, []);
  return value;
}

const readoutStyle: React.CSSProperties = {
  display: 'block',
  marginTop: 8,
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: 12,
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap',
};

function Computed(props: {
  target: React.RefObject<HTMLElement | null>;
  property: 'backgroundColor' | 'paddingTop' | 'marginBottom';
  expected: string;
}) {
  const { target, property, expected } = props;
  const value = useLateValue(() => {
    // A frame's document has no window once the frame is removed.
    const view = target.current?.ownerDocument.defaultView;
    return view ? view.getComputedStyle(target.current!)[property] : undefined;
  });
  const matches = value === expected;
  return (
    <code style={readoutStyle}>
      {property}: {value ?? '…'}
      {value !== undefined && (matches ? ' ✓' : ` ✗ (expected ${expected})`)}
    </code>
  );
}

function LayerNames(props: { target: React.RefObject<HTMLElement | null>; filter?: string }) {
  const { target, filter } = props;
  const names = useLateValue(() => {
    const doc = target.current?.ownerDocument;
    return doc?.defaultView ? getLayerNames(doc) : undefined;
  });
  const shown = filter ? names?.filter((name) => name.includes(filter)) : names;
  return (
    <code style={readoutStyle}>
      {filter ? `layers matching "${filter}": ` : 'layer order: '}
      {shown ? shown.join(', ') || 'none' : '…'}
    </code>
  );
}

// ---------------------------------------------------------------------------
// Frames with their own document, React root and Emotion cache, for the cases that need their own
// layer order. The docs' root ThemeProvider already declared it for this page, and React context
// would cross a portal.

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

const LAYER_ORDER_STATEMENT = /^@layer\s[^{]*;$/;

// On the client, `useLayerOrder` prepends the layer order statement to the `<head>` of the
// top-level document, even when the styles render in a frame. This copies the statement that the
// ThemeProvider renders in the frame to the start of the frame's `<head>`, as the hook does for a page.
function prependLayerOrder(doc: Document) {
  const observer = new MutationObserver(() => {
    const statement = Array.from(doc.head.querySelectorAll('style[data-emotion]')).find((style) =>
      LAYER_ORDER_STATEMENT.test(style.textContent?.trim() ?? ''),
    );
    if (statement) {
      const style = doc.createElement('style');
      style.setAttribute('data-mui-layer-order', 'frame');
      style.textContent = statement.textContent;
      doc.head.prepend(style);
      observer.disconnect();
    }
  });
  observer.observe(doc.head, { childList: true, subtree: true, characterData: true });
  return observer;
}

function Frame(props: {
  title: string;
  // Inserted before Material UI's styles.
  css?: string;
  prependsLayerOrder?: boolean;
  children: React.ReactNode;
}) {
  const { title, css, prependsLayerOrder = false, children } = props;
  const ref = React.useRef<HTMLIFrameElement>(null);
  const rootRef = React.useRef<ReactDOMClient.Root | null>(null);
  const cacheRef = React.useRef<EmotionCache | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [height, setHeight] = React.useState(40);

  React.useEffect(() => {
    const iframe = ref.current!;
    let observer: ResizeObserver | undefined;
    let layerOrderObserver: MutationObserver | undefined;
    const init = () => {
      const doc = iframe.contentDocument!;
      if (css) {
        const style = doc.createElement('style');
        style.setAttribute('data-app-css', '');
        style.textContent = css;
        doc.head.appendChild(style);
      }
      if (prependsLayerOrder) {
        layerOrderObserver = prependLayerOrder(doc);
      }
      const key = createFrameKey();
      cacheRef.current = createCache({ key, container: doc.head });
      const container = doc.body.appendChild(doc.createElement('div'));
      rootRef.current = ReactDOMClient.createRoot(container, { identifierPrefix: key });
      // The frame starts short and grows to fit its content, including the body margins.
      observer = new ResizeObserver(() => setHeight(doc.documentElement.scrollHeight));
      observer.observe(doc.body);
      setMounted(true);
    };
    if (iframe.contentDocument?.readyState === 'complete' && iframe.contentDocument.body) {
      init();
    } else {
      iframe.addEventListener('load', init);
    }
    return () => {
      iframe.removeEventListener('load', init);
      observer?.disconnect();
      layerOrderObserver?.disconnect();
      const root = rootRef.current;
      rootRef.current = null;
      // Unmounting synchronously during a parent render isn't allowed.
      setTimeout(() => root?.unmount());
    };
  }, [css, prependsLayerOrder]);

  React.useEffect(() => {
    if (mounted && rootRef.current && cacheRef.current) {
      rootRef.current.render(<CacheProvider value={cacheRef.current}>{children}</CacheProvider>);
    }
  });

  return (
    <Box sx={{ flex: '1 1 240px', minWidth: 0 }}>
      <Typography variant="subtitle2" component="h3" gutterBottom>
        {title}
      </Typography>
      {css && (
        <Box component="pre" sx={{ m: 0, mb: 1, fontSize: 12, whiteSpace: 'pre-wrap' }}>
          {css}
        </Box>
      )}
      <iframe
        ref={ref}
        title={title}
        srcDoc="<!DOCTYPE html><html><head></head><body style='margin:12px;font-family:Roboto,Helvetica,Arial,sans-serif'></body></html>"
        style={{ width: '100%', height, border: '1px solid #ccc', borderRadius: 4 }}
      />
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Scenarios

function Scenario(props: {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  const { title, description, children } = props;
  return (
    <Box component="section" sx={{ mb: 6 }}>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, maxWidth: 800 }}>
        {description}
      </Typography>
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 3 }}>
        {children}
      </Stack>
    </Box>
  );
}

function Column(props: { title: string; children: React.ReactNode }) {
  const { title, children } = props;
  return (
    <Box sx={{ flex: '1 1 240px', minWidth: 0 }}>
      <Typography variant="subtitle2" component="h3" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function OverridesDemo(props: { cssLayers: boolean }) {
  const { cssLayers } = props;
  const disabledRef = React.useRef<HTMLButtonElement>(null);
  const listItemRef = React.useRef<HTMLDivElement>(null);
  const accordionRef = React.useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider theme={cssLayers ? layersOnTheme : layersOffTheme}>
      <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
        <Button variant="contained">Hover me</Button>
        <Button variant="contained" disabled ref={disabledRef}>
          Disabled
        </Button>
        <Computed
          target={disabledRef}
          property="backgroundColor"
          expected={cssLayers ? RED : 'rgba(0, 0, 0, 0.12)'}
        />
        <ListItemButton
          selected
          ref={listItemRef}
          sx={{ backgroundColor: 'rgb(0, 128, 0)', color: 'common.white', width: '100%' }}
        >
          <ListItemText primary="Selected, sx background" />
        </ListItemButton>
        <Computed
          target={listItemRef}
          property="backgroundColor"
          expected={cssLayers ? 'rgb(0, 128, 0)' : 'rgba(25, 118, 210, 0.08)'}
        />
        <Box sx={{ width: '100%' }}>
          <Accordion defaultExpanded ref={accordionRef}>
            <AccordionSummary>Expanded, theme margin: 0</AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Collapsed</AccordionSummary>
          </Accordion>
        </Box>
        <Computed
          target={accordionRef}
          property="marginBottom"
          expected={cssLayers ? '0px' : '16px'}
        />
      </Stack>
    </ThemeProvider>
  );
}

const PLAIN_CSS = '.css-sub-layers-plain { padding-top: 3px; }';

function PlainCssDemo(props: { cssLayers: boolean }) {
  const { cssLayers } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <ThemeProvider theme={cssLayers ? defaultTheme : v9Theme}>
      <Button variant="outlined" className="css-sub-layers-plain" ref={ref}>
        Plain CSS class
      </Button>
      <Computed target={ref} property="paddingTop" expected={cssLayers ? '3px' : '5px'} />
    </ThemeProvider>
  );
}

function TailwindDemo(props: { theme: object; expected: string }) {
  const { theme, expected } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" ref={ref}>
        Contained
      </Button>
      <Computed target={ref} property="backgroundColor" expected={expected} />
      <LayerNames target={ref} />
    </ThemeProvider>
  );
}

const TAILWIND_BASE = '@layer base {\n  button { background-color: transparent; }\n}';
const TAILWIND_ORDER = '@layer theme, base, mui, components, utilities;';
const TAILWIND_ORDER_AND_BASE = `${TAILWIND_ORDER}\n${TAILWIND_BASE}`;

const modularStringTheme = createTheme({ modularCssLayers: TAILWIND_ORDER });

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
      <Computed target={ref} property="paddingTop" expected="3px" />
      <LayerNames target={ref} />
    </React.Fragment>
  );
}

const VARS_CSS = ':root { --mui-palette-primary-main: rgb(255, 0, 0); }';

function CssVarsDemo(props: { cssLayers: boolean }) {
  const { cssLayers } = props;
  const probeRef = React.useRef<HTMLSpanElement>(null);
  const [doc, setDoc] = React.useState<Document | null>(null);
  const theme = React.useMemo(
    () =>
      createTheme({
        cssLayers,
        cssVariables: { colorSchemeSelector: 'class' },
        colorSchemes: { light: true, dark: true },
      }),
    [cssLayers],
  );
  React.useLayoutEffect(() => {
    if (probeRef.current) {
      setDoc(probeRef.current.ownerDocument);
    }
  }, []);
  // The provider writes the color scheme class to `colorSchemeNode`, which defaults to the
  // top-level document, so it waits for the frame's document.
  return doc ? (
    <CssVarsFrameDemo cssLayers={cssLayers} theme={theme} doc={doc} />
  ) : (
    <span ref={probeRef} />
  );
}

function CssVarsFrameDemo(props: { cssLayers: boolean; theme: object; doc: Document }) {
  const { cssLayers, theme, doc } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
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
      <Computed
        target={ref}
        property="backgroundColor"
        expected={cssLayers ? RED : 'rgb(144, 202, 249)'}
      />
    </ThemeProvider>
  );
}

function EnableCssLayerDemo() {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <StyledEngineProvider enableCssLayer>
      <ThemeProvider theme={defaultTheme}>
        <Button variant="contained" ref={ref}>
          enableCssLayer
        </Button>
        <Computed target={ref} property="backgroundColor" expected="rgb(25, 118, 210)" />
        <LayerNames target={ref} filter="mui.mui" />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default function CssSubLayers() {
  const pageRef = React.useRef<HTMLDivElement>(null);
  return (
    <React.Fragment>
      <Head title="CSS sub-layers playground" description="" />
      <Box ref={pageRef} sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CSS sub-layers playground
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, maxWidth: 800 }}>
          Each case shows the default (<code>cssLayers</code> on) next to{' '}
          <code>cssLayers: false</code>, the v9 behavior. The values under each demo come from{' '}
          <code>getComputedStyle</code>: ✓ means the result matches what the sub-layers should
          produce.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, maxWidth: 800, color: 'text.secondary' }}>
          The docs&apos; Emotion cache uses <code>enableCssLayer</code>, so on this page{' '}
          <code>cssLayers: false</code> styles still end up in <code>@layer mui</code>. That
          doesn&apos;t change case 1, but the cases that depend on unlayered Material UI styles run
          in frames with their own document, React root and Emotion cache. Their ThemeProviders
          write the layer order to this page&apos;s <code>&lt;head&gt;</code>, because{' '}
          <code>useLayerOrder</code> uses the global <code>document</code>.
        </Typography>
        <LayerNames target={pageRef} />
        <Box sx={{ mt: 4 }} />

        <Scenario
          title="1. Theme overrides, styled() and sx vs. state styles"
          description={
            <React.Fragment>
              The theme overrides <code>MuiButton.root.backgroundColor</code> and{' '}
              <code>MuiAccordion.root.margin</code>. With sub-layers, the override (
              <code>mui.theme</code>) beats the button&apos;s hover and disabled styles and the
              expanded Accordion margin (<code>mui.components</code>), and <code>sx</code> (
              <code>mui.sx</code>) beats <code>.Mui-selected</code>. Hover the first button in each
              column to compare.
            </React.Fragment>
          }
        >
          <Column title="cssLayers: true (default)">
            <OverridesDemo cssLayers />
          </Column>
          <Column title="cssLayers: false">
            <OverridesDemo cssLayers={false} />
          </Column>
        </Scenario>

        <Scenario
          title="2. Plain CSS"
          description={
            <React.Fragment>
              <code>{PLAIN_CSS}</code> comes before Material UI&apos;s styles, with the same
              specificity as Material UI&apos;s class, so source order alone favors Material UI.
              Unlayered CSS beats any layer, so with sub-layers it wins without specificity tricks
              or <code>injectFirst</code>.
            </React.Fragment>
          }
        >
          <Frame title="cssLayers: true (default)" css={PLAIN_CSS}>
            <PlainCssDemo cssLayers />
          </Frame>
          <Frame title="cssLayers: false" css={PLAIN_CSS}>
            <PlainCssDemo cssLayers={false} />
          </Frame>
        </Scenario>

        <Scenario
          title="3. Other layers (Tailwind CSS v4 preflight)"
          description={
            <React.Fragment>
              Each frame has a <code>base</code> layer that resets the button background. The layer
              order statement of the ThemeProvider is copied to the start of the frame&apos;s{' '}
              <code>&lt;head&gt;</code>, which is what <code>useLayerOrder</code> does on a page.{' '}
              <code>mui</code> is declared first, so it&apos;s the lowest layer: <code>base</code>{' '}
              wins, even when the app declares its own order. Only the <code>modularCssLayers</code>{' '}
              string puts <code>mui</code> between <code>base</code> and <code>components</code>.
            </React.Fragment>
          }
        >
          <Frame title="No layer order" css={TAILWIND_BASE} prependsLayerOrder>
            <TailwindDemo theme={defaultTheme} expected="rgba(0, 0, 0, 0)" />
          </Frame>
          <Frame
            title="Order declared in the app's CSS"
            css={TAILWIND_ORDER_AND_BASE}
            prependsLayerOrder
          >
            <TailwindDemo theme={defaultTheme} expected="rgba(0, 0, 0, 0)" />
          </Frame>
          <Frame
            title={`modularCssLayers: '${TAILWIND_ORDER}'`}
            css={TAILWIND_BASE}
            prependsLayerOrder
          >
            <TailwindDemo theme={modularStringTheme} expected="rgb(25, 118, 210)" />
          </Frame>
          <Frame title="cssLayers: false" css={TAILWIND_BASE} prependsLayerOrder>
            <TailwindDemo theme={v9Theme} expected="rgb(25, 118, 210)" />
          </Frame>
        </Scenario>

        <Scenario
          title="4. No ThemeProvider"
          description={
            <React.Fragment>
              Components get the default theme, so each one declares the sub-layer order before its
              styles. The <code>styled(&apos;div&apos;)</code> is inserted first, so without the
              order <code>mui.custom</code> would come before <code>mui.components</code> and the
              button&apos;s base padding would win over <code>styled(Button)</code>.
            </React.Fragment>
          }
        >
          <Frame title="Default theme">
            <NoThemeProviderDemo />
          </Frame>
        </Scenario>

        <Scenario
          title="5. CSS theme variables"
          description={
            <React.Fragment>
              <code>{VARS_CSS}</code> comes before Material UI&apos;s styles, and the frames use the
              dark scheme. In <code>mui.global</code>, the theme variables lose to the unlayered
              override, even the dark scheme&apos;s value.
            </React.Fragment>
          }
        >
          <Frame title="cssLayers: true (default)" css={VARS_CSS}>
            <CssVarsDemo cssLayers />
          </Frame>
          <Frame title="cssLayers: false" css={VARS_CSS}>
            <CssVarsDemo cssLayers={false} />
          </Frame>
        </Scenario>

        <Scenario
          title="6. StyledEngineProvider enableCssLayer"
          description={
            <React.Fragment>
              The cache wraps unlayered styles in <code>@layer mui</code>, but skips styles that are
              already in a <code>mui.*</code> sub-layer, so there are no <code>mui.mui.*</code>{' '}
              layers.
            </React.Fragment>
          }
        >
          <Column title="Inside StyledEngineProvider enableCssLayer">
            <EnableCssLayerDemo />
          </Column>
        </Scenario>
      </Box>
    </React.Fragment>
  );
}
