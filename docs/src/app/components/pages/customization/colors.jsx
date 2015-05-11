var React = require('react');
var mui = require('mui');
var Colors = mui.Styles.Colors;
var ColorManipulator = mui.Utils.ColorManipulator;

var ColorsPage = React.createClass({

  render: function() {
    var mainColors = [
        'Red', 'Pink', 'Purple', 'Deep Purple', 'Indigo', 'Blue', 'Light Blue', 
        'Cyan', 'Teal', 'Green', 'Light Green', 'Lime', 'Yellow', 'Amber', 'Orange', 'Deep Orange'
      ],
      neutralColors = ['Brown', 'Blue Grey', 'Grey'],
      colorGroups = [],
      neutralGroups = [];

    mainColors.forEach(function(color) {
      colorGroups.push(this._getColorGroup(color, true));
    }, this);

    neutralColors.forEach(function(color) {
      neutralGroups.push(this._getColorGroup(color, false));
    }, this);

    var googleLink = "https://www.google.com/design/spec/style/color.html#color-ui-color-palette";
    var githubLink = "https://github.com/callemall/material-ui/blob/css-in-js/src/js/styles/colors.js";

    return (
      <div>
        <h2 className="mui-font-style-headline">UI Color Palette</h2>
        <p>
          We&#39;ve created javascript variables for every color used in 
          the <a href={googleLink}>UI Color Palette</a>. They are stored 
          in <a href={githubLink}>styles/colors.js</a>. 
        </p>

        <div className="color-palette">
          {colorGroups}

          <div className="neutral">
            {neutralGroups}
          </div>
        </div>
      </div>
    );
  },

  _getColorGroup: function(color, showAltPalette) {
    var mainPalette = [50,100,200,300,400,500,600,700,800,900];
    var altPalette = ['A100','A200','A400','A700'];
    var cssColor = color.replace(' ', '').replace(color.charAt(0), color.charAt(0).toLowerCase());
    var colors = [];

    mainPalette.forEach(function(mainValue) {
      colors.push(this._getColorBlock(cssColor, mainValue));
    }, this);

    if (showAltPalette) {
      altPalette.forEach(function(altValue) {
        colors.push(this._getColorBlock(cssColor, altValue));
      }, this);
    }

    return (
      <ul className="color-group">
        {this._getColorBlock(cssColor, 500, color)}
        {colors}
      </ul>
    );
  },

  _getColorBlock: function(colorName, colorValue, colorTitle) {
    var bgColorText = colorName + colorValue;
    var bgColor = Colors[bgColorText];
    var fgColor = Colors.fullBlack;
    var contrastRatio = ColorManipulator.contrastRatio(bgColor, fgColor);
    var blockTitle;

    if (contrastRatio < 7) fgColor = Colors.fullWhite;
    if (colorTitle) blockTitle = <span className="name">{colorTitle}</span>;

    var styles = {
      backgroundColor: bgColor,
      color: fgColor,
    };

    return (
      <li style={styles} className="color">{blockTitle}{bgColorText}</li>
    );
  }

});

module.exports = ColorsPage;
