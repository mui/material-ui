import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import loadScript from 'docs/src/modules/utils/loadScript';

const styles = theme => ({
  '@global': {
    '#carbonads': {
      overflow: 'hidden',
      backgroundColor: theme.palette.background.level1,
      padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
        1,
      ) + 130}px`,
      borderRadius: theme.shape.borderRadius,
      '& .carbon-img': {
        float: 'left',
        marginLeft: -130,
        marginRight: theme.spacing(1),
      },
      '& img': {
        verticalAlign: 'middle',
      },
      '& a': {
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

class AdCarbon extends React.Component {
  componentDidMount() {
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
  }

  render() {
    return <span id="carbon-ad" />;
  }
}

export default withStyles(styles)(AdCarbon);
