import AutoPrefix from '../styles/auto-prefix';
import ImmutabilityHelper from '../utils/immutability-helper';
import warning from 'warning';

const reTranslate = /((^|\s)translate(3d|X)?\()(\-?[\d]+)/;

const reSkew = /((^|\s)skew(x|y)?\()\s*(\-?[\d]+)(deg|rad|grad)(,\s*(\-?[\d]+)(deg|rad|grad))?/;


// This function ensures that `style` supports both ltr and rtl directions by checking
//   `styleConstants` in `muiTheme` and replacing attribute keys if necessary.
function ensureDirection(muiTheme, style) {
  if (process.env.NODE_ENV !== 'production') {
    warning(!style.didFlip, `You're calling ensureDirection() on the same style
      object twice.`);

    style = ImmutabilityHelper.merge({
      didFlip: 'true',
    }, style);
  }

  // Left to right is the default. No need to flip anything.
  if (!muiTheme || !muiTheme.isRtl) return style;

  const flippedAttributes = {
    // Keys and their replacements.
    right: 'left',
    left: 'right',
    marginRight: 'marginLeft',
    marginLeft: 'marginRight',
    paddingRight: 'paddingLeft',
    paddingLeft: 'paddingRight',
    borderRight: 'borderLeft',
    borderLeft: 'borderRight',
  };

  let newStyle = {};

  Object.keys(style).forEach(function(attribute) {
    let value = style[attribute];
    let key = attribute;

    if (flippedAttributes.hasOwnProperty(attribute)) {
      key = flippedAttributes[attribute];
    }

    switch (attribute) {
      case 'float':
      case 'textAlign':
        if (value === 'right') {
          value = 'left';
        } else if (value === 'left') {
          value = 'right';
        }
        break;

      case 'direction':
        if (value === 'ltr') {
          value = 'rtl';
        } else if (value === 'rtl') {
          value = 'ltr';
        }
        break;

      case 'transform':
        let matches;
        if ((matches = value.match(reTranslate))) {
          value = value.replace(matches[0], matches[1] + (-parseFloat(matches[4])) );
        }
        if ((matches = value.match(reSkew))) {
          value = value.replace(matches[0], matches[1] + (-parseFloat(matches[4])) + matches[5] +
            matches[6] ? ',' + (-parseFloat(matches[7])) + matches[8] : ''
          );
        }
        break;

      case 'transformOrigin':
        if (value.indexOf('right') > -1) {
          value = value.replace('right', 'left');
        } else if (value.indexOf('left') > -1) {
          value = value.replace('left', 'right');
        }
        break;
    }

    newStyle[key] = value;
  });

  return newStyle;
}

export default {

  merge() {
    return ImmutabilityHelper.merge.apply(this, arguments);
  },

  prepareStyles(muiTheme, ...styles) {
    styles = styles.length > 1 ? ImmutabilityHelper.merge.apply(this, styles) : (styles[0] || {});
    const flipped = ensureDirection(muiTheme, styles);
    return AutoPrefix.all(flipped);
  },
};
