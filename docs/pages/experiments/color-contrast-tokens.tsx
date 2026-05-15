'use client';
import * as React from 'react';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import PaginationItem, { paginationItemClasses } from '@mui/material/PaginationItem';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import NavigationIcon from '@mui/icons-material/Navigation';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

// ---------------------------------------------------------------------------
// Tokens. Keyed by `${intent}.${mode}.main` / `.contrastText` — token defaults
// are per-mode in `createPalette.js`. Only the intent/mode pairs that actually
// fail the regression have entries. `''` contrastText = let MUI auto-derive.
// ---------------------------------------------------------------------------
type Tokens = {
  'info.light.main': string;
  'info.light.contrastText': string;
  'warning.light.main': string;
  'warning.light.contrastText': string;
  'error.light.main': string;
  'error.light.contrastText': string;
  'error.dark.main': string;
  'error.dark.contrastText': string;
  'primary.light.main': string;
  'primary.light.contrastText': string;
  // Avatar `colorDefault` bg + text — applied via components.MuiAvatar
  // styleOverrides since createTheme (no vars) inlines grey[400]/grey[600]
  // directly. `''` text = leave Avatar's built-in `background.default`.
  'avatar.light.main': string;
  'avatar.light.contrastText': string;
  'avatar.dark.main': string;
  'avatar.dark.contrastText': string;
  contrastThreshold: number;
};

const DEFAULTS: Tokens = {
  'info.light.main': '#0288d1', // lightBlue[700]
  'info.light.contrastText': '',
  'warning.light.main': '#ed6c02',
  'warning.light.contrastText': '',
  'error.light.main': '#c62828', // red[700]
  'error.light.contrastText': '',
  'error.dark.main': '#f44336', // red[500]
  'error.dark.contrastText': '',
  'primary.light.main': '#1976d2', // blue[700]
  'primary.light.contrastText': '',
  'avatar.light.main': '#bdbdbd', // grey[400]
  'avatar.light.contrastText': '',
  'avatar.dark.main': '#757575', // grey[600]
  'avatar.dark.contrastText': '',
  contrastThreshold: 3,
};

// Proposal pre-fill: darken info one shade (it fails with white *and* black
// text, so the token itself must move). contrastText stays `auto` everywhere —
// flip warning/error to `black` via the knobs to see the no-colour-change fix.
// Avatar bg keeps its grey[400]/grey[600] default; only the inherited text
// colour flips to `text.primary` to clear 4.5:1 in both modes (#44179).
const PROPOSED: Tokens = {
  ...DEFAULTS,
  'info.light.main': '#0277bd', // lightBlue[800]
  'avatar.light.contrastText': 'text.primary',
  'avatar.dark.contrastText': 'text.primary',
};

type Intent = 'primary' | 'info' | 'warning' | 'error' | 'avatar';
type Mode = 'light' | 'dark';

function mainKeyOf(intent: Intent, mode: Mode) {
  return `${intent}.${mode}.main` as keyof Tokens;
}
function contrastKeyOf(intent: Intent, mode: Mode) {
  return `${intent}.${mode}.contrastText` as keyof Tokens;
}

function applyIntent(palette: any, intent: Intent, mode: Mode, tokens: Tokens) {
  if (intent === 'avatar') {
    // Avatar isn't a palette intent — handled separately via components.
    return;
  }
  const mainKey = mainKeyOf(intent, mode);
  if (!(mainKey in DEFAULTS)) {
    return;
  }
  const main = tokens[mainKey] as string;
  const contrastText = tokens[contrastKeyOf(intent, mode)] as string;
  const mainChanged = Boolean(main) && main !== (DEFAULTS[mainKey] as string);
  if (!mainChanged && !contrastText) {
    return;
  }
  // `augmentColor` requires `main`, so always include it even when only
  // `contrastText` is being overridden.
  const override: Record<string, string> = { main: main || (DEFAULTS[mainKey] as string) };
  if (contrastText) {
    override.contrastText = contrastText;
  }
  palette[intent] = override;
}

function resolveColorAlias(theme: Theme, value: string): string {
  if (!value.includes('.')) {
    return value;
  }
  let cur: any = theme.palette;
  for (const part of value.split('.')) {
    cur = cur?.[part];
    if (cur == null) {
      return value;
    }
  }
  return typeof cur === 'string' ? cur : value;
}

