import * as React from 'react';
import {
  createTheme,
  unstable_enhanceDensity as enhanceDensity,
  ThemeProvider,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import densityRecipes from '../../densityRecipes';
import recipeUis from '../../recipeUis';
import type { Claim } from '../../densityAnnotations';
import { Annotate, useClaims } from '../../densityAnnotations';

const colorSchemes = { light: true, dark: true };

const chromeTheme = enhanceDensity(createTheme({ colorSchemes }));

const CLAIMS: Claim[] = [
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
  // @focus-start @padding 1
  const [recipeId, setRecipeId] = React.useState('medium');
  const [measured, setMeasured] = React.useState(false);
  const [uiIndex, setUiIndex] = React.useState(0);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const demoRef = React.useRef<HTMLDivElement>(null);
  const state = useClaims(stageRef, demoRef, measured ? CLAIMS : []);

  const recipe =
    densityRecipes.find((item) => item.id === recipeId) ?? densityRecipes[1];

  const theme = React.useMemo(
    () =>
      enhanceDensity(
        createTheme({
          colorSchemes,
          focusVisible: true,
          typography: recipe.typography,
        }),
        recipe.scale,
      ),
    [recipe],
  );

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
            pt: 1,
            pb: 2,
          }}
        >
          <TextField
            select
            size="small"
            label="Density"
            value={recipeId}
            onChange={(event) => setRecipeId(event.target.value)}
            sx={{ minWidth: 140 }}
          >
            {densityRecipes.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            sx={{ ml: 'auto', mr: 0 }}
            control={
              <Switch
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
          slotProps={{ list: { sx: { justifyContent: 'center' } } }}
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
  // @focus-end
}
