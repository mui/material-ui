import * as React from 'react';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

type ThemeName = 'polished' | 'brutalist';

const themes: Array<{ name: ThemeName; label: string; description: string }> = [
  {
    name: 'polished',
    label: 'Polished',
    description: 'Soft surfaces, compact proportions, and restrained motion.',
  },
  {
    name: 'brutalist',
    label: 'Brutalist',
    description: 'Hard edges, louder contrast, and intentionally oversized controls.',
  },
];

interface ComponentSamplesProps {
  buttonClicks?: number;
  interactive?: boolean;
  onButtonClick?: () => void;
  onSwitchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  switchChecked?: boolean;
}

function ComponentSamples({
  buttonClicks = 0,
  interactive = false,
  onButtonClick,
  onSwitchChange,
  switchChecked = true,
}: ComponentSamplesProps) {
  const enabledSwitchId = React.useId();
  const disabledSwitchId = React.useId();

  return (
    <div className="component-samples">
      <section>
        <h3 className="component-label">Button</h3>
        <div className="component-row">
          <Button disableRipple variant="contained" onClick={onButtonClick}>
            {interactive ? `Clicked ${buttonClicks}` : 'Primary action'}
          </Button>
          <Button disableRipple variant="outlined">
            Secondary
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
        <h3 className="component-label">Switch</h3>
        <div className="component-row component-row--switches">
          <label className="switch-sample" htmlFor={enabledSwitchId}>
            <Switch
              disableRipple
              {...(interactive
                ? { checked: switchChecked, onChange: onSwitchChange }
                : { defaultChecked: switchChecked })}
              slotProps={{ input: { id: enabledSwitchId } }}
            />
            <span>{switchChecked ? 'Enabled' : 'Disabled'}</span>
          </label>
          <label className="switch-sample switch-sample--muted" htmlFor={disabledSwitchId}>
            <Switch disabled disableRipple slotProps={{ input: { id: disabledSwitchId } }} />
            <span>Unavailable</span>
          </label>
        </div>
      </section>
    </div>
  );
}

interface ThemePanelProps {
  children: React.ReactNode;
  themeName: ThemeName;
}

function ThemePanel({ children, themeName }: ThemePanelProps) {
  const theme = themes.find((item) => item.name === themeName)!;

  return (
    // This subtree is not keyed by theme, so changing the scope preserves component state.
    <article className="theme-panel" data-mui-theme={themeName}>
      <header className="theme-panel__header">
        <p className="theme-panel__eyebrow">{theme.label} theme</p>
        <h2>Same components, different CSS</h2>
        <p className="theme-panel__description">{theme.description}</p>
      </header>
      {children}
    </article>
  );
}

export default function App() {
  const [themeName, setThemeName] = React.useState<ThemeName>('polished');
  const [buttonClicks, setButtonClicks] = React.useState(0);
  const [switchChecked, setSwitchChecked] = React.useState(true);

  return (
    <main className="experiment">
      <header className="experiment__header">
        <p className="experiment__eyebrow">Material UI experiment</p>
        <h1>Multi-theme CSS with a no-op styled engine</h1>
        <p className="experiment__lede">
          These are real Material UI Button and Switch components. The no-op engine preserves their
          markup, classes, state, and behavior, but injects no component styles. Each visual theme
          is supplied by its own CSS files.
        </p>
        <p className="engine-badge">
          <span aria-hidden="true" /> @mui/styled-engine → local no-op
        </p>
      </header>

      <fieldset className="theme-picker">
        <legend>Active theme</legend>
        {themes.map((theme) => (
          <button
            key={theme.name}
            type="button"
            aria-pressed={theme.name === themeName}
            onClick={() => setThemeName(theme.name)}
          >
            {theme.label}
          </button>
        ))}
      </fieldset>

      <ThemePanel themeName={themeName}>
        <ComponentSamples
          buttonClicks={buttonClicks}
          interactive
          onButtonClick={() => setButtonClicks((value) => value + 1)}
          onSwitchChange={(event) => setSwitchChecked(event.target.checked)}
          switchChecked={switchChecked}
        />
      </ThemePanel>

      <section className="scope-check">
        <header>
          <h2>Side-by-side scope check</h2>
          <p>
            Identical component markup is rendered under both scopes to expose selector leakage.
          </p>
        </header>
        <div className="scope-check__grid">
          <ThemePanel themeName="polished">
            <ComponentSamples />
          </ThemePanel>
          <ThemePanel themeName="brutalist">
            <ComponentSamples />
          </ThemePanel>
        </div>
      </section>
    </main>
  );
}