// Source-equivalent change for #44179: in Avatar.js's `colorDefault: true`
// variant, swap
//   color: (theme.vars || theme).palette.background.default
// for
//   color: (theme.vars || theme).palette.text.primary
// — same shade in both modes, ~10:1 light / ~4.6:1 dark, no token move.
// Always-on in the proposed theme; the `avatar.{mode}.contrastText` knob can
// override it (white/black) for further exploration.
function avatarOverride(mode: Mode, tokens: Tokens) {
  const main = tokens[mainKeyOf('avatar', mode)] as string;
  const text = tokens[contrastKeyOf('avatar', mode)] as string;
  const mainChanged = Boolean(main) && main !== (DEFAULTS[mainKeyOf('avatar', mode)] as string);
  return {
    styleOverrides: {
      root: ({
        theme: t,
        ownerState,
      }: {
        theme: Theme;
        ownerState: { colorDefault?: boolean };
      }) => {
        if (!ownerState.colorDefault) {
          return {};
        }
        const style: Record<string, string> = {
          color: text ? resolveColorAlias(t, text) : (t.vars || t).palette.text.primary,
        };
        if (mainChanged) {
          style.backgroundColor = main;
        }
        return style;
      },
    },
  };
}

// Selected-state colour fix for ToggleButton + outlined PaginationItem,
// hoisted into the proposed theme so reviewers see the patch as a component
// override rather than a source diff. Drops the failing `palette[c].main` text
// (4.0–4.4:1 on its own .main tint) for `.dark` in light mode and `.light` in
// dark mode, both ≥ 4.5:1.
const SELECTED_INTENTS = ['primary', 'secondary', 'info', 'warning', 'error', 'success'] as const;

function selectedColorFor(theme: Theme, color: string | undefined): string | null {
  if (!color || color === 'standard' || !SELECTED_INTENTS.includes(color as any)) {
    return null;
  }
  const entry = (theme.palette as any)[color];
  if (!entry?.dark || !entry?.light) {
    return null;
  }
  return theme.palette.mode === 'dark' ? entry.light : entry.dark;
}

const TOGGLE_BUTTON_PROPOSAL = {
  styleOverrides: {
    root: ({ theme: t, ownerState }: { theme: Theme; ownerState: { color?: string } }) => {
      const c = selectedColorFor(t, ownerState.color);
      return c ? { [`&.${toggleButtonClasses.selected}`]: { color: c } } : {};
    },
  },
};

const PAGINATION_ITEM_PROPOSAL = {
  styleOverrides: {
    root: ({
      theme: t,
      ownerState,
    }: {
      theme: Theme;
      ownerState: { variant?: string; color?: string };
    }) => {
      if (ownerState.variant !== 'outlined') {
        return {};
      }
      const c = selectedColorFor(t, ownerState.color);
      return c ? { [`&.${paginationItemClasses.selected}`]: { color: c } } : {};
    },
  },
};

// AppBar/Alert extend Paper; in dark mode Paper paints a degenerate
// linear-gradient elevation overlay that trips axe's `bgGradient` guard, so
// suppress it. No-op in light mode. Matches the regression fixtures.
const BASE_COMPONENTS = {
  MuiAppBar: { styleOverrides: { root: { backgroundImage: 'none' } } },
  MuiAlert: { styleOverrides: { root: { backgroundImage: 'none' } } },
} as const;

function makeProposedTheme(mode: Mode, tokens: Tokens): Theme {
  const palette: any = { mode, contrastThreshold: tokens.contrastThreshold };
  const intents: Intent[] = mode === 'light' ? ['primary', 'info', 'warning', 'error'] : ['error'];
  intents.forEach((intent) => applyIntent(palette, intent, mode, tokens));
  const components: Record<string, any> = {
    ...BASE_COMPONENTS,
    MuiToggleButton: TOGGLE_BUTTON_PROPOSAL,
    MuiPaginationItem: PAGINATION_ITEM_PROPOSAL,
    MuiAvatar: avatarOverride(mode, tokens),
  };
  return createTheme({ palette, components });
}

const CURRENT_THEMES: Record<Mode, Theme> = {
  light: createTheme({ palette: { mode: 'light' }, components: BASE_COMPONENTS }),
  dark: createTheme({ palette: { mode: 'dark' }, components: BASE_COMPONENTS }),
};

