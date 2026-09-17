import * as React from 'react';
import Head from 'next/head';
// Two levels deep only because the split is a prototype living inside
// `@mui/material`. Were it a package of its own this would be one level.
/* eslint-disable no-restricted-imports */
import SliderUnstyled from '@mui/material/Slider/unstyled';
import createAppearance, { prefixed, bare } from '@mui/material/utils/createAppearance';
/* eslint-enable no-restricted-imports */

/**
 * The unstyled Slider dressed by `theme2`, a plain CSS file.
 *
 * Nothing on this page uses Emotion, the theme, or any Material Design style.
 * The component emits its stable `MuiSlider-*` class names and the stylesheet
 * at /static/slider-theme2.css does the rest.
 *
 * The stylesheet is global on purpose, so every Slider on the page picks it up.
 * That is also why there is no Material Slider here to compare against: it
 * carries the same class names and would be restyled too.
 */

// theme2's own appearance vocabulary. Different prop names, different values,
// and a different class naming rule from Material's.
const appearance = createAppearance({
  tone: {
    default: 'brand',
    // Named after the value alone, so `tone="positive"` is `MuiSlider-positive`.
    className: bare,
    values: ['brand', 'neutral', 'positive', 'critical', 'caution', 'accent'],
  },
  scale: {
    default: 'regular',
    className: prefixed('scale'),
    values: ['compact', 'regular'],
  },
});

/** theme2's wrapper. All it does is translate its vocabulary. */
function Slider({ tone, scale, ...other }) {
  return <SliderUnstyled {...other} appearance={appearance.resolve({ tone, scale })} />;
}

const MARKS = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
];

const MATERIAL_SNIPPET = `// @mui/material declares Material Design's vocabulary
const appearance = createAppearance({
  color: {
    default: 'primary',
    className: prefixed('color'),          // -> MuiSlider-colorPrimary
    values: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    prefix: 'color',                       // a theme may add palette colours
  },
  size: {
    default: 'medium',
    className: prefixed('size'),           // -> MuiSlider-sizeMedium
    values: ['small', 'medium'],
  },
});

function Slider({ color, size, ...other }) {
  return <SliderUnstyled {...other} appearance={appearance.resolve({ color, size })} />;
}`;

const THEME2_SNIPPET = `// theme2 declares something else entirely
const appearance = createAppearance({
  tone: {
    default: 'brand',
    className: bare,                       // -> MuiSlider-positive
    values: ['brand', 'neutral', 'positive', 'critical', 'caution', 'accent'],
  },
  scale: {
    default: 'regular',
    className: prefixed('scale'),          // -> MuiSlider-scaleCompact
    values: ['compact', 'regular'],
  },
});

function Slider({ tone, scale, ...other }) {
  return <SliderUnstyled {...other} appearance={appearance.resolve({ tone, scale })} />;
}`;

const RESOLVE_SNIPPET = `appearance.resolve({ tone: 'positive', scale: 'compact' })

// { ownerState: { tone: 'positive', scale: 'compact' },
//   classes:    { root: ['positive', 'scaleCompact'] } }

// The component merges ownerState into its own and appends the class keys to
// the root slot. It never learns what "tone" means. The ownerState half exists
// only so existing styleOverrides callbacks and theme variants keep matching,
// and is meant to be phased out.`;

