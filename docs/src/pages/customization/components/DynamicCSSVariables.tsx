import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px var(--box-shadow)',
  },
});

const blue = {
  '--background-start': '#2196F3',
  '--background-end': '#21CBF3',
  '--box-shadow': 'rgba(33, 203, 243, .3)',
} as React.CSSProperties;

const defaultColor = {
  '--background-start': '#FE6B8B',
  '--background-end': '#FF8E53',
  '--box-shadow': 'rgba(255, 105, 135, .3)',
} as React.CSSProperties;

export default function DynamicCSSVariables() {
  const classes = useStyles();
  const [color, setColor] = React.useState(defaultColor);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.checked ? blue : defaultColor);
  };

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            checked={color === blue}
            onChange={handleChange}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Blue"
      />
      <Button className={classes.button} style={color}>
        {'CSS variables'}
      </Button>
    </React.Fragment>
  );
}
