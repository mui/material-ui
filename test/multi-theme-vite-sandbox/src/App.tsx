import * as React from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

export interface ThemeExample {
  description: string;
  id: 'polished' | 'brutalist' | 'ocean';
  label: string;
  owner: 'Material UI' | 'Consumer';
}

const themeExamples: Array<ThemeExample & { href: string }> = [
  {
    id: 'polished',
    label: 'Polished',
    owner: 'Material UI',
    description: 'A library theme loaded through its whole-theme CSS rollup.',
    href: './index.html',
  },
  {
    id: 'brutalist',
    label: 'Brutalist',
    owner: 'Material UI',
    description: 'A library theme loaded through granular Button and Slider CSS entries.',
    href: './brutalist.html',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    owner: 'Consumer',
    description: 'An app-owned theme built on Material UI tokens and component base CSS.',
    href: './consumer.html',
  },
];

const marks = [
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 80, label: '80' },
];

interface AppProps {
  theme: ThemeExample;
}

export default function App({ theme }: AppProps) {
  const [buttonClicks, setButtonClicks] = React.useState(0);
  const [sliderValue, setSliderValue] = React.useState(50);

  return (
    <main className="experiment">
      <header className="experiment__header">
        <p className="experiment__eyebrow">Material UI static CSS experiment</p>
        <h1>One component implementation, one selected CSS theme</h1>
        <p className="experiment__lede">
          Button and Slider keep their Material UI markup, classes, accessibility, and behavior, but
          their component CSS-in-JS style definitions are empty. The page loads shared foundational
          CSS plus exactly one visual theme.
        </p>
        <p className="engine-badge">
          <span aria-hidden="true" /> @mui/styled-engine → local no-op
        </p>
      </header>

      <nav className="theme-nav" aria-label="Theme examples">
        {themeExamples.map((example) => (
          <a
            key={example.id}
            href={example.href}
            aria-current={theme.id === example.id ? 'page' : undefined}
          >
            {example.label}
            <small>{example.owner}</small>
          </a>
        ))}
      </nav>

      <article className={`theme-panel theme-panel--${theme.id}`}>
        <header className="theme-panel__header">
          <p className="theme-panel__eyebrow">{theme.owner} theme</p>
          <h2>{theme.label}</h2>
          <p>{theme.description}</p>
        </header>

        <div className="component-samples">
          <section>
            <h3 className="component-label">Button</h3>
            <div className="component-row">
              <Button
                disableRipple
                variant="contained"
                onClick={() => setButtonClicks((value) => value + 1)}
              >
                Clicked {buttonClicks}
              </Button>
              <Button className="consumer-override" disableRipple variant="outlined">
                Consumer override
              </Button>
              <Button disableRipple size="small">
                Quiet action
              </Button>
              <Button disabled disableRipple variant="contained">
                Disabled
              </Button>
            </div>
          </section>

          <section>
            <div className="component-heading-row">
              <h3 className="component-label">Slider</h3>
              <output>{sliderValue}</output>
            </div>
            <div className="slider-sample">
              <Slider
                aria-label="Interactive value"
                marks={marks}
                value={sliderValue}
                onChange={(_event, value) => setSliderValue(value as number)}
              />
            </div>
            <div className="slider-sample slider-sample--small">
              <Slider aria-label="Small disabled value" defaultValue={35} disabled size="small" />
            </div>
          </section>
        </div>
      </article>

      <section className="architecture-note">
        <h2>What this page loads</h2>
        <p>
          Shared tokens → Button and Slider base CSS → {theme.label} component theme CSS. The
          Consumer override button also proves that unlayered app CSS wins even though it is
          imported before the library theme.
        </p>
      </section>
    </main>
  );
}
