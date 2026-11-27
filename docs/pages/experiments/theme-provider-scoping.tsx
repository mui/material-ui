'use client';
// Temporary playground for https://github.com/mui/material-ui/pull/49581. Remove before merging.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import type { EmotionCache } from '@emotion/cache';
import createCache from '@emotion/cache';
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
  styled,
  useColorScheme,
  useThemeScope,
} from '@mui/material/styles';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

// The CSS variables props (`isolated`, `colorSchemeNode`, …) are only typed with the CSS variables augmentation.
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
// `text.link` references the primary color, so it has to be declared again where the primary color changes.
function createLinkTheme(main: string) {
  return createTheme({
    cssVariables: { colorSchemeSelector: 'class' },
    palette: { primary: { main }, text: { link: 'var(--mui-palette-primary-main)' } as any },
  });
}
const blueLinkTheme = createLinkTheme('#1976d2');
const redLinkTheme = createLinkTheme('#d32f2f');
const roundedTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: { light: true, dark: true },
  shape: { borderRadius: 16 },
  spacing: 12,
  typography: { fontFamily: 'Georgia, serif' },
});
const lightOnlyTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  palette: { primary: { main: '#2e7d32' } },
});
// A page theme with a single color scheme has no color scheme selector by default.
const darkPageTheme = createTheme({ cssVariables: true, palette: { mode: 'dark' } });
// A page theme with another prefix, like the docs' own theme around the Material UI demos.
const docsTheme = createTheme({
  cssVariables: { cssVarPrefix: 'docs', colorSchemeSelector: 'class' },
  colorSchemes: {
    light: { palette: { primary: { main: '#00796b' } } },
    dark: { palette: { primary: { main: '#4db6ac' } } },
  },
});

// ---------------------------------------------------------------------------
// Each scenario renders in its own iframe, with its own React root, because the top-level provider writes to `:root`.

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
  const [frame, setFrame] = React.useState<{
    value: FrameValue;
    cache: EmotionCache;
    root: ReactDOMClient.Root;
  } | null>(null);
  const [height, setHeight] = React.useState(80);
  // Emotion keys only allow lowercase letters and hyphens, so the id's other characters become letters.
  const id = React.useId();
  const cacheKey = `frame-${id.toLowerCase().replace(/[^a-z]/g, (char) => String.fromCharCode(97 + (char.charCodeAt(0) % 26)))}`;

  React.useEffect(() => {
    const iframe = ref.current!;
    let observer: ResizeObserver | undefined;
    let root: ReactDOMClient.Root | undefined;
    const init = () => {
      const doc = iframe.contentDocument!;
      const container = doc.createElement('div');
      doc.body.appendChild(container);
      root = ReactDOMClient.createRoot(container);
      const value = { document: doc, window: iframe.contentWindow! };
      // The iframe grows with its content, plus some room for menus and tooltips.
      observer = new ResizeObserver(() => setHeight(doc.body.scrollHeight + 24));
      observer.observe(doc.body);
      setFrame({ value, cache: createCache({ key: cacheKey, container: doc.head }), root });
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
      // A root can't be unmounted while React renders.
      setTimeout(() => root?.unmount());
    };
  }, [onReady, cacheKey]);

  React.useEffect(() => {
    frame?.root.render(
      <CacheProvider value={frame.cache}>
        <FrameContext.Provider value={frame.value}>{children}</FrameContext.Provider>
      </CacheProvider>,
    );
  }, [frame, children]);

  return (
    <iframe
      ref={ref}
      title="scenario"
      srcDoc="<!DOCTYPE html><html><head></head><body style='margin:12px;font-family:Roboto,Helvetica,Arial,sans-serif'></body></html>"
      style={{ width: '100%', height, border: '1px solid #ccc', borderRadius: 4 }}
    />
  );
}

