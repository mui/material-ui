import { deepmerge } from '@mui/utils';
import { generateUtilityClass } from '@mui/base';
import { createTheme as systemCreateTheme, decomposeColor } from '@mui/system';
import createThemeWithoutVars from './createTheme';
import createMixins from './createMixins';
import createPalette from './createPalette';
import shadows from './shadows';
import createTransitions from './createTransitions';
import zIndex from './zIndex';

const { palette: lightPalette } = createThemeWithoutVars();
const { palette: darkPalette } = createThemeWithoutVars({ palette: { mode: 'dark' } });

function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput,
    mixins: mixinsInput = {},
    spacing: spacingInput,
    colorSchemes: colorSchemesInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {},
    shape: shapeInput,
    opacity: opacityInput = {},
    ...other
  } = options;

  const colorSchemesInitial = colorSchemesInput;

  if (!colorSchemesInitial.light) {
    colorSchemesInitial.light = { palette: lightPalette };
  }

  if (!colorSchemesInitial.dark) {
    colorSchemesInitial.dark = { palette: darkPalette };
  }

  const colorSchemes = {};

  Object.keys(colorSchemesInitial).forEach((key) => {
    const palette = createPalette(colorSchemesInitial[key].palette);

    Object.keys(palette).forEach((color) => {
      const colors = palette[color];

      if (colors.main) {
        palette[color].mainChannel = decomposeColor(colors.main).values.join(' ');
      }
      if (colors.light) {
        palette[color].lightChannel = decomposeColor(colors.light).values.join(' ');
      }
      if (colors.dark) {
        palette[color].darkChannel = decomposeColor(colors.dark).values.join(' ');
      }
    });
    colorSchemes[key] = { palette };
  });

  const systemTheme = systemCreateTheme(options);
  const opacity = {
    active: 0.54,
    hover: 0.04,
    selected: 0.08,
    disabled: 0.26,
    focus: 0.12,
    ...opacityInput,
  };

  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, systemTheme.spacing, mixinsInput),
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows.slice(),
    // TODO: At this moment this is not processed, as we need to know the color scheme
    // which is not part of the CssVarsProvider
    typography: typographyInput,
    transitions: createTransitions(transitionsInput),
    zIndex: { ...zIndex },
    colorSchemes,
    opacity,
  });

  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);

  if (process.env.NODE_ENV !== 'production') {
    const stateClasses = [
      'active',
      'checked',
      'completed',
      'disabled',
      'error',
      'expanded',
      'focused',
      'focusVisible',
      'required',
      'selected',
    ];

    const traverse = (node, component) => {
      let key;

      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (key in node) {
        const child = node[key];
        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            const stateClass = generateUtilityClass('', key);
            console.error(
              [
                `MUI: The \`${component}\` component increases ` +
                  `the CSS specificity of the \`${key}\` internal state.`,
                'You can not override it like this: ',
                JSON.stringify(node, null, 2),
                '',
                `Instead, you need to use the '&.${stateClass}' syntax:`,
                JSON.stringify(
                  {
                    root: {
                      [`&.${stateClass}`]: child,
                    },
                  },
                  null,
                  2,
                ),
                '',
                'https://mui.com/r/state-classes-guide',
              ].join('\n'),
            );
          }
          // Remove the style to prevent global conflicts.
          node[key] = {};
        }
      }
    };

    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;

      if (styleOverrides && component.indexOf('Mui') === 0) {
        traverse(styleOverrides, component);
      }
    });
  }

  return muiTheme;
}

let warnedOnce = false;

export function createMuiTheme(...args) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(
        [
          'MUI: the createMuiTheme function was renamed to createTheme.',
          '',
          "You should use `import { createTheme } from '@mui/material/styles'`",
        ].join('\n'),
      );
    }
  }

  return createTheme(...args);
}

export default createTheme;
