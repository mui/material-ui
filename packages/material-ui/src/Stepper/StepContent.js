import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import classNames from 'classnames';
import Collapse from '../transitions/Collapse';
import withStyles from '../styles/withStyles';
import { getComponents } from '../utils/helpers';

export const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    marginLeft: 12, // half icon
    paddingLeft: theme.spacing.unit + 12, // margin + half icon
    paddingRight: theme.spacing.unit,
    borderLeft: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
    }`,
  },
  last: {
    borderLeft: 'none',
  },
  transition: {},
});

const defaultComponents = {
  Transition: Collapse,
};

function StepContent(props) {
  const {
    active,
    alternativeLabel,
    children,
    classes,
    className,
    completed,
    components: componentsProp,
    last,
    optional,
    orientation,
    transitionDuration,
    TransitionProps,
    ...other
  } = props;

  warning(
    orientation === 'vertical',
    'Material-UI: <StepContent /> is only designed for use with the vertical stepper.',
  );

  const components = getComponents(defaultComponents, props);

  return (
    <div className={classNames(classes.root, { [classes.last]: last }, className)} {...other}>
      <components.Transition
        in={active}
        className={classes.transition}
        timeout={transitionDuration}
        unmountOnExit
        {...TransitionProps}
      >
        {children}
      </components.Transition>
    </div>
  );
}

StepContent.propTypes = {
  /**
   * @ignore
   * Expands the content.
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Step content.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  completed: PropTypes.bool,
  /**
   * The components injection property.
   */
  components: PropTypes.shape({
    Transition: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the optional property.
   */
  optional: PropTypes.bool,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a property to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    PropTypes.oneOf(['auto']),
  ]),
  /**
   * Properties applied to the `Transition` element.
   */
  TransitionProps: PropTypes.object,
};

StepContent.defaultProps = {
  components: defaultComponents,
  transitionDuration: 'auto',
};

export default withStyles(styles, { name: 'MuiStepContent' })(StepContent);