// The top-level provider of the scenario: it writes to the iframe's `:root`.
function Root(props: Record<string, any>) {
  const { document, window } = useFrame();
  return (
    <ThemeProvider
      colorSchemeNode={document.documentElement}
      documentNode={document}
      storageWindow={window}
      storageManager={null}
      {...props}
    />
  );
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

function ColorSchemeReport() {
  const { mode, colorScheme } = useColorScheme();
  return (
    <Typography variant="caption" component="div" sx={{ m: 0.5 }}>
      useColorScheme(): mode {mode ?? '…'}, colorScheme {colorScheme ?? '…'}
    </Typography>
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

// It receives `className` from nowhere and renders none: the provider's own element carries the theme.
function DropsClassName({ children }: { children: React.ReactNode }) {
  return <section data-inspect="drops className">{children}</section>;
}

// Light and dark styles keyed on the color scheme selector, through `theme.applyStyles()`.
const SchemeLabel = styled('span')(({ theme }) => [
  { padding: 4, border: '2px solid #1976d2' },
  theme.applyStyles('dark', { border: '2px solid #ffb74d' }),
]);

function Link({ label }: { label: string }) {
  return (
    <Box
      component="span"
      data-inspect={label}
      sx={{ m: 0.5, color: 'var(--mui-palette-text-link)' }}
    >
      {label}
    </Box>
  );
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
    title: '1. Two top-level providers',
    description:
      'A top-level provider writes to :root and renders no element. Two of them overwrite each other, and the last one wins for both. Logs a warning in development that points to `isolated`.',
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
    title: '2. Top-level provider + isolated siblings',
    description:
      'An isolated provider sets all its variables on its element and has its own mode, in its own marker, whatever the selector of its theme.',
    code: `<ThemeProvider theme={appTheme}><App /></ThemeProvider>
<ThemeProvider theme={widgetTheme} isolated>
  <Widget />
</ThemeProvider>
<ThemeProvider theme={widgetDataTheme} isolated defaultMode="dark">
  <Widget />
</ThemeProvider>`,
    render: () => (
      <React.Fragment>
        <Root theme={appTheme}>
          <div data-inspect="app child">
            <ModeToggle label="app mode" />
            <Swatch label="app" />
          </div>
        </Root>
        <ThemeProvider theme={widgetTheme} isolated>
          <div data-inspect="widget child">
            <ModeToggle label="widget mode" />
            <Swatch label="widget" />
          </div>
        </ThemeProvider>
        <ThemeProvider theme={widgetDataTheme} isolated defaultMode="dark">
          <div data-inspect="data selector widget child">
            <ModeToggle label="widget mode" />
            <Swatch label="widget" />
          </div>
        </ThemeProvider>
      </React.Fragment>
    ),
  },
  {
    title: '3. Nested, different variables',
    description:
      'The provider renders a div with display: contents, whose class only sets the variables that differ. It follows the outer mode, also when its theme has another colorSchemeSelector, and useColorScheme() inside it reads and sets the outer mode.',
    code: `<ThemeProvider theme={appTheme}>
  <Button />
  <ThemeProvider theme={promoTheme}>
    <ModeToggle /><Button />
  </ThemeProvider>
  <ThemeProvider theme={widgetDataTheme /* colorSchemeSelector: 'data' */}>
    <SchemeLabel /><Button />
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div data-inspect="outer child">
          <ModeToggle label="outer mode" />
          <Swatch label="outer" />
          <ThemeProvider theme={promoTheme}>
            <ModeToggle label="nested mode" />
            <Swatch label="nested" />
            <span data-inspect="nested child" />
          </ThemeProvider>
          <ThemeProvider theme={widgetDataTheme}>
            <SchemeLabel>data selector</SchemeLabel>
            <Swatch label="nested" />
            <span data-inspect="nested child, data selector" />
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '4. Nested, any children (bug 3)',
    description:
      'The theme is on the element of the provider, so several children and a component that drops the className it would have received all get it.',
    code: `<ThemeProvider theme={promoTheme}>
  <Button />
  <Button />
</ThemeProvider>
<ThemeProvider theme={promoTheme}>
  <DropsClassName><Button /></DropsClassName>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div>
          <ThemeProvider theme={promoTheme}>
            <Swatch label="several 1" />
            <Swatch label="several 2" />
            <span data-inspect="several children" />
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
    title: '5. A chain of providers (bug 1)',
    description:
      'Each level sets its own variables on its own element, so the closest one wins: the inner appTheme is blue again, and promo → accent applies both. The portals of promo → accent get one class with both changes, since they are outside both elements.',
    code: `<ThemeProvider theme={appTheme}>
  <ThemeProvider theme={promoTheme}>
    <ThemeProvider theme={appTheme}>
      <Button />
    </ThemeProvider>
  </ThemeProvider>
  <ThemeProvider theme={promoTheme}>
    <ThemeProvider theme={accentTheme}>
      <Button /><Button color="secondary" />
      <Dialog /><Menu />
    </ThemeProvider>
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div>
          <ThemeProvider theme={promoTheme}>
            <span data-inspect="app → promo" />
            <ThemeProvider theme={appTheme}>
              <div data-inspect="app → promo → app">
                <Swatch label="back to app" />
              </div>
            </ThemeProvider>
          </ThemeProvider>
          <ThemeProvider theme={promoTheme}>
            <ThemeProvider theme={accentTheme}>
              <div data-inspect="promo → accent">
                <Swatch label="direct nesting" />
                <Button variant="contained" color="secondary" size="small" sx={{ m: 0.5 }}>
                  secondary
                </Button>
                <Portals label="promo → accent" />
              </div>
            </ThemeProvider>
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '6. Function themes',
    description:
      'A function theme applies like the object theme it returns: a copy of the outer theme with changes, or createTheme(outer, …), is scoped too, and both derive the primary light and dark shades from the new main color. As in createTheme(), `palette` is the default (light) color scheme, so in dark mode both keep the outer dark primary unless they change colorSchemes.dark.',
    code: `<ThemeProvider theme={appTheme}>
  <ThemeProvider theme={(outer) => ({ ...outer, palette: { ...outer.palette, primary: { main: '#2e7d32' } } })}>
    <Button />
  </ThemeProvider>
  <ThemeProvider theme={(outer) => createTheme(outer, { palette: { primary: { main: '#9c27b0' } } })}>
    <Button />
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div>
          <ModeToggle label="outer mode" />
          <ThemeProvider
            theme={(outer: any) => ({
              ...outer,
              palette: { ...outer.palette, primary: { main: '#2e7d32' } },
            })}
          >
            <div data-inspect="spread copy">
              <Swatch label="spread copy" />
            </div>
          </ThemeProvider>
          <ThemeProvider
            theme={(outer: any) =>
              createTheme(outer, { palette: { primary: { main: '#9c27b0' } } })
            }
          >
            <div data-inspect="createTheme(outer, …)">
              <Swatch label="createTheme(outer)" />
            </div>
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '7. The render prop',
    description:
      'Pick the element where a div is not valid, render the themed component itself so no wrapper is added, or pass a function that receives the props and the state.',
    code: `<ul>
  <ThemeProvider theme={promoTheme} render={<li />}>…</ThemeProvider>
</ul>
<table>
  <ThemeProvider theme={promoTheme} render={<tbody />}><tr>…</tr></ThemeProvider>
</table>
<ThemeProvider theme={promoTheme} render={<Button variant="contained" />}>
  Promo
</ThemeProvider>
<ThemeProvider
  theme={promoTheme}
  render={(props, state) => <section {...props} data-mode={state.mode} />}
>…</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div>
          <ul>
            <ThemeProvider theme={promoTheme} render={<li />}>
              <Swatch label="in li" />
              <span data-inspect="li" />
            </ThemeProvider>
          </ul>
          <table>
            <ThemeProvider theme={promoTheme} render={<tbody />}>
              <tr>
                <td data-inspect="tbody">
                  <Swatch label="in tbody" />
                </td>
              </tr>
            </ThemeProvider>
          </table>
          <ThemeProvider
            theme={promoTheme}
            render={
              <Button variant="contained" sx={{ m: 0.5 }} data-inspect="Button as the element" />
            }
          >
            Promo
          </ThemeProvider>
          <ModeToggle label="outer mode" />
          <ThemeProvider
            theme={promoTheme}
            render={(props: object, state: { mode: string }) => (
              <section {...props} data-mode={state.mode} />
            )}
          >
            <div data-inspect="section with data-mode">
              <Swatch label="in section" />
            </div>
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '8. Portals',
    description:
      'Dialog, Menu and Tooltip get one scope class on their own root, in a nested provider and in an isolated one. useThemeScope() does it for other portals.',
    code: `<ThemeProvider theme={appTheme}>
  <ThemeProvider theme={promoTheme}>
    <Dialog /><Menu /><Tooltip /><Toast />
  </ThemeProvider>
</ThemeProvider>
<ThemeProvider theme={widgetTheme} isolated defaultMode="dark">
  <Dialog /><Menu /><Tooltip /><Toast />
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
        <ThemeProvider theme={widgetTheme} isolated defaultMode="dark">
          <div data-inspect="isolated child">
            <ModeToggle label="isolated mode" />
            <Portals label="isolated" />
          </div>
        </ThemeProvider>
      </React.Fragment>
    ),
  },
  {
    title: '9. Isolated section with its own mode (bug 2 and the leaks)',
    description:
      'A light section in a dark page: the page class on <html> stays the page mode, and neither the page dark variables nor its applyStyles("dark") styles reach the section.',
    code: `<ThemeProvider theme={appTheme} defaultMode="dark">
  <SchemeLabel />
  <ThemeProvider theme={widgetTheme} isolated defaultMode="light">
    <SchemeLabel />
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme} defaultMode="dark">
        <Box
          data-inspect="dark page"
          sx={{ p: 1, bgcolor: 'background.default', color: 'text.primary' }}
        >
          <ModeToggle label="page mode" />
          <SchemeLabel>page</SchemeLabel>
          <ThemeProvider theme={widgetTheme} isolated defaultMode="light">
            <Box
              data-inspect="light section"
              sx={{ p: 1, bgcolor: 'background.default', color: 'text.primary' }}
            >
              <ModeToggle label="section mode" />
              <SchemeLabel>section</SchemeLabel>
              <Swatch label="section" />
            </Box>
          </ThemeProvider>
        </Box>
      </Root>
    ),
  },
  {
    title: '10. Nested in an isolated provider',
    description:
      'A nested provider follows the closest isolated provider, not the page. Toggle both modes: the nested section only changes with the isolated one.',
    code: `<ThemeProvider theme={appTheme}>
  <ThemeProvider theme={widgetTheme} isolated defaultMode="dark">
    <ThemeProvider theme={promoTheme}>
      <Button />
    </ThemeProvider>
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div data-inspect="page child">
          <ModeToggle label="page mode" />
          <ThemeProvider theme={widgetTheme} isolated defaultMode="dark">
            <Box data-inspect="isolated child" sx={{ p: 1, bgcolor: 'background.default' }}>
              <ModeToggle label="isolated mode" />
              <ThemeProvider theme={promoTheme}>
                <div data-inspect="nested in isolated">
                  <Swatch label="nested" />
                </div>
              </ThemeProvider>
            </Box>
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '11. Isolated in isolated',
    description:
      'Each isolated provider has its own marker, so a nested provider follows the closest one: the light inner section ignores the dark outer one around it.',
    code: `<ThemeProvider theme={widgetTheme} isolated defaultMode="dark">
  <ThemeProvider theme={accentTheme} isolated defaultMode="light">
    <ThemeProvider theme={promoTheme}>
      <Button color="secondary" />
    </ThemeProvider>
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <ThemeProvider theme={widgetTheme} isolated defaultMode="dark">
          <Box data-inspect="outer isolated" sx={{ p: 1, bgcolor: 'background.default' }}>
            <ModeToggle label="outer isolated mode" />
            <ThemeProvider theme={accentTheme} isolated defaultMode="light">
              <Box data-inspect="inner isolated" sx={{ p: 1, bgcolor: 'background.default' }}>
                <ModeToggle label="inner isolated mode" />
                <ThemeProvider theme={promoTheme}>
                  <div data-inspect="nested in inner">
                    <Button variant="contained" color="secondary" size="small" sx={{ m: 0.5 }}>
                      secondary
                    </Button>
                  </div>
                </ThemeProvider>
              </Box>
            </ThemeProvider>
          </Box>
        </ThemeProvider>
      </Root>
    ),
  },
  {
    title: '12. Variables that reference a changed one (bug 4)',
    description:
      'text.link is var(--mui-palette-primary-main). The nested provider declares it again, so the inner link follows the inner primary color.',
    code: `<ThemeProvider theme={blueLinkTheme}>
  <Link />
  <ThemeProvider theme={redLinkTheme}>
    <Link />
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={blueLinkTheme}>
        <div>
          <Link label="outer link" />
          <ThemeProvider theme={redLinkTheme}>
            <Link label="inner link" />
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '13. Nested theme with another prefix',
    description:
      'Like the Material UI demos inside the docs theme: the nested theme shares no variable with the outer one, so its element gets all of them. It follows the outer mode, and its portals get its class along with the outer scope.',
    code: `<ThemeProvider theme={docsTheme /* cssVarPrefix: 'docs' */}>
  <ThemeProvider theme={promoTheme /* cssVarPrefix: 'mui' */}>
    <Button /><Dialog /><Menu />
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={docsTheme}>
        <div data-inspect="page (docs prefix)">
          <ModeToggle label="page mode" />
          <ThemeProvider theme={promoTheme}>
            <div data-inspect="nested (mui prefix)">
              <Swatch label="nested" />
              <Portals label="other prefix" />
            </div>
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '14. Single-scheme nested themes',
    description:
      'A nested theme with only a dark scheme stays dark, and one with only a light scheme, like createTheme({ cssVariables: true, palette }), stays light, whatever the outer mode is. Inside them, applyStyles("dark"), useColorScheme().colorScheme, nested themes and their portals follow that color scheme, while setMode() still changes the page.',
    code: `<ThemeProvider theme={appTheme}>
  <ThemeProvider theme={forcedDarkTheme /* palette: { mode: 'dark' } */}>
    <ModeToggle /><SchemeLabel /><Button />
    <ThemeProvider theme={promoTheme}>
      <Button /><Dialog /><Menu />
    </ThemeProvider>
  </ThemeProvider>
  <ThemeProvider theme={lightOnlyTheme /* palette: { primary } */}>
    <SchemeLabel /><Button />
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <Box
          data-inspect="outer child"
          sx={{ p: 1, bgcolor: 'background.default', color: 'text.primary' }}
        >
          <ModeToggle label="outer mode" />
          <ThemeProvider theme={forcedDarkTheme}>
            <Box
              data-inspect="dark-only child"
              sx={{ p: 1, bgcolor: 'background.default', color: 'text.primary' }}
            >
              <ModeToggle label="page mode, from the dark section" />
              <ColorSchemeReport />
              <SchemeLabel>dark only</SchemeLabel>
              <Swatch label="always dark" />
              <ThemeProvider theme={promoTheme}>
                <div data-inspect="promo in dark-only">
                  <Swatch label="promo, dark" />
                  <Portals label="promo in dark-only" />
                </div>
              </ThemeProvider>
            </Box>
          </ThemeProvider>
          <ThemeProvider theme={lightOnlyTheme}>
            <Box
              data-inspect="light-only child"
              sx={{ p: 1, bgcolor: 'background.default', color: 'text.primary' }}
            >
              <SchemeLabel>light only</SchemeLabel>
              <Swatch label="always light" />
            </Box>
          </ThemeProvider>
        </Box>
      </Root>
    ),
  },
  {
    title: '15. Nested, same variables, then different ones',
    description:
      'With sameVarsTheme (only component defaults change), the div has no scope class. Click the counter, then switch to promoTheme: the div gets the class and the count stays, so nothing remounts.',
    code: `<ThemeProvider theme={appTheme}>
  <ThemeProvider theme={different ? promoTheme : sameVarsTheme}>
    <Counter />
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <ThemeSwitcher />
      </Root>
    ),
  },
  {
    title: '16. Nested, other tokens',
    description:
      'Shape, spacing and typography are variables too, so a nested theme that changes them, like a rounded or denser section, scopes them like the palette, and theme.spacing() inside it uses the nested spacing.',
    code: `<ThemeProvider theme={appTheme}>
  <Box sx={{ p: 1 }}><Button /></Box>
  <ThemeProvider theme={roundedTheme /* borderRadius 16, spacing 12, Georgia */}>
    <Box sx={{ p: 1 }}><Button /></Box>
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={appTheme}>
        <div>
          <Box data-inspect="outer box" sx={{ p: 1 }}>
            <Swatch label="outer" />
          </Box>
          <ThemeProvider theme={roundedTheme}>
            <Box data-inspect="nested box" sx={{ p: 1 }}>
              <Swatch label="nested" />
            </Box>
          </ThemeProvider>
        </div>
      </Root>
    ),
  },
  {
    title: '17. Page theme with a single color scheme',
    description:
      'A page theme with only a dark scheme, like createTheme({ cssVariables: true, palette: { mode: "dark" } }), never changes its color scheme, and nothing on the page selects it. A nested theme with light and dark uses its dark scheme there: its variables, applyStyles("dark") and its portals.',
    code: `<ThemeProvider theme={darkPageTheme /* palette: { mode: 'dark' } */}>
  <Button />
  <ThemeProvider theme={promoTheme /* light and dark */}>
    <SchemeLabel /><Button /><Dialog /><Menu />
  </ThemeProvider>
</ThemeProvider>`,
    render: () => (
      <Root theme={darkPageTheme}>
        <Box
          data-inspect="page child"
          sx={{ p: 1, bgcolor: 'background.default', color: 'text.primary' }}
        >
          <Swatch label="page, dark" />
          <ThemeProvider theme={promoTheme}>
            <div data-inspect="promo in dark page">
              <SchemeLabel>promo</SchemeLabel>
              <Swatch label="promo, dark" />
              <Portals label="promo in dark page" />
            </div>
          </ThemeProvider>
        </Box>
      </Root>
    ),
  },
];

