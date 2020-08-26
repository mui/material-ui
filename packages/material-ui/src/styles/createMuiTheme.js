import { deepmerge } from '@material-ui/utils';
import createBreakpoints from './createBreakpoints';
import createMixins from './createMixins';
import createPalette from './createPalette';
import createTypography from './createTypography';
import shadows from './shadows';
import shape from './shape';
import createSpacing from './createSpacing';
import transitions from './transitions';
import zIndex from './zIndex';

function createMuiTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    typography: typographyInput = {},
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);

  let muiTheme = deepmerge(
    {
      breakpoints,
      direction: 'ltr',
      mixins: createMixins(breakpoints, spacing, mixinsInput),
      components: {}, // Inject component overrides
      palette,
      shadows,
      typography: createTypography(palette, typographyInput),
      spacing,
      shape,
      transitions,
      zIndex,
    },
    other,
  );

  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);

  if (process.env.NODE_ENV !== 'production') {
    const pseudoClasses = [
      'checked',
      'disabled',
      'error',
      'focused',
      'focusVisible',
      'required',
      'expanded',
      'selected',
    ];
    const traverse = (node, component) => {
      let key;

      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (key in node) {
        const child = node[key];
        if (pseudoClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            console.error(
              [
                `Material-UI: The \`${component}\` component increases ` +
                  `the CSS specificity of the \`${key}\` internal state.`,
                'You can not override it like this: ',
                JSON.stringify(node, null, 2),
                '',
                'Instead, you need to use the $ruleName syntax:',
                JSON.stringify(
                  {
                    root: {
                      [`&$${key}`]: child,
                    },
                  },
                  null,
                  2,
                ),
                '',
                'https://material-ui.com/r/pseudo-classes-guide',
              ].join('\n'),
            );
          }
          // Remove the style to prevent global conflicts.
          node[key] = {};
        }
      }
    };

    Object.keys(muiTheme.components).forEach((component) => {
      const overrides = muiTheme.components[component].overrides;

      if (overrides && component.indexOf('Mui') === 0) {
        traverse(overrides, component);
      }
    });
  }

  return muiTheme;
}

export default createMuiTheme;
