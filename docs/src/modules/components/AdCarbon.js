import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import loadScript from 'docs/src/modules/utils/loadScript';

const styles = (theme) => ({
  '@global': {
    '#carbonads': {
      display: 'block',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.level2,
      padding: `${theme.spacing(1.5)}px ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px ${
        theme.spacing(1.5) + 130
      }px`,
      borderRadius: theme.shape.borderRadius,
      '& .carbon-img': {
        float: 'left',
        marginLeft: -130,
        width: 130,
        height: 100,
        marginRight: theme.spacing(1.5),
      },
      '& img': {
        verticalAlign: 'middle',
      },
      '& a, & a:hover': {
        color: theme.palette.text.primary,
        textDecoration: 'none',
      },
      '& .carbon-text': {
        ...theme.typography.body2,
        display: 'block',
      },
      '& .carbon-poweredby': {
        ...theme.typography.caption,
        color: theme.palette.text.secondary,
        display: 'block',
      },
    },
  },
});

function AdCarbon() {
  React.useEffect(() => {
    const scriptSlot = document.querySelector('#carbon-ad');

    // Concurrence issues
    if (!scriptSlot) {
      return;
    }

    const script = loadScript(
      'https://cdn.carbonads.com/carbon.js?serve=CKYIL27L&placement=material-uicom',
      scriptSlot,
    );
    script.id = '_carbonads_js';
  }, []);

  return <span id="carbon-ad" />;
}

export default withStyles(styles)(AdCarbon);
