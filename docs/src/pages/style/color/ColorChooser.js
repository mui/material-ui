import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import * as colors from '@material-ui/core/colors';
import Slider from '@material-ui/lab/Slider';
import actionTypes from 'docs/src/modules/redux/actionTypes';
import ColorDemo from './ColorDemo';

const hues = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
];

const shades = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 'A700', 'A400', 'A200', 'A100'];

export const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  radio: {
    width: 47,
    height: 47,
  },
  radioSelected: {
    width: 47,
    height: 47,
    border: '1px solid white',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    display: 'flex',
    justifyContent: 'spece-between',
    width: 192,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
  },
  sliderTypography: {
    marginTop: 5,
  },
  swatch: {
    width: 192,
    backgroundColor: theme.palette.common.white,
  },
  button: {
    marginTop: 24,
  },
});

class ColorChooser extends React.Component {
  state = {
    primary: '#2196f3',
    secondary: '#f50057',
    primaryText: '#2196f3',
    secondaryText: '#f50057',
    primaryHue: 'blue',
    secondaryHue: 'pink',
    primaryShade: 4,
    secondaryShade: 11,
  };

  hashPrefix = string => (string.charAt(0) === '#' ? string : `#${string}`);

  isRgb = string => /#?([0-9a-f]{6})/i.test(string);

  handleChangeColor = name => event => {
    const {
      target: { value: color },
    } = event;

    this.setState({
      [`${name}Text`]: color,
    });

    if (this.isRgb(color)) {
      this.setState({
        [name]: color,
      });
    }
  };

  handleChangeHue = name => event => {
    const {
      target: { value: hue },
    } = event;

    this.setState(currentState => {
      const color = colors[hue][shades[currentState[`${name}Shade`]]];
      return {
        [`${name}Hue`]: hue,
        [name]: color,
        [`${name}Text`]: color,
      };
    });
  };

  handleChangeShade = name => (event, shade) => {
    this.setState(currentState => {
      const color = colors[currentState[`${name}Hue`]][shades[shade]];
      return {
        [`${name}Shade`]: shade,
        [name]: color,
        [`${name}Text`]: color,
      };
    });
  };

  handleChangeDocsColors = values => {
    const primaryMain = values.hasOwnProperty('primary') ? values.primary : this.state.primary;
    const secondaryMain = values.hasOwnProperty('secondary')
      ? values.secondary
      : this.state.secondary;

    this.props.dispatch({
      type: actionTypes.THEME_CHANGE_PALETTE_COLORS,
      payload: {
        paletteColors: {
          primary: { main: primaryMain },
          secondary: { main: secondaryMain },
        },
      },
    });
  };

  render() {
    const { classes } = this.props;
    const {
      primary,
      secondary,
      primaryText,
      secondaryText,
      primaryShade,
      secondaryShade,
    } = this.state;

    const getColorTile = (hue, colorIntent) => {
      const shade = colorIntent === 'primary' ? shades[primaryShade] : shades[secondaryShade];
      const backgroundColor = colors[hue][shade];

      const icon = <div className={classes.radio} style={{ backgroundColor }} />;

      const checkedIcon = (
        <div className={classes.radioSelected} style={{ backgroundColor }}>
          <CheckIcon style={{ fontSize: 30 }} />
        </div>
      );

      return (
        <Tooltip placement="right-start" id={`tooltip-${colorIntent}-${hue}`} title={hue}>
          <Radio
            checked={this.state[colorIntent] === backgroundColor}
            onChange={this.handleChangeHue(colorIntent)}
            value={hue}
            name={colorIntent}
            aria-labelledby={`tooltip-${colorIntent}-${hue}`}
            icon={icon}
            checkedIcon={checkedIcon}
          />
        </Tooltip>
      );
    };

    const getSwatch = value => hues.map(hue => getColorTile(hue, value));

    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="primary"
            label="Primary color"
            value={primaryText}
            onChange={this.handleChangeColor('primary')}
          />
          <div className={classes.sliderContainer}>
            <Typography className={classes.sliderTypography} id="primaryShadeSliderLabel">
              Shade:
            </Typography>
            <Slider
              value={primaryShade}
              min={0}
              max={13}
              step={1}
              onChange={this.handleChangeShade('primary')}
              aria-labelledby="primaryShadeSliderLabel"
            />
            <Typography className={classes.sliderTypography}>{shades[primaryShade]}</Typography>
          </div>
          <div className={classes.swatch}>{getSwatch('primary')}</div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="secondary"
            label="Secondary color"
            value={secondaryText}
            onChange={this.handleChangeColor('secondary')}
          />
          <div className={classes.sliderContainer}>
            <Typography className={classes.sliderTypography} id="secondaryShadeSliderLabel">
              Shade:
            </Typography>
            <Slider
              value={secondaryShade}
              min={0}
              max={13}
              step={1}
              onChange={this.handleChangeShade('secondary')}
              aria-labelledby="secondaryShadeSliderLabel"
            />
            <Typography className={classes.sliderTypography}>{shades[secondaryShade]}</Typography>
          </div>
          <div className={classes.swatch}>{getSwatch('secondary')}</div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container direction="column" alignItems="flex-end">
            <ColorDemo primary={{ main: primary }} secondary={{ main: secondary }} />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleChangeDocsColors}
            >
              Set Docs Colors
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ColorChooser.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'ColorChooser',
    withTheme: true,
  }),
  connect(state => ({
    uiTheme: state.theme,
  })),
)(ColorChooser);
