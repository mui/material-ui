import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => {
  return ({
    root: {
      display: 'flex',
      display: '-webkit-flex',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
    },
    displayInline: {
      display: 'inline-block',
    },
    cursorPointer: {
      cursor: 'pointer',
    },
    hAlignStart: {
      'justify-content': 'flex-start',
    },
    hAlignCenter: {
      'justify-content': 'center',
    },
    hAlignEnd: {
      'justify-content': 'flex-end',
    },
    hAlignSpaceBetween: {
      'justify-content': 'space-between',
    },
    hAlignSpaceAround: {
      'justify-content': 'space-around',
    },
    hAlignSpaceEvenly: {
      'justify-content': 'space-evenly',
    },
    vAlignStart: {
      'align-items': 'flex-start',
      '-webkit-align-items': 'flex-start',
    },
    vAlignCenter: {
      'align-items': 'center',
      '-webkit-align-items': 'center',
    },
    vAlignEnd: {
      'align-items': 'flex-end',
      '-webkit-align-items': 'flex-end',
    },
    vAlignBaseline: {
      'align-items': 'baseline',
      '-webkit-align-items': 'baseline',
    },
    vAlignStretch: {
      'align-items': 'stretch',
      '-webkit-align-items': 'stretch',
    },
  })
};

function Box(props) {
  const { children, classes, className: classNameProp, component: Component, ...other } = props;
  const className = classNames(classes.root, {
    [classes.displayInline]: props.inline,
    [classes.cursorPointer]: props.cursorPointer,
    [classes.hAlignStart]: props.hAlign === 'start',
    [classes.hAlignCenter]: props.hAlign === 'center',
    [classes.hAlignEnd]: props.hAlign === 'end',
    [classes.hAlignSpaceBetween]: props.hAlign === 'space-between',
    [classes.hAlignSpaceAround]: props.hAlign === 'space-around',
    [classes.hAlignSpaceEvenly]: props.hAlign === 'space-evenly',
    [classes.vAlignStart]: props.vAlign === 'start',
    [classes.vAlignCenter]: props.vAlign === 'center',
    [classes.vAlignEnd]: props.vAlign === 'end',
    [classes.vAlignBaseline]: props.vAlign === 'baseline',
    [classes.vAlignStretch]: props.vAlign === 'stretch',
  }, classNameProp);

  return (
    <Component 
      className={className}
      style={{
        margin: `${props.margin}px`,
        padding: `${props.padding}px`
      }}>
      {children}
    </Component>
  );
}

Box.propTypes = {
  /**
   * Children passed into the Box element.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Set cursor to pointer when Box element is hovered.
   */
  cursorPointer: PropTypes.bool,
  /**
   * Horizontal Alignment of contents inside the Box
   */
  hAlign: PropTypes.oneOf(['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']),
  /**
   * Vertical Alignment of contents inside the Box
   */
  vAlign: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
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
}

Box.defaultProps = {
  inline: false,
  margin: 0,
  padding: 10,
  cursorPointer: false,
  hAlign: 'center',
  vAlign: 'center',
  component: 'div',
};

export default withStyles(styles, { name: 'MuiBox' })(Box);
