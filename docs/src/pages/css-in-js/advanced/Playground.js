import React from 'react';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/styles';

const styles = theme => {
  return {
    root: props => {
      return {
        backgroundColor: props.backgroundColor,
        color: theme.color,
      };
    },
  };
};
const useStyles = makeStyles(styles);

const Component = React.memo(props => {
  const classes = useStyles(props);
  const theme = useTheme();

  const rendered = React.useRef(1);
  React.useEffect(() => {
    rendered.current += 1;
  });

  return (
    <div className={classes.root}>
      rendered {rendered.current} times
      <br />
      backgroundColor: {props.backgroundColor}
      <br />
      color: {theme.color}
    </div>
  );
});

function Showcase(props) {
  const { defaultBackgroundColor, defaultColor } = props;

  const [backgroundColor, setBackgroundColor] = React.useState(defaultBackgroundColor);
  function handleBackgroundColorChange(event) {
    setBackgroundColor(event.currentTarget.value);
  }

  const [color, setColor] = React.useState(defaultColor);
  function handleColorChange(event) {
    setColor(event.currentTarget.value);
  }

  const theme = React.useMemo(() => ({ color }), [color]);

  return (
    <ThemeProvider theme={theme}>
      <fieldset>
        <div>Color in theme, background-color in props</div>
        <label htmlFor="background-color">background-color</label>
        <input
          id="background-color"
          onChange={handleBackgroundColorChange}
          value={backgroundColor}
        />
        <label htmlFor="color">color</label>
        <input id="color" onChange={handleColorChange} value={color} />
      </fieldset>
      <Component backgroundColor={backgroundColor} />
    </ThemeProvider>
  );
}

export default function App() {
  const [reset, setReset] = React.useState(false);
  const handleClick = React.useCallback(() => setReset(r => !r));

  return (
    <div>
      <button onClick={handleClick} type="button">
        reset
      </button>
      <Showcase key={reset} defaultBackgroundColor="black" defaultColor="white" />
    </div>
  );
}
