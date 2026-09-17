import * as React from 'react';
import Head from 'next/head';
// Two levels deep only because the split is a prototype living inside
// `@mui/material`. Were it a package of its own this would be one level.
// eslint-disable-next-line no-restricted-imports
import SliderUnstyled from '@mui/material/Slider/unstyled';

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

const MARKS = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
];

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
            maxWidth: 680,
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

          <Row title="Default">
            <SliderUnstyled defaultValue={40} />
          </Row>

          <Row title="Sizes" note="Small and the default medium.">
            <SliderUnstyled defaultValue={30} size="small" />
            <div style={{ height: 28 }} />
            <SliderUnstyled defaultValue={30} />
          </Row>

          <Row title="Colours" note="Driven by the colour classes on the root.">
            {['primary', 'secondary', 'success', 'error', 'warning', 'info'].map((color) => (
              <div key={color} style={{ marginBottom: 22 }}>
                <SliderUnstyled defaultValue={55} color={color} />
              </div>
            ))}
          </Row>

          <Row title="Marks and labels">
            <SliderUnstyled defaultValue={60} marks={MARKS} step={25} />
          </Row>

          <Row title="Range" note="Two thumbs.">
            <SliderUnstyled defaultValue={[20, 70]} />
          </Row>

          <Row title="Value label" note="Shown while dragging, and always when set to on.">
            <SliderUnstyled defaultValue={45} valueLabelDisplay="on" />
            <div style={{ height: 44 }} />
            <SliderUnstyled defaultValue={45} valueLabelDisplay="auto" />
          </Row>

          <Row title="Track variations" note="Inverted, and no track at all.">
            <SliderUnstyled defaultValue={40} track="inverted" />
            <div style={{ height: 28 }} />
            <SliderUnstyled defaultValue={40} track={false} marks={MARKS} step={25} />
          </Row>

          <Row title="Disabled">
            <SliderUnstyled defaultValue={40} disabled />
          </Row>

          <Row title="Vertical">
            <div style={{ display: 'flex', gap: 64, height: 220 }}>
              <SliderUnstyled defaultValue={40} orientation="vertical" />
              <SliderUnstyled defaultValue={[20, 70]} orientation="vertical" />
              <SliderUnstyled defaultValue={60} orientation="vertical" marks={MARKS} step={25} />
            </div>
          </Row>
        </main>
      </div>
    </React.Fragment>
  );
}
