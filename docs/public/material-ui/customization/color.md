# Color

Convey meaning through color. Out of the box you get access to all colors in the Material Design guidelines.

The Material Design [color system](https://m2.material.io/design/color/) can be used to create a color theme that reflects your brand or style.

## Picking colors

### Official color tool

The Material Design team has also built an awesome palette configuration tool: [material.io/resources/color/](https://m2.material.io/inline-tools/color/).
This can help you create a color palette for your UI, as well as measure the accessibility level of any color combination.

<a href="https://m2.material.io/inline-tools/color/" target="_blank" rel="noopener nofollow" class="remove-link-arrow">
  <img src="/static/images/color/colorTool.png" alt="Official color tool" style="width: 574px" width=1148" height="610" />
</a>
<br />
<br />

The output can be fed into `createTheme()` function:

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
```

### Playground

To test a [material.io/design/color](https://m2.material.io/design/color/) color scheme with the Material UI documentation, simply select colors using the palette and sliders below.
Alternatively, you can enter hex values in the Primary and Secondary text fields.

```jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { rgbToHex, useTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Slider from '@mui/material/Slider';
import { capitalize } from '@mui/material/utils';
import { resetDocsColor, setDocsColors } from 'docs/src/BrandingCssVarsProvider';
import ColorDemo from './ColorDemo';

const defaults = {
  primary: '#2196f3',
  secondary: '#f50057',
};
const hues = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
];

const shades = [
  900,
  800,
  700,
  600,
  500,
  400,
  300,
  200,
  100,
  50,
  'A700',
  'A400',
  'A200',
  'A100',
];

const TooltipRadio = React.forwardRef(function TooltipRadio(props, ref) {
  const {
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    inputProps,
    ...other
  } = props;

  return (
    <Radio
      ref={ref}
      {...other}
      inputProps={{
        ...inputProps,
        'aria-labelledby': ariaLabelledBy,
        'aria-label': ariaLabel,
      }}
    />
  );
});

TooltipRadio.propTypes = {
  // possibly opaque identifier
  'aria-label': PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  'aria-labelledby': PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inputProps: PropTypes.object,
};

function ColorTool() {
  const theme = useTheme();
  const [state, setState] = React.useState({
    primary: defaults.primary,
    secondary: defaults.secondary,
    primaryInput: defaults.primary,
    secondaryInput: defaults.secondary,
    primaryHue: 'blue',
    secondaryHue: 'pink',
    primaryShade: 4,
    secondaryShade: 11,
  });

  const handleChangeColor = (name) => (event) => {
    const isRgb = (string) =>
      /rgb\([0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\)/i.test(string);

    const isHex = (string) => /^#?([0-9a-f]{3})$|^#?([0-9a-f]){6}$/i.test(string);

    let {
      target: { value: color },
    } = event;

    setState((prevState) => ({
      ...prevState,
      [`${name}Input`]: color,
    }));

    let isValidColor = false;

    if (isRgb(color)) {
      isValidColor = true;
    } else if (isHex(color)) {
      isValidColor = true;
      if (!color.includes('#')) {
        color = `#${color}`;
      }
    }

    if (isValidColor) {
      setState((prevState) => ({
        ...prevState,
        [name]: color,
      }));
    }
  };

  const handleChangeHue = (name) => (event) => {
    const hue = event.target.value;
    const color = colors[hue][shades[state[`${name}Shade`]]];

    setState({
      ...state,
      [`${name}Hue`]: hue,
      [name]: color,
      [`${name}Input`]: color,
    });
  };

  const handleChangeShade = (name) => (event, shade) => {
    const color = colors[state[`${name}Hue`]][shades[shade]];
    setState({
      ...state,
      [`${name}Shade`]: shade,
      [name]: color,
      [`${name}Input`]: color,
    });
  };

  const handleChangeDocsColors = () => {
    const paletteColors = {
      primary: { ...colors[state.primaryHue], main: state.primary },
      secondary: { ...colors[state.secondaryHue], main: state.secondary },
    };

    setDocsColors(paletteColors.primary, paletteColors.secondary);

    document.cookie = `paletteColors=${JSON.stringify(
      paletteColors,
    )};path=/;max-age=31536000`;
  };

  const handleResetDocsColors = () => {
    resetDocsColor();

    document.cookie = 'paletteColors=;path=/;max-age=0';
  };

  const colorBar = (color) => {
    const background = theme.palette.augmentColor({
      color: {
        main: color,
      },
    });

    return (
      <Grid container sx={{ mt: 2 }}>
        {['dark', 'main', 'light'].map((key) => (
          <Box
            sx={{
              width: 64,
              height: 64,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            style={{ backgroundColor: background[key] }}
            key={key}
          >
            <Typography
              variant="caption"
              style={{
                color: theme.palette.getContrastText(background[key]),
              }}
            >
              {rgbToHex(background[key])}
            </Typography>
          </Box>
        ))}
      </Grid>
    );
  };

  const colorPicker = (intent) => {
    const intentInput = state[`${intent}Input`];
    const intentShade = state[`${intent}Shade`];
    const color = state[`${intent}`];

    return (
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
        }}
      >
        <Typography component="label" gutterBottom htmlFor={intent} variant="h6">
          {capitalize(intent)}
        </Typography>
        <Input
          id={intent}
          value={intentInput}
          onChange={handleChangeColor(intent)}
          fullWidth
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
          <Typography id={`${intent}ShadeSliderLabel`}>Shade:</Typography>
          <Slider
            sx={{ width: 'calc(100% - 80px)', ml: 3, mr: 3 }}
            value={intentShade}
            min={0}
            max={13}
            step={1}
            onChange={handleChangeShade(intent)}
            aria-labelledby={`${intent}ShadeSliderLabel`}
          />
          <Typography minWidth={40}>{shades[intentShade]}</Typography>
        </Box>
        <Box sx={{ width: 192 }}>
          {hues.map((hue) => {
            const shade =
              intent === 'primary'
                ? shades[state.primaryShade]
                : shades[state.secondaryShade];
            const backgroundColor = colors[hue][shade];

            return (
              <Tooltip placement="right" title={hue} key={hue} disableInteractive>
                <TooltipRadio
                  sx={{ p: 0 }}
                  color="default"
                  checked={state[intent] === backgroundColor}
                  onChange={handleChangeHue(intent)}
                  value={hue}
                  name={intent}
                  icon={
                    <Box
                      sx={{ width: 48, height: 48 }}
                      style={{ backgroundColor }}
                    />
                  }
                  checkedIcon={
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        border: 1,
                        borderColor: 'white',
                        color: 'common.white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      style={{ backgroundColor }}
                    >
                      <CheckIcon style={{ fontSize: 30 }} />
                    </Box>
                  }
                />
              </Tooltip>
            );
          })}
        </Box>
        {colorBar(color)}
      </Grid>
    );
  };

  return (
    <Grid container spacing={5} sx={{ p: 0 }}>
      {colorPicker('primary')}
      {colorPicker('secondary')}
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
        }}
      >
        <ColorDemo data={state} />
      </Grid>
      <Grid size={12}>
        <Button variant="contained" onClick={handleChangeDocsColors}>
          Set Docs Colors
        </Button>
        <Button variant="outlined" onClick={handleResetDocsColors} sx={{ ml: 1 }}>
          Reset Docs Colors
        </Button>
      </Grid>
    </Grid>
  );
}

export default ColorTool;
```

The output shown in the color sample can be pasted directly into a [`createTheme()`](/material-ui/customization/theming/#createtheme-options-args-theme) function (to be used with [`ThemeProvider`](/material-ui/customization/theming/#theme-provider)):

```jsx
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});
```

Only the `main` shades need to be provided (unless you wish to further customize `light`, `dark` or `contrastText`), as the other colors will be calculated by `createTheme()`, as described in the [Theme customization](/material-ui/customization/palette/) section.

If you are using the default primary and / or secondary shades then by providing the color object, `createTheme()` will use the appropriate shades from the material color for main, light and dark.

### Tools by the community

- [mui-theme-creator](https://zenoo.github.io/mui-theme-creator/): A tool to help design and customize themes for the Material UI component library. Includes basic site templates to show various components and how they are affected by the theme
- [Material palette generator](https://m2.material.io/inline-tools/color/): The Material palette generator can be used to generate a palette for any color you input.

## 2014 Material Design color palettes

These color palettes, originally created by Material Design in 2014, are comprised of colors designed to work together harmoniously, and can be used to develop your brand palette. To generate your own harmonious palettes, use the palette generation tool.

### Important Terms

- **Palette**: A palette is a collection of colors, that is hues and their shades. Material UI provides all colors from the Material Design guidelines.
  [This color palette](#color-palette) has been designed with colors that work harmoniously with each other.
- **Hue & Shade**: A single color within the palette is made up of a hue such as "red", and shade, such as "500".
  "red 50" is the lightest shade of red (_pink!_), while "red 900" is the darkest.
  In addition, most hues come with "accent" shades, prefixed with an `A`.

### Color palette

Given a _HUE_ (red, pink, etc.) and a _SHADE_ (500, 600, etc.) you can import the color like this:

```jsx
import { red } from '@mui/material/colors';

