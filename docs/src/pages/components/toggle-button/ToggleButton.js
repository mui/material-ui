import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
}));

export default function ToggleButtonDemo() {
  const [selected, setSelected] = React.useState(false);

  const toggleSelected = () => {
    setSelected(!selected);
  };

  const classes = useStyles();

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item>
        <div className={classes.toggleContainer}>
          <ToggleButton selected={selected} onChange={toggleSelected}>
            <CheckIcon />
            <Box ml={1}>Toggle</Box>
          </ToggleButton>
        </div>
      </Grid>
    </Grid>
  );
}
