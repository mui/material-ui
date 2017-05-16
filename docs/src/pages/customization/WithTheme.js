// @flow

import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withTheme } from 'material-ui/styles';

function WithTheme(props) {
  const { theme } = props;
  const primaryText = theme.palette.text.primary;
  const primaryColor = theme.palette.primary[500];

  const styles = {
    primaryText: {
      background: theme.palette.background.default,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      color: primaryText,
    },
    primaryColor: {
      background: primaryColor,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      color: '#fff',
    },
  };

  return (
    <div>
      <Typography style={styles.primaryColor}>
        {`Primary color ${primaryColor}`}
      </Typography>
      <Typography style={styles.primaryText}>
        {`Primary text ${primaryText}`}
      </Typography>
    </div>
  );
}

WithTheme.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(WithTheme); // Let's get the theme as a property
