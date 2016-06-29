import React from 'react';
import Button from 'material-ui/Button';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  button: {
    margin: '6px 12px 6px 0px',
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
/**
 * The first example uses an `input` as a child component, the next has next has an [SVG Icon](/#/components/svg-icon),
 * with the label positioned before. The final example uses a [Font Icon](/#/components/font-icon),
 * and has an `href` property, which causes the buutton to be wrappen in an anchor element.
 */
const ButtonExampleComplex = () => (
  <div>
    <Button
      label="Choose an Image"
      style={styles.button}
    >
      Choose an Image
      <input type="file" style={styles.exampleImageInput} />
    </Button>
    <Button
      primary={true}
      style={styles.button}
    >
      Label before
      <ActionAndroid />
    </Button>
    <Button
      href="https://github.com/callemall/material-ui"
      secondary={true}
      style={styles.button}
    >
      <FontIcon className="muidocs-icon-custom-github" />
      Github Link
    </Button>
    <br />
    <Button
      type="flat"
      style={styles.button}
    >
      Choose an Image
      <input type="file" style={styles.exampleImageInput} />
    </Button>
    <Button
      type="flat"
      primary={true}
      style={styles.button}
    >
      Label before
      <ActionAndroid />
    </Button>
    <Button
      type="flat"
      href="https://github.com/callemall/material-ui"
      secondary={true}
      style={styles.button}
    >
      <FontIcon className="muidocs-icon-custom-github" />
      Github Link
    </Button>
  </div>
);

export default ButtonExampleComplex;
