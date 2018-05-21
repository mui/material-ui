import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '../styles/withStyles';

const styles = (props) => ({
  root: {
    cursor: props.cursorPointer && 'pointer',
    textAlign: props.hAlign,
    width: 'auto',
    display: props.inline ? 'inline-block' : 'block',
  }
});

function Box(props) {
  const {
    children,
    cursorPointer,
    inline,
    hAlign,
    margin,
    padding,
    style,
    classes,
    ...other
  } = props;
  console.log(props.style);
  return (
    <div
      className={classes.root}>
      {children}
    </div>
  );
}

Box.propTypes = {
  /**
   * Children passed into the Box element.
   */
  children: PropTypes.node,
  /**
   * Set cursor to pointer when Box element is hovered.
   */
  cursorPointer: PropTypes.bool,
  /**
   * Horizontal Alignment of contents inside the Box
   */
  hAlign: PropTypes.oneOf(['start', 'center', 'end', 'justify']),
  /**
   * If `inline` is true, the Box will use inline display
   */
  inline: PropTypes.bool,
  /**
   * Margin around the Box in `px`
   */
  margin: PropTypes.number,
  /**
   * Padding inside the Box in `px`
   */
  padding: PropTypes.number,
  /**
   * Raw styles are directly added to the `style` attribute and aren't merged into `className`
   */
  style: PropTypes.object,
  /**
   * The css style of the root element (accepts pseudoclass and nesting).
   */
  classes: PropTypes.object,
}

Box.defaultProps = {
  cursorPointer: false,
  hAlign: 'center',
  inline: false,
  margin: 0,
  padding: 10,
  style: {},
  classes: {},
};

export default withStyles(styles, { name: 'MuiBox' })(Box);
