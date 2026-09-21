import * as React from 'react';
import Head from 'next/head';
import {
  createTheme,
  ThemeProvider,
  useColorScheme,
  Theme,
  ThemeOptions,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Autocomplete from '@mui/material/Autocomplete';
import Pagination from '@mui/material/Pagination';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';

declare module '@mui/material/styles' {
  interface StateGroupOverrides {
    input: true;
    ghost: true;
    plain: true;
    navigation: true;
    dataDisplay: true;
    field: true;
    feedback: true;
  }
}

// ---------------------------------------------------------------------------
// Neobrutalism look. Reference values: neobrutalism.dev (ekmas/neobrutalism-components)
// ---------------------------------------------------------------------------

const ink = '#000000';
const shadow = (px: number, color = ink) => `${px}px ${px}px 0 0 ${color}`;
const press = (px: number) => `translate(${px}px, ${px}px)`;

const neoPaletteLight = {
  primary: { main: '#5294FF', contrastText: ink },
  secondary: { main: '#7A83FF', contrastText: ink },
  error: { main: '#FF4D50', contrastText: ink },
  warning: { main: '#FACC00', contrastText: ink },
  success: { main: '#05E17A', contrastText: ink },
  info: { main: '#7A83FF', contrastText: ink },
  background: { default: '#DCEBFE', paper: '#FFFFFF' },
  text: { primary: '#000000', secondary: '#404040' },
  divider: ink,
};

const neoPaletteDark = {
  primary: { main: '#5294FF', contrastText: ink },
  secondary: { main: '#7A83FF', contrastText: ink },
  error: { main: '#FF4D50', contrastText: ink },
  warning: { main: '#FACC00', contrastText: ink },
  success: { main: '#05E17A', contrastText: ink },
  info: { main: '#7A83FF', contrastText: ink },
  background: { default: '#1D1F27', paper: '#212121' },
  text: { primary: '#F5F5F5', secondary: '#B8B8B8' },
  divider: ink,
};

function neoState(scheme: 'light' | 'dark') {
  const surface = scheme === 'light' ? '#FFFFFF' : '#2E2E2E';
  const surfaceText = scheme === 'light' ? '#000000' : '#F5F5F5';
  const hoverTint = scheme === 'light' ? 'rgba(82, 148, 255, 0.25)' : 'rgba(82, 148, 255, 0.35)';
  const rowTint = scheme === 'light' ? 'rgba(82, 148, 255, 0.15)' : 'rgba(82, 148, 255, 0.25)';
  return {
    // solid controls: Button contained, Chip filled
    input: {
      primary: {
        initial: {
          backgroundColor: '#5294FF',
          color: ink,
          border: `2px solid ${ink}`,
          boxShadow: shadow(4),
        },
        hover: { transform: press(2), boxShadow: shadow(2) },
        active: { transform: press(4), boxShadow: 'none' },
        disabled: { opacity: 0.5 },
      },
      default: {
        initial: {
          backgroundColor: surface,
          color: surfaceText,
          border: `2px solid ${ink}`,
          boxShadow: shadow(2),
        },
        hover: { transform: press(1), boxShadow: shadow(1) },
        active: { transform: press(2), boxShadow: 'none' },
        disabled: { opacity: 0.5 },
      },
    },
    // outlined quiet controls: Button outlined, Chip outlined
    ghost: {
      primary: {
        initial: {
          backgroundColor: surface,
          color: surfaceText,
          border: `2px solid ${ink}`,
          boxShadow: shadow(4),
        },
        hover: { transform: press(2), boxShadow: shadow(2) },
        active: { transform: press(4), boxShadow: 'none' },
        disabled: { opacity: 0.5 },
      },
      error: {
        initial: {
          backgroundColor: surface,
          color: '#FF4D50',
          border: `2px solid ${ink}`,
          boxShadow: shadow(4),
        },
        hover: { transform: press(2), boxShadow: shadow(2) },
        active: { transform: press(4), boxShadow: 'none' },
        disabled: { opacity: 0.5 },
      },
      default: {
        initial: {
          backgroundColor: surface,
          color: surfaceText,
          border: `2px solid ${ink}`,
          boxShadow: shadow(2),
        },
        hover: { transform: press(1), boxShadow: shadow(1) },
        active: { transform: press(2), boxShadow: 'none' },
        disabled: { opacity: 0.5 },
      },
    },
    // borderless quiet controls: Button text
    plain: {
      primary: {
        initial: { color: surfaceText },
        hover: { backgroundColor: hoverTint },
        active: { backgroundColor: 'rgba(82, 148, 255, 0.45)' },
        disabled: { opacity: 0.5 },
      },
      error: {
        initial: { color: '#FF4D50' },
        hover: { backgroundColor: 'rgba(255, 77, 80, 0.2)' },
        active: { backgroundColor: 'rgba(255, 77, 80, 0.35)' },
        disabled: { opacity: 0.5 },
      },
    },
    // list rows: ListItemButton, MenuItem, Autocomplete options
    navigation: {
      default: {
        hover: { backgroundColor: hoverTint },
        active: { backgroundColor: 'rgba(82, 148, 255, 0.45)' },
        selected: { backgroundColor: '#5294FF', color: ink },
        selectedHover: { backgroundColor: '#3D82F6' },
        selectedActive: { backgroundColor: '#2F74E8' },
      },
    },
    // data selection: TableRow, ToggleButton, PaginationItem
    dataDisplay: {
      default: {
        hover: { backgroundColor: rowTint },
        selected:
          scheme === 'light'
            ? { backgroundColor: ink, color: '#FFFFFF' }
            : { backgroundColor: '#F5F5F5', color: ink },
        selectedHover:
          scheme === 'light' ? { backgroundColor: '#26262B' } : { backgroundColor: '#D6D6D6' },
        disabled: { opacity: 0.5 },
      },
    },
    // text fields: FilledInput (resolved by the input's color prop — primary by default)
    field: {
      primary: {
        initial: {
          backgroundColor: surface,
          color: surfaceText,
          border: `2px solid ${ink}`,
        },
        hover: { backgroundColor: surface },
        focused: { boxShadow: shadow(4) },
        disabled: { opacity: 0.5 },
      },
      error: {
        initial: {
          backgroundColor: surface,
          color: '#FF4D50',
          border: '2px solid #FF4D50',
        },
        focused: { boxShadow: shadow(4, '#FF4D50') },
      },
    },
    // alerts
    feedback: {
      warning: {
        initial: {
          backgroundColor: '#FACC00',
          color: ink,
          border: `2px solid ${ink}`,
          boxShadow: shadow(4),
        },
      },
      error: {
        initial: {
          backgroundColor: '#FF4D50',
          color: ink,
          border: `2px solid ${ink}`,
          boxShadow: shadow(4),
        },
      },
      success: {
        initial: {
          backgroundColor: '#05E17A',
          color: ink,
          border: `2px solid ${ink}`,
          boxShadow: shadow(4),
        },
      },
      info: {
        initial: {
          backgroundColor: '#7A83FF',
          color: ink,
          border: `2px solid ${ink}`,
          boxShadow: shadow(4),
        },
      },
    },
  };
}

const neoBindings = {
  MuiButton: {
    stateVariants: {
      default: 'input',
      contained: 'input',
      outlined: 'ghost',
      text: 'plain',
    },
  },
  MuiChip: {
    stateVariants: { default: 'input', filled: 'input', outlined: 'ghost' },
  },
  MuiMenuItem: { stateVariants: { default: 'navigation' } },
  MuiListItemButton: { stateVariants: { default: 'navigation' } },
  MuiAutocomplete: { stateVariants: { default: 'navigation' } },
  MuiTableRow: { stateVariants: { default: 'dataDisplay' } },
  MuiToggleButton: { stateVariants: { default: 'dataDisplay' } },
  MuiPaginationItem: { stateVariants: { default: 'dataDisplay', text: 'dataDisplay' } },
  MuiFilledInput: { stateVariants: { default: 'field' } },
  MuiAlert: { stateVariants: { standard: 'feedback' } },
} as const;

const dmSans = '"DM Sans", "DM Sans Fallback", sans-serif';

function makeNeoTheme(bindings: boolean): Theme {
  const staticComponents: ThemeOptions['components'] = {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `2px solid ${ink}`,
          boxShadow: shadow(4),
          borderRadius: theme.shape.borderRadius,
          backgroundImage: 'none',
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: `2px solid ${ink}` },
        head: { fontWeight: 700 },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { border: `2px solid ${ink}`, boxShadow: shadow(2), borderRadius: 5 },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: { border: 'none', borderRadius: 0, fontWeight: 700 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { fontWeight: 700, borderRadius: 5 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700, borderRadius: 5 },
      },
    },
    MuiFilledInput: {
      defaultProps: { disableUnderline: true },
      styleOverrides: {
        root: { borderRadius: 5 },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 700,
          '&.Mui-focused': { color: (theme.vars || theme).palette.text.primary },
        }),
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 5, fontWeight: 500 },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { boxShadow: shadow(4) },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 5, margin: '0 8px', width: 'auto' },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: { fontWeight: 700, borderRadius: 5 },
      },
    },
  };
  const boundComponents = bindings
    ? (Object.fromEntries(
        Object.entries(neoBindings).map(([key, value]) => [
          key,
          { ...(staticComponents as Record<string, object>)[key], ...value },
        ]),
      ) as ThemeOptions['components'])
    : {};
  return createTheme({
    cssVariables: { colorSchemeSelector: 'class' },
    colorSchemes: {
      light: { palette: neoPaletteLight, state: neoState('light') },
      dark: { palette: neoPaletteDark, state: neoState('dark') },
    },
    shape: { borderRadius: 5 },
    typography: {
      fontFamily: dmSans,
      fontWeightRegular: 500,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h6: { fontWeight: 700 },
      subtitle2: { fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 700 },
    },
    focusVisible: {
      outlineWidth: 2,
      outlineColor: 'var(--mui-palette-text-primary)',
      outlineOffset: 2,
    },
    components: { ...staticComponents, ...boundComponents },
  });
}

