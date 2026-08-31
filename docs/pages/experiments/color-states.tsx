/**
 * Color states — fidelity harness.
 *
 * Renders every configured palette in both schemes and compares what the shipped
 * generators actually emit against the reference tokens they were fitted to.
 *
 * The swatch IS the probe: each generated cell paints the CSS string the theme
 * produced, reads it back with `getComputedStyle`, and resolves it to sRGB bytes
 * through a canvas — so `color-mix()` and `oklch(from …)` are both measured as the
 * browser actually resolved them, not as we assume they resolve. Delta is the
 * worst 8-bit channel difference from the reference token.
 *
 * Two independent themes rather than one with per-scheme variables: the values
 * differ per scheme anyway, and literals keep this page about fidelity rather
 * than about variable plumbing.
 */
import * as React from 'react';
import Head from 'next/head';
import {
  createTheme,
  useTheme,
  ThemeProvider,
  enhanceColorStates,
  colorMix,
  relativeColor,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Triad = [string, string, string];

interface Case {
  /** palette key — `accent` and the `surface*` entries are custom colours */
  key: string;
  label: string;
  generator: string;
  reference: Triad;
}

const LIGHT_CASES: Case[] = [
  {
    key: 'primary',
    label: 'primary',
    generator: "colorMix({ step: '4.36%' })",
    reference: ['#006DA2', '#006698', '#005F8E'],
  },
  {
    key: 'error',
    label: 'error',
    generator: "colorMix({ step: '3.66%' })",
    reference: ['#D13F3F', '#C83838', '#BE3232'],
  },
  {
    key: 'accent',
    label: 'accent (custom)',
    generator: "colorMix({ step: '10.54%' })",
    reference: ['#855ABF', '#724AA6', '#603C8C'],
  },
  {
    key: 'surfaceNeutral',
    label: 'neutral surface',
    generator: "colorMix({ step: '4.34%' })",
    reference: ['#FFFFFF', '#F0F0F0', '#E5E5E5'],
  },
  {
    key: 'surfaceWarning',
    label: 'warning surface',
    generator: 'relativeColor({ lightness: -0.0173, chroma: 0.0229 })',
    reference: ['#FFF9E8', '#FFF3D1', '#FFEDBA'],
  },
];

const DARK_CASES: Case[] = [
  {
    key: 'primary',
    label: 'primary',
    generator: "colorMix({ step: '4.02%' })",
    reference: ['#38ABDF', '#44B0E1', '#51B6E3'],
  },
  {
    key: 'error',
    label: 'error',
    generator: "colorMix({ step: '6.54%' })",
    reference: ['#F18888', '#F29191', '#F39999'],
  },
  {
    key: 'accent',
    label: 'accent (custom)',
    generator: "colorMix({ step: '8.10%' })",
    reference: ['#AA7CE9', '#B385F2', '#BB91F3'],
  },
  {
    key: 'surfaceRaised',
    label: 'raised surface',
    generator: "colorMix({ step: '8.52%' })",
    reference: ['#262626', '#363636', '#454545'],
  },
  {
    key: 'surfaceSelected',
    label: 'selected surface',
    generator: "colorMix({ step: '8.40%', target: '#38ABDF' })",
    reference: ['#254C5F', '#2E5D75', '#366E8A'],
  },
  {
    key: 'surfaceWarning',
    label: 'warning surface',
    generator: 'relativeColor({ lightness: 0.0719, chroma: 0.0136, hue: 4.15 })',
    reference: ['#73400C', '#8C530E', '#B37412'],
  },
];

const lightTheme = enhanceColorStates(
  createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#006DA2' },
      error: { main: '#D13F3F' },
      accent: { main: '#855ABF' },
      surfaceNeutral: { main: '#FFFFFF' },
      surfaceWarning: { main: '#FFF9E8' },
    } as any,
  }),
  {
    primary: colorMix({ step: '4.36%' }),
    error: colorMix({ step: '3.66%' }),
    accent: colorMix({ step: '10.54%' }),
    surfaceNeutral: colorMix({ step: '4.34%' }),
    surfaceWarning: relativeColor({ lightness: -0.0173, chroma: 0.0229 }),
  },
);

const darkTheme = enhanceColorStates(
  createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#38ABDF' },
      error: { main: '#F18888' },
      accent: { main: '#AA7CE9' },
      surfaceRaised: { main: '#262626' },
      surfaceSelected: { main: '#254C5F' },
      surfaceWarning: { main: '#73400C' },
    } as any,
  }),
  {
    primary: colorMix({ step: '4.02%' }),
    error: colorMix({ step: '6.54%' }),
    accent: colorMix({ step: '8.10%' }),
    surfaceRaised: colorMix({ step: '8.52%' }),
    surfaceSelected: colorMix({ step: '8.40%', target: '#38ABDF' }),
    surfaceWarning: relativeColor({ lightness: 0.0719, chroma: 0.0136, hue: 4.15 }),
  },
);

/**
 * Resolve any CSS colour — color-mix, oklch(from …), hex — to sRGB bytes.
 *
 * A sentinel is written first: if the browser cannot parse the colour, assigning
 * it leaves `fillStyle` untouched, and we report that rather than silently
 * measuring the sentinel. That is what distinguishes "unsupported syntax" from
 * "resolved to black".
 */
const SENTINEL = '#123456';

function toBytes(cssColor: string): [number, number, number] | 'unparsed' | null {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    return null;
  }
  ctx.fillStyle = SENTINEL;
  ctx.fillStyle = cssColor;
  if (ctx.fillStyle === SENTINEL && cssColor.toLowerCase() !== SENTINEL) {
    return 'unparsed';
  }
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return a === 0 ? null : [r, g, b];
}

