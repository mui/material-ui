import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const CheckboxExampleSimple = () => (
  <div style={styles.block}>
    <Checkbox
      label="Simple"
      style={styles.checkbox}
    />
    <Checkbox
      label="Checked by default"
      defaultChecked={true}
      style={styles.checkbox}
    />
    <Checkbox
      checkedIcon={<ActionFavorite />}
      uncheckedIcon={<ActionFavoriteBorder />}
      label="Custom icon"
      style={styles.checkbox}
    />
    <Checkbox
      label="Disabled unchecked"
      disabled={true}
      style={styles.checkbox}
    />
    <Checkbox
      label="Disabled checked"
      checked={true}
      disabled={true}
      style={styles.checkbox}
    />
    <Checkbox
      label="Label on the left"
      labelPosition="left"
      style={styles.checkbox}
    />
  </div>
);

export default CheckboxExampleSimple;
