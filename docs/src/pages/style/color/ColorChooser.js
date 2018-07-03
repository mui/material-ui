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
  },
  textField: {
    marginRight: theme.spacing.unit * 2,
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
  slider: {
    // width: 100,
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
    primaryHue: 'blue',
    secondaryHue: 'pink',
    primaryShade: 4,
    secondaryShade: 11,
    url: '',
  };

  getUrlParams = url =>
    url
      .substring(url.indexOf('?') + 1)
      .split('&')
      .reduce((result, param) => {
        const tuple = param.split('=');
        const [key, value] = tuple; // Workaround for eslint bug
        result[key] = value;
        return result;
      }, {});

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

  hashPrefix = string => (string.charAt(0) === '#' ? string : `#${string}`);

  isRgb = string => /#?([0-9a-f]{6})/i.test(string);

  handleChangeUrl = event => {
    const url = event.target.value;
    const urlParams = this.getUrlParams(url);

    this.setState({
      url,
    });

    if (urlParams.hasOwnProperty('primary.color') && urlParams.hasOwnProperty('secondary.color')) {
      let { 'primary.color': primary, 'secondary.color': secondary } = urlParams;

      primary = this.hashPrefix(primary);
      secondary = this.hashPrefix(secondary);

      if (this.isRgb(primary) && this.isRgb(secondary)) {
        this.setState({
          primary,
          secondary,
        });

        // this.changeDocsColors({ primary, secondary });
      }
    }
  };

  handleChangeHue = prop => event => {
    const {
      target: { value: hue },
    } = event;

    // e.g  { primary: #ddeeff }
    const value = { [prop]: colors[hue][shades[this.state[`${prop}Shade`]]] };
    this.setState({ [`${prop}Hue`]: hue, ...value, url: '' });
    // this.changeDocsColors(value);
    // }
  };

  handleChangeShade = prop => (event, shade) => {
    // e.g  { primary: #ddeeff }
    const value = { [prop]: colors[this.state[`${prop}Hue`]][shades[shade]] };
    this.setState({ [`${prop}Shade`]: shade, ...value, url: '' });
    // this.changeDocsColors(value);
  };

  render() {
    const { classes } = this.props;
    const { primary, secondary, primaryShade, secondaryShade, url } = this.state;

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
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              id="colors"
              label="Color URL"
              value={url}
              onChange={this.handleChangeUrl}
              fullWidth
              helperText="Copy the URL from the Google color tool
          and paste it here to update the docs colors"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="primary"
              label="Primary color"
              value={primary}
              onChange={this.handleChangeHue('primary')}
              className={classes.textField}
            />
            <div className={classes.sliderContainer}>
              <Typography className={classes.sliderTypography}>Shade:</Typography>
              <Slider
                value={primaryShade}
                min={0}
                max={13}
                step={1}
                onChange={this.handleChangeShade('primary')}
                // className={classes.slider}
              />
              <Typography className={classes.sliderTypography}>{shades[primaryShade]}</Typography>
            </div>
            <div className={classes.swatch}>{getSwatch('primary')}</div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="secondary"
              label="Secondary color"
              value={secondary}
              onChange={this.handleChangeHue('secondary')}
            />
            <div className={classes.sliderContainer}>
              <Typography className={classes.sliderTypography}>Shade:</Typography>
              <Slider
                value={secondaryShade}
                min={0}
                max={13}
                step={1}
                onChange={this.handleChangeShade('secondary')}
                variant="secondary"
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
                Set Docs Color
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
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
