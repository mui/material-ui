/* eslint-disable material-ui/no-hardcoded-labels, react/no-danger */
import React from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.level2,
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1.5)}px ${theme.spacing(
      1.5,
    )}px ${theme.spacing(1.5) + 130}px`,
    borderRadius: theme.shape.borderRadius,
    '& $imageWrapper': {
      float: 'left',
      marginLeft: -130,
      marginRight: theme.spacing(1.5),
    },
    '& img': {
      verticalAlign: 'middle',
    },
    '& a, & a:hover': {
      color: theme.palette.text.primary,
      textDecoration: 'none',
    },
    '& $description': {
      ...theme.typography.body2,
      display: 'block',
    },
    '& $poweredby': {
      ...theme.typography.caption,
      color: theme.palette.text.secondary,
      display: 'block',
    },
  },
  imageWrapper: {},
  description: {},
  poweredby: {},
}));

export default function AdInHouse(props) {
  const { ad } = props;
  const classes = useStyles();
  return (
    <span className={classes.root} id="in-house">
      <a
        className={classes.link}
        href={ad.link}
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
        rel="noopener sponsored"
        data-ga-event-category="in-house-ad"
        data-ga-event-action="click"
        data-ga-event-label={ad.name}
      >
        <span className={classes.imageWrapper}>
          <img height="100" width="130" className={classes.image} src={ad.img} alt={ad.name} />
        </span>
        <span
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: ad.description }}
        />
      </a>
      <a href="/" className={classes.poweredby}>
        ad by Material-UI
      </a>
    </span>
  );
}

AdInHouse.propTypes = {
  ad: propTypes.object.isRequired,
};
