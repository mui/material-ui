import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import loadScript from 'docs/src/modules/utils/loadScript';
import AdDisplay from 'docs/src/modules/components/AdDisplay';
import { adStylesObject } from 'docs/src/modules/components/ad.styles';

const useStyles = makeStyles((theme) => {
  const styles = adStylesObject['body-image'](theme);

  return {
    '@global': {
      '#carbonads': {
        ...styles.root,
        '& .carbon-img': styles.imgWrapper,
        '& img': styles.img,
        '& a, & a:hover': styles.a,
        '& .carbon-text': styles.description,
        '& .carbon-poweredby': styles.poweredby,
      },
    },
  };
});

function AdCarbonImage() {
  useStyles();
  const ref = React.useRef(null);

  React.useEffect(() => {
    const script = loadScript(
      'https://cdn.carbonads.com/carbon.js?serve=CKYIL27L&placement=material-uicom',
      ref.current,
    );
    script.id = '_carbonads_js';
  }, []);

  return <span ref={ref} />;
}

export function AdCarbonInline(props) {
  const [ad, setAd] = React.useState(null);

  React.useEffect(() => {
    let active = true;
    let attempt = 0;

    (async () => {
      async function tryFetch() {
        if (attempt >= 10 || !active) {
          return null;
        }

        attempt += 1;
        const request = await fetch('https://srv.buysellads.com/ads/CE7DC23W.json');
        const data = await request.json();
        // Inspired by https://github.com/Semantic-Org/Semantic-UI-React/blob/2c7134128925dd831de85011e3eb0ec382ba7f73/docs/src/components/CarbonAd/CarbonAdNative.js#L9
        const sanitizedAd = data.ads
          .filter((item) => Object.keys(item).length > 0)
          .filter((item) => item.statlink)
          .filter(Boolean)[0];

        if (!sanitizedAd) {
          return tryFetch();
        }

        return sanitizedAd;
      }
      const sanitizedAd = await tryFetch();
      if (active) {
        setAd(sanitizedAd);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return ad ? (
    <React.Fragment>
      {/* Impression */}
      <img src={ad.statimp} alt="" style={{ display: 'none' }} />
      {/* Pixel */}
      {ad.pixel &&
        ad.pixel
          .split('||')
          .map((pixel, i) => (
            <img
              key={i}
              src={`${pixel.replace('[timestamp]', ad.timestamp)}`}
              style={{ display: 'none' }}
              alt=""
            />
          ))}
      <AdDisplay
        {...props}
        className="carbonads"
        shape="inline"
        ad={{
          link: ad.statlink,
          img: ad.image,
          name: ad.company,
          description: `<strong>${ad.company}</strong> - ${ad.description}`,
          poweredby: 'Carbon',
        }}
      />
    </React.Fragment>
  ) : (
    <div {...props} style={{ minHeight: 45 }} />
  );
}

export default function AdCarbon() {
  return <AdCarbonImage />;
}
