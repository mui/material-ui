import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import sliderUnstyledClasses from './sliderUnstyledClasses';

const useValueLabelClasses = (props) => {
  const { open } = props;

  const utilityClasses = {
    offset: clsx(sliderUnstyledClasses.valueLabel, sliderUnstyledClasses.valueLabelOffset, {
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
  const { children, className, value, components = {}, theme } = props;
  const classes = useValueLabelClasses(props);

  const Root = components.Root || 'span';

  return React.cloneElement(
    children,
    {
      className: clsx(children.props.className),
    },
    <React.Fragment>
      {children.props.children}
      <Root className={clsx(classes.offset, className)} theme={theme} aria-hidden>
        <span className={classes.circle}>
          <span className={classes.label}>{value}</span>
        </span>
      </Root>
    </React.Fragment>,
  );
}

SliderValueLabelUnstyled.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  components: PropTypes.shape({ Root: PropTypes.elementType }),
  theme: PropTypes.any,
  value: PropTypes.node,
};

export default SliderValueLabelUnstyled;