const themes: Record<string, { label: string; bound: Theme; unbound: Theme }> = {
  material: {
    label: 'Material',
    bound: createTheme({
      cssVariables: { colorSchemeSelector: 'class' },
      colorSchemes: { light: true, dark: true },
    }),
    unbound: createTheme({
      cssVariables: { colorSchemeSelector: 'class' },
      colorSchemes: { light: true, dark: true },
    }),
  },
  neo: {
    label: 'Neobrutalism',
    bound: makeNeoTheme(true),
    unbound: makeNeoTheme(false),
  },
};

// ---------------------------------------------------------------------------
// Mail data
// ---------------------------------------------------------------------------

const folders = [
  { name: 'Inbox', count: 12 },
  { name: 'Sent', count: 0 },
  { name: 'Drafts', count: 2 },
  { name: 'Archive', count: 0 },
];

const messages = [
  {
    id: 1,
    from: 'Riley Chen',
    subject: 'Design review notes for the settings page',
    date: 'Sep 21',
    body: 'Attached the notes from this morning. The spacing scale needs one more pass before we hand it off — can you take a look at rows 12 through 18?',
  },
  {
    id: 2,
    from: 'Amara Diallo',
    subject: 'Re: Quarterly infrastructure budget',
    date: 'Sep 21',
    body: 'The revised numbers are in. We are under by 8% if the migration finishes this quarter.',
  },
  {
    id: 3,
    from: 'Build Bot',
    subject: 'Nightly build #4182 passed',
    date: 'Sep 20',
    body: 'All 2,431 tests green. Bundle size delta +0.2 KB.',
  },
  {
    id: 4,
    from: 'Priya Nair',
    subject: 'Team offsite: venue shortlist',
    date: 'Sep 20',
    body: 'Three options inside budget. My vote is the second one — has the best workshop rooms.',
  },
  {
    id: 5,
    from: 'Jonas Weber',
    subject: 'Customer feedback digest, week 38',
    date: 'Sep 19',
    body: 'Highlights: onboarding praise up, two requests for keyboard shortcuts in the editor.',
  },
];