// ---------------------------------------------------------------------------
// Failing cases, derived from test/regressions/a11y/results/*.a11y.json.
// ---------------------------------------------------------------------------
type Case = { label: string; node: React.ReactNode };

function colorCases(colorKey: 'info' | 'warning' | 'error', include?: string[]): Case[] {
  const all: Record<string, React.ReactNode> = {
    'Alert · filled': (
      <Alert variant="filled" severity={colorKey}>
        {colorKey} alert
      </Alert>
    ),
    AppBar: (
      <AppBar position="static" color={colorKey} enableColorOnDark>
        <Toolbar variant="dense" sx={{ minHeight: 40 }}>
          {colorKey} appbar
        </Toolbar>
      </AppBar>
    ),
    Badge: (
      <Badge badgeContent="new" color={colorKey}>
        <Box
          sx={{
            width: 120,
            height: 36,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MailIcon color="action" />
        </Box>
      </Badge>
    ),
    'Button · contained': (
      <Button variant="contained" color={colorKey}>
        {colorKey} contained
      </Button>
    ),
    'Button · text': (
      <Button variant="text" color={colorKey}>
        {colorKey} text
      </Button>
    ),
    'Button · outlined': (
      <Button variant="outlined" color={colorKey}>
        {colorKey} outlined
      </Button>
    ),
    'ButtonGroup · contained': (
      <ButtonGroup variant="contained" color={colorKey}>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    ),
    'Chip · filled': <Chip variant="filled" color={colorKey} label={`${colorKey} filled`} />,
    'Chip · outlined': <Chip variant="outlined" color={colorKey} label={`${colorKey} outlined`} />,
    'Fab · extended': (
      <Fab variant="extended" color={colorKey}>
        <NavigationIcon sx={{ mr: 1 }} />
        {colorKey}
      </Fab>
    ),
    Link: (
      <Link href="https://mui.com" color={colorKey}>
        {colorKey} link
      </Link>
    ),
    Typography: <Typography color={colorKey}>{colorKey} typography text</Typography>,
  };
  const keys = include ?? Object.keys(all);
  return keys.map((label) => ({ label, node: all[label] }));
}

type ColorIntent = Exclude<Intent, 'avatar'>;

function toggleCase(color: ColorIntent): Case {
  return {
    label: 'ToggleButton · selected',
    node: (
      <ToggleButton value="x" selected color={color}>
        {color} selected
      </ToggleButton>
    ),
  };
}

const avatarCases: Case[] = [
  { label: 'Avatar · initials', node: <Avatar>OP</Avatar> },
  {
    label: 'AvatarGroup · +n surplus',
    node: (
      <AvatarGroup max={3}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
        <Avatar>D</Avatar>
        <Avatar>E</Avatar>
      </AvatarGroup>
    ),
  },
];

const paginationCase: Case = {
  label: 'Pagination · outlined',
  // PaginationItem ignores `children` for page items, so widen `page` itself —
  // a single digit trips axe's `shortTextContent` guard and downgrades the real
  // fail to `incomplete` (matches the regression fixture).
  node: (
    <Pagination
      count={3}
      page={2}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} page={item.type === 'page' ? `page ${item.page}` : item.page} />
      )}
    />
  ),
};

type Controls = 'main' | 'full';

type TokenSectionDef = {
  id: string;
  intent: Intent;
  mode: Mode;
  controls: Controls;
  title: string;
  summary: string;
  cases: Case[];
};

