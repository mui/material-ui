import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import * as colors from 'material-ui/styles/colors';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { getContrastRatio } from 'material-ui/styles/colorManipulator';

const mainColors = [
  'Red', 'Pink', 'Purple', 'Deep Purple', 'Indigo', 'Blue', 'Light Blue',
  'Cyan', 'Teal', 'Green', 'Light Green', 'Lime', 'Yellow', 'Amber', 'Orange',
  'Deep Orange',
];
const neutralColors = ['Brown', 'Grey'];

export const styleSheet = createStyleSheet('colors', (theme) => ({

  name: {
    display: 'block',
    marginBottom: 60,
  },
  colorContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  blockSpace: {
    height: '4px',
    color: '#eeeeee',
  },
  colorValue: {
    fontSize: 12,
  },
  divSection: {
    marginLeft: '50px',
    boxSizing: 'initial',
  },
  hex: {
    float: 'right',
  },
  colorGroup: {
    float: 'left',
    padding: '16px 0',
    display: 'block',
    margin: 0,
    width: '30% ',
    borderRight: 'solid 15px',
    borderColor: '#eeeeee',
  },
  headline: {
    fontSize: 24,
    lineHeight: '32px',
    paddingTop: 16,
    marginBottom: 12,
    letterSpacing: 0,
    fontWeight: theme.typography.headline.fontWeight,
    color: theme.typography.headline.color,
  },
}));

export default function color(props, context) {
  const classes = context.styleManager.render(styleSheet);
  const colorGroups = [];
  const neutralGroups = [];

  function getColorGroup(styles, colorName, showAltPalette) {
    const mainPalette = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const altPalette = ['A100', 'A200', 'A400', 'A700'];
    const cssColor = colorName.replace(' ', '').replace(colorName.charAt(0),
     colorName.charAt(0).toLowerCase());
    const colorGroupStyle = classes.colorGroup;
    const colorsList = [];
    mainPalette.forEach((mainValue) => {
      colorsList.push(getColorBlock(styles, cssColor, mainValue));
    }, this);

    if (showAltPalette) {
      altPalette.forEach((altValue) => {
        colorsList.push(getColorBlock(styles, cssColor, altValue));
      }, this);
    }

    return (
      <ul className={colorGroupStyle}>
        {React.Children.toArray(getColorBlock(styles, cssColor, 500, color))}
        <div className={classes.blockSpace} />
        {React.Children.toArray(colorsList)}
      </ul>
    );
  }

  function getColorBlock(styles, colorName, colorValue, colorTitle) {
    const bgColorText = colorName + colorValue;
    const bgColor = colors[colorName][colorValue];
    let fgColor = colors.fullBlack;
    const contrastRatio = getContrastRatio(bgColor, fgColor);
    let blockTitle;
    let spaceRequired = false;
    const colorValueString = colorValue.toString();

    if ((colorValueString.indexOf('A1')) === 0) {
      spaceRequired = true;
    }

    if (contrastRatio < 7) fgColor = color.fullWhite;
    if (colorTitle) {
      blockTitle = (
        <span className={styles.name}>
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
    const rowStyleSpace = {
      backgroundColor: bgColor,
      color: fgColor,
      listStyle: 'none',
      padding: 15,
      borderTop: '4px #eeeeee solid',
    };

    if (spaceRequired === true) {
      return (
        <li style={rowStyleSpace}>
          {blockTitle}
          {getColorName(styles, bgColorText, bgColor)}
        </li>
      );
    }
    return (
      <li style={rowStyle}>
        {blockTitle}
        {getColorName(styles, bgColorText, bgColor)}
      </li>
    );
  }

  function getColorName(styles, text, colorValue) {
    return (
      <div className={styles.colorContainer}>
        <span>{text}</span>
        <span className={styles.colorValue}>{colorValue.toUpperCase()}</span>
      </div>
    );
  }


  mainColors.forEach((maincolor) => {
    colorGroups.push(getColorGroup(classes, maincolor, true));
  }, this);


  neutralColors.forEach((neutralcolor) => {
    neutralGroups.push(getColorGroup(classes, neutralcolor, false));
  }, this);

  return (
    <div className={classes.divSection} >
      <div>
        {React.Children.toArray(colorGroups)}
      </div>
      <div>
        {React.Children.toArray(neutralGroups)}
      </div>
    </div>
  );
}

color.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
