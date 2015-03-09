module.exports = {

  // additionalValue = An extra value that has been calculated but not included 
  // with the original color object, such as an alpha value.
  _convertColorToString: function (color, additonalValue) {
    var str = color.type + '(' + 
              parseInt(color.values[0]) + ',' +
              parseInt(color.values[1]) + ',' +
              parseInt(color.values[2]);
    
    if (additonalValue !== undefined) {
      str += ',' + additonalValue + ')';
    } else if (color.values.length == 4) {
      str += ',' + color.values[3] + ')';
    } else {
      str += ')';
    }
  
    return str;
  },

	_convertHexToRGB: function(color) {
    if (color.length === 4) {
      var extendedColor = '#';
      for (var i = 1; i < color.length; i++) {
        extendedColor += color.charAt(i) + color.charAt(i);
      }
      color = extendedColor;
    }

		var values = {
			r:	parseInt(color.substr(1,2), 16),
			g:	parseInt(color.substr(3,2), 16),
			b:	parseInt(color.substr(5,2), 16),
		};

    return 'rgb(' + values.r + ',' + 
                    values.g + ',' + 
                    values.b + ')';
	},

	_decomposeColor: function(color) {
		if (color.charAt(0) === '#') {
      return this._decomposeColor(this._convertHexToRGB(color));
		} 

    var marker = color.indexOf('(');
    var type = color.substring(0, marker);
    var values = color.substring(marker + 1, color.length - 1).split(',');

    return {type: type, values: values};
	},

  // Set the absolute transparency of a color. 
  // Any existing alpha values are overwritten. 
  fade: function(color, amount) {
    var colorObj = this._decomposeColor(color);
    if (colorObj.type == 'rgb' || colorObj.type == 'hsl') colorObj.type += 'a';
    return this._convertColorToString(colorObj, amount)
  },

  // Desaturates rgb and sets opacity to 0.15
  lighten: function(color, amount) {
    var colorObj = this._decomposeColor(color);

    if (colorObj.type.indexOf('hsl') > -1) {
      colorObj.values[2] += amount;
      return  this._decomposeColor(this._convertColorToString(colorObj));
    } else if (colorObj.type.indexOf('rgb') > -1) {
      for (var i = 0; i < 3; i++) {
        colorObj.values[i] *= 1 + amount;
        if (colorObj.values[i] > 255) colorObj.values[i] = 255;  
      }
    }

    if (colorObj.type.indexOf('a') <= -1) colorObj.type += 'a';

    return  this._convertColorToString(colorObj, '0.15');
  },

  darken: function(color, amount) {
    var colorObj = this._decomposeColor(color);

    if (colorObj.type.indexOf('hsl') > -1) {
      colorObj.values[2] += amount;
      return  this._decomposeColor(this._convertColorToString(colorObj));
    } else if (colorObj.type.indexOf('rgb') > -1) {
      for (var i = 0; i < 3; i++) {
        colorObj.values[i] *= 1 - amount;
        if (colorObj.values[i] < 0) colorObj.values[i] = 0;  
      }
    }

    return this._convertColorToString(colorObj);
  },
};