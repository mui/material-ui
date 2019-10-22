import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

interface Styles {
  color: string;
  children: React.ReactNode;
  [key: string]: any;
}

interface ColorsMapping {
  default: string;
  blue: string;
  [key: string]: any;
}

interface ButtonStyles extends WithStyles<typeof styles> {
  color: string;
}

// Like https://github.com/brunobertolini/styled-by
const styledBy = (property: string, mapping: ColorsMapping) => (props: Styles) =>
  mapping[props[property]];

const styles = {
  root: {
    background: styledBy('color', {
      default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    }),
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: styledBy('color', {
      default: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      blue: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }),
  },
};

const StyledButton = withStyles(styles)(({ classes, color, ...other }: ButtonStyles) => (
  <Button className={classes.root} {...other} />
));

export default function DynamicCSS() {
  const [color, setColor] = React.useState('default');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.checked ? 'blue' : 'default');
  };

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            checked={color === 'blue'}
            onChange={handleChange}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Blue"
      />
      <StyledButton color={color}>Dynamic CSS</StyledButton>
    </React.Fragment>
  );
}
