import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const RaisedButtonExampleComplex = () => (
  <div>
    <RaisedButton
      label="Choose an Image"
      labelPosition="before"
      style={styles.button}
    >
      <input type="file" style={styles.exampleImageInput} />
    </RaisedButton>
    <RaisedButton
      label="Label before"
      labelPosition="before"
      primary={true}
      icon={<ActionAndroid />}
      style={styles.button}
    />
    <RaisedButton
      label="Github Link"
      linkButton={true}
      href="https://github.com/callemall/material-ui"
      secondary={true}
      style={styles.button}
      icon={<FontIcon className="muidocs-icon-custom-github" />}
    />
  </div>
);

export default RaisedButtonExampleComplex;
