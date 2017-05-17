// @flow

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import remyImage from 'docs/src/assets/images/remy.jpg';
import uxecoImage from 'docs/src/assets/images/uxceo-128.jpg';

const styleSheet = createStyleSheet('ImageAvatars', {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

function ImageAvatars(props) {
  const classes = props.classes;
  return (
    <div className={classes.row}>
      <Avatar
        alt="Remy Sharp"
        src={remyImage}
        className={classes.avatar}
      />
      <Avatar
        alt="Adelle Charles"
        src={uxecoImage}
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ImageAvatars);
