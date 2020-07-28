/* eslint react/jsx-no-target-blank: ["error", { allowReferrer: true }] */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { adShape } from 'docs/src/modules/components/AdManager';
import { adStylesObject } from 'docs/src/modules/components/ad.styles';

const hookFactory = (shape) =>
  makeStyles((theme) => {
    const styles = adStylesObject[`body-${shape}`](theme);
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

const autoShapeStyles = hookFactory(adShape);
const inlineShapeStyles = hookFactory('inline');

export default function AdDisplay(props) {
  const { ad, className, shape = 'auto' } = props;
  let classes;

  if (shape === 'inline') {
    classes = inlineShapeStyles();
  } else {
    classes = autoShapeStyles();
  }

  /* eslint-disable material-ui/no-hardcoded-labels, react/no-danger */
  return (
    <span className={clsx(classes.root, className)}>
      <a
        href={ad.link}
        target="_blank"
        rel="noopener sponsored"
        {...(ad.label
          ? {
              'data-ga-event-category': 'ad',
              'data-ga-event-action': 'click',
              'data-ga-event-label': ad.label,
            }
          : {})}
      >
        <span className={classes.imageWrapper}>
          <img height="100" width="130" className={classes.image} src={ad.img} alt={ad.name} />
        </span>
        <span
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: ad.description }}
        />
      </a>
      <span className={classes.poweredby}>ad by {ad.poweredby}</span>
    </span>
  );
  /* eslint-enable material-ui/no-hardcoded-labels, react/no-danger */
}

AdDisplay.propTypes = {
  ad: PropTypes.object.isRequired,
  className: PropTypes.string,
  shape: PropTypes.oneOf(['inline', 'auto']),
};
