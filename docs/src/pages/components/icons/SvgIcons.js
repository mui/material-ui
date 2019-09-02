import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
  root: {
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
  iconHover: {
    '&:hover': {
      color: red[800],
    },
  },
}));

function HomeIcon(props) {
  const { children, pathProps, ...other } = props;
  return (
    <SvgIcon {...other}>
      {children}
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" {...pathProps} />
    </SvgIcon>
  );
}

HomeIcon.propTypes = {
  children: PropTypes.node,
  pathProps: PropTypes.object,
};

export default function SvgIcons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="action" />
      <HomeIcon className={classes.iconHover} color="error" style={{ fontSize: 30 }} />
      <HomeIcon color="disabled" fontSize="large" />
      <HomeIcon color="primary" fontSize="large" pathProps={{ fill: 'url(#gradient1)' }}>
        <defs>
          <linearGradient id="gradient1">
            <stop offset="30%" stopColor={blue[400]} />
            <stop offset="70%" stopColor={red[400]} />
          </linearGradient>
        </defs>
      </HomeIcon>
    </div>
  );
}
