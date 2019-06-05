import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import loadScript from 'docs/src/modules/utils/loadScript';

const styles = theme => ({
  '@global': {
    '#cf': {
      overflow: 'hidden',
      backgroundColor: theme.palette.background.level1,
      padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
        1,
      ) + 130}px`,
      borderRadius: theme.shape.borderRadius,
      '& .cf-img-wrapper.cf-img-wrapper': {
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
      '& .cf-text.cf-text': {
        ...theme.typography.body2,
        display: 'block',
      },
      '& .cf-powered-by.cf-powered-by': {
        ...theme.typography.caption,
        color: theme.palette.text.secondary,
        display: 'block',
      },
    },
  },
});

class AdCodeFund extends React.Component {
  componentDidMount() {
    const scriptSlot = document.querySelector('#code-fund-script-slot');

    // Concurrence issues
    if (!scriptSlot) {
      return;
    }

    loadScript('https://codefund.io/properties/137/funder.js?theme=unstyled', scriptSlot);
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

export default withStyles(styles)(AdCodeFund);
