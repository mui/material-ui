import * as React from 'react';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { iconComponents, recipes } from './densityRecipes';
import recipeUis from './recipeUis';

const colorSchemes = { light: true, dark: true };

// The chrome runs on the shipped scale, so the controls driving the canvas are
// themselves an example of what the canvas is demonstrating.
const chromeTheme = enhanceDensity(createTheme({ colorSchemes }));

const LAYERS = [
  { id: 'radius', label: 'Radius' },
  { id: 'typography', label: 'Typography' },
  { id: 'icons', label: 'Custom icons' },
  { id: 'focus', label: 'Focus visible' },
];

export default function DensityRecipesDemo() {
  const [recipeId, setRecipeId] = React.useState('medium');
  const [layers, setLayers] = React.useState({
    radius: true,
    typography: true,
    icons: true,
    focus: true,
  });
  const [uiIndex, setUiIndex] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const recipe = recipes.find((item) => item.id === recipeId) ?? recipes[1];

  // Every checked layer is an ordinary `createTheme` input; only the scale is
  // the enhancer's own argument. Unchecking one falls back to the defaults.
  const theme = React.useMemo(() => {
    // Both layers write `components`, so they merge rather than overwrite. With
    // the ripple off, the ring is the only keyboard indicator left.
    const components = {
      ...(layers.icons ? iconComponents : {}),
      ...(layers.focus
        ? { MuiButtonBase: { defaultProps: { disableRipple: true } } }
        : {}),
    };
    const base = createTheme({
      colorSchemes,
      components,
      ...(layers.radius ? { shape: recipe.shape } : {}),
      ...(layers.typography ? { typography: recipe.typography } : {}),
      ...(layers.focus ? { focusVisible: true } : {}),
    });
    return enhanceDensity(base, recipe.scale);
  }, [recipe, layers]);

  const cell = recipe.scale['touch-target'] ?? 32;
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
            pb: 1,
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
            {recipes.map((item) => (
              <ToggleButton
                key={item.id}
                value={item.id}
                aria-label={`${item.label} density`}
              >
                {item.icon}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Button
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            aria-haspopup="true"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            Layers
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {LAYERS.map((layer) => (
              <MenuItem
                key={layer.id}
                role="menuitemcheckbox"
                aria-checked={layers[layer.id]}
                onClick={() =>
                  setLayers((prev) => ({ ...prev, [layer.id]: !prev[layer.id] }))
                }
              >
                <Checkbox checked={layers[layer.id]} tabIndex={-1} disableRipple />
                {layer.label}
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary' }}>
            grid = touch-target ({cell}px)
          </Typography>
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
          sx={[
            {
              // Padding is a whole cell, so the ruling passes through the
              // controls' own edges instead of beside them.
              p: `${cell}px`,
              minWidth: 520,
              backgroundSize: `${cell}px ${cell}px`,
              backgroundImage: `linear-gradient(to right, rgba(216, 27, 96, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(216, 27, 96, 0.08) 1px, transparent 1px)`,
            },
            (muiTheme) =>
              muiTheme.applyStyles('dark', {
                backgroundImage: `linear-gradient(to right, rgba(244, 143, 177, 0.11) 1px, transparent 1px), linear-gradient(to bottom, rgba(244, 143, 177, 0.11) 1px, transparent 1px)`,
              }),
          ]}
        >
          <ThemeProvider theme={theme}>
            <Ui />
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
}
