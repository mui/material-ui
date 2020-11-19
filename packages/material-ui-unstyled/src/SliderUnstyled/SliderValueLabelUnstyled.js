import * as React from 'react';
import clsx from 'clsx';
import sliderClasses from './sliderClasses';

const useValueLabelClasses = (props) => {
  const { open } = props;

  const utilityClasses = {
    offset: clsx(sliderClasses.valueLabel, sliderClasses.valueLabelOffset, {
      [sliderClasses.valueLabelOpen]: open,
    }),
    circle: sliderClasses.valueLabelCircle,
    label: sliderClasses.valueLabelLabel,
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
    <Root className={clsx(classes.offset, className)} theme={theme}>
      <span className={classes.circle}>
        <span className={classes.label}>{value}</span>
      </span>
    </Root>,
  );
}

export default SliderValueLabelUnstyled;
