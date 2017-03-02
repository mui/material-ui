// @flow weak

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
const neutralColors = ['Brown', 'Grey', 'Blue Grey'];

export const styleSheet = createStyleSheet('colors', () => ({
  name: {
    marginBottom: 60,
  },
  colorContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  blockSpace: {
    height: 4,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  colorGroup: {
    padding: '16px 0',
    display: 'block',
    width: '30% ',
    margin: '0 15px 0 0',
  },
}));

function getColorName(styles, text, colorValue) {
  return (
    <div className={styles.colorContainer}>
      <span>{text}</span>
      <span className={styles.colorValue}>{colorValue.toUpperCase()}</span>
    </div>
  );
}

export default function Color(props, context) {
  const classes = context.styleManager.render(styleSheet);
  let colorGroups = [];
  let neutralGroups = [];

  function getColorGroup(styles, color, showAltPalette) {
    const mainPalette = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const altPalette = ['A100', 'A200', 'A400', 'A700'];
    const cssColor = color.replace(' ', '').replace(color.charAt(0), color.charAt(0).toLowerCase());
    let colorsList = [];
    colorsList = mainPalette.map((mainValue) => getColorBlock(styles, cssColor, mainValue));

    if (showAltPalette) {
      altPalette.forEach((altValue) => {
        colorsList.push(getColorBlock(styles, cssColor, altValue));
      });
    }

    return (
      <ul className={classes.colorGroup} key={cssColor}>
        {getColorBlock(styles, cssColor, 500, color)}
        <div className={classes.blockSpace} />
        {colorsList}
      </ul>
    );
  }

  function getColorBlock(styles, colorName, colorValue, colorTitle) {
    const bgColorText = colorName + colorValue;
    const bgColor = colors[colorName][colorValue];
    let fgColor = colors.fullBlack;
    let blockTitle;
    let spaceRequired = false;

    if ((colorValue.toString().indexOf('A1')) === 0) {
      spaceRequired = true;
    }

    if (getContrastRatio(bgColor, fgColor) < 7) fgColor = colors.fullWhite;
    if (colorTitle) {
      blockTitle = (
        <div className={styles.name}>
          {colorTitle}
        </div>
      );
    }

    const rowStyle = {
      backgroundColor: bgColor,
      color: fgColor,
      listStyle: 'none',
      padding: 15,
    };

    if (spaceRequired) {
      const rowStyleSpace = {
        ...rowStyle,
        marginTop: 4,
      };
      return (
        <li style={rowStyleSpace} key={bgColorText}>
          {blockTitle}
          {getColorName(styles, bgColorText, bgColor)}
        </li>
      );
    }
    return (
      <li style={rowStyle} key={bgColorText}>
        {blockTitle}
        {getColorName(styles, bgColorText, bgColor)}
      </li>
    );
  }

  colorGroups = mainColors.map((maincolor) => getColorGroup(classes, maincolor, true));
  neutralGroups = neutralColors.map((neutralcolor) => getColorGroup(classes, neutralcolor, false));
  return (
    <div className={classes.root} >
      {colorGroups}
      {neutralGroups}
    </div>
  );
}

Color.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
