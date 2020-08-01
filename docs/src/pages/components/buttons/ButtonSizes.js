import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const densities = ['low', 'medium', 'high'];

export default function ButtonSizes() {
  const classes = useStyles();

  return (
    <div>
      {densities.map(density => (
        <div>
          {density}
        <div>
        <Button density={density} size="small" className={classes.margin}>
        Small
        </Button>
        <Button density={density} size="medium" className={classes.margin}>
        Medium
        </Button>
        <Button density={density} size="large" className={classes.margin}>
        Large
        </Button>
        </div>
        <div>
        <Button density={density} variant="outlined" size="small" className={classes.margin}>
        Small
        </Button>
        <Button density={density} variant="outlined" size="medium" className={classes.margin}>
        Medium
        </Button>
        <Button density={density} variant="outlined" size="large" className={classes.margin}>
        Large
        </Button>
        </div>
        <div>
        <Button density={density} variant="contained" size="small" className={classes.margin}>
        Small
        </Button>
        <Button density={density} variant="contained" size="medium" className={classes.margin}>
        Medium
        </Button>
        <Button density={density} variant="contained" size="large" className={classes.margin}>
        Large
        </Button>
        </div>
        </div>
      ))}
        <div>
          <IconButton aria-label="delete" className={classes.margin} size="small">
            <ArrowDownwardIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="delete" className={classes.margin}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="delete" className={classes.margin}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" className={classes.margin}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
  );
}
