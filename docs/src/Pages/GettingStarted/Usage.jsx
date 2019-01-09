import React from 'react';
import PropTypes from 'prop-types';
import Code from '_shared/Code';
import { Typography, withStyles } from '@material-ui/core';
import quickStartCode from '!raw-loader!./QuickStart.example'; // eslint-disable-line

const sandBoxId = 'q9l2j10wr4';

const Usage = ({ classes }) => (
  <div>
    <Typography variant="h2" gutterBottom>
      Usage
    </Typography>

    <Typography variant="body1" gutterBottom>
      Material-UI-pickers rely only on material-ui controls and the date-management lib you have
      choose. Please note that all components are controlled, thats means that its required to pass
      <span className="inline-code"> value </span> and
      <span className="inline-code"> onChange </span> props.
    </Typography>

    <Typography variant="h4" className={classes.quickStartHeader} gutterBottom>
      Quick Start
    </Typography>

    <Typography variant="body1" gutterBottom>
      Here is a quick example you to get started
    </Typography>

    <Code withMargin text={quickStartCode} />

    <Typography variant="h4" gutterBottom>
      Interactive example
    </Typography>

    <iframe
      title="codesandbox"
      src={`https://codesandbox.io/embed/${sandBoxId}?hidenavigation=1&fontsize=14&view=preview`}
      style={{
        width: '100%',
        height: 650,
        border: 0,
        borderRadius: 4,
        overflow: 'hidden',
      }}
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />
  </div>
);

Usage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  quickStartHeader: {
    marginTop: '1em',
  },
};

export default withStyles(styles)(Usage);