function Snippet({ children }) {
  return (
    <pre
      style={{
        margin: '0 0 16px',
        padding: 16,
        borderRadius: 8,
        background: 'var(--theme2-surface)',
        color: 'var(--theme2-page-fg)',
        fontSize: 12,
        lineHeight: 1.55,
        overflowX: 'auto',
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function Row({ title, note, children }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px' }}>{title}</h2>
      {note ? (
        <p style={{ fontSize: 13, color: 'var(--theme2-page-muted)', margin: '0 0 18px' }}>
          {note}
        </p>
      ) : (
        <div style={{ height: 10 }} />
      )}
      {children}
    </section>
  );
}

export default function SliderTheme2() {
  // The simplest possible toggle: follow the system on first paint, then let
  // the button win. `theme2` reads `data-theme2` off the root element.
  const [dark, setDark] = React.useState(null);

  React.useEffect(() => {
    if (dark === null) {
      setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      return;
    }
    document.documentElement.dataset.theme2 = dark ? 'dark' : 'light';
  }, [dark]);

  return (
    <React.Fragment>
      <Head>
        {/* Linked rather than imported on purpose: the point is that a plain
            CSS file is enough, with no bundler or styling engine involved. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/static/slider-theme2.css" />
      </Head>
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--theme2-page-bg)',
          color: 'var(--theme2-page-fg)',
        }}
      >
        <main
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '48px 24px 96px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 24,
              marginBottom: 40,
            }}
          >
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px' }}>Slider, theme2</h1>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--theme2-page-muted)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                The unstyled Slider with a plain CSS file over it. No styling engine, no theme
                provider, no Material Design. Every rule targets a stable <code>MuiSlider-*</code>{' '}
                class.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDark(!dark)}
              style={{
                flex: 'none',
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid var(--theme2-edge)',
                background: 'var(--theme2-surface)',
                color: 'var(--theme2-page-fg)',
                font: 'inherit',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {dark ? 'Light' : 'Dark'}
            </button>
          </div>

          <Row
            title="The appearance vocabulary belongs to the styling layer"
            note="Props like color and size select an appearance and have no behaviour, so the
              component underneath does not define them. Each styling layer declares its own."
          >
            <Snippet>{MATERIAL_SNIPPET}</Snippet>
            <Snippet>{THEME2_SNIPPET}</Snippet>
            <p
              style={{
                fontSize: 13,
                color: 'var(--theme2-page-muted)',
                margin: '0 0 18px',
                lineHeight: 1.6,
              }}
            >
              Same component, two vocabularies. Different prop names, different values, and two
              different class naming rules. Everything below uses theme2&apos;s.
            </p>
            <Snippet>{RESOLVE_SNIPPET}</Snippet>
          </Row>

          <Row title="Default">
            <Slider defaultValue={40} />
          </Row>

          <Row title="Scale" note="compact and the default regular.">
            <Slider defaultValue={30} scale="compact" />
            <div style={{ height: 28 }} />
            <Slider defaultValue={30} />
          </Row>

          <Row title="Tone" note="theme2's accents, which are not Material's palette.">
            {['brand', 'neutral', 'positive', 'critical', 'caution', 'accent'].map((tone) => (
              <div key={tone} style={{ marginBottom: 22 }}>
                <Slider defaultValue={55} tone={tone} />
              </div>
            ))}
          </Row>

          <Row title="Marks and labels">
            <Slider defaultValue={60} marks={MARKS} step={25} />
          </Row>

          <Row title="Range" note="Two thumbs.">
            <Slider defaultValue={[20, 70]} />
          </Row>

          <Row title="Value label" note="Shown while dragging, and always when set to on.">
            <Slider defaultValue={45} valueLabelDisplay="on" />
            <div style={{ height: 44 }} />
            <Slider defaultValue={45} valueLabelDisplay="auto" />
          </Row>

          <Row title="Track variations" note="Inverted, and no track at all.">
            <Slider defaultValue={40} track="inverted" />
            <div style={{ height: 28 }} />
            <Slider defaultValue={40} track={false} marks={MARKS} step={25} />
          </Row>

          <Row title="Disabled">
            <Slider defaultValue={40} disabled tone="positive" />
          </Row>

          <Row title="Vertical">
            <div style={{ display: 'flex', gap: 64, height: 220 }}>
              <Slider defaultValue={40} orientation="vertical" />
              <Slider defaultValue={[20, 70]} orientation="vertical" tone="positive" />
              <Slider defaultValue={60} orientation="vertical" marks={MARKS} step={25} />
            </div>
          </Row>
        </main>
      </div>
    </React.Fragment>
  );
}
