'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import { Link } from '@mui/internal-core-docs/Link';

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

function ComponentSamples(props: ComponentSamplesProps) {
  const {
    buttonClicks = 0,
    interactive = false,
    onButtonClick,
    onSwitchChange,
    switchChecked = true,
  } = props;

  return (
    <Stack spacing={4}>
      <section>
        <Typography
          component="h3"
          sx={{ color: 'var(--multi-theme-muted)', fontSize: 13, fontWeight: 700, mb: 1.5 }}
        >
          BUTTON
        </Typography>
        <Stack
          direction="row"
          spacing={1.5}
          useFlexGap
          sx={{ alignItems: 'center', flexWrap: 'wrap' }}
        >
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
        </Stack>
      </section>

      <section>
        <Typography
          component="h3"
          sx={{ color: 'var(--multi-theme-muted)', fontSize: 13, fontWeight: 700, mb: 1.5 }}
        >
          SWITCH
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          useFlexGap
          sx={{ alignItems: 'center', flexWrap: 'wrap' }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Switch
              {...(interactive
                ? { checked: switchChecked, onChange: onSwitchChange }
                : { defaultChecked: switchChecked })}
              slotProps={{
                input: {
                  'aria-label': interactive ? 'Interactive setting' : 'Enabled setting',
                },
              }}
            />
            <Typography sx={{ color: 'var(--multi-theme-ink)', fontWeight: 650 }}>
              {switchChecked ? 'Enabled' : 'Disabled'}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Switch slotProps={{ input: { 'aria-label': 'Disabled setting' } }} disabled />
            <Typography sx={{ color: 'var(--multi-theme-muted)' }}>Unavailable</Typography>
          </Stack>
        </Stack>
      </section>
    </Stack>
  );
}

interface ThemePanelProps {
  children: React.ReactNode;
  themeName: ThemeName;
}

function ThemePanel(props: ThemePanelProps) {
  const { children, themeName } = props;
  const theme = themes.find((item) => item.name === themeName)!;

  return (
    <Box
      data-mui-theme={themeName}
      sx={{
        bgcolor: 'var(--multi-theme-canvas)',
        border: 'var(--multi-theme-frame-border)',
        borderRadius: 'var(--multi-theme-frame-radius)',
        boxShadow: 'var(--multi-theme-frame-shadow)',
        color: 'var(--multi-theme-ink)',
        minWidth: 0,
        overflow: 'hidden',
        p: { xs: 3, sm: 4 },
        transition: 'background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
      }}
    >
      <Stack spacing={4}>
        <div>
          <Typography
            component="p"
            sx={{
              color: 'var(--multi-theme-accent)',
              fontFamily: 'var(--multi-theme-font)',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 'var(--multi-theme-letter-spacing)',
              mb: 0.75,
              textTransform: 'uppercase',
            }}
          >
            {theme.label} theme
          </Typography>
          <Typography
            component="h2"
            sx={{
              color: 'var(--multi-theme-ink)',
              fontFamily: 'var(--multi-theme-font)',
              fontSize: { xs: 26, sm: 32 },
              fontWeight: 800,
              letterSpacing: 'var(--multi-theme-heading-spacing)',
              lineHeight: 1.1,
              mb: 1,
            }}
          >
            Same components, different CSS
          </Typography>
          <Typography
            sx={{
              color: 'var(--multi-theme-muted)',
              fontFamily: 'var(--multi-theme-font)',
              maxWidth: 560,
            }}
          >
            {theme.description}
          </Typography>
        </div>
        {children}
      </Stack>
    </Box>
  );
}

export default function MultiThemeExperiment() {
  const [themeName, setThemeName] = React.useState<ThemeName>('polished');
  const [buttonClicks, setButtonClicks] = React.useState(0);
  const [switchChecked, setSwitchChecked] = React.useState(true);

  return (
    <React.Fragment>
      <Head
        title="Multi-theme CSS experiment"
        description="An experiment for switching complete Material UI component skins with scoped CSS."
      />
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Stack spacing={2}>
              <Typography variant="overline" color="text.secondary">
                Experiments
              </Typography>
              <Typography component="h1" variant="h3">
                Multi-theme CSS switching
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
                Both theme stylesheets are loaded. The switcher changes only the{' '}
                <code>data-mui-theme</code> attribute; the Button and Switch instances remain
                mounted and preserve their state.
              </Typography>
              <div>
                <Button component={Link} href="/experiments" noLinkStyle variant="outlined">
                  Back to experiments
                </Button>
              </div>
            </Stack>

            <Box
              component="fieldset"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                m: 0,
                p: 1,
              }}
            >
              <Typography component="legend" variant="body2" sx={{ px: 1 }}>
                Active theme
              </Typography>
              {themes.map((theme) => {
                const active = theme.name === themeName;
                return (
                  <Box
                    key={theme.name}
                    component="button"
                    type="button"
                    aria-pressed={active}
                    onClick={() => setThemeName(theme.name)}
                    sx={{
                      bgcolor: active ? 'primary.main' : 'transparent',
                      border: '1px solid',
                      borderColor: active ? 'primary.main' : 'divider',
                      borderRadius: 1.5,
                      color: active ? 'primary.contrastText' : 'text.primary',
                      cursor: 'pointer',
                      font: 'inherit',
                      fontWeight: 700,
                      px: 2,
                      py: 1,
                    }}
                  >
                    {theme.label}
                  </Box>
                );
              })}
            </Box>

            <div data-testid="active-theme-preview">
              <ThemePanel themeName={themeName}>
                <ComponentSamples
                  buttonClicks={buttonClicks}
                  interactive
                  onButtonClick={() => setButtonClicks((value) => value + 1)}
                  onSwitchChange={(event) => setSwitchChecked(event.target.checked)}
                  switchChecked={switchChecked}
                />
              </ThemePanel>
            </div>

            <Stack component="section" spacing={2}>
              <div>
                <Typography component="h2" variant="h5" gutterBottom>
                  Side-by-side scope check
                </Typography>
                <Typography color="text.secondary">
                  These previews use identical markup and remain visible together to expose any
                  selector leakage.
                </Typography>
              </div>
              <Box
                sx={{
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                }}
              >
                <ThemePanel themeName="polished">
                  <ComponentSamples />
                </ThemePanel>
                <ThemePanel themeName="brutalist">
                  <ComponentSamples />
                </ThemePanel>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}