const SECTIONS: TokenSectionDef[] = [
  {
    id: 'info-light',
    intent: 'info',
    mode: 'light',
    controls: 'full',
    title: 'info — light mode',
    summary:
      'lightBlue[700] (#0288d1) is 3.85:1 on white — fails as a fill (white text on it) and as text on a white page. White and black text are both below 4.5:1 on it, so the token must move; one shade darker (lightBlue[800] #0277bd) clears the lot. ToggleButton-selected `info.main` text is fixed in the proposed component override (drops to `info.dark`), independent of this token tweak.',
    cases: [...colorCases('info'), toggleCase('info')],
  },
  {
    id: 'warning-light',
    intent: 'warning',
    mode: 'light',
    controls: 'full',
    title: 'warning — light mode',
    summary:
      'White text on #ed6c02 is 3.1:1 — flipping contrastText to black (~6.7:1) fixes every fill case with no colour change. The cases that paint the orange AS text — Link, Typography, outlined Button/Chip — stay below 4.5:1; only a darker token (or a component change) fixes those. ToggleButton-selected uses `warning.dark` in the proposed override.',
    cases: [...colorCases('warning'), toggleCase('warning')],
  },
  {
    id: 'error-light',
    intent: 'error',
    mode: 'light',
    controls: 'main',
    title: 'error — light mode',
    summary:
      'red[700] (#c62828) is fine as a fill in light mode. The one failure is ToggleButton selected — `error.main` text on a translucent `error.main` tint, 4.40:1 — fixed in the proposed component override by switching to `error.dark`.',
    cases: [toggleCase('error')],
  },
  {
    id: 'error-dark',
    intent: 'error',
    mode: 'dark',
    controls: 'full',
    title: 'error — dark mode',
    summary:
      'red[500] (#f44336) with white text is 3.68:1 — flipping contrastText to black (~6:1) fixes the fill cases with no colour change. ToggleButton selected (4.32:1) uses `error.main` as text on an `error.main` tint; the proposed component override switches it to `error.light` for ≥ 4.5:1.',
    cases: [
      ...colorCases('error', [
        'AppBar',
        'Badge',
        'Button · contained',
        'ButtonGroup · contained',
        'Chip · filled',
        'Fab · extended',
      ]),
      toggleCase('error'),
    ],
  },
  {
    id: 'primary-light',
    intent: 'primary',
    mode: 'light',
    controls: 'main',
    title: 'primary — light mode',
    summary:
      'blue[700] (#1976d2) is fine as a fill. ToggleButton selected (`primary.main` text on a `primary.main` tint, 4.14:1) and Pagination outlined (the selected page-item border + label, 3.94:1) both fail — fixed in the proposed component override by switching the selected text to `primary.dark` (light mode) / `primary.light` (dark mode); no token change needed.',
    cases: [toggleCase('primary'), paginationCase],
  },
  {
    id: 'avatar-light',
    intent: 'avatar',
    mode: 'light',
    controls: 'full',
    title: 'avatar — light mode (#44179)',
    summary:
      'Avatar `colorDefault` paints white text on grey[400] (#bdbdbd) — 1.87:1, well below 4.5:1. Hits the initials Avatar and the AvatarGroup `+n` surplus. The proposal keeps the bg and flips the inherited text colour to `text.primary` (≈ rgba(0, 0, 0, 0.87)) — ~10:1, no token-shade change.',
    cases: avatarCases,
  },
  {
    id: 'avatar-dark',
    intent: 'avatar',
    mode: 'dark',
    controls: 'full',
    title: 'avatar — dark mode (#44179)',
    summary:
      'Avatar `colorDefault` in dark mode is dark text on grey[600] (#757575) — 4.06:1, still below 4.5:1. Same fix as light: switch the inherited text to `text.primary` (white in dark mode) → 4.6:1, bg untouched.',
    cases: avatarCases,
  },
];

// ---------------------------------------------------------------------------
// axe-core: run color-contrast on each panel individually so results map back
// unambiguously (a single page-wide run + element bucketing mis-attributes
// `incomplete` nodes that axe reports without an element ref).
// ---------------------------------------------------------------------------
type PanelStatus = 'pass' | 'fail' | 'incomplete';
type PanelResult = { status: PanelStatus; ratio?: number };

const STATUS_RANK: Record<PanelStatus, number> = { fail: 3, incomplete: 2, pass: 1 };

function worstResult(res: { violations: any[]; incomplete: any[]; passes: any[] }) {
  let best: PanelResult | undefined;
  const consider = (status: PanelStatus, ruleResults: any[]) => {
    ruleResults.forEach((rule) => {
      rule.nodes.forEach((node: any) => {
        const check = [...(node.any ?? []), ...(node.all ?? []), ...(node.none ?? [])].find(
          (c: any) => c.id === 'color-contrast',
        );
        const ratio: number | undefined = check?.data?.contrastRatio;
        if (!best || STATUS_RANK[status] > STATUS_RANK[best.status]) {
          best = { status, ratio: ratio ?? best?.ratio };
        } else if (best.ratio == null && ratio != null) {
          best = { ...best, ratio };
        }
      });
    });
  };
  consider('fail', res.violations);
  consider('incomplete', res.incomplete);
  consider('pass', res.passes);
  return best;
}

