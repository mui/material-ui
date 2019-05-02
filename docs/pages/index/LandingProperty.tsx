import * as React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { Typography, makeStyles, Paper, Theme } from '@material-ui/core';

interface LandingPropertyProps {
  title: string;
  description: string;
  icon: React.ComponentType<SvgIconProps>;
}

const useStyles = makeStyles<Theme>({
  propertyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 24,
    height: '100%',
    margin: '0 16px',
  },
  icon: {
    marginBottom: 24,
    fontSize: 64,
  },
  title: {
    fontSize: '1.3em',
    lineHeight: 1.2,
    marginBottom: 24,
  },
});

export const LandingProperty: React.FC<LandingPropertyProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.propertyContainer} elevation={12}>
      <Icon color="primary" className={classes.icon} />

      <Typography className={classes.title} align="center" variant="h6" children={title} />
      <Typography align="center" children={description} />
    </Paper>
  );
};
