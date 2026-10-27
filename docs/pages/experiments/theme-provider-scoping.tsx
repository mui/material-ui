'use client';
// Temporary playground for https://github.com/mui/material-ui/pull/49581. Remove before merging.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme,
  useColorScheme,
  useThemeScope,
} from '@mui/material/styles';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

// The CSS variables props (`scoped`, `colorSchemeNode`, …) are only typed with the CSS variables augmentation.
const ThemeProvider = MaterialThemeProvider as React.ComponentType<any>;

function createColorTheme(light: object, dark: object) {
  return createTheme({
    cssVariables: { colorSchemeSelector: 'class' },
    colorSchemes: { light: { palette: light }, dark: { palette: dark } },
  });
}

const appTheme = createColorTheme({}, {});
const sameVarsTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: { light: true, dark: true },
  components: { MuiButton: { defaultProps: { disableElevation: true } } },
});
const promoTheme = createColorTheme(
  { primary: { main: '#9c27b0' } },
  { primary: { main: '#ce93d8' } },
);
const accentTheme = createColorTheme(
  { primary: { main: '#9c27b0' }, secondary: { main: '#2e7d32' } },
  { primary: { main: '#ce93d8' }, secondary: { main: '#81c784' } },
);
const widgetTheme = createColorTheme(
  { primary: { main: '#e65100' } },
  { primary: { main: '#ffb74d' } },
);
const widgetDataTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data' },
  colorSchemes: {
    light: { palette: { primary: { main: '#e65100' } } },
    dark: { palette: { primary: { main: '#ffb74d' } } },
  },
});
const forcedDarkTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  palette: { mode: 'dark', primary: { main: '#f48fb1' } },
});

// ---------------------------------------------------------------------------
// Each scenario renders in its own iframe, because root providers write to `:root`.

interface FrameValue {
  document: Document;
  window: Window;
}

const FrameContext = React.createContext<FrameValue | null>(null);

function useFrame() {
  return React.useContext(FrameContext)!;
}

function Frame(props: { children: React.ReactNode; onReady: (frame: FrameValue) => void }) {
  const { children, onReady } = props;
  const ref = React.useRef<HTMLIFrameElement>(null);
  const [frame, setFrame] = React.useState<(FrameValue & { cache: EmotionCache }) | null>(null);
  const [height, setHeight] = React.useState(80);
  // Emotion keys only allow lowercase letters and hyphens, so the id's other characters become letters.
  const id = React.useId();
  const cacheKey = `frame-${id.toLowerCase().replace(/[^a-z]/g, (char) => String.fromCharCode(97 + (char.charCodeAt(0) % 26)))}`;

  React.useEffect(() => {
    const iframe = ref.current!;
    let observer: ResizeObserver | undefined;
    const init = () => {
      const doc = iframe.contentDocument!;
      const value = {
        document: doc,
        window: iframe.contentWindow!,
        cache: createCache({
          key: cacheKey,
          container: doc.head,
        }),
      };
      // The iframe grows with its content, plus some room for menus and tooltips.
      observer = new ResizeObserver(() => setHeight(doc.body.scrollHeight + 24));
      observer.observe(doc.body);
      setFrame(value);
      onReady(value);
    };
    if (iframe.contentDocument?.readyState === 'complete' && iframe.contentDocument.body) {
      init();
    } else {
      iframe.addEventListener('load', init);
    }
    return () => {
      iframe.removeEventListener('load', init);
      observer?.disconnect();
    };
  }, [onReady, cacheKey]);

  return (
    <React.Fragment>
      <iframe
        ref={ref}
        title="scenario"
        srcDoc="<!DOCTYPE html><html><head></head><body style='margin:12px;font-family:Roboto,Helvetica,Arial,sans-serif'></body></html>"
        style={{ width: '100%', height, border: '1px solid #ccc', borderRadius: 4 }}
      />
      {frame &&
        ReactDOM.createPortal(
          <CacheProvider value={frame.cache}>
            <FrameContext.Provider value={frame}>{children}</FrameContext.Provider>
          </CacheProvider>,
          frame.document.body,
        )}
    </React.Fragment>
  );
}