function useAxeContrast(rootRef: React.RefObject<HTMLElement | null>, version: string) {
  const [results, setResults] = React.useState<Map<string, PanelResult>>(new Map());

  React.useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }
      try {
        const { default: axe } = await import('axe-core');
        const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-cc-panel]'));
        const map = new Map<string, PanelResult>();
        // axe holds a global lock, so panels must be probed sequentially.
        for (let i = 0; i < panels.length; i += 1) {
          if (cancelled) {
            return;
          }
          const panelEl = panels[i];
          const key = panelEl.getAttribute('data-cc-panel') as string;
          try {
            // eslint-disable-next-line no-await-in-loop
            const res = await axe.run(panelEl, { runOnly: ['color-contrast'] });
            const best = worstResult(res);
            if (best) {
              map.set(key, best);
            }
          } catch {
            /* skip this panel */
          }
          if (i % 16 === 15 && !cancelled) {
            setResults(new Map(map));
          }
        }
        if (!cancelled) {
          setResults(new Map(map));
        }
      } catch {
        /* axe unavailable / DOM not ready — leave results empty */
      }
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [rootRef, version]);

  return results;
}

// ---------------------------------------------------------------------------
// UI
// ---------------------------------------------------------------------------
function ResultChip({ result }: { result?: PanelResult }) {
  if (!result) {
    return <Chip size="small" variant="outlined" label="no text node" />;
  }
  const ratio = result.ratio != null ? `${result.ratio.toFixed(2)}:1` : '?';
  if (result.status === 'pass') {
    return <Chip size="small" color="success" label={`${ratio} · pass`} />;
  }
  if (result.status === 'incomplete') {
    return <Chip size="small" color="warning" label={`${ratio} · review`} />;
  }
  return <Chip size="small" color="error" label={`${ratio} · fail`} />;
}

