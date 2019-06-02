import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    icon: {
      margin: theme.spacing(2),
    },
    iconHover: {
      margin: theme.spacing(2),
      '&:hover': {
        color: red[800],
      },
    },
  }),
);

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function SvgIcons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HomeIcon className={classes.icon} />
      <HomeIcon className={classes.icon} color="primary" />
      <HomeIcon className={classes.icon} color="secondary" />
      <HomeIcon className={classes.icon} color="action" />
      <HomeIcon className={classes.iconHover} color="error" style={{ fontSize: 30 }} />
      <HomeIcon color="disabled" className={classes.icon} fontSize="large" />
      <HomeIcon
        className={classes.icon}
        color="primary"
        fontSize="large"
        component={(svgProps: SvgIconProps) => {
          return (
            <svg {...svgProps}>
              <defs>
                <linearGradient id="gradient1">
                  <stop offset="30%" stopColor={blue[400]} />
                  <stop offset="70%" stopColor={red[400]} />
                </linearGradient>
              </defs>
              {React.cloneElement(
                (svgProps.children as React.ReactNodeArray)[0] as React.ReactElement,
                {
                  fill: 'url(#gradient1)',
                },
              )}
            </svg>
          );
        }}
      />
    </div>
  );
}

export default SvgIcons;
