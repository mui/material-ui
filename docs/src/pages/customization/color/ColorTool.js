import React from 'react';
import PropTypes from 'prop-types';
import { rgbToHex, withStyles, useTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Slider from '@material-ui/core/Slider';
import { capitalize } from '@material-ui/core/utils';
import ColorDemo from './ColorDemo';
import { DispatchContext } from 'docs/src/modules/components/ThemeContext';

const defaults = { primary: '#2196f3', secondary: '#f50057' };
const hues = Object.keys(colors).slice(1, 17);
const shades = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 'A700', 'A400', 'A200', 'A100'];

const styles = (theme) => ({
  radio: {
    padding: 0,
  },
  radioIcon: {
    width: 48,
    height: 48,
  },
  radioIconSelected: {
    width: 48,
    height: 48,
    border: '1px solid white',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatch: {
    width: 192,
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  slider: {
    width: 'calc(100% - 80px)',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  colorBar: {
    marginTop: theme.spacing(2),
  },
  colorSquare: {
    width: 64,
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
});

function ColorTool(props) {
  const { classes } = props;
  const dispatch = React.useContext(DispatchContext);
  const theme = useTheme();
  const [state, setState] = React.useState({
    primary: defaults.primary,
    secondary: defaults.secondary,
    primaryInput: defaults.primary,
    secondaryInput: defaults.secondary,
    primaryHue: 'blue',
    secondaryHue: 'pink',
    primaryShade: 4,
    secondaryShade: 11,
  });

  const handleChangeColor = (name) => (event) => {
    const isRgb = (string) => /rgb\([0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\)/i.test(string);

    const isHex = (string) => /^#?([0-9a-f]{3})$|^#?([0-9a-f]){6}$/i.test(string);

    let {
      target: { value: color },
    } = event;

    setState((prevState) => ({
      ...prevState,
      [`${name}Input`]: color,
    }));

    let isValidColor = false;

    if (isRgb(color)) {
      isValidColor = true;
    } else if (isHex(color)) {
      isValidColor = true;
      if (color.indexOf('#') === -1) {
        color = `#${color}`;
      }
    }

    if (isValidColor) {
      setState((prevState) => ({
        ...prevState,
        [name]: color,
      }));
    }
  };

  const handleChangeHue = (name) => (event) => {
    const hue = event.target.value;
    const color = colors[hue][shades[state[`${name}Shade`]]];

    setState({
      ...state,
      [`${name}Hue`]: hue,
      [name]: color,
      [`${name}Input`]: color,
    });
  };

  const handleChangeShade = (name) => (event, shade) => {
    const color = colors[state[`${name}Hue`]][shades[shade]];
    setState({
      ...state,
      [`${name}Shade`]: shade,
      [name]: color,
      [`${name}Input`]: color,
    });
  };

  const handleChangeDocsColors = () => {
    const paletteColors = {
      primary: { main: state.primary },
      secondary: { main: state.secondary },
    };

    dispatch({
      type: 'CHANGE',
      payload: { paletteColors },
    });

    document.cookie = `paletteColors=${JSON.stringify(paletteColors)};path=/;max-age=31536000`;
  };

  const handleResetDocsColors = () => {
    dispatch({ type: 'RESET_COLORS' });

    document.cookie = 'paletteColors=;path=/;max-age=0';
  };

  const colorBar = (color) => {
    const background = theme.palette.augmentColor({ main: color });

    return (
      <Grid container className={classes.colorBar}>
        {['dark', 'main', 'light'].map((key) => (
          <div
            className={classes.colorSquare}
            style={{ backgroundColor: background[key] }}
            key={key}
          >
            <Typography
              variant="caption"
              style={{ color: theme.palette.getContrastText(background[key]) }}
            >
              {rgbToHex(background[key])}
            </Typography>
          </div>
        ))}
      </Grid>
    );
  };

  const colorPicker = (intent) => {
    const intentInput = state[`${intent}Input`];
    const intentShade = state[`${intent}Shade`];
    const color = state[`${intent}`];

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Typography component="label" gutterBottom htmlFor={intent} variant="h6">
          {capitalize(intent)}
        </Typography>
        <Input id={intent} value={intentInput} onChange={handleChangeColor(intent)} fullWidth />
        <div className={classes.sliderContainer}>
          <Typography id={`${intent}ShadeSliderLabel`}>Shade:</Typography>
          <Slider
            className={classes.slider}
            value={intentShade}
            min={0}
            max={13}
            step={1}
            onChange={handleChangeShade(intent)}
            aria-labelledby={`${intent}ShadeSliderLabel`}
          />
          <Typography>{shades[intentShade]}</Typography>
        </div>
        <div className={classes.swatch}>
          {hues.map((hue) => {
            const shade =
              intent === 'primary' ? shades[state.primaryShade] : shades[state.secondaryShade];
            const backgroundColor = colors[hue][shade];

            return (
              <Tooltip placement="right" title={hue} key={hue}>
                <Radio
                  className={classes.radio}
                  color="default"
                  checked={state[intent] === backgroundColor}
                  onChange={handleChangeHue(intent)}
                  value={hue}
                  name={intent}
                  aria-labelledby={`tooltip-${intent}-${hue}`}
                  icon={<div className={classes.radioIcon} style={{ backgroundColor }} />}
                  checkedIcon={
                    <div className={classes.radioIconSelected} style={{ backgroundColor }}>
                      <CheckIcon style={{ fontSize: 30 }} />
                    </div>
                  }
                />
              </Tooltip>
            );
          })}
        </div>
        {colorBar(color)}
      </Grid>
    );
  };

  return (
    <Grid container spacing={5} className={classes.root}>
      {colorPicker('primary')}
      {colorPicker('secondary')}
      <Grid item xs={12} sm={6} md={4}>
        <ColorDemo data={state} />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleChangeDocsColors}>
          Set Docs Colors
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleResetDocsColors}
          className={classes.button}
        >
          Reset Docs Colors
        </Button>
      </Grid>
    </Grid>
  );
}

ColorTool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ColorTool);
