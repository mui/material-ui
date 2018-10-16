import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  '@global': {
    '#cf_ad': {
      padding: theme.spacing.unit,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      '&& .cf-wrapper': {
        padding: 0,
        backgroundColor: 'transparent',
      },
      '&& .cf-img-wrapper': {
        float: 'none',
        display: 'block',
      },
      '&& .cf-text': {
        ...theme.typography.body2,
        display: 'block',
        margin: `${theme.spacing.unit}px 0`,
        '& strong': {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      '&& .cf-powered-by': {
        ...theme.typography.caption,
        marginTop: 0,
      },
    },
  },
});

class CodeFund extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.src = '//codefund.io/scripts/71fdcb01-40be-4590-af75-cd1bd4773c2a/embed.js';
    const scriptSlot = document.querySelector('#code-fund-script-slot');
    scriptSlot.appendChild(script);
  }

  render() {
    return (
      <React.Fragment>
        <div id="code-fund-script-slot" />
        <div id="codefund_ad" />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CodeFund);