function Panel(props: {
  panelId: string;
  theme: Theme;
  label: string;
  result?: PanelResult;
  children: React.ReactNode;
}) {
  const { panelId, theme, label, result, children } = props;
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
      <Box
        sx={{
          px: 1.5,
          py: 0.75,
          bgcolor: 'action.hover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <ResultChip result={result} />
      </Box>
      <ThemeProvider theme={theme}>
        <Box
          data-cc-panel={panelId}
          sx={{
            p: 2,
            minHeight: 64,
            bgcolor: 'background.default',
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </Box>
  );
}

const CONTRAST_TEXT_OPTIONS = [
  { value: '', label: 'auto' },
  { value: '#fff', label: 'white' },
  { value: 'rgba(0, 0, 0, 0.87)', label: 'black' },
  { value: 'text.primary', label: 'text.primary' },
];

function TokenControls(props: {
  intent: Intent;
  mode: Mode;
  controls: Controls;
  tokens: Tokens;
  setTokens: React.Dispatch<React.SetStateAction<Tokens>>;
}) {
  const { intent, mode, controls, tokens, setTokens } = props;
  const mainKey = mainKeyOf(intent, mode);
  const ctKey = contrastKeyOf(intent, mode);
  const main = tokens[mainKey] as string;
  const set = (key: keyof Tokens, value: string) => setTokens((t) => ({ ...t, [key]: value }));
  const isHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(main);
  const dirty =
    main !== DEFAULTS[mainKey] || (controls === 'full' && tokens[ctKey] !== DEFAULTS[ctKey]);

  return (
    <Stack
      direction="row"
      spacing={2}
      useFlexGap
      sx={{
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        p: 2,
        bgcolor: 'action.hover',
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          size="small"
          label={`${intent}.main`}
          value={main}
          onChange={(event) => set(mainKey, event.target.value)}
          sx={{ width: 150 }}
        />
        <Box
          component="input"
          type="color"
          aria-label={`${intent}.main color picker`}
          value={isHex ? main : '#000000'}
          disabled={!isHex}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            set(mainKey, event.target.value)
          }
          sx={{ width: 36, height: 36, p: 0, border: 'none', background: 'none' }}
        />
      </Box>
      {controls === 'full' && (
        <div>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            {intent}.contrastText
          </Typography>
          <ToggleButtonGroup
            size="small"
            exclusive
            value={tokens[ctKey]}
            onChange={(_, v) => {
              if (v !== null) {
                set(ctKey, v);
              }
            }}
          >
            {CONTRAST_TEXT_OPTIONS.map((o) => (
              <ToggleButton key={o.label} value={o.value}>
                {o.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      )}
      {dirty && (
        <Button
          size="small"
          onClick={() => {
            set(mainKey, DEFAULTS[mainKey] as string);
            if (controls === 'full') {
              set(ctKey, DEFAULTS[ctKey] as string);
            }
          }}
        >
          Reset {intent}
        </Button>
      )}
    </Stack>
  );
}

function TokenSection(props: {
  section: TokenSectionDef;
  tokens: Tokens;
  setTokens: React.Dispatch<React.SetStateAction<Tokens>>;
  results: Map<string, PanelResult>;
}) {
  const { section, tokens, setTokens, results } = props;
  const proposedTheme = React.useMemo(
    () => makeProposedTheme(section.mode, tokens),
    [section.mode, tokens],
  );
  const currentTheme = CURRENT_THEMES[section.mode];

  return (
    <Paper component="section" variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6">{section.title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
        {section.summary}
      </Typography>
      <TokenControls
        intent={section.intent}
        mode={section.mode}
        controls={section.controls}
        tokens={tokens}
        setTokens={setTokens}
      />
      <Box sx={{ mt: 2, display: 'grid', gap: 2, gridTemplateColumns: '1fr' }}>
        {section.cases.map((c, i) => {
          const curId = `${section.id}-${i}-current`;
          const propId = `${section.id}-${i}-proposed`;
          return (
            <Box key={c.label} sx={{ display: 'grid', gap: 1, gridTemplateColumns: '1fr 1fr' }}>
              <Panel
                panelId={curId}
                theme={currentTheme}
                label={`${c.label} · current`}
                result={results.get(curId)}
              >
                {c.node}
              </Panel>
              <Panel
                panelId={propId}
                theme={proposedTheme}
                label={`${c.label} · proposed`}
                result={results.get(propId)}
              >
                {c.node}
              </Panel>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

const TOKEN_KEYS: (keyof Tokens)[] = [
  'info.light.main',
  'info.light.contrastText',
  'warning.light.main',
  'warning.light.contrastText',
  'error.light.main',
  'error.light.contrastText',
  'error.dark.main',
  'error.dark.contrastText',
  'primary.light.main',
  'primary.light.contrastText',
  'avatar.light.main',
  'avatar.light.contrastText',
  'avatar.dark.main',
  'avatar.dark.contrastText',
  'contrastThreshold',
];

const DIFF_LABELS: Record<string, string> = {
  'info.light.main': 'getDefaultInfo(light).main',
  'info.light.contrastText': 'getDefaultInfo(light).contrastText',
  'warning.light.main': 'getDefaultWarning(light).main',
  'warning.light.contrastText': 'getDefaultWarning(light).contrastText',
  'error.light.main': 'getDefaultError(light).main',
  'error.light.contrastText': 'getDefaultError(light).contrastText',
  'error.dark.main': 'getDefaultError(dark).main',
  'error.dark.contrastText': 'getDefaultError(dark).contrastText',
  'primary.light.main': 'getDefaultPrimary(light).main',
  'primary.light.contrastText': 'getDefaultPrimary(light).contrastText',
  'avatar.light.main': 'MuiAvatar colorDefault backgroundColor (light)',
  'avatar.light.contrastText': 'MuiAvatar colorDefault color (light)',
  'avatar.dark.main': 'MuiAvatar colorDefault backgroundColor (dark)',
  'avatar.dark.contrastText': 'MuiAvatar colorDefault color (dark)',
  contrastThreshold: 'createTheme palette.contrastThreshold',
};

function buildDiff(tokens: Tokens): string {
  const fmt = (v: string | number) => {
    if (v === '') {
      return 'undefined (auto-derived)';
    }
    return typeof v === 'number' ? String(v) : `'${v}'`;
  };
  const lines: string[] = [];
  TOKEN_KEYS.forEach((k) => {
    if (tokens[k] === DEFAULTS[k]) {
      return;
    }
    lines.push(`${DIFF_LABELS[k]}: ${fmt(tokens[k])}  // was ${fmt(DEFAULTS[k])}`);
  });
  return lines.length ? lines.join('\n') : 'No changes — matches current defaults.';
}

function tokensFromSearch(search: string): Tokens | null {
  const params = new URLSearchParams(search);
  if (![...params.keys()].length) {
    return null;
  }
  const t: Tokens = { ...DEFAULTS };
  params.forEach((v, k) => {
    if (k === 'contrastThreshold') {
      const n = Number(v);
      if (!Number.isNaN(n)) {
        t.contrastThreshold = n;
      }
    } else if (k in DEFAULTS) {
      (t as any)[k] = v;
    }
  });
  return t;
}

export default function ColorContrastTokens() {
  const [tokens, setTokens] = React.useState<Tokens>(DEFAULTS);
  const [snack, setSnack] = React.useState('');
  const initedRef = React.useRef(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // Read shared values from the URL once on mount.
  React.useEffect(() => {
    const fromUrl = tokensFromSearch(window.location.search);
    if (fromUrl) {
      setTokens(fromUrl);
    }
    initedRef.current = true;
  }, []);

  // Mirror the current knob values into the URL so the link is shareable.
  React.useEffect(() => {
    if (!initedRef.current) {
      return;
    }
    const params = new URLSearchParams();
    TOKEN_KEYS.forEach((k) => {
      if (tokens[k] !== DEFAULTS[k]) {
        params.set(k, String(tokens[k]));
      }
    });
    const qs = params.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }, [tokens]);

  const version = JSON.stringify(tokens);
  const results = useAxeContrast(rootRef, version);
  const dirty = TOKEN_KEYS.some((k) => tokens[k] !== DEFAULTS[k]);

  const copyDiff = async () => {
    const text = buildDiff(tokens);
    try {
      await navigator.clipboard.writeText(text);
      setSnack('Palette diff copied to clipboard');
    } catch {
      setSnack(text);
    }
  };

  return (
    <React.Fragment>
      <Head title="Experiments — Color contrast tokens" description="" />
      <Box
        ref={rootRef}
        sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', py: 4 }}
      >
        <Container>
          <Stack spacing={3}>
            <div>
              <Typography variant="overline" color="text.secondary">
                Accessibility
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.5 }}>
                Color contrast token tweaks
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Components that fail the <code>color-contrast</code> regression (
                <Link
                  href="https://github.com/mui/material-ui/tree/master/test/regressions/a11y/results"
                  target="_blank"
                  rel="noopener"
                >
                  test/regressions/a11y/results
                </Link>
                ), grouped by the palette token at fault, shown current vs. proposed side by side.
                The badges are computed live by <code>axe-core</code> in this browser — the same
                engine the regression uses — so a green badge here means it would pass. Edit the
                token knobs to explore; the URL keeps your values so you can share the link. The
                proposed theme also bakes in two component-level fixes — ToggleButton-selected and
                outlined PaginationItem-selected swap from <code>palette[c].main</code> to{' '}
                <code>.dark</code> (light mode) / <code>.light</code> (dark mode), and Avatar{' '}
                <code>colorDefault</code> flips its inherited text to <code>text.primary</code>{' '}
                (#44179) — so the proposed panels reflect the full PR, not just token tweaks.
                Nothing in <code>createPalette.js</code> or component source changes until a PR.
              </Typography>
            </div>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack
                direction="row"
                spacing={2}
                useFlexGap
                sx={{ flexWrap: 'wrap', alignItems: 'center' }}
              >
                <TextField
                  size="small"
                  type="number"
                  label="contrastThreshold"
                  value={tokens.contrastThreshold}
                  onChange={(event) =>
                    setTokens((t) => ({
                      ...t,
                      contrastThreshold: Number(event.target.value) || DEFAULTS.contrastThreshold,
                    }))
                  }
                  sx={{ width: 150 }}
                  slotProps={{ htmlInput: { step: 0.1, min: 1, max: 21 } }}
                />
                <Button variant="outlined" disabled={!dirty} onClick={() => setTokens(DEFAULTS)}>
                  Reset all
                </Button>
                <Button variant="outlined" onClick={() => setTokens(PROPOSED)}>
                  Load proposal
                </Button>
                <Button variant="contained" onClick={copyDiff}>
                  Copy palette diff
                </Button>
              </Stack>
            </Paper>

            {SECTIONS.map((section) => (
              <TokenSection
                key={section.id}
                section={section}
                tokens={tokens}
                setTokens={setTokens}
                results={results}
              />
            ))}
          </Stack>
        </Container>
      </Box>
      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={4000}
        onClose={() => setSnack('')}
        message={snack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </React.Fragment>
  );
}
