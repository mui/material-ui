import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const requireIcons = require.context('../../../../../packages/material-ui-icons/src', true, /js$/);

const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
    maxHeight: 300,
    overflow: 'auto',
  },
});

function SvgMaterialIconsAll(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      {requireIcons.keys().map(key => {
        if (key === './index.js' || key === './utils/createSvgIcon.js') {
          return null;
        }

        const Icon = requireIcons(key).default;
        return <Icon key={key} />;
      })}
    </div>
  );
}

SvgMaterialIconsAll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SvgMaterialIconsAll);
