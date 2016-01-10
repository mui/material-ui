import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';

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

const FlatButtonExampleComplex = () => (
  <div>
    <FlatButton
      label="Choose an Image"
      primary={true}
      style={styles.button}
    >
      <input type="file" style={styles.exampleImageInput} />
    </FlatButton>
    <FlatButton
      secondary={true}
      label="Label after"
      labelPosition="after"
      style={styles.button}
      icon={<ActionAndroid />}
    />
    <FlatButton
      label="Disabled"
      disabled={true}
      style={styles.button}
    />
    <br />
    <FlatButton
      label="GitHub Link"
      linkButton={true}
      href="https://github.com/callemall/material-ui"
      secondary={true}
      style={styles.button}
      icon={<FontIcon className="muidocs-icon-custom-github" />}
    />
  </div>
);

export default FlatButtonExampleComplex;
