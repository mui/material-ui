import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { componentPropType, chainPropTypes } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    height: 1,
    margin: 0, // Reset browser default style.
    border: 'none',
    flexShrink: 0,
    backgroundColor: theme.palette.divider,
  },
  /* Styles applied to the root element if `absolute={true}`. */
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  /* Styles applied to the root element if `variant="inset"`. */
  inset: {
    marginLeft: 72,
  },
  /* Styles applied to the root element if `light={true}`. */
  light: {
    backgroundColor: fade(theme.palette.divider, 0.08),
  },
  /* Styles applied to the root element if `variant="middle"`. */
  middle: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});

function Divider(props) {
  const {
    absolute,
    classes,
    className,
    component: Component,
    inset,
    light,
    variant,
    ...other
  } = props;

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.inset]: inset || variant === 'inset',
          [classes.middle]: variant === 'middle',
          [classes.absolute]: absolute,
          [classes.light]: light,
        },
        className,
      )}
      {...other}
    />
  );
}

Divider.propTypes = {
  /**
   * Absolutely position the element.
   */
  absolute: PropTypes.bool,
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
  component: componentPropType,
  /**
   * If `true`, the divider will be indented.
   * __WARNING__: `inset` is deprecated.
   * Instead use `variant="inset"`.
   */
  inset: chainPropTypes(PropTypes.bool, props => {
    /* istanbul ignore if */
    if (props.inset) {
      return new Error(
        'Material-UI: you are using the deprecated `inset` property ' +
          'that will be removed in the next major release. The property `variant="inset"` ' +
          'is equivalent and should be used instead.',
      );
    }

    return null;
  }),
  /**
   * If `true`, the divider will have a lighter color.
   */
  light: PropTypes.bool,
  /**
   *  The variant to use.
   */
  variant: PropTypes.oneOf(['fullWidth', 'inset', 'middle']),
};

Divider.defaultProps = {
  absolute: false,
  component: 'hr',
  light: false,
  variant: 'fullWidth',
};

export default withStyles(styles, { name: 'MuiDivider' })(Divider);
