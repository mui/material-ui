import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Slider from '@material-ui/lab/Slider';
import { rgbToHex } from '@material-ui/core/styles/colorManipulator';
import { capitalize } from '@material-ui/core/utils/helpers';
import actionTypes from 'docs/src/modules/redux/actionTypes';
import ColorDemo from './ColorDemo';

const hues = Object.keys(colors).slice(1, 17);
const shades = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 'A700', 'A400', 'A200', 'A100'];

const styles = theme => ({
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
    justifyContent: 'space-between',
    width: 192,
    marginTop: 16,
    marginBottom: theme.spacing.unit,
  },
  sliderTypography: {
    marginTop: 5,
  },
  swatch: {
    width: 192,
    backgroundColor: theme.palette.common.white,
  },
  colorBar: {
    marginTop: 16,
  },
  colorSquare: {
    width: 64,
    height: 64,
    border: '1px solid white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: theme.spacing.unit,
    width: 192,
  },
  demoContainer: {
    width: 260,
  },
  button: {
    marginTop: 24,
  },
});

class ColorTool extends React.Component {
  state = {
    primary: '#2196f3',
    secondary: '#f50057',
    primaryInput: '#2196f3',
    secondaryInput: '#f50057',
    primaryHue: 'blue',
    secondaryHue: 'pink',
    primaryShade: 4,
    secondaryShade: 11,
  };

  handleChangeColor = name => event => {
    const isRgb = string => /#?([0-9a-f]{6})/i.test(string);

    const {
      target: { value: color },
    } = event;

    this.setState({
      [`${name}Input`]: color,
    });

    if (isRgb(color)) {
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
        [`${name}Input`]: color,
      };
    });
  };

  handleChangeShade = name => (event, shade) => {
    this.setState(currentState => {
      const color = colors[currentState[`${name}Hue`]][shades[shade]];
      return {
        [`${name}Shade`]: shade,
        [name]: color,
        [`${name}Input`]: color,
      };
    });
  };

  handleChangeDocsColors = () => {
    this.props.dispatch({
      type: actionTypes.THEME_CHANGE_PALETTE_COLORS,
      payload: {
        paletteColors: {
          primary: { main: this.state.primary },
          secondary: { main: this.state.secondary },
        },
      },
    });
  };

  render() {
    const { classes, theme } = this.props;
    const { primaryShade, secondaryShade } = this.state;

    const {
      palette: { getContrastText },
    } = theme;

    const colorTile = (hue, colorIntent) => {
      const shade = colorIntent === 'primary' ? shades[primaryShade] : shades[secondaryShade];
      const backgroundColor = colors[hue][shade];

      const icon = <div className={classes.radio} style={{ backgroundColor }} />;

      const checkedIcon = (
        <div className={classes.radioSelected} style={{ backgroundColor }}>
          <CheckIcon style={{ fontSize: 30 }} />
        </div>
      );

      return (
        <Tooltip placement="right-start" id={`tooltip-${colorIntent}-${hue}`} title={hue} key={hue}>
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

    const colorSwatch = value => hues.map(hue => colorTile(hue, value));

    const colorBar = color => {
      const background = { main: color };
      theme.palette.augmentColor(background);

      const keys = ['dark', 'main', 'light'];

      return (
        <Grid container className={classes.colorBar}>
          {keys.map(key => (
            <div
              className={classes.colorSquare}
              style={{ backgroundColor: background[key] }}
              key={key}
            >
              <Typography variant="caption" style={{ color: getContrastText(background[key]) }}>
                {rgbToHex(background[key])}
              </Typography>
            </div>
          ))}
        </Grid>
      );
    };

    const colorPicker = intent => {
      const intentInput = this.state[`${intent}Input`];
      const intentShade = this.state[`${intent}Shade`];
      const color = this.state[`${intent}`];

      return (
        <Grid item xs={12} md={4}>
          <Typography variant="title">{capitalize(intent)}</Typography>
          <Input
            id={intent}
            value={intentInput}
            onChange={this.handleChangeColor(intent)}
            inputProps={{
              'aria-label': `${capitalize(intent)} color`,
            }}
            className={classes.input}
          />
          <div className={classes.sliderContainer}>
            <Typography className={classes.sliderTypography} id={`${intent}ShadeSliderLabel`}>
              Shade:
            </Typography>
            <Slider
              value={intentShade}
              min={0}
              max={13}
              step={1}
              onChange={this.handleChangeShade(intent)}
              aria-labelledby={`${intent}ShadeSliderLabel`}
            />
            <Typography className={classes.sliderTypography}>{shades[intentShade]}</Typography>
          </div>
          <div className={classes.swatch}>{colorSwatch(intent)}</div>
          {colorBar(color)}
        </Grid>
      );
    };

    return (
      <Grid container spacing={24} className={classes.root}>
        {colorPicker('primary')}
        {colorPicker('secondary')}
        <Grid item xs={12} md={4}>
          <Grid
            container
            direction="column"
            alignItems="flex-end"
            className={classes.demoContainer}
          >
            <ColorDemo data={this.state} />
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

ColorTool.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(state => ({
    uiTheme: state.theme,
  })),
)(ColorTool);
