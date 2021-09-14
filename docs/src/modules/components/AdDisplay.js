/* eslint react/jsx-no-target-blank: ["error", { allowReferrer: true }] */
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { adShape } from 'docs/src/modules/components/AdManager';
import { adStylesObject } from 'docs/src/modules/components/ad.styles';

const Root = styled('span', { shouldForwardProp: (prop) => prop !== 'shape' })(
  ({ theme, shape }) => {
    const styles = adStylesObject[`body-${shape}`](theme);

    return {
      ...styles.root,
      '& img': styles.img,
      '& a, & a:hover': styles.a,
      '& .AdDisplay-imageWrapper': styles.imgWrapper,
      '& .AdDisplay-description': styles.description,
      '& .AdDisplay-poweredby': styles.poweredby,
    };
  },
);

export default function AdDisplay(props) {
  const { ad, className, shape = 'auto' } = props;

  /* eslint-disable material-ui/no-hardcoded-labels, react/no-danger */
  return (
    <Root shape={shape === 'inline' ? 'inline' : adShape} className={className}>
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
        <span className="AdDisplay-imageWrapper">
          <img height="100" width="130" src={ad.img} alt={ad.name} />
        </span>
        <span
          className="AdDisplay-description"
          dangerouslySetInnerHTML={{ __html: ad.description }}
        />
      </a>
      <span className="AdDisplay-poweredby">ad by {ad.poweredby}</span>
    </Root>
  );
  /* eslint-enable material-ui/no-hardcoded-labels, react/no-danger */
}

AdDisplay.propTypes = {
  ad: PropTypes.object.isRequired,
  className: PropTypes.string,
  shape: PropTypes.oneOf(['inline', 'auto']),
};
