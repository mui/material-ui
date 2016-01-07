import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import ToggleStar from 'material-ui/lib/svg-icons/toggle/star';
import ToggleStarBorder from 'material-ui/lib/svg-icons/toggle/star-border';

const styles = {
  marginBottom: 16,
};

const CheckboxExampleSimple = () => (
  <div>
    <Checkbox
      id="checkboxId1"
      name="checkboxName1"
      value="checkboxValue1"
      label="went for a run today"
      style={styles}/>
    <Checkbox
      id="checkboxId2"
      name="checkboxName2"
      value="checkboxValue2"
      label="fed the dog"
      defaultChecked={true}
      style={styles}/>
    <Checkbox
      id="checkboxId3"
      name="checkboxName3"
      value="checkboxValue3"
      label="built a house on the moon"
      disabled={true}
      style={styles}/>
    <Checkbox
      name="checkboxName4"
      value="checkboxValue4"
      checkedIcon={<ToggleStar />}
      unCheckedIcon={<ToggleStarBorder />}
      label="custom icon"
      style={styles}/>
  </div>
);

export default CheckboxExampleSimple;
