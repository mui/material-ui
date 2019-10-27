/* eslint-disable material-ui/no-hardcoded-labels */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    '#scaffoldhub': {
      '& a': {
        textDecoration: 'none',
      },
      '& .shPoweredBy': {
        marginTop: 16,
        display: 'block',
        ...theme.typography.caption,
        color: theme.palette.text.secondary,
      },
    },
  },
  root: {
    display: 'block',
    float: 'left',
    backgroundColor: theme.palette.background.level2,
    padding: 12,
    borderRadius: theme.shape.borderRadius,
  },
  image: {
    float: 'left',
    marginRight: theme.spacing(1.5),
    width: 130,
    height: 100,
  },
  text: {
    display: 'block',
    ...theme.typography.body2,
    color: theme.palette.text.primary,
  },
}));

export default function AdScaffoldHub() {
  const classes = useStyles();
  return (
    <span className={classes.root} id="scaffoldhub">
      <a
        href="https://scaffoldhub.io/?partner=1"
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
        rel="noopener"
        data-ga-event-category="scaffoldhub"
        data-ga-event-action="click"
        data-ga-event-label="ad"
      >
        <img
          className={classes.image}
          src="/static/images/ads/scaffoldhub.svg"
          alt="ScaffoldHub Logo"
        />
        <span className={classes.text}>
          <b>ScaffoldHub</b> - Automate building your full-stack Material-UI web-app.
        </span>
      </a>
      <a href="/" className="shPoweredBy">
        <em>ethical</em> ad by Material-UI
      </a>
    </span>
  );
}
