import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';

const styles = {
  buttonLabel: {
    padding: '0px 16px 0px 8px',
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
  exampleFlatButtonIcon: {
    color: Colors.cyan500,
  },
  button: {
    margin: 12,
  },
};

const FlatButtonExampleComplex = () => (
  <div>
    <FlatButton
      label="Choose an Image"
      primary={true}
      style={styles.button}
    >
      <input type="file" id="imageButton" style={styles.exampleImageInput} />
    </FlatButton>
    <FlatButton
      secondary={true}
      label="Label after"
      labelPosition="after"
      labelStyle={styles.buttonLabel}
      style={styles.button}
    >
      <FontIcon
        style={styles.exampleFlatButtonIcon}
        className="muidocs-icon-custom-github"
      />
    </FlatButton>
    <FlatButton
      label="Disabled"
      disabled={true}
      style={styles.button}
    />
    <br />
    <FlatButton
      label="GitHub Link"
      labelStyle={styles.buttonLabel}
      linkButton={true}
      href="https://github.com/callemall/material-ui"
      secondary={true}
      style={styles.button}
    >
      <FontIcon
        style={styles.exampleFlatButtonIcon}
        className="muidocs-icon-custom-github"
      />
    </FlatButton>
  </div>
);

export default FlatButtonExampleComplex;
