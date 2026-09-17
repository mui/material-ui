import * as React from 'react';
import Head from 'next/head';
// Two levels deep only because the split is a prototype living inside
// `@mui/material`. Were it a package of its own this would be one level.
/* eslint-disable no-restricted-imports */
import SliderUnstyled from '@mui/material/Slider/unstyled';
import ButtonUnstyled from '@mui/material/Button/unstyled';
import createAppearance, { prefixed, bare, whenTrue } from '@mui/material/utils/createAppearance';
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

const TONES = ['brand', 'muted', 'positive', 'critical', 'caution'];
const SCALES = ['compact', 'regular', 'roomy'];

// theme2's appearance vocabulary. Deliberately a different shape from Material's
// rather than a renaming of it: five tones against six colours, no `secondary`
// and no `info`, a `muted` that Material has no equivalent for, and three scales
// where Material has two. `tone` and `scale` are shared across components.
const sliderAppearance = createAppearance({
  tone: {
    default: 'brand',
    // Named after the value alone, so `tone="positive"` is `MuiSlider-positive`.
    className: bare,
    values: TONES,
  },
  scale: { default: 'regular', className: prefixed('scale'), values: SCALES },
});

// Button adds two more. `emphasis` has two values where Material's `variant` has
// three, and `block` is what Material calls `fullWidth`.
const buttonAppearance = createAppearance({
  tone: { default: 'brand', className: bare, values: TONES },
  scale: { default: 'regular', className: prefixed('scale'), values: SCALES },
  emphasis: { default: 'solid', className: bare, values: ['solid', 'quiet'] },
  block: { default: false, className: whenTrue('block'), values: [true] },
});

/** theme2's spinner, a few lines of CSS rather than a CircularProgress. */
function Theme2Spinner(props) {
  return <span {...props} className="theme2-spinner" />;
}

const buttonSlots = { loadingSpinner: Theme2Spinner };

/** theme2's wrappers. All they do is translate its own vocabulary. */
function Slider({ tone, scale, ...other }) {
  return <SliderUnstyled {...other} appearance={sliderAppearance.resolve({ tone, scale })} />;
}

function Button({ tone, scale, emphasis, block, ...other }) {
  return (
    <ButtonUnstyled
      {...other}
      slots={buttonSlots}
      appearance={buttonAppearance.resolve({ tone, scale, emphasis, block })}
    />
  );
}

const MARKS = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
];

function Code({ children, block }) {
  return (
    <code
      style={{
        display: block ? 'block' : 'inline',
        margin: block ? '14px 0 0' : 0,
        padding: block ? '8px 12px' : '1px 5px',
        borderRadius: 6,
        background: 'var(--theme2-surface)',
        color: 'var(--theme2-page-fg)',
        fontSize: 12.5,
        whiteSpace: 'pre',
      }}
    >
      {children}
    </code>
  );
}

function ComponentHeading({ children }) {
  return (
    <h2
      style={{
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: 'var(--theme2-page-muted)',
        borderBottom: '1px solid var(--theme2-border)',
        paddingBottom: 8,
        margin: '0 0 32px',
      }}
    >
      {children}
    </h2>
  );
}

