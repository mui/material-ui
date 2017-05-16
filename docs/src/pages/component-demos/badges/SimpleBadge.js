// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Badge from 'material-ui/Badge';
import MailIcon from 'material-ui-icons/Mail';
import FolderIcon from 'material-ui-icons/Folder';

const styleSheet = createStyleSheet('SimpleBadge', (theme) => ({
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
}));

function SimpleBadge(props) {
  const classes = props.classes;
  return (
    <div>
      <Badge
        className={classes.badge}
        badgeContent={4}
        primary
      >
        <MailIcon />
      </Badge>
      <Badge
        className={classes.badge}
        badgeContent={10}
        accent
      >
        <FolderIcon />
      </Badge>
    </div>
  );
}

SimpleBadge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SimpleBadge);
