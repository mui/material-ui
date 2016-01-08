import React from 'react';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

const styles = {
  marginBottom: 16,
};

const RadioButtonExampleSimple = () => (
  <div>
    <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
      <RadioButton
        id="radioButtonId1"
        value="light"
        label="prepare for light speed"
        style={styles} />
      <RadioButton
        id="radioButtonId2"
        value="not_light"
        label="light speed too slow"
        style={styles}/>
      <RadioButton
        id="radioButtonId3"
        value="ludicrous"
        label="go to ludicrous speed"
        style={styles}
        disabled={true}/>
    </RadioButtonGroup>
  </div>
);

export default RadioButtonExampleSimple;
