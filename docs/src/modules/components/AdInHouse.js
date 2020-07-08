/* eslint react/jsx-no-target-blank: ["error", { allowReferrer: true }] */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import adStyles from 'docs/src/modules/components/ad.styles';

const useStyles = makeStyles((theme) => {
  const styles = adStyles(theme);
  return {
    root: {
      ...styles.root,
      '& img': styles.img,
      '& a, & a:hover': styles.a,
    },
    imageWrapper: styles.imgWrapper,
    description: styles.description,
    poweredby: styles.poweredby,
  };
});

export default function AdInHouse(props) {
  const { ad } = props;
  const classes = useStyles();

  /* eslint-disable material-ui/no-hardcoded-labels, react/no-danger */
  return (
    <span className={classes.root}>
      <a
        href={ad.link}
        target="_blank"
        rel="noopener sponsored"
        data-ga-event-category="ad"
        data-ga-event-action="click"
        data-ga-event-label={`in-house-${ad.name}`}
      >
        <span className={classes.imageWrapper}>
          <img height="100" width="130" className={classes.image} src={ad.img} alt={ad.name} />
        </span>
        <span
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: ad.description }}
        />
      </a>
      <span className={classes.poweredby}>ad by Material-UI</span>
    </span>
  );
  /* eslint-enable material-ui/no-hardcoded-labels, react/no-danger */
}

AdInHouse.propTypes = {
  ad: PropTypes.object.isRequired,
};
