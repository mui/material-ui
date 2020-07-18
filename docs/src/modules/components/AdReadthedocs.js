import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import loadScript from 'docs/src/modules/utils/loadScript';
import adStyles from 'docs/src/modules/components/ad.styles';
import { adShape } from 'docs/src/modules/components/AdManager';

const useStyles = makeStyles((theme) => {
  const styles = adStyles(theme);

  return {
    '@global': {
      '[data-ea-publisher][data-ea-publisher][data-ea-publisher][data-ea-publisher]': {
        '&&': {
          display: 'block',
        },
        '& .ea-placement': {
          ...styles.root,
        },
        '& .ea-content': {
          margin: 0,
          padding: 0,
          overflow: 'visible',
          boxShadow: 'none',
          background: 'transparent',
          maxWidth: '100%',
          color: 'inherit',
        },
        '& .ea-content > a': {
          ...styles.imgWrapper,
          marginLeft: -125,
          width: 120,
          height: 90,
        },
        '& .ea-content > a img': styles.img,
        '& a, & a:hover': styles.a,
        '& .ea-text': {
          marginTop: 0,
          color: 'inherit',
          textAlign: 'left',
        },
        '& .ea-text strong': {
          color: 'inherit',
        },
        '& .ea-text a': {
          ...styles.description,
          color: 'inherit',
        },
        '& .ea-callout': {
          margin: 0,
          padding: 0,
          fontStyle: 'normal',
          textAlign: 'left',
          ...styles.poweredby,
        },
        '& .ea-callout a': {
          fontSize: 'inherit',
        },
      },
    },
  };
});

export default function AdReadthedocs() {
  useStyles();

  React.useEffect(() => {
    const script = loadScript(
      'https://media.ethicalads.io/media/client/ethicalads.min.js',
      document.querySelector('head'),
    );

    return () => {
      script.parentElement.removeChild(script);
    };
  }, []);

  return (
    <div data-ea-publisher="material-ui" data-ea-type={adShape === 'image' ? 'image' : 'text'} />
  );
}