const hex = (b: [number, number, number]) =>
  `#${b
    .map((c) => c.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;

const refBytes = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

const STATES = ['rest', 'hover', 'active'] as const;

function toneFor(delta: number | null) {
  if (delta === null) {
    return 'text.disabled';
  }
  if (delta <= 3) {
    return 'success.main';
  }
  if (delta <= 8) {
    return 'warning.main';
  }
  return 'error.main';
}

function deltaLabel(reference: string | undefined, delta: number | null) {
  if (!reference) {
    return 'ref';
  }
  return delta === null ? '—' : `Δ${delta}`;
}

function Cell({ value, reference }: { value: string; reference?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = React.useState<string | null>(null);
  const [delta, setDelta] = React.useState<number | null>(null);

  // Emotion applies the class after mount, so the first frame can still read
  // `rgba(0, 0, 0, 0)`. Retry across a few frames rather than reporting a colour
  // the element had not been given yet.
  React.useEffect(() => {
    let frames = 0;
    let raf = 0;
    const read = () => {
      const node = ref.current;
      if (!node) {
        return;
      }
      const used = getComputedStyle(node).backgroundColor;
      const transparent = !used || used === 'rgba(0, 0, 0, 0)' || used === 'transparent';
      if (transparent && frames < 12) {
        frames += 1;
        raf = requestAnimationFrame(read);
        return;
      }
      const bytes = toBytes(used);
      if (bytes === 'unparsed') {
        setResolved('unsupported');
        return;
      }
      if (!bytes) {
        setResolved('transparent');
        return;
      }
      setResolved(hex(bytes));
      if (reference) {
        const r = refBytes(reference);
        setDelta(Math.max(...bytes.map((c, i) => Math.abs(c - r[i]))));
      }
    };
    raf = requestAnimationFrame(read);
    return () => cancelAnimationFrame(raf);
  }, [value, reference]);

  const tone = toneFor(delta);

  return (
    <Stack spacing={0.5} sx={{ width: 96 }}>
      <Box
        ref={ref}
        sx={{
          height: 36,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: value,
        }}
      />
      <Typography sx={{ fontFamily: 'monospace', fontSize: 10, opacity: 0.75 }}>
        {resolved ?? '…'}
      </Typography>
      <Typography sx={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: tone }}>
        {deltaLabel(reference, delta)}
      </Typography>
    </Stack>
  );
}

function Row({ item }: { item: Case }) {
  const theme = useTheme();
  const states = theme.states?.[item.key];
  const main = (theme.palette as any)[item.key]?.main as string;
  const generated: Record<string, string> = {
    rest: main,
    hover: states?.hover.backgroundColor ?? main,
    active: states?.active.backgroundColor ?? main,
  };

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ alignItems: 'flex-start', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Box sx={{ width: 230, flexShrink: 0 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{item.label}</Typography>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 10, opacity: 0.6, mt: 0.25 }}>
          {item.generator}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1}>
        {STATES.map((s, i) => (
          <Cell key={`ref-${s}`} value={item.reference[i]} />
        ))}
      </Stack>
      <Stack direction="row" spacing={1}>
        {STATES.map((s, i) => (
          <Cell key={`gen-${s}`} value={generated[s]} reference={item.reference[i]} />
        ))}
      </Stack>
    </Stack>
  );
}

function Section({ title, cases }: { title: string; cases: Case[] }) {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 3, borderRadius: 2 }}>
      <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 0.5 }}>{title}</Typography>
      <Stack direction="row" spacing={3} sx={{ mb: 1 }}>
        <Box sx={{ width: 230, flexShrink: 0 }} />
        <Typography
          sx={{
            width: 304,
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            opacity: 0.55,
          }}
        >
          reference tokens — rest · hover · active
        </Typography>
        <Typography
          sx={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', opacity: 0.55 }}
        >
          generated by the theme
        </Typography>
      </Stack>
      {cases.map((c) => (
        <Row key={c.key} item={c} />
      ))}
    </Box>
  );
}

export default function ColorStates() {
  // Computed after mount: deriving it during render differs between server and
  // client and trips hydration.
  const [supportsRelative, setSupportsRelative] = React.useState(true);
  React.useEffect(() => {
    setSupportsRelative(CSS.supports('color', 'oklch(from red l c h)'));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Color states — fidelity</title>
      </Head>
      <Box sx={{ p: 4, fontFamily: 'system-ui, sans-serif', bgcolor: '#fff' }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>Color states — fidelity</Typography>
        <Typography sx={{ fontSize: 13, opacity: 0.7, maxWidth: 760, mt: 0.5 }}>
          Each generated swatch paints what the theme emitted, then reads it back through the
          browser and resolves it to sRGB. Δ is the worst 8-bit channel difference from the
          reference token the generator was fitted to.
        </Typography>
        {!supportsRelative && (
          <Typography sx={{ fontSize: 12, mt: 1.5, color: 'error.main', fontWeight: 600 }}>
            This browser does not support relative color syntax — rows using relativeColor() will
            not resolve.
          </Typography>
        )}
        <Stack spacing={3} sx={{ mt: 3 }}>
          <ThemeProvider theme={lightTheme}>
            <Section title="Light scheme" cases={LIGHT_CASES} />
          </ThemeProvider>
          <ThemeProvider theme={darkTheme}>
            <Section title="Dark scheme" cases={DARK_CASES} />
          </ThemeProvider>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