const color = red[500];
```

```jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';

const mainColors = [
  'Red',
  'Pink',
  'Purple',
  'Deep Purple',
  'Indigo',
  'Blue',
  'Light Blue',
  'Cyan',
  'Teal',
  'Green',
  'Light Green',
  'Lime',
  'Yellow',
  'Amber',
  'Orange',
  'Deep Orange',
  'Brown',
  'Grey',
  'Blue Grey',
];

const mainPalette = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const altPalette = ['A100', 'A200', 'A400', 'A700'];

const ColorGroup = styled('ul', { name: 'ColorGroup' })(({ theme }) => ({
  padding: 0,
  margin: theme.spacing(0, 2, 2, 0),
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    flexGrow: 0,
    width: '30%',
  },
}));

const ColorValue = styled('span', { name: 'ColorValue' })(({ theme }) => ({
  ...theme.typography.caption,
  color: 'inherit',
  fontWeight: 'inherit',
}));

const ColorBlock = styled('li', { name: 'ColorBlock' })(
  ({ theme }) => theme.typography.body2,
);

function getColorBlock(theme, colorName, colorValue, colorTitle) {
  const bgColor = colors[colorName][colorValue];
  const fgColor = theme.palette.getContrastText(bgColor);

  let blockTitle;
  if (colorTitle) {
    blockTitle = <Box sx={{ mb: '60px' }}>{colorName}</Box>;
  }

  let rowStyle = {
    backgroundColor: bgColor,
    color: fgColor,
    listStyle: 'none',
    padding: 15,
  };

  if (colorValue.toString().startsWith('A1')) {
    rowStyle = {
      ...rowStyle,
      marginTop: 4,
    };
  }

  return (
    <ColorBlock style={rowStyle} key={colorValue}>
      {blockTitle}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{colorValue}</span>
        <ColorValue>{bgColor}</ColorValue>
      </Box>
    </ColorBlock>
  );
}

