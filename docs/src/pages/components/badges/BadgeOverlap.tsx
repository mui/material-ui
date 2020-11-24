import React from 'react';
import clsx from 'clsx';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    shape: {
      backgroundColor: theme.palette.primary.main,
      width: 40,
      height: 40,
    },
    shapeCircle: {
      borderRadius: '50%',
    },
  }),
);

export default function BadgeOverlap() {
  const classes = useStyles();

  const rectangle = <div className={classes.shape} />;
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

  return (
    <div className={classes.root}>
      <Badge color="secondary" badgeContent=" ">
        {rectangle}
      </Badge>
      <Badge color="secondary" badgeContent=" " variant="dot">
        {rectangle}
      </Badge>
      <Badge color="secondary" overlap="circle" badgeContent=" ">
        {circle}
      </Badge>
      <Badge color="secondary" overlap="circle" badgeContent=" " variant="dot">
        {circle}
      </Badge>
    </div>
  );
}
