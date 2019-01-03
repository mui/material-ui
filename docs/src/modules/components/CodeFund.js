import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  '@global': {
    '#cf': {
      overflow: 'hidden',
      backgroundColor: `${theme.palette.background.paper} !important`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
        .spacing.unit + 130}px`,
      borderRadius: theme.shape.borderRadius,
      width: 'initial !important',
      margin: '0 !important', // Reset
      maxWidth: 'none !important', // Reset
      '& img': {
        verticalAlign: 'middle',
      },
      '& .cf-wrapper.cf-wrapper': {
        overflow: 'visible', // Reset
        backgroundColor: 'transparent', // Reset
      },
      '& .cf-img-wrapper.cf-img-wrapper': {
        float: 'left',
        marginLeft: -130,
        marginRight: theme.spacing.unit,
        marginBottom: '0px !important', // Reset
      },
      '& .cf-text.cf-text': {
        ...theme.typography.body2,
        color: `${theme.typography.body2.color} !important`,
        display: 'block',
        '& strong': {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      '& .cf-powered-by.cf-powered-by': {
        ...theme.typography.caption,
        fontSize: `${theme.typography.caption.fontSize} !important`,
        color: `${theme.palette.text.secondary} !important`,
        marginTop: '0px! important', // Reset
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
    script.src = 'https://codefund.io/properties/137/funder.js?theme=unstyled';
    scriptSlot.appendChild(script);
  }

  render() {
    return (
      <React.Fragment>
        <span id="code-fund-script-slot" />
        <span id="codefund" />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CodeFund);
