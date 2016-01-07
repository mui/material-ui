import React from 'react';
import Toggle from 'material-ui/lib/toggle';

const styles = {
  marginBottom: 16,
};

const ToggleExampleSimple = () => (
  <div>
    <Toggle
      id="toggleId1"
      name="toggleName1"
      value="toggleValue1"
      label="activate thrusters"
      style={styles}/>
    <Toggle
      id="toggleId2"
      name="toggleName2"
      value="toggleValue2"
      label="auto-pilot"
      defaultToggled={true}
      style={styles}/>
    <Toggle
      id="toggleId3"
      name="toggleName3"
      value="toggleValue3"
      label="initiate self-destruct sequence"
      disabled={true}
      style={styles}/>
  </div>
);

export default ToggleExampleSimple;