function getColorGroup(options) {
  const { theme, color, showAltPalette } = options;
  const cssColor = color
    .replace(' ', '')
    .replace(color.charAt(0), color.charAt(0).toLowerCase());
  let colorsList = [];
  colorsList = mainPalette.map((mainValue) =>
    getColorBlock(theme, cssColor, mainValue),
  );

  if (showAltPalette) {
    altPalette.forEach((altValue) => {
      colorsList.push(getColorBlock(theme, cssColor, altValue));
    });
  }

  return (
    <ColorGroup key={cssColor}>
      {getColorBlock(theme, cssColor, 500, true)}
      <Box sx={{ height: 4, listStyle: 'none' }} component="li" role="separator" />
      {colorsList}
    </ColorGroup>
  );
}

function Color() {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {mainColors.map((mainColor) =>
        getColorGroup({
          theme,
          color: mainColor,
          showAltPalette: true,
        }),
      )}
    </Box>
  );
}

export default Color;
```

### Examples

For instance, you can refer to complementary primary and accent colors, "red 500" and "purple A200" like so:

```js
import { purple, red } from '@mui/material/colors';

const primary = red[500]; // #f44336
const accent = purple['A200']; // #e040fb
const accent = purple.A200; // #e040fb (alternative method)
```

### Accessibility

[WCAG 2.1 Rule 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) does recommend
that you have a minimum of a 4.5:1 contrast ratio for the visual presentation of text and images of text.
Material UI currently only enforces a 3:1 contrast ratio. If you would like to meet WCAG 2.1 AA compliance,
you can increase your minimum contrast ratio as described in the
[Theme customization](/material-ui/customization/palette/#accessibility) section.
