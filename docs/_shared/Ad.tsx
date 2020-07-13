import * as React from 'react';
import { loadScript } from 'utils/helpers';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  '@global': {
    '#carbonads': {
      fontFamily: theme.typography.fontFamily,
      display: 'flex',
      maxWidth: '330px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
    },
    '#carbonads a': { color: 'inherit', textDecoration: 'none' },
    '#carbonads a:hover': { color: 'inherit' },
    '#carbonads span': {
      position: 'relative',
      display: 'block',
      overflow: 'hidden',
    },
    '#carbonads .carbon-wrap': { display: 'flex' },
    '.carbon-img': { display: 'block', margin: '0', lineHeight: '1' },
    '.carbon-img img': { display: 'block' },
    '.carbon-text': {
      fontSize: '13px',
      padding: '10px',
      lineHeight: '1.5',
      textAlign: 'left',
    },
    '.carbon-poweredby': {
      display: 'block',
      padding: '8px 10px',
      background:
        'repeating-linear-gradient(-45deg, transparent, transparent 5px, hsla(0, 0%, 0%, .025) 5px, hsla(0, 0%, 0%, .025) 10px) hsla(203, 11%, 95%, .4)',
      textAlign: 'center',
      fontStyle: 'italic',
      textTransform: 'capitalize',

      fontSize: '9px',
      lineHeight: '1',
    },
    '@media only percy': {
      '#ad-script-position': {
        display: 'none',
      },
    },
  },
}));

const Ad: React.FC = () => {
  useStyles();

  React.useEffect(() => {
    // @ts-expect-error Need to extend window
    if (window && window.Cypress) {
      return;
    }

    const adScriptPosition = document.querySelector('#ad-script-position');
    if (adScriptPosition) {
      let script = loadScript(
        'https://cdn.carbonads.com/carbon.js?serve=CKYIL27L&placement=material-uicom',
        adScriptPosition
      );

      script.id = '_carbonads_js';
    }
  }, []);

  if (process.env.VISUAL_TESTING) {
    return null;
  }

  return (
    <Grid container>
      <span id="ad-script-position" />
    </Grid>
  );
};

export default Ad;