// A root provider of the scenario: it writes to the iframe's `:root`, isolated from the docs' own provider.
function Root(props: Record<string, any>) {
  const { document, window } = useFrame();
  return (
    <ThemeProvider
      colorSchemeNode={document.documentElement}
      documentNode={document}
      storageWindow={window}
      storageManager={null}
      disableNestedContext
      {...props}
    />
  );
}

// A scoped sibling: isolated from the docs' provider too, it manages its own mode on its child.
function ScopedRoot(props: Record<string, any>) {
  const { document } = useFrame();
  return <ThemeProvider documentNode={document} disableNestedContext scoped {...props} />;
}

function Swatch({ label }: { label: string }) {
  return (
    <Button variant="contained" size="small" sx={{ m: 0.5 }}>
      {label}
    </Button>
  );
}

function ModeToggle({ label = 'mode' }: { label?: string }) {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      size="small"
      variant="outlined"
      sx={{ m: 0.5 }}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {label}: {mode ?? '…'}
    </Button>
  );
}

function Portals({ label }: { label: string }) {
  const { document } = useFrame();
  const themeScope = useThemeScope();
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <div>
      <Button size="small" onClick={() => setDialogOpen(true)}>
        Dialog
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} container={document.body}>
        <DialogContent data-inspect={`${label}: dialog`}>
          <Swatch label="in dialog" />
        </DialogContent>
      </Dialog>
      <Button size="small" onClick={(event) => setAnchor(event.currentTarget)}>
        Menu
      </Button>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchor(null)}
        container={document.body}
      >
        <MenuItem data-inspect={`${label}: menu item`} sx={{ color: 'primary.main' }}>
          Primary item
        </MenuItem>
      </Menu>
      <Tooltip title="Tooltip" slotProps={{ popper: { container: document.body } }}>
        <Button size="small">Tooltip</Button>
      </Tooltip>
      {ReactDOM.createPortal(
        <Box
          {...themeScope}
          data-inspect={`${label}: createPortal + useThemeScope()`}
          sx={{ p: 0.5 }}
        >
          <Swatch label={`${label} portal`} />
        </Box>,
        document.body,
      )}
    </div>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <Button variant="contained" size="small" sx={{ m: 0.5 }} onClick={() => setCount(count + 1)}>
      clicked {count}
    </Button>
  );
}

function ThemeSwitcher() {
  const [different, setDifferent] = React.useState(false);
  return (
    <div>
      <Button size="small" variant="outlined" onClick={() => setDifferent(!different)}>
        nested theme: {different ? 'promoTheme' : 'sameVarsTheme'}
      </Button>
      <ThemeProvider theme={different ? promoTheme : sameVarsTheme}>
        <div data-inspect="nested child">
          <Counter />
        </div>
      </ThemeProvider>
    </div>
  );
}

function Forwards({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section className={className} data-inspect="forwards className">
      {children}
    </section>
  );
}

// It receives `className` from the provider but doesn't render it.
function DropsClassName({ children }: { children: React.ReactNode }) {
  return <section data-inspect="drops className">{children}</section>;
}

// ---------------------------------------------------------------------------
// Scenarios

interface Scenario {
  title: string;
  description: string;
  code: string;
  render: () => React.ReactNode;
}

