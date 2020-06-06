import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import loadScript from 'docs/src/modules/utils/loadScript';
import adStyles from 'docs/src/modules/components/ad.styles';

const useStyles = makeStyles((theme) => {
  const styles = adStyles(theme);

  return {
    '@global': {
      '#cf': {
        ...styles.root,
        '& .cf-img-wrapper.cf-img-wrapper': styles.imgWrapper,
        '& img': styles.img,
        '& a, & a:hover': styles.a,
        '& .cf-text.cf-text': styles.description,
        '& .cf-powered-by.cf-powered-by': {
          ...styles.poweredby,
          '& em': {
            fontStyle: 'normal',
          },
        },
      },
    },
  };
});

export default function AdCodeFund() {
  useStyles();
  const ref = React.useRef(null);

  React.useEffect(() => {
    loadScript('https://codefund.io/properties/137/funder.js?theme=unstyled', ref.current);
  }, []);

  return (
    <React.Fragment>
      <span ref={ref} />
      <span id="codefund" />
    </React.Fragment>
  );
}
