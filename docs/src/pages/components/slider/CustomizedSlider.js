import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Slider, {
  SliderRoot,
  SliderMark,
  SliderRail,
  SliderTrack,
  SliderThumb,
  SliderValueLabel,
} from '@material-ui/core/Slider';
import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { ThemeProvider } from 'emotion-theming';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 37,
  },
  {
    value: 100,
  },
];

const iosComponents = {
  root: styled(SliderRoot)({
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  }),
  thumb: styled(SliderThumb)((props) => ({
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    // @ts-ignore
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
    ...(props.active && {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    }),
  })),
  valueLabel: styled(SliderValueLabel)({
    left: 'calc(-50% + 12px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  }),
  track: styled(SliderTrack)({
    height: 2,
  }),
  rail: styled(SliderRail)({
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  }),
  mark: styled(SliderMark)((props) => ({
    // @ts-ignore
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
    ...(props.markActive && {
      opacity: 1,
      backgroundColor: 'currentColor',
    }),
  })),
};

const prettoComponents = {
  root: styled(SliderRoot)({
    color: '#52af77',
    height: 8,
  }),
  thumb: styled(SliderThumb)((props) => ({
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover': {
      boxShadow: 'inherit',
    },
    ...(props.active && {
      boxShadow: 'inherit',
    }),
  })),
  valueLabel: styled(SliderValueLabel)({
    left: 'calc(-50% + 4px)',
  }),
  track: styled(SliderTrack)({
    height: 8,
    borderRadius: 4,
  }),
  rail: styled(SliderRail)({
    height: 8,
    borderRadius: 4,
  }),
};

const airbnbComponents = {
  root: styled(SliderRoot)({
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
  }),
  thumb: styled(SliderThumb)((props) => ({
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    // @ts-ignore
    boxShadow: '#ebebeb 0 2px 2px',
    '&:focus, &:hover': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    ...(props.active && {
      boxShadow: '#ccc 0 2px 3px 1px',
    }),
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  })),
  track: styled(SliderTrack)({
    height: 3,
  }),
  rail: styled(SliderRail)({
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  }),
};

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

export default function CustomizedSlider() {
  const classes = useStyles();
  // For some reason the theme when styled used twice is coming from emotion, not our defulat theme
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Typography gutterBottom>iOS</Typography>
        <Slider
          aria-label="ios slider"
          defaultValue={60}
          marks={marks}
          valueLabelDisplay="on"
          components={iosComponents}
        />
        <div className={classes.margin} />
        <Typography gutterBottom>pretto.fr</Typography>
        <Slider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={20}
          components={prettoComponents}
        />
        <div className={classes.margin} />
        <Typography gutterBottom>Tooltip value label</Typography>
        <Slider
          components={{
            valueLabel: ValueLabelComponent,
          }}
          aria-label="custom thumb label"
          defaultValue={20}
        />
        <div className={classes.margin} />
        <Typography gutterBottom>Airbnb</Typography>
        <Slider
          components={airbnbComponents}
          componentsProps={{
            thumb: {
              as: AirbnbThumbComponent,
            },
          }}
          ThumbComponent={AirbnbThumbComponent}
          getAriaLabel={(index) =>
            index === 0 ? 'Minimum price' : 'Maximum price'
          }
          defaultValue={[20, 40]}
        />
      </div>
    </ThemeProvider>
  );
}
