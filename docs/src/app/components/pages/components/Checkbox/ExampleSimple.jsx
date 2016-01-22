import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import ActionFavorite from 'material-ui/lib/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';

const styles = {
  block: {
    maxWidth: 350,
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
      label="Disabled"
      disabled={true}
      style={styles.checkbox}
    />
    <Checkbox
      checkedIcon={<ActionFavorite />}
      unCheckedIcon={<ActionFavoriteBorder />}
      label="Custom icon"
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
