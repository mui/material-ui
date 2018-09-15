import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  '@global': {
    '#carbonads': {
      padding: theme.spacing.unit,
      backgroundColor: theme.palette.background.paper,
      '& img': {
        verticalAlign: 'middle',
      },
      '& a': {
        textDecoration: 'none',
      },
      '& .carbon-wrap': {
        display: 'block',
      },
      '& .carbon-text': {
        ...theme.typography.body1,
        display: 'block',
        margin: `${theme.spacing.unit}px`,
      },
      '& .carbon-poweredby': {
        ...theme.typography.caption,
        display: 'block',
        marginTop: 0,
        position: 'static',
        right: 0,
        bottom: 0,
        padding: `0px ${theme.spacing.unit}px`,
      },
    },
  },
});

class Carbon extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.src = '//cdn.carbonads.com/carbon.js?serve=CKYIL27L&placement=material-uicom';
    script.id = '_carbonads_js';
    const ad = document.querySelector('#carbon_ad');
    if (ad) {
      ad.appendChild(script);
    }
  }

  render() {
    return <div id="carbon_ad" />;
  }
}

export default withStyles(styles)(Carbon);
