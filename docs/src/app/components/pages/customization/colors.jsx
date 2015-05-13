var React = require('react');
var mui = require('mui');
var ClearFix = mui.ClearFix;
var ColorManipulator = mui.Utils.ColorManipulator;

var {Colors, Typography} = mui.Styles;
var {StyleResizable, StylePropable} = mui.Mixins;

var ColorsPage = React.createClass({

  mixins: [StyleResizable, StylePropable],

  getStyles: function() {
    var styles = {
      root: {
        //null
      },
      name: {
        display: 'block',
        marginBottom: '60px'
      },
      hex: {
        float: 'right'
      },
      colorGroup: {
        float: 'left',
        padding: '16px 0',
        display: 'block',
        margin: '0'
      },
      headline: {
        //mui-font-style-headline
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack        
      },
      colorGroupWhenSmall: {
        width: '50%'
      },
      colorGroupWhenMedium: {
        width: '33%'
      },
      colorGroupWhenLarge: {
        width: '25%'
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.colorGroup = this.mergeStyles(styles.colorGroup, styles.colorGroupWhenLarge);
    } else if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)) {
      styles.colorGroup = this.mergeStyles(styles.colorGroup, styles.colorGroupWhenMedium);
    } else {
      styles.colorGroup = this.mergeStyles(styles.colorGroup, styles.colorGroupWhenSmall);   
    }

    return styles;
  },

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
        <h2 style={this.getStyles().headline}>UI Color Palette</h2>
        <p>
          We&#39;ve created javascript variables for every color used in 
          the <a href={googleLink}>UI Color Palette</a>. They are stored 
          in <a href={githubLink}>styles/colors.js</a>. 
        </p>

        <ClearFix>
          {colorGroups}

          <div>
            {neutralGroups}
          </div>
        </ClearFix>
      </div>
    );
  },

  _getColorGroup: function(color, showAltPalette) {
    var mainPalette = [50,100,200,300,400,500,600,700,800,900];
    var altPalette = ['A100','A200','A400','A700'];
    var cssColor = color.replace(' ', '').replace(color.charAt(0), color.charAt(0).toLowerCase());
    var colors = [];
    var colorGroupStyle = this.getStyles().colorGroup;

    mainPalette.forEach(function(mainValue) {
      colors.push(this._getColorBlock(cssColor, mainValue));
    }, this);

    if (showAltPalette) {
      altPalette.forEach(function(altValue) {
        colors.push(this._getColorBlock(cssColor, altValue));
      }, this);
    }

    return (
      <ul style={colorGroupStyle}>
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
    if (colorTitle) blockTitle = <span style={this.getStyles().name}>{colorTitle}</span>;

    var styles = {
      backgroundColor: bgColor,
      color: fgColor,
      listStyle: 'none',
      padding: '15px'
    };

    // if (colorValue === 900) styles.paddingBottom = '16px';

    return (
      <li style={styles}>{blockTitle}{bgColorText}</li>
    );
  }

});

module.exports = ColorsPage;