const scenarios: Scenario[] = [
  {
    title: '1. Single root provider',
    description: 'Baseline: variables on :root, nothing added to the children.',
    code: `<ThemeProvider theme={appTheme}>
  <Button />
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div data-inspect="child">
          <Swatch label="root" />
        </div>
      </Root>
    ),
  },
  {
    title: '2. Two root providers',
    description:
      'Both write to :root, and the last one wins for both. Logs a warning in development.',
    code: `<ThemeProvider theme={appTheme}><Button /></ThemeProvider>
<ThemeProvider theme={widgetTheme}><Button /></ThemeProvider>`,
    render: () => (
      <React.Fragment>
        <Root theme={appTheme}>
          <div data-inspect="app child">
            <Swatch label="app" />
          </div>
        </Root>
        <Root theme={widgetTheme}>
          <div data-inspect="widget child">
            <Swatch label="widget" />
          </div>
        </Root>
      </React.Fragment>
    ),
  },
  {
    title: '3. Root + scoped siblings',
    description:
      'A scoped provider sets all its variables on its child, and has its own mode. With a data attribute selector, the color scheme attribute goes on the child too.',
    code: `<ThemeProvider theme={appTheme}><App /></ThemeProvider>
<ThemeProvider theme={widgetTheme} scoped>
  <div><Widget /></div>
</ThemeProvider>
<ThemeProvider theme={widgetDataTheme} scoped defaultMode="dark">
  <div><Widget /></div>
</ThemeProvider>`,
    render: () => (
      <React.Fragment>
        <Root theme={appTheme}>
          <div data-inspect="app child">
            <ModeToggle label="app mode" />
            <Swatch label="app" />
          </div>
        </Root>
        <ScopedRoot theme={widgetTheme}>
          <div data-inspect="widget child">
            <ModeToggle label="widget mode" />
            <Swatch label="widget" />
          </div>
        </ScopedRoot>
        <ScopedRoot theme={widgetDataTheme} defaultMode="dark">
          <div data-inspect="data selector widget child">
            <ModeToggle label="widget mode" />
            <Swatch label="widget" />
          </div>
        </ScopedRoot>
      </React.Fragment>
    ),
  },
  {
    title: '4. Nested, different variables',
    description:
      'The child gets a class that only sets the variables that differ. It follows the outer mode.',
    code: `<ThemeProvider theme={appTheme}>
  <Button />
  <ThemeProvider theme={promoTheme}>
    <div><Button /></div>
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div data-inspect="outer child">
          <ModeToggle label="outer mode" />
          <Swatch label="outer" />
          <ThemeProvider theme={promoTheme}>
            <div data-inspect="nested child">
              <Swatch label="nested" />
            </div>
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '5. Nested, children that are not a single element',
    description:
      'Several children, a Fragment, text and an array: the rule is generated, but no element gets the class, and an error is logged in development.',
    code: `<ThemeProvider theme={promoTheme}><Button /><Button /></ThemeProvider>
<ThemeProvider theme={promoTheme}><>…</></ThemeProvider>
<ThemeProvider theme={promoTheme}>text</ThemeProvider>
<ThemeProvider theme={promoTheme}>{[<Button key="a" />]}</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div>
          <ThemeProvider theme={promoTheme}>
            <Swatch label="several 1" />
            <Swatch label="several 2" />
          </ThemeProvider>
          <ThemeProvider theme={promoTheme}>
            <React.Fragment>
              <Swatch label="fragment 1" />
              <Swatch label="fragment 2" />
            </React.Fragment>
          </ThemeProvider>
          <ThemeProvider theme={promoTheme}>text</ThemeProvider>
          <ThemeProvider theme={promoTheme}>{[<Swatch key="a" label="array" />]}</ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '6. Nested, custom component child',
    description:
      'A component that renders the className it receives gets the theme. One that drops it silently keeps the outer theme.',
    code: `<ThemeProvider theme={promoTheme}>
  <Forwards><Button /></Forwards>
</ThemeProvider>
<ThemeProvider theme={promoTheme}>
  <DropsClassName><Button /></DropsClassName>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div>
          <ThemeProvider theme={promoTheme}>
            <Forwards>
              <Swatch label="forwards" />
            </Forwards>
          </ThemeProvider>
          <ThemeProvider theme={promoTheme}>
            <DropsClassName>
              <Swatch label="drops" />
            </DropsClassName>
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '7. Directly nested providers and a function theme',
    description:
      'A provider whose child is another provider passes its class on: the middle theme (primary) and the inner one (secondary) both apply.',
    code: `<ThemeProvider theme={promoTheme}>
  <ThemeProvider theme={accentTheme}>
    <div><Button /></div>
  </ThemeProvider>
</ThemeProvider>
<ThemeProvider theme={promoTheme}>
  <ThemeProvider theme={(outer) => ({ ...outer })}>
    <div><Button /></div>
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div>
          <ThemeProvider theme={promoTheme}>
            <ThemeProvider theme={accentTheme}>
              <div data-inspect="promo → accent child">
                <Swatch label="direct nesting" />
                <Button variant="contained" color="secondary" size="small" sx={{ m: 0.5 }}>
                  secondary
                </Button>
              </div>
            </ThemeProvider>
          </ThemeProvider>
          <ThemeProvider theme={promoTheme}>
            <ThemeProvider theme={(outer: object) => ({ ...outer })}>
              <div data-inspect="promo → function theme child">
                <Swatch label="function theme" />
              </div>
            </ThemeProvider>
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '8. Portals',
    description:
      'Dialog, Menu and Tooltip apply the scope to their own root, in a nested provider and in a scoped sibling. useThemeScope() does it for other portals.',
    code: `<ThemeProvider theme={appTheme}>
  <ThemeProvider theme={promoTheme}>
    <div><Dialog /><Menu /><Tooltip /><Toast /></div>
  </ThemeProvider>
</ThemeProvider>
<ThemeProvider theme={widgetTheme} scoped>
  <div><Dialog /><Menu /><Tooltip /><Toast /></div>
</ThemeProvider>`,
    render: () => (
      <React.Fragment>
        <Root theme={appTheme}>
          <ThemeProvider theme={promoTheme}>
            <div data-inspect="nested child">
              <Portals label="nested" />
            </div>
          </ThemeProvider>
        </Root>
        <ScopedRoot theme={widgetTheme} defaultMode="dark">
          <div data-inspect="scoped child">
            <ModeToggle label="scoped mode" />
            <Portals label="scoped" />
          </div>
        </ScopedRoot>
      </React.Fragment>
    ),
  },
  {
    title: '9. Forced single-scheme nested section',
    description: 'A nested theme with only a dark scheme stays dark whatever the outer mode is.',
    code: `<ThemeProvider theme={appTheme}>
  <ThemeProvider theme={forcedDarkTheme}>
    <div><Button /></div>
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div data-inspect="outer child">
          <ModeToggle label="outer mode" />
          <ThemeProvider theme={forcedDarkTheme}>
            <Box data-inspect="forced dark child" sx={{ p: 1, bgcolor: 'background.default' }}>
              <Swatch label="always dark" />
            </Box>
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '10. Nested, same variables, then different ones',
    description:
      'With sameVarsTheme (only component defaults change), the child is left untouched. Click the counter, then switch to promoTheme: the child gets the class and keeps its count, so nothing remounts.',
    code: `<ThemeProvider theme={appTheme}>
  <ThemeProvider theme={different ? promoTheme : sameVarsTheme}>
    <div><Counter /></div>
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <ThemeSwitcher />
      </Root>
    ),
  },
];

// ---------------------------------------------------------------------------
// Inspector: reads what ended up in the iframe.

const interestingDeclaration = /color-scheme|--mui-palette-(primary|secondary)-main:/;

function describeRule(cssText: string) {
  const [selector, body = ''] = cssText.split('{');
  const declarations = body
    .replace('}', '')
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean);
  const shown = declarations.filter((declaration) => interestingDeclaration.test(declaration));
  const more = declarations.length - shown.length;
  return [
    `${selector.trim()} {`,
    ...shown.map((declaration) => `  ${declaration};`),
    ...(more ? [`  + ${more} more declarations`] : []),
    '}',
  ].join('\n');
}

function inspect(doc: Document) {
  const view = doc.defaultView!;
  const values = (element: Element) => {
    const style = view.getComputedStyle(element);
    const read = (name: string) => style.getPropertyValue(name).trim() || '—';
    return `primary ${read('--mui-palette-primary-main')}, secondary ${read('--mui-palette-secondary-main')}, color-scheme ${style.colorScheme}`;
  };
  const scope = (element: Element) => {
    const classes = Array.from(element.classList)
      .filter((name) => name.startsWith('mui-theme-') || name === 'light' || name === 'dark')
      .map((name) => `.${name}`);
    const attributes = Array.from(element.attributes)
      .filter(({ name }) => name.startsWith('data-') && name !== 'data-inspect')
      .map(({ name, value }) => `${name}="${value}"`);
    return [...classes, ...attributes].join(' ') || 'no scope';
  };

  const ruleTexts = new Set<string>();
  Array.from(doc.styleSheets).forEach((sheet) => {
    Array.from(sheet.cssRules).forEach((rule) => {
      if (rule.cssText.includes('mui-theme-')) {
        ruleTexts.add(rule.cssText);
      }
    });
  });
  const applied: string[] = [];
  let unused = 0;
  ruleTexts.forEach((cssText) => {
    const className = cssText.match(/mui-theme-[a-z0-9]+/)?.[0];
    if (className && doc.querySelector(`.${className}`)) {
      applied.push(describeRule(cssText));
    } else {
      unused += 1;
    }
  });

  const elements = Array.from(doc.querySelectorAll('[data-inspect]')).map((element) => {
    const scoped = element.closest('[class*="mui-theme-"]') ?? element;
    return `[${element.getAttribute('data-inspect')}] ${scope(scoped)} → ${values(element)}`;
  });

  return [
    `<html> ${scope(doc.documentElement)}`,
    `:root → ${values(doc.documentElement)}`,
    '',
    ...elements,
    '',
    applied.length ? `Scoped rules:\n${applied.join('\n')}` : 'No scoped rules applied',
    unused ? `\n${unused} rule(s) generated, but no element has the class` : '',
  ].join('\n');
}

function Inspector({ frame }: { frame: FrameValue | null }) {
  const [text, setText] = React.useState('');
  React.useEffect(() => {
    if (!frame) {
      return undefined;
    }
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setText(inspect(frame.document)));
    };
    const observer = new MutationObserver(update);
    observer.observe(frame.document, { subtree: true, childList: true, attributes: true });
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [frame]);

  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        p: 1,
        fontSize: 11,
        lineHeight: 1.5,
        bgcolor: 'grey.100',
        color: 'grey.900',
        borderRadius: 1,
        overflow: 'auto',
      }}
    >
      {text}
    </Box>
  );
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const [frame, setFrame] = React.useState<FrameValue | null>(null);
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
      <Typography variant="h6" component="h2">
        {scenario.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
        {scenario.description}
      </Typography>
      <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        <Stack spacing={1}>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 1,
              fontSize: 12,
              bgcolor: 'grey.900',
              color: 'grey.100',
              borderRadius: 1,
              overflow: 'auto',
            }}
          >
            {scenario.code}
          </Box>
          <Frame onReady={setFrame}>{scenario.render()}</Frame>
        </Stack>
        <Inspector frame={frame} />
      </Box>
    </Box>
  );
}

export default function ThemeProviderScoping() {
  return (
    <React.Fragment>
      <Head title="ThemeProvider scoping playground" description="" />
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ThemeProvider scoping playground
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Temporary page for #49581. Each scenario renders in its own iframe. The right column shows
          what ended up there: the scope classes and attributes, the computed primary and secondary
          colors and color scheme, and the scoped CSS rules (palette and color scheme declarations
          only). Open the browser console for the development warnings and errors.
        </Typography>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.title} scenario={scenario} />
          ))}
        </Stack>
      </Box>
    </React.Fragment>
  );
}
