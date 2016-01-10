import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import Typography from 'material-ui/lib/styles/typography';

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
  exampleButtonIcon: {
    color: Typography.textFullWhite,
  },
  button: {
    margin: 12,
  },
};

const RaisedButtonExampleComplex = () => (
  <div>
    <RaisedButton
      label="Choose an Image"
      primary={true}
      style={styles.button}
    >
      <input type="file" style={styles.exampleImageInput} />
    </RaisedButton>
    <RaisedButton
      label="Label after"
      labelPosition="after"
      labelStyle={styles.buttonLabel}
      secondary={true}
      style={styles.button}
    >
      <FontIcon style={styles.exampleButtonIcon} className="muidocs-icon-custom-github"/>
    </RaisedButton>
    <RaisedButton
      label="Disabled"
      disabled={true}
      style={styles.button}
    />
    <br />
    <RaisedButton
      label="Github Link"
      labelStyle={styles.buttonLabel}
      linkButton={true}
      href="https://github.com/callemall/material-ui"
      secondary={true}
      style={styles.button}
    >
      <FontIcon style={styles.exampleButtonIcon} className="muidocs-icon-custom-github"/>
    </RaisedButton>
  </div>
);

export default RaisedButtonExampleComplex;