// ---------------------------------------------------------------------------
// Inspector: reads what ended up in the iframe.

const interestingDeclaration =
  /color-scheme|--(mui|docs)-palette-(primary-main|secondary-main|text-link):|--mui-(spacing|shape-borderRadius|font-button):/;

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
    const link = read('--mui-palette-text-link');
    const docsPrimary = read('--docs-palette-primary-main');
    // Spacing and border radius are only shown where they differ from `:root`.
    const rootStyle = view.getComputedStyle(doc.documentElement);
    const tokens = ['--mui-spacing', '--mui-shape-borderRadius']
      .filter((name) => read(name) !== (rootStyle.getPropertyValue(name).trim() || '—'))
      .map((name) => `${name.replace('--mui-', '')} ${read(name)}, `)
      .join('');
    return `primary ${read('--mui-palette-primary-main')}, secondary ${read('--mui-palette-secondary-main')}, ${docsPrimary === '—' ? '' : `docs primary ${docsPrimary}, `}${link === '—' ? '' : `link color ${style.color}, `}${tokens}color-scheme ${style.colorScheme}`;
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
    unused
      ? `\n${unused} rule(s) for portals: the portals of a provider nested in another nested or isolated one get one class with every variable they would miss outside its element, used once a dialog, menu or tooltip opens`
      : '',
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
          what ended up there: the scope classes and markers, the computed primary and secondary
          colors and color scheme, and the scoped CSS rules (palette, color scheme, spacing, shape
          and button font declarations only). Bugs 1 to 4 are the ones from the review. Open the
          browser console for the development warnings.
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
