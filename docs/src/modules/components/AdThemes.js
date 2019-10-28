/* eslint-disable material-ui/no-hardcoded-labels */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    '#nativead': {
      '& a': {
        textDecoration: 'none',
      },
      '& .ptPoweredBy': {
        display: 'block',
        marginTop: 4,
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

export default function AdThemes() {
  const classes = useStyles();
  return (
    <span className={classes.root} id="nativead">
      <a
        href="https://themes.material-ui.com/"
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
        rel="noopener"
        data-ga-event-category="themes"
        data-ga-event-action="click"
        data-ga-event-label="ad"
      >
        <img
          className={classes.image}
          src="/static/images/ads/themes.png"
          alt="Screenshot of an example premium theme"
        />
        <span className={classes.text}>
          <b>Premium Themes</b>
          <br />
          Kickstart your application development with a ready-made theme.
        </span>
      </a>
      <a href="/" className="ptPoweredBy">
        <em>ethical</em> ad by Material-UI
      </a>
    </span>
  );
}
