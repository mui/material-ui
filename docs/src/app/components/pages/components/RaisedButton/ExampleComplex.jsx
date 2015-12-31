import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import Typography from 'material-ui/lib/styles/typography';

const style = {
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
    <RaisedButton primary={true} label="Choose an Image" style={style.button}>
      <input type="file" style={style.exampleImageInput}></input>
    </RaisedButton>
    <RaisedButton
      linkButton={true}
      href="https://github.com/callemall/material-ui"
      secondary={true}
      style={style.button}
      label="Github"
      labelStyle={style.buttonLabel}>
      <FontIcon style={style.exampleButtonIcon} className="muidocs-icon-custom-github"/>
    </RaisedButton>
    <RaisedButton
      secondary={true}
      label="Label after"
      labelPosition="after"
      labelStyle={style.buttonLabel}
      style={style.button}>
      <FontIcon style={style.exampleButtonIcon} className="muidocs-icon-custom-github"/>
    </RaisedButton>
    <RaisedButton label="Disabled" disabled={true} style={style.button}/>
  </div>
);

export default RaisedButtonExampleComplex;
