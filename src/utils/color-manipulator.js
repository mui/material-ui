module.exports = {

  /**
   * The relative brightness of any point in a colorspace, normalized to 0 for
   * darkest black and 1 for lightest white. RGB colors only. Does not take
   * into account alpha values.
   *
   * TODO:
   * - Take into account alpha values.
   * - Identify why there are minor discrepancies for some use cases
   *   (i.e. #F0F & #FFF). Note that these cases rarely occur.
   *
   * Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  _luminance(color) {
    color = this._decomposeColor(color);

    if (color.type.indexOf('rgb') > -1) {
      let rgb = color.values.map((val) => {
        val /= 255; // normalized
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

    }
    else {
      let message = 'Calculating the relative luminance is not available for ' +
                    'HSL and HSLA.';
      console.error(message);
      return -1;
    }
  },

  /**
   * @params:
   * additionalValue = An extra value that has been calculated but not included
   *                   with the original color object, such as an alpha value.
   */
  _convertColorToString(color, additonalValue) {
    let str = color.type + '(' +
              parseInt(color.values[0]) + ',' +
              parseInt(color.values[1]) + ',' +
              parseInt(color.values[2]);

    if (additonalValue !== undefined) {
      str += ',' + additonalValue + ')';
    }
    else if (color.values.length === 4) {
      str += ',' + color.values[3] + ')';
    }
    else {
      str += ')';
    }

    return str;
  },

  // Converts a color from hex format to rgb format.
  _convertHexToRGB(color) {
    if (color.length === 4) {
      let extendedColor = '#';
      for (let i = 1; i < color.length; i++) {
        extendedColor += color.charAt(i) + color.charAt(i);
      }
      color = extendedColor;
    }

    let values = {
      r:	parseInt(color.substr(1,2), 16),
      g:	parseInt(color.substr(3,2), 16),
      b:	parseInt(color.substr(5,2), 16),
    };

    return 'rgb(' + values.r + ',' +
                    values.g + ',' +
                    values.b + ')';
  },

  // Returns the type and values of a color of any given type.
  _decomposeColor(color) {
    if (color.charAt(0) === '#') {
      return this._decomposeColor(this._convertHexToRGB(color));
    }

    let marker = color.indexOf('(');
    let type = color.substring(0, marker);
    let values = color.substring(marker + 1, color.length - 1).split(',');

    return {type: type, values: values};
  },

  // Set the absolute transparency of a color.
  // Any existing alpha values are overwritten.
  fade(color, amount) {
    color = this._decomposeColor(color);
    if (color.type === 'rgb' || color.type === 'hsl') color.type += 'a';
    return this._convertColorToString(color, amount);
  },

  // Desaturates rgb and sets opacity to 0.15
  lighten(color, amount) {
    color = this._decomposeColor(color);

    if (color.type.indexOf('hsl') > -1) {
      color.values[2] += amount;
      return this._decomposeColor(this._convertColorToString(color));
    }
    else if (color.type.indexOf('rgb') > -1) {
      for (let i = 0; i < 3; i++) {
        color.values[i] *= 1 + amount;
        if (color.values[i] > 255) color.values[i] = 255;
      }
    }

    if (color.type.indexOf('a') <= -1) color.type += 'a';

    return this._convertColorToString(color, '0.15');
  },

  darken(color, amount) {
    color = this._decomposeColor(color);

    if (color.type.indexOf('hsl') > -1) {
      color.values[2] += amount;
      return this._decomposeColor(this._convertColorToString(color));
    }
    else if (color.type.indexOf('rgb') > -1) {
      for (let i = 0; i < 3; i++) {
        color.values[i] *= 1 - amount;
        if (color.values[i] < 0) color.values[i] = 0;
      }
    }

    return this._convertColorToString(color);
  },


  // Calculates the contrast ratio between two colors.
  //
  // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
  contrastRatio(background, foreground) {
    let lumA = this._luminance(background);
    let lumB = this._luminance(foreground);

    if (lumA >= lumB) {
      return ((lumA + 0.05) / (lumB + 0.05)).toFixed(2);
    }
    else {
      return ((lumB + 0.05) / (lumA + 0.05)).toFixed(2);
    }
  },

  /**
   * Determines how readable a color combination is based on its level.
   * Levels are defined from @LeaVerou:
   * https://github.com/LeaVerou/contrast-ratio/blob/gh-pages/contrast-ratio.js
   */
  contrastRatioLevel(background, foreground) {
    let levels = {
      'fail': {
        range: [0, 3],
        color: 'hsl(0, 100%, 40%)',
      },
      'aa-large': {
        range: [3, 4.5],
        color: 'hsl(40, 100%, 45%)',
      },
      'aa': {
        range: [4.5, 7],
        color: 'hsl(80, 60%, 45%)',
      },
      'aaa': {
        range: [7, 22],
        color: 'hsl(95, 60%, 41%)',
      },
    };

    let ratio = this.contrastRatio(background, foreground);

    for (let level in levels) {
      let range = levels[level].range;
      if (ratio >= range[0] && ratio <= range[1]) return level;
    }
  },
};
