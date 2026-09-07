import * as React from 'react';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import {
  Annotate,
  AnnotateItem,
  Claim,
  Rect,
  resolveClaims,
} from './densityAnnotations';

const colorSchemes = { light: true, dark: true };

const defaultTheme = createTheme({ colorSchemes });
const densityTheme = enhanceDensity(createTheme({ colorSchemes }));

// Below this the canvas scrolls. Kept under the card's inner width so the
// stage never overflows it — that would shift the button off centre.
const STAGE_WIDTH = 520;
const STAGE_HEIGHT = 240;

// With the enhancer on, every dimension is a value you can name; with it off
// they are the component's own built-in numbers.
const tokens = {
  gap: 'x-small',
  icon: '0.8lh',
  // Only the box and its padding step up with the size prop.
  bySize: {
    small: {
      height: 'touch-target - x-small',
      padding: 'small',
    },
    medium: { height: 'touch-target', padding: 'medium' },
    large: {
      height: 'touch-target + small',
      padding: 'large',
    },
  },
};

type Size = keyof typeof tokens.bySize;

const SIZES = Object.keys(tokens.bySize) as Size[];

/** A token is only claimed when the enhancer authored it — without it the
 * captions print the measured px, and the height is not a claim at all. */
function claimsFor(enhanced: boolean, size: Size): Claim[] {
  const named = (token: string) => (enhanced ? token : undefined);
  const claims: Claim[] = [
    {
      on: '.MuiButton-root',
      aspect: 'padding',
      axis: 'inline',
      token: named(tokens.bySize[size].padding),
      route: { gutter: 'bottom' },
    },
    { on: '.MuiButton-root', aspect: 'gap', token: named(tokens.gap), route: { gutter: 'top' } },
    {
      on: '.MuiButton-startIcon svg',
      aspect: 'icon',
      token: named(tokens.icon),
      route: { gutter: 'left' },
    },
  ];
  if (enhanced) {
    claims.push({
      on: '.MuiButton-root',
      aspect: 'touch-target',
      token: tokens.bySize[size].height,
      route: { gutter: 'right' },
    });
  }
  return claims;
}

export default function EnhanceDensityDemo() {
  const [enhanced, setEnhanced] = React.useState(true);
  const [size, setSize] = React.useState<Size>('medium');
  const stageRef = React.useRef<HTMLDivElement>(null);
  const demoRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<{
    items: AnnotateItem[];
    bounds: Rect;
  } | null>(null);

  React.useEffect(() => {
    const stage = stageRef.current;
    const demo = demoRef.current;
    if (!stage || !demo) {
      return undefined;
    }
    const measure = () => setState(resolveClaims(stage, demo, claimsFor(enhanced, size)));
    measure();
    // A late webfont changes the label box without changing the button box.
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(demo);
    demo.querySelectorAll('*').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [enhanced, size]);

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Box sx={{ overflowX: 'auto', p: 2 }}>
        <Box
          ref={stageRef}
          sx={{
            position: 'relative',
            width: '100%',
            minWidth: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            mx: 'auto',
          }}
        >
          <ThemeProvider theme={enhanced ? densityTheme : defaultTheme}>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Box ref={demoRef} sx={{ display: 'contents' }}>
                <Button variant="outlined" size={size} startIcon={<AddIcon />}>
                  {/* an element child, so the gap band has an edge to end at */}
                  <span>Button</span>
                </Button>
              </Box>
            </Box>
          </ThemeProvider>
          {state ? <Annotate items={state.items} bounds={state.bounds} /> : null}
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={enhanced}
              onChange={(event) => setEnhanced(event.target.checked)}
            />
          }
          label="Enhance density"
        />
        <ToggleButtonGroup
          exclusive
          size="small"
          value={size}
          onChange={(event, next) => {
            if (next) {
              setSize(next);
            }
          }}
          aria-label="button size"
        >
          {SIZES.map((option) => (
            <ToggleButton key={option} value={option} sx={{ textTransform: 'none' }}>
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
}