function Row({ title, note, code, children }) {
  return (
    <section style={{ marginBottom: 80 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px' }}>{title}</h2>
      {note ? (
        <p style={{ fontSize: 13, color: 'var(--theme2-page-muted)', margin: '0 0 14px' }}>
          {note}
        </p>
      ) : (
        <div style={{ height: 10 }} />
      )}
      {children}
      {code ? <Code block>{code}</Code> : null}
    </section>
  );
}

/** A slider labelled with the prop that produced it. */
function Labelled({ label, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      {children}
      <div style={{ marginTop: 10 }}>
        <Code block={label.includes('\n')}>{label}</Code>
      </div>
    </div>
  );
}

function Vocabulary({ heading, rows, muted }) {
  return (
    <div style={{ flex: '1 1 260px' }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.3,
          textTransform: 'uppercase',
          color: muted ? 'var(--theme2-page-muted)' : 'var(--theme2-page-fg)',
          marginBottom: 8,
        }}
      >
        {heading}
      </div>
      {rows.map(([prop, values]) => (
        <div key={prop} style={{ fontSize: 12.5, marginBottom: 6, lineHeight: 1.6 }}>
          <span style={{ color: 'var(--theme2-page-muted)' }}>{prop}</span>{' '}
          <span style={{ fontFamily: 'ui-monospace, monospace' }}>{values}</span>
        </div>
      ))}
    </div>
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
        <link rel="stylesheet" href="/static/theme2.css" />
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
              marginBottom: 36,
            }}
          >
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px' }}>theme2</h1>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--theme2-page-muted)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                The unstyled Slider and Button with a plain CSS file over them. No styling engine,
                no theme provider, no Material Design. Every rule targets a stable{' '}
                <code>MuiSlider-*</code> or <code>MuiButton-*</code> class.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDark(!dark)}
              style={{
                flex: 'none',
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid var(--theme2-border)',
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

          <section
            style={{
              marginBottom: 48,
              padding: 20,
              borderRadius: 10,
              border: '1px solid var(--theme2-border)',
            }}
          >
            <h2 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 6px' }}>
              A different vocabulary, not a renaming
            </h2>
            <p
              style={{
                fontSize: 13,
                color: 'var(--theme2-page-muted)',
                margin: '0 0 18px',
                lineHeight: 1.6,
              }}
            >
              Props that select an appearance belong to the styling layer, so the component
              underneath does not define them. theme2 declares its own, and they do not line up with
              Material&apos;s: five tones against six colours, no <code>secondary</code> and no{' '}
              <code>info</code>, a <code>muted</code> Material has no equivalent for, and three
              scales where Material has two.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
              <Vocabulary
                muted
                heading="Material Design"
                rows={[
                  ['color', 'primary secondary error info success warning'],
                  ['size', 'small medium large'],
                  ['variant', 'text outlined contained'],
                  ['fullWidth', 'boolean'],
                ]}
              />
              <Vocabulary
                heading="theme2"
                rows={[
                  ['tone', TONES.join(' ')],
                  ['scale', SCALES.join(' ')],
                  ['emphasis', 'solid quiet'],
                  ['block', 'boolean'],
                ]}
              />
            </div>
          </section>

          <ComponentHeading>Slider</ComponentHeading>

          <Row title="Default" code={`<Slider defaultValue={40} />`}>
            <Slider defaultValue={40} />
          </Row>

          <Row title="Tone" note="theme2's accents. Material has no tone prop at all.">
            {TONES.map((tone) => (
              <Labelled key={tone} label={`<Slider tone="${tone}" />`}>
                <Slider defaultValue={55} tone={tone} />
              </Labelled>
            ))}
          </Row>

          <Row title="Scale">
            {SCALES.map((scale) => (
              <Labelled key={scale} label={`<Slider scale="${scale}" />`}>
                <Slider defaultValue={30} scale={scale} />
              </Labelled>
            ))}
          </Row>

          <Row
            title="Marks and labels"
            code={`<Slider defaultValue={60} marks={marks} step={25} />`}
          >
            <Slider defaultValue={60} marks={MARKS} step={25} />
          </Row>

          <Row title="Range" code={`<Slider defaultValue={[20, 70]} />`}>
            <Slider defaultValue={[20, 70]} />
          </Row>

          <Row title="Value label" code={`<Slider defaultValue={45} valueLabelDisplay="on" />`}>
            <Slider defaultValue={45} valueLabelDisplay="on" />
          </Row>

          <Row title="Track variations">
            <Labelled label={`<Slider track="inverted" />`}>
              <Slider defaultValue={40} track="inverted" />
            </Labelled>
            <Labelled label={`<Slider track={false} marks={marks} step={25} />`}>
              <Slider defaultValue={40} track={false} marks={MARKS} step={25} />
            </Labelled>
          </Row>

          <Row
            title="Disabled"
            note="The tone gives way to the disabled styling, whichever tone was asked for."
            code={`<Slider defaultValue={40} tone="positive" disabled />`}
          >
            <Slider defaultValue={40} tone="positive" disabled />
          </Row>

          <Row
            title="Vertical"
            code={`<Slider defaultValue={40} orientation="vertical" tone="positive" />`}
          >
            <div style={{ display: 'flex', gap: 64, height: 220 }}>
              <Slider defaultValue={40} orientation="vertical" />
              <Slider defaultValue={[20, 70]} orientation="vertical" tone="positive" />
              <Slider defaultValue={60} orientation="vertical" marks={MARKS} step={25} />
            </div>
          </Row>

          <ComponentHeading>Button</ComponentHeading>

          <Row title="Emphasis" note="Two, where Material has three variants.">
            {['solid', 'quiet'].map((emphasis) => (
              <Labelled
                key={emphasis}
                label={`<Button emphasis="${emphasis}">Save changes</Button>`}
              >
                <Button emphasis={emphasis}>Save changes</Button>
              </Labelled>
            ))}
          </Row>

          <Row title="Tone" note="The same tones the Slider uses.">
            {TONES.map((tone) => (
              <Labelled
                key={tone}
                label={`<Button tone="${tone}">Solid</Button>\n<Button tone="${tone}" emphasis="quiet">Quiet</Button>`}
              >
                <span style={{ display: 'inline-flex', gap: 12 }}>
                  <Button tone={tone}>Solid</Button>
                  <Button tone={tone} emphasis="quiet">
                    Quiet
                  </Button>
                </span>
              </Labelled>
            ))}
          </Row>

          <Row title="Scale">
            {SCALES.map((scale) => (
              <Labelled key={scale} label={`<Button scale="${scale}">Save changes</Button>`}>
                <Button scale={scale}>Save changes</Button>
              </Labelled>
            ))}
          </Row>

          <Row
            title="Block"
            note="What Material calls fullWidth."
            code={`<Button block>Save changes</Button>`}
          >
            <Button block>Save changes</Button>
          </Row>

          <Row
            title="Disabled"
            code={`<Button disabled>Solid</Button>\n<Button disabled emphasis="quiet">Quiet</Button>`}
          >
            <span style={{ display: 'inline-flex', gap: 12 }}>
              <Button disabled>Solid</Button>
              <Button disabled emphasis="quiet">
                Quiet
              </Button>
            </span>
          </Row>

          <Row
            title="Loading"
            note="The spinner comes through the loadingSpinner slot. Material puts a CircularProgress there; theme2 supplies a few lines of CSS."
          >
            <Labelled label={`<Button loading>Save changes</Button>`}>
              <Button loading>Save changes</Button>
            </Labelled>
            <Labelled label={`<Button loading loadingPosition="start">Save changes</Button>`}>
              <Button loading loadingPosition="start">
                Save changes
              </Button>
            </Labelled>
          </Row>
        </main>
      </div>
    </React.Fragment>
  );
}
