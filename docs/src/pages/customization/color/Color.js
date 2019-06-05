import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

const mainColors = [
  'Red',
  'Pink',
  'Purple',
  'Deep Purple',
  'Indigo',
  'Blue',
  'Light Blue',
  'Cyan',
  'Teal',
  'Green',
  'Light Green',
  'Lime',
  'Yellow',
  'Amber',
  'Orange',
  'Deep Orange',
];
const neutralColors = ['Brown', 'Grey', 'Blue Grey'];
const mainPalette = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const altPalette = ['A100', 'A200', 'A400', 'A700'];

export const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  name: {
    marginBottom: 60,
  },
  blockSpace: {
    height: 4,
  },
  colorContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorGroup: {
    padding: 0,
    margin: theme.spacing(0, 2, 2, 0),
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexGrow: 0,
      width: '30%',
    },
  },
  colorValue: {
    ...theme.typography.caption,
    color: 'inherit',
    fontWeight: 'inherit',
  },
  body2: theme.typography.body2,
});

function getColorBlock(classes, theme, colorName, colorValue, colorTitle) {
  const bgColor = colors[colorName][colorValue];
  const fgColor = theme.palette.getContrastText(bgColor);

  let blockTitle;
  if (colorTitle) {
    blockTitle = <div className={classes.name}>{colorName}</div>;
  }

  let rowStyle = {
    backgroundColor: bgColor,
    color: fgColor,
    listStyle: 'none',
    padding: 15,
  };

  if (colorValue.toString().indexOf('A1') === 0) {
    rowStyle = {
      ...rowStyle,
      marginTop: 4,
    };
  }

  return (
    <li style={rowStyle} key={colorValue} className={classes.body2}>
      {blockTitle}
      <div className={classes.colorContainer}>
        <span>{colorValue}</span>
        <span className={classes.colorValue}>{bgColor}</span>
      </div>
    </li>
  );
}

function getColorGroup(options) {
  const { classes, theme, color, showAltPalette } = options;
  const cssColor = color.replace(' ', '').replace(color.charAt(0), color.charAt(0).toLowerCase());
  let colorsList = [];
  colorsList = mainPalette.map(mainValue => getColorBlock(classes, theme, cssColor, mainValue));

  if (showAltPalette) {
    altPalette.forEach(altValue => {
      colorsList.push(getColorBlock(classes, theme, cssColor, altValue));
    });
  }

  return (
    <ul className={classes.colorGroup} key={cssColor}>
      {getColorBlock(classes, theme, cssColor, 500, true)}
      <div className={classes.blockSpace} />
      {colorsList}
    </ul>
  );
}

function Color(props) {
  const { classes, theme } = props;

  return (
    <div className={classes.root}>
      {mainColors.map(mainColor =>
        getColorGroup({
          classes,
          theme,
          color: mainColor,
          showAltPalette: true,
        }),
      )}
      {neutralColors.map(neutralColor =>
        getColorGroup({
          classes,
          theme,
          color: neutralColor,
          showAltPalette: false,
        }),
      )}
    </div>
  );
}

Color.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Color);
