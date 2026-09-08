import * as React from 'react';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import densityRecipes from './densityRecipes';
import recipeUis from './recipeUis';
import { Annotate, useClaims } from './densityAnnotations';

const colorSchemes = { light: true, dark: true };

// The chrome runs on the shipped scale, so the controls driving the canvas are
// themselves an example of what the canvas is demonstrating.
const chromeTheme = enhanceDensity(createTheme({ colorSchemes }));

// The recipe UIs are compositions, not preset emissions, so no annotation
// claims a token — every caption is the measured height. `data-measure` on an
// element sends its beam left; the plain attribute reads right (the default
// side), which is what keeps a row and the control inside it apart.
const CLAIMS = [
  {
    on: '[data-measure]:not([data-measure="left"])',
    aspect: 'touch-target',
    route: { gutter: 'right' },
  },
  {
    on: '[data-measure="left"]',
    aspect: 'touch-target',
    route: { gutter: 'left' },
  },
];

export default function DensityRecipesDemo() {
  const [recipeId, setRecipeId] = React.useState('medium');
  const [measured, setMeasured] = React.useState(false);
  const [uiIndex, setUiIndex] = React.useState(0);
  const stageRef = React.useRef(null);
  const demoRef = React.useRef(null);
  const state = useClaims(stageRef, demoRef, CLAIMS, [recipeId, uiIndex]);

  const recipe =
    densityRecipes.find((item) => item.id === recipeId) ?? densityRecipes[1];

  // The radius, typography, and focus layers are ordinary `createTheme` inputs;
  // only the scale is the enhancer's own argument. With the ripple off, the
  // ring is the only keyboard indicator left.
  const theme = React.useMemo(() => {
    const base = createTheme({
      colorSchemes,
      components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
      shape: recipe.shape,
      typography: recipe.typography,
      focusVisible: true,
    });
    return enhanceDensity(base, recipe.scale);
  }, [recipe]);

  const Ui = recipeUis[uiIndex].Component;

  return (
    <Box sx={{ width: '100%' }}>
      <ThemeProvider theme={chromeTheme}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            pb: 2,
          }}
        >
          <ToggleButtonGroup
            exclusive
            value={recipeId}
            onChange={(event, next) => {
              if (next) {
                setRecipeId(next);
              }
            }}
            aria-label="density recipe"
          >
            {densityRecipes.map((item) => (
              <ToggleButton
                key={item.id}
                value={item.id}
                aria-label={`${item.label} density`}
              >
                {item.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <FormControlLabel
            sx={{ ml: 'auto', mr: 0 }}
            control={
              <Checkbox
                checked={measured}
                onChange={(event) => setMeasured(event.target.checked)}
              />
            }
            label="Height measurement"
          />
        </Box>
        <Tabs
          value={uiIndex}
          onChange={(event, next) => setUiIndex(next)}
          aria-label="example UI"
        >
          {recipeUis.map((ui) => (
            <Tab key={ui.id} label={ui.label} sx={{ textTransform: 'none' }} />
          ))}
        </Tabs>
      </ThemeProvider>
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Box
          ref={stageRef}
          sx={{
            // The horizontal padding is the annotation gutter: beams and their
            // captions land in it. It is always reserved, so toggling the
            // measurement cannot reflow the UI it is measuring.
            position: 'relative',
            py: 4,
            px: 9,
            minWidth: 520,
          }}
        >
          <ThemeProvider theme={theme}>
            <Box ref={demoRef}>
              <Ui />
            </Box>
          </ThemeProvider>
          {measured && state ? (
            <Annotate items={state.items} bounds={state.bounds} />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
