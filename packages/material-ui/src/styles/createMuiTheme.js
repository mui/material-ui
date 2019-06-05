import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.
import isPlainObject from 'is-plain-object';
import warning from 'warning';
import createBreakpoints from './createBreakpoints';
import createMixins from './createMixins';
import createPalette from './createPalette';
import createTypography from './createTypography';
import shadows from './shadows';
import shape from './shape';
import createSpacing from './createSpacing';
import transitions from './transitions';
import zIndex from './zIndex';

function createMuiTheme(options = {}) {
  const {
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    shadows: shadowsInput,
    spacing: spacingInput,
    typography: typographyInput = {},
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);

  const muiTheme = {
    breakpoints,
    direction: 'ltr',
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    overrides: {}, // Inject custom styles
    palette,
    props: {}, // Inject custom properties
    shadows: shadowsInput || shadows,
    typography: createTypography(palette, typographyInput),
    spacing,
    ...deepmerge(
      {
        shape,
        transitions,
        zIndex,
      },
      other,
      {
        isMergeableObject: isPlainObject,
      },
    ),
  };

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
    const traverse = (node, parentKey, depth = 1) => {
      let key;

      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (key in node) {
        const child = node[key];
        if (depth === 1) {
          if (key.indexOf('Mui') === 0 && child) {
            traverse(child, key, depth + 1);
          }
        } else if (pseudoClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          warning(
            false,
            [
              `Material-UI: the \`${parentKey}\` component increases ` +
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
              'https://material-ui.com/customization/components/#pseudo-classes',
            ].join('\n'),
          );
          // Remove the style to prevent global conflicts.
          node[key] = {};
        }
      }
    };

    traverse(muiTheme.overrides);
  }

  warning(
    muiTheme.shadows.length === 25,
    'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.',
  );

  return muiTheme;
}

export default createMuiTheme;
