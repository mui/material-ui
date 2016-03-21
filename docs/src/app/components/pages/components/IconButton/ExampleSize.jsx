import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};

const IconButtonExampleSize = () => (
  <div>
    <IconButton>
      <ActionHome />
    </IconButton>

    <IconButton
      iconStyle={styles.smallIcon}
      style={styles.small}
    >
      <ActionHome />
    </IconButton>

    <IconButton
      iconStyle={styles.mediumIcon}
      style={styles.medium}
    >
      <ActionHome />
    </IconButton>

    <IconButton
      iconStyle={styles.largeIcon}
      style={styles.large}
    >
      <ActionHome />
    </IconButton>
  </div>
);

export default IconButtonExampleSize;
