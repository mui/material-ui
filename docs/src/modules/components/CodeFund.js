import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  '@global': {
    '#cf_ad': {
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
        .spacing.unit + 130}px`,
      borderRadius: theme.shape.borderRadius,
      margin: '0 !important', // Reset
      maxWidth: 'none !important', // Reset
      '& img': {
        verticalAlign: 'middle',
      },
      '& a': {
        textDecoration: 'none',
      },
      '& .cf-wrapper.cf-wrapper': {
        padding: 0, // Reset
        overflow: 'visible', // Reset
        backgroundColor: 'transparent', // Reset
      },
      '& .cf-img-wrapper.cf-img-wrapper': {
        float: 'left',
        marginLeft: -130,
        marginRight: theme.spacing.unit,
      },
      '& .cf-text.cf-text': {
        ...theme.typography.body2,
        display: 'block',
        '& strong': {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      '& .cf-powered-by.cf-powered-by': {
        ...theme.typography.caption,
        color: theme.palette.text.secondary,
        display: 'block',
        marginTop: 0, // Reset
      },
    },
  },
});

class CodeFund extends React.Component {
  componentDidMount() {
    const scriptSlot = document.querySelector('#code-fund-script-slot');

    // Concurrence issues
    if (!scriptSlot) {
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.src = '//codefund.io/scripts/71fdcb01-40be-4590-af75-cd1bd4773c2a/embed.js';
    scriptSlot.appendChild(script);
  }

  render() {
    return (
      <React.Fragment>
        <span id="code-fund-script-slot" />
        <span id="codefund_ad" />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CodeFund);