const filterOptions = ['Unread', 'Starred', 'Attachments', 'Mentions'];

// ---------------------------------------------------------------------------
// The pane
// ---------------------------------------------------------------------------

function MailPane() {
  const [folder, setFolder] = React.useState('Inbox');
  const [selectedId, setSelectedId] = React.useState<number | null>(2);
  const [view, setView] = React.useState<'comfortable' | 'compact'>('comfortable');
  const [filters, setFilters] = React.useState<string[]>(['Unread']);
  const [sortAnchor, setSortAnchor] = React.useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = React.useState('Date');
  const [replyTo, setReplyTo] = React.useState('riley@example.com');
  const [replyBody, setReplyBody] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const selected = messages.find((message) => message.id === selectedId) ?? null;
  const replyToError = replyTo.length > 0 && !replyTo.includes('@');

  return (
    <Paper elevation={0} sx={{ display: 'flex', overflow: 'hidden', minHeight: 640 }}>
      <Box
        sx={{
          width: 200,
          flexShrink: 0,
          borderRight: '2px solid',
          borderColor: 'divider',
          py: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
          Mail
        </Typography>
        <List disablePadding>
          {folders.map((item) => (
            <ListItemButton
              key={item.name}
              selected={folder === item.name}
              onClick={() => setFolder(item.name)}
            >
              <ListItemText
                primary={item.name}
                secondary={item.count > 0 ? `${item.count} unread` : null}
                slotProps={{ secondary: { color: 'inherit', sx: { opacity: 0.7 } } }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Stack sx={{ flexGrow: 1, minWidth: 0, p: 2, gap: 2 }}>
        <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" onClick={() => setSent(false)}>
            Compose
          </Button>
          <Button variant="outlined">Archive</Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <ToggleButtonGroup
            exclusive
            size="small"
            value={view}
            onChange={(event, next) => next && setView(next)}
          >
            <ToggleButton value="comfortable">Cozy</ToggleButton>
            <ToggleButton value="compact">Compact</ToggleButton>
          </ToggleButtonGroup>
          <Button variant="text" onClick={(event) => setSortAnchor(event.currentTarget)}>
            Sort: {sortBy}
          </Button>
          <Menu
            anchorEl={sortAnchor}
            open={Boolean(sortAnchor)}
            onClose={() => setSortAnchor(null)}
          >
            {['Date', 'Sender', 'Subject'].map((option) => (
              <MenuItem
                key={option}
                selected={option === sortBy}
                onClick={() => {
                  setSortBy(option);
                  setSortAnchor(null);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Stack>

        <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
          <Autocomplete
            options={messages.map((message) => message.subject)}
            sx={{ width: 320 }}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Search mail" size="small" />
            )}
          />
          {filterOptions.map((filter) => {
            const active = filters.includes(filter);
            return (
              <Chip
                key={filter}
                label={filter}
                variant={active ? 'filled' : 'outlined'}
                color={active ? 'primary' : 'default'}
                onClick={() =>
                  setFilters((prev) =>
                    active ? prev.filter((f) => f !== filter) : [...prev, filter],
                  )
                }
                onDelete={
                  active ? () => setFilters((prev) => prev.filter((f) => f !== filter)) : undefined
                }
              />
            );
          })}
        </Stack>

        <Alert severity="warning">Your mailbox is 90% full — archive old mail to free space.</Alert>
        {sent ? <Alert severity="success">Reply sent.</Alert> : null}

        <Table size={view === 'compact' ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 160 }}>From</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell align="right" sx={{ width: 80 }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message.id}
                hover
                selected={message.id === selectedId}
                onClick={() => setSelectedId(message.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell sx={{ color: 'inherit' }}>{message.from}</TableCell>
                <TableCell sx={{ color: 'inherit' }}>{message.subject}</TableCell>
                <TableCell align="right" sx={{ color: 'inherit' }}>
                  {message.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Pagination count={3} page={1} />
        </Stack>

        {selected ? (
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="subtitle2">{selected.subject}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              {selected.from} · {selected.date}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {selected.body}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack sx={{ gap: 1.5 }}>
              <TextField
                variant="filled"
                label="To"
                size="small"
                value={replyTo}
                error={replyToError}
                helperText={replyToError ? 'Enter a valid address' : ' '}
                onChange={(event) => setReplyTo(event.target.value)}
                sx={{ width: 320 }}
              />
              <TextField
                variant="filled"
                label={`Reply to ${selected.from}`}
                multiline
                minRows={2}
                value={replyBody}
                onChange={(event) => {
                  setReplyBody(event.target.value);
                  setSent(false);
                }}
              />
              <Stack direction="row" sx={{ gap: 1.5 }}>
                <Button
                  variant="contained"
                  disabled={replyBody.trim().length === 0 || replyToError}
                  onClick={() => {
                    setSent(true);
                    setReplyBody('');
                  }}
                >
                  Send
                </Button>
                <Button variant="text" onClick={() => setReplyBody('')}>
                  Discard
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ) : null}
      </Stack>
    </Paper>
  );
}

// ---------------------------------------------------------------------------
// Chrome
// ---------------------------------------------------------------------------

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={mode ?? 'light'}
      onChange={(event, next) => next && setMode(next)}
    >
      <ToggleButton value="light">Light</ToggleButton>
      <ToggleButton value="dark">Dark</ToggleButton>
    </ToggleButtonGroup>
  );
}

function ConfigViewer({ theme }: { theme: Theme }) {
  const bindings = Object.fromEntries(
    Object.entries(theme.components ?? {}).flatMap(([key, value]) => {
      const stateVariants = (value as { stateVariants?: unknown })?.stateVariants;
      return stateVariants ? [[key, { stateVariants }]] : [];
    }),
  );
  return (
    <Box component="details" sx={{ mt: 2, fontFamily: 'monospace', fontSize: 13 }}>
      <Box component="summary" sx={{ cursor: 'pointer', mb: 1 }}>
        View the `state` + `stateVariants` config powering this look
      </Box>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          overflow: 'auto',
          maxHeight: 420,
          bgcolor: 'rgba(0, 0, 0, 0.06)',
          borderRadius: 1,
        }}
      >
        {JSON.stringify(
          {
            colorSchemes: {
              light: { state: (theme.colorSchemes as any)?.light?.state ?? {} },
              dark: { state: (theme.colorSchemes as any)?.dark?.state ?? {} },
            },
            components: bindings,
          },
          null,
          2,
        )}
      </Box>
    </Box>
  );
}

export default function StatesShowcase() {
  const [look, setLook] = React.useState<'material' | 'neo'>('neo');
  const [bindings, setBindings] = React.useState(true);
  const theme = bindings ? themes[look].bound : themes[look].unbound;

  return (
    <ThemeProvider theme={theme} defaultMode="light" disableTransitionOnChange>
      <Head>
        <title>theme.state showcase</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap"
        />
      </Head>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
        <Box sx={{ maxWidth: 1080, mx: 'auto' }}>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 1 }}>
            <Typography variant="h6" sx={{ mr: 'auto' }}>
              One mail app, two design systems
            </Typography>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={look}
              onChange={(event, next) => next && setLook(next)}
            >
              {Object.entries(themes).map(([key, value]) => (
                <ToggleButton key={key} value={key}>
                  {value.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <ModeToggle />
            <FormControlLabel
              control={
                <Switch
                  checked={bindings}
                  disabled={look === 'material'}
                  onChange={(event) => setBindings(event.target.checked)}
                />
              }
              label="State bindings"
            />
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Every component below is unmodified <code>@mui/material</code>. The look — including
            every hover, press, selection, focus, and disabled — comes from the theme: user-defined{' '}
            <code>state</code> groups bound per variant with <code>stateVariants</code>. Turn
            &ldquo;State bindings&rdquo; off to remove only the bindings: typography and radius
            stay, and every interaction falls back to Material.
          </Typography>
          <MailPane />
          <ConfigViewer theme={theme} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
