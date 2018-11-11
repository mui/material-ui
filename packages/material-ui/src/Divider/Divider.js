import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
import Typography from '../Typography/Typography';
import chainPropTypes from '../utils/chainPropTypes';

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
  /* Styles applied to the root element if `variant={'inset'}`. */
  inset: {
    marginLeft: 72,
    '& + $subheader': {
      marginLeft: 72,
      marginTop: theme.spacing.unit / 2,
    },
  },
  /* Styles applied to the root element if `light={true}`. */
  light: {
    backgroundColor: fade(theme.palette.divider, 0.08),
  },
  /* Styles applied to the root element if `variant={'middle'}`. */
  middle: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  /* Styles applied to the Typography element */
  subheader: {
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit / 2 + 1,
  },
});

function Divider(props) {
  const {
    absolute,
    classes,
    className: classNameProp,
    component: Component,
    light,
    subheader,
    variant,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    {
      [classes.absolute]: absolute,
      [classes.inset]: variant === 'inset',
      [classes.light]: light,
      [classes.middle]: variant === 'middle',
    },
    classNameProp,
  );

  let subheaderComponent;

  if (subheader && variant !== 'middle') {
    subheaderComponent = (
      <Typography color="textSecondary" className={classes.subheader}>
        {subheader}
      </Typography>
    );
  }

  return (
    <React.Fragment>
      <Component className={className} {...other} />
      {subheaderComponent}
    </React.Fragment>
  );
}

Divider.propTypes = {
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
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  /**
   * If `true`, the divider will have a lighter color.
   */
  light: PropTypes.bool,
  /**
   * Divider subheader text. This will not work with `variant={'middle'}`
   */
  subheader: chainPropTypes(PropTypes.string, props => {
    /* istanbul ignore if */
    if (props.subheader && props.variant === 'middle') {
      return new Error(
        'Material-UI: you have provided the `subheader` property ' +
          'with the variant `middle`. This will have no effect.',
      );
    }

    return null;
  }),
  /**
   *  The variant to use.
   */
  variant: PropTypes.oneOf(['fullBleed', 'inset', 'middle']),
};

Divider.defaultProps = {
  absolute: false,
  component: 'hr',
  light: false,
  variant: 'fullBleed',
};

export default withStyles(styles, { name: 'MuiDivider' })(Divider);
