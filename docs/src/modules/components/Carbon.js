import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  '@global': {
    '#carbonads': {
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
        .spacing.unit + 130}px`,
      borderRadius: theme.shape.borderRadius,
      '& .carbon-img': {
        float: 'left',
        marginLeft: -130,
        marginRight: theme.spacing.unit,
      },
      '& img': {
        verticalAlign: 'middle',
      },
      '& a': {
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
    return <span id="carbon-ad" />;
  }
}

export default withStyles(styles)(Carbon);
