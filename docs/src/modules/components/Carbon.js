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
        ...theme.typography.body2,
        display: 'block',
        margin: `${theme.spacing.unit}px 0`,
      },
      '& .carbon-poweredby': {
        ...theme.typography.caption,
        display: 'block',
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
    const scriptSlot = document.querySelector('#carbon-ad');
    scriptSlot.appendChild(script);
  }

  render() {
    return <div id="carbon-ad" />;
  }
}

export default withStyles(styles)(Carbon);
