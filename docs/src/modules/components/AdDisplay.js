import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { adShape } from 'docs/src/modules/components/AdManager';
import { GA_ADS_DISPLAY_RATIO } from 'docs/src/modules/constants';
import { adStylesObject } from 'docs/src/modules/components/ad.styles';

const InlineShape = styled('span')(({ theme }) => {
  const styles = adStylesObject['body-inline'](theme);

  return {
    ...styles.root,
    '& img': styles.img,
    '& a, & a:hover': styles.a,
    '& .AdDisplay-imageWrapper': styles.imgWrapper,
    '& .AdDisplay-description': styles.description,
    '& .AdDisplay-poweredby': styles.poweredby,
  };
});

const ImageShape = styled('span')(({ theme }) => {
  const styles = adStylesObject['body-image'](theme);

  return {
    ...styles.root,
    '& img': styles.img,
    '& a, & a:hover': styles.a,
    '& .AdDisplay-imageWrapper': styles.imgWrapper,
    '& .AdDisplay-description': styles.description,
    '& .AdDisplay-poweredby': styles.poweredby,
  };
});

export default function AdDisplay(props) {
  const { ad, className, shape: shapeProp = 'auto' } = props;

  React.useEffect(() => {
    // Avoid an exceed on the Google Analytics quotas.
    if (Math.random() > GA_ADS_DISPLAY_RATIO || !ad.label) {
      return;
    }

    window.gtag('event', 'ad', {
      eventAction: 'display',
      eventLabel: ad.label,
    });
  }, [ad.label]);

  const shape = shapeProp === 'auto' ? adShape : shapeProp;

  let Root;
  if (shape === 'inline') {
    Root = InlineShape;
  }
  if (shape === 'image') {
    Root = ImageShape;
  }

  /* eslint-disable material-ui/no-hardcoded-labels, react/no-danger */
  return (
    <Root className={className}>
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
