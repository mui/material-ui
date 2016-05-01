import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import ClearFix from 'material-ui/internal/ClearFix';
import {getContrastRatio} from 'material-ui/utils/colorManipulator';
import typography from 'material-ui/styles/typography';
import * as colors from 'material-ui/styles/colors';

const mainColors = [
  'Red', 'Pink', 'Purple', 'Deep Purple', 'Indigo', 'Blue', 'Light Blue',
  'Cyan', 'Teal', 'Green', 'Light Green', 'Lime', 'Yellow', 'Amber', 'Orange',
  'Deep Orange',
];

class ColorsPage extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
  };

  getStyles() {
    const styles = {
      name: {
        display: 'block',
        marginBottom: 60,
      },
      colorContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      colorValue: {
        fontSize: 12,
      },
      hex: {
        float: 'right',
      },
      colorGroup: {
        float: 'left',
        padding: '16px 0',
        display: 'block',
        margin: 0,
      },
      headline: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
        letterSpacing: 0,
        fontWeight: typography.fontWeightNormal,
        color: typography.textDarkBlack,
      },
      colorGroupWhenSmall: {
        width: '50%',
      },
      colorGroupWhenMedium: {
        width: '33%',
      },
      colorGroupWhenLarge: {
        width: '25%',
      },
    };

    if (this.props.width === LARGE) {
      styles.colorGroup = Object.assign(styles.colorGroup, styles.colorGroupWhenLarge);
    } else if (this.props.width === MEDIUM) {
      styles.colorGroup = Object.assign(styles.colorGroup, styles.colorGroupWhenMedium);
    } else {
      styles.colorGroup = Object.assign(styles.colorGroup, styles.colorGroupWhenSmall);
    }

    return styles;
  }

  getColorGroup(styles, color, showAltPalette) {
    const mainPalette = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const altPalette = ['A100', 'A200', 'A400', 'A700'];
    const cssColor = color.replace(' ', '').replace(color.charAt(0), color.charAt(0).toLowerCase());
    const colors = [];
    const colorGroupStyle = styles.colorGroup;

    mainPalette.forEach((mainValue) => {
      colors.push(this.getColorBlock(styles, cssColor, mainValue));
    }, this);

    if (showAltPalette) {
      altPalette.forEach((altValue) => {
        colors.push(this.getColorBlock(styles, cssColor, altValue));
      }, this);
    }

    return (
      <ul style={colorGroupStyle}>
        {React.Children.toArray(this.getColorBlock(styles, cssColor, 500, color))}
        {React.Children.toArray(colors)}
      </ul>
    );
  }

  getColorBlock(styles, colorName, colorValue, colorTitle) {
    const bgColorText = colorName + colorValue;
    const bgColor = colors[bgColorText];
    let fgColor = colors.fullBlack;
    const contrastRatio = getContrastRatio(bgColor, fgColor);
    let blockTitle;

    if (contrastRatio < 7) fgColor = colors.fullWhite;
    if (colorTitle) {
      blockTitle = (
        <span style={styles.name}>
          {colorTitle}
        </span>
      );
    }

    const rowStyle = {
      backgroundColor: bgColor,
      color: fgColor,
      listStyle: 'none',
      padding: 15,
    };

    return (
      <li style={rowStyle}>
        {blockTitle}
        {this.getColorName(styles, bgColorText, bgColor)}
      </li>
    );
  }

  getColorName(styles, text, colorValue) {
    return (
      <div style={styles.colorContainer}>
        <span>{text}</span>
        <span style={styles.colorValue}>{colorValue.toUpperCase()}</span>
      </div>
    );
  }

  render() {
    const styles = this.getStyles();

    const neutralColors = ['Brown', 'Blue Grey', 'Grey'];
    const colorGroups = [];
    const neutralGroups = [];

    mainColors.forEach((color) => {
      colorGroups.push(this.getColorGroup(styles, color, true));
    }, this);

    neutralColors.forEach((color) => {
      neutralGroups.push(this.getColorGroup(styles, color, false));
    }, this);

    return (
      <div>
        <Title render={(previousTitle) => `Colors - ${previousTitle}`} />
        <h2 style={styles.headline}>UI Color Palette</h2>
        <p>
          We&#39;ve created javascript variables for every color used in
          the <a href="https://www.google.com/design/spec/style/color.html#color-ui-color-palette">
          UI Color Palette
          </a>. They are stored
          in <a href="https://github.com/callemall/material-ui/blob/master/src/styles/colors.js">
          styles/colors.js
          </a>.
        </p>
        <ClearFix>
          {React.Children.toArray(colorGroups)}
          <div>
            {React.Children.toArray(neutralGroups)}
          </div>
        </ClearFix>
      </div>
    );
  }
}

export default withWidth()(ColorsPage);
