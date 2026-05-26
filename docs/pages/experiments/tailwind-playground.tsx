'use client';
import * as React from 'react';
import { CssThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

// ---------- Layout helpers --------------------------------------------------

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

// ---------- Page ------------------------------------------------------------

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
  colorSchemes: { light: true, dark: true },
});

// useMounted avoids SSR hydration mismatch on the Switch's checked prop
function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

function DarkModeToggle() {
  const [dark, setDark] = React.useState(false);
  const mounted = useMounted();

  const toggle = (checked: boolean) => {
    setDark(checked);
    document.documentElement.setAttribute(
      'data-mui-color-scheme',
      checked ? 'dark' : 'light',
    );
  };

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Typography variant="body2">Light</Typography>
      <Switch
        checked={mounted ? dark : false}
        onChange={(event) => toggle(event.target.checked)}
      />
      <Typography variant="body2">Dark</Typography>
    </Stack>
  );
}

export default function TailwindPlayground() {
  const [sliderValue, setSliderValue] = React.useState<number>(40);
  const [pinkSliderValue, setPinkSliderValue] = React.useState<number>(65);
  const [selected, setSelected] = React.useState<string[]>(['React', 'TypeScript']);
  const [variant, setVariant] = React.useState<'rounded' | 'pill' | 'square'>('rounded');

  const shapeClasses = { pill: 'rounded-full', square: 'rounded-none', rounded: 'rounded-lg' };
  const shapeClass = shapeClasses[variant];

  function toggleTag(tag: string) {
    setSelected((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    // ToDo Silviu: why don't we get the ease-in and duration variables are not generated.
    // ToDo Silviu: make dark mode work.
    <CssThemeProvider theme={theme}>
      <div className="p-6 md:p-10 max-w-3xl mx-auto min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        {/* Header */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}
        >
          <Typography variant="h4" className="font-bold">
            Tailwind playground
          </Typography>
          <DarkModeToggle />
        </Stack>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-10">
          MUI components styled with Tailwind utilities via <code>className</code>. Uses{' '}
          <code>mui-&#123;state&#125;:</code> variants and Tailwind&apos;s responsive modifiers — no{' '}
          <code>sx</code> prop needed.
        </p>

        {/* ── Buttons ────────────────────────────────────────────────────── */}
        <Section label="Buttons — className overrides">
          <div className="flex flex-wrap gap-3">
            <Button variant="contained" className="rounded-full shadow-none normal-case">
              Pill contained
            </Button>
            <Button
              variant="outlined"
              className="rounded-none border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:border-indigo-600 normal-case"
            >
              Square outlined
            </Button>
            <Button
              variant="contained"
              className="bg-gradient-to-r from-violet-600 to-pink-600 border-0 shadow-none hover:opacity-90 normal-case rounded-xl"
            >
              Gradient
            </Button>
            <Button variant="contained" disabled className="mui-disabled:opacity-40 normal-case">
              mui-disabled:opacity-40
            </Button>
          </div>
        </Section>

        {/* ── Shape variant switcher ─────────────────────────────────────── */}
        <Section label="ToggleButtonGroup — mui-selected: variant">
          <div className="flex flex-col gap-4">
            <ToggleButtonGroup
              value={variant}
              exclusive
              onChange={(_, v) => v && setVariant(v)}
              className="gap-2 border-0"
            >
              {(['rounded', 'pill', 'square'] as const).map((v) => (
                <ToggleButton
                  key={v}
                  value={v}
                  className="
                    capitalize border border-neutral-300 dark:border-neutral-600
                    bg-white dark:bg-neutral-900
                    text-neutral-700 dark:text-neutral-300
                    hover:bg-neutral-50 dark:hover:bg-neutral-800
                    mui-selected:bg-indigo-600 mui-selected:text-white
                    mui-selected:border-indigo-600 dark:mui-selected:bg-indigo-700
                    normal-case px-4
                  "
                >
                  {v}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            {/* Live preview of selected shape */}
            <div
              className={`
                inline-flex items-center justify-center px-5 py-2 text-sm font-medium
                bg-indigo-600 text-white transition-all duration-200
                ${shapeClass}
              `}
            >
              Preview: {variant}
            </div>
          </div>
        </Section>

        {/* ── Filter chips ───────────────────────────────────────────────── */}
        <Section label="Chips — manual Mui-selected + mui-selected: variant">
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'CSS', 'Tailwind', 'MUI'].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => toggleTag(tag)}
                className={`
                  cursor-pointer transition-colors normal-case
                  border border-neutral-300 dark:border-neutral-600
                  mui-selected:bg-indigo-600 mui-selected:text-white
                  mui-selected:border-indigo-600 dark:mui-selected:bg-indigo-700
                  ${selected.includes(tag) ? 'Mui-selected' : ''}
                `}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
            Active: {selected.join(', ') || 'none'}
          </p>
        </Section>

        {/* ── Slider ─────────────────────────────────────────────────────── */}
        <Section label="Slider — Tailwind width, responsive, and color override">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Slider
                value={sliderValue}
                onChange={(_, v) => setSliderValue(v as number)}
                className="w-full sm:w-80"
              />
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Default color — value: {sliderValue}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              {/*
               * TODO: Slider.css hardcodes hover/focus box-shadow to
               * rgba(var(--mui-palette-*-mainChannel) / 0.16) instead of using
               * color-mix(in srgb, currentColor 16%, transparent).
               * Until that's fixed, override the thumb states explicitly here.
               */}
              <Slider
                value={pinkSliderValue}
                onChange={(_, v) => setPinkSliderValue(v as number)}
                className="
                  w-full sm:w-80 text-pink-500 dark:text-green-500
                  [&_.MuiSlider-thumb:hover]:shadow-[0px_0px_0px_8px_color-mix(in_srgb,_theme(colors.pink.500)_16%,_transparent)]
                  [&_.MuiSlider-thumb.Mui-focusVisible]:shadow-[0px_0px_0px_8px_color-mix(in_srgb,_theme(colors.pink.500)_16%,_transparent)]
                  [&_.MuiSlider-thumb.Mui-active]:shadow-[0px_0px_0px_14px_color-mix(in_srgb,_theme(colors.pink.500)_16%,_transparent)]
                "
              />
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                <code>className=&quot;text-pink-500&quot;</code> — track &amp; thumb use{' '}
                <code>currentColor</code>; hover/focus overridden manually until Slider.css is
                updated — value: {pinkSliderValue}
              </p>
            </div>
          </div>
        </Section>

        {/* ── TextField ──────────────────────────────────────────────────── */}
        <Section label="TextField — mui-focused: + mui-error: variants">
          <div className="flex flex-col gap-4 max-w-sm">
            <TextField
              label="Focused ring (mui-focused:)"
              className="
                [&_.MuiOutlinedInput-root]:transition-shadow
                [&_.MuiOutlinedInput-root.Mui-focused]:ring-2
                [&_.MuiOutlinedInput-root.Mui-focused]:ring-indigo-500/30
                [&_.MuiOutlinedInput-root.Mui-focused]:ring-offset-0
              "
            />
            <TextField
              label="Error state"
              error
              helperText="mui-error: styling applies here"
              className="
                [&_.MuiFormHelperText-root]:font-semibold
                [&_.MuiOutlinedInput-root.Mui-error]:bg-red-50
                dark:[&_.MuiOutlinedInput-root.Mui-error]:bg-red-950/30
              "
            />
          </div>
        </Section>

        {/* ── Responsive layout ──────────────────────────────────────────── */}
        <Section label="Responsive grid — Tailwind sm: / md: breakpoints">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {['Buttons', 'Inputs', 'Feedback', 'Navigation', 'Surfaces', 'Data display'].map(
              (name) => (
                <div
                  key={name}
                  className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-default"
                >
                  {name}
                </div>
              ),
            )}
          </div>
          <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
            1 column → 2 at sm (600 px) → 3 at md (900 px)
          </p>
        </Section>

        {/* ── Stack + spacing ────────────────────────────────────────────── */}
        <Section label="Mixed: Tailwind layout + MUI components">
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
            <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 flex-1">
              Component toolbar
            </span>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" className="normal-case rounded-full">
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                className="normal-case rounded-full shadow-none"
              >
                Save
              </Button>
            </Stack>
          </div>
        </Section>
      </div>
    </CssThemeProvider>
  );
}
