import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  '@global': {
    html: {
      backgroundColor: '#eeeeee',
    },
  },
  root: {
    margin: 'auto',
  },
  list: {
    minWidth: 180,
    height: 240,
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll',
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  button: {
    margin: `${theme.spacing(0.5)}px 0px`,
  },
}));

function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
  }

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleSwap = () => {
    const newLeft = left.concat(rightChecked);
    const newRight = right.concat(leftChecked);

    setLeft(not(newLeft, leftChecked));
    setRight(not(newRight, rightChecked));

    setChecked([]);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>
        <List className={classes.list} dense>
          {left.map(value => (
            <ListItem
              className={classes.listItem}
              key={value}
              role={undefined}
              button
              onClick={handleToggle(value)}
            >
              <Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
              <ListItemText primary={`List item ${value + 1}`} />
            </ListItem>
          ))}
          <ListItem />
        </List>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
          >
            »
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleSwap}
            disabled={leftChecked.length === 0 || rightChecked.length === 0}
          >
            {'<>'}
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
          >
            «
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <List className={classes.list} dense>
          {right.map(value => (
            <ListItem
              className={classes.listItem}
              key={value}
              role={undefined}
              button
              onClick={handleToggle(value)}
            >
              <Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
              <ListItemText primary={`List item ${value + 1}`} />
            </ListItem>
          ))}
          <ListItem />
        </List>
      </Grid>
    </Grid>
  );
}

export default CheckboxList;
