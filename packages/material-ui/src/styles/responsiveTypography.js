import convertLength from 'convert-css-length';
import { responsiveProperty, alignProperty, fontGrid } from '@material-ui/css-utils';

function isUnitless(value) {
  return String(parseFloat(value)).length === String(value).length;
}

export default function responsiveTypography(typography, options = {}) {
  const {
    maxScale,
    breakpointSettings,
    breakpoints = ['sm', 'md', 'lg', 'xl'],
    align = true,
  } = options;
  // Convert between css lengths e.g. em->px or px->rem
  // Set the baseFontSize for your project. Defaults to 16px (also the browser default).
  const convert = convertLength(typography.htmlFontSize);
  const output = { ...typography };
  const breakpointValues = breakpoints.map(x => breakpointSettings.values[x]);

  [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
  ].forEach(variant => {
    const style = output[variant];

    const remFontSize = convert(style.fontSize, 'rem');
    const minFontSize = parseFloat(remFontSize);
    const maxFontSize = Math.round(minFontSize * maxScale * 10) / 10;
    let { lineHeight } = style;

    if (!isUnitless(lineHeight) && align) {
      throw new Error(
        [
          `Material-UI: unsupported non-unitless line height with grid alignment.`,
          'Use unitless line heights instead.',
        ].join('\n'),
      );
    }

    if (!isUnitless(lineHeight)) {
      // make it unitless
      lineHeight = parseFloat(convert(lineHeight, 'rem')) / parseFloat(remFontSize);
    }

    let transform = null;

    if (align) {
      transform = value =>
        alignProperty({
          size: value,
          grid: fontGrid({ pixels: 4, lineHeight, htmlFontSize: typography.htmlFontSize }),
        });
    }

    output[variant] = {
      ...style,
      ...responsiveProperty({
        cssProperty: 'fontSize',
        min: minFontSize,
        max: maxFontSize,
        unit: 'rem',
        range: breakpointValues,
        transform,
      }),
    };
  });

  return output;
}
