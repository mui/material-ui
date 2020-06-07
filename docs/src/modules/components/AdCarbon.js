import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import loadScript from 'docs/src/modules/utils/loadScript';
import adStyles from 'docs/src/modules/components/ad.styles';

const useStyles = makeStyles((theme) => {
  const styles = adStyles(theme);

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

export default function AdCarbon() {
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
