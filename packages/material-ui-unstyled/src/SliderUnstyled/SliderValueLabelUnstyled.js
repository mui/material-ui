import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import sliderUnstyledClasses from './sliderUnstyledClasses';

const useValueLabelClasses = (props) => {
  const { open } = props;

  const utilityClasses = {
    offset: clsx({
      [sliderUnstyledClasses.valueLabelOpen]: open,
    }),
    circle: sliderUnstyledClasses.valueLabelCircle,
    label: sliderUnstyledClasses.valueLabelLabel,
  };

  return utilityClasses;
};

/**
 * @ignore - internal component.
 */
function SliderValueLabelUnstyled(props) {
  const { children, className, value, theme } = props;
  const classes = useValueLabelClasses(props);

  return React.cloneElement(
    children,
    {
      className: clsx(children.props.className),
    },
    <React.Fragment>
      {children.props.children}
      <span className={clsx(classes.offset, className)} theme={theme} aria-hidden>
        <span className={classes.circle}>
          <span className={classes.label}>{value}</span>
        </span>
      </span>
    </React.Fragment>,
  );
}

SliderValueLabelUnstyled.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  theme: PropTypes.any,
  value: PropTypes.node,
};

export default SliderValueLabelUnstyled;
