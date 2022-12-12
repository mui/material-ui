import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import sliderUnstyledClasses from './sliderUnstyledClasses';
import { SliderValueLabelUnstyledProps } from './SliderValueLabelUnstyled.types';

const useValueLabelClasses = (open: boolean) => {
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
export default function SliderValueLabelUnstyled(props: SliderValueLabelUnstyledProps) {
  const { children, className, value, open } = props;
  const classes = useValueLabelClasses(open);

  if (!children) {
    return null;
  }

  return React.cloneElement(
    children,
    {
      className: clsx(children.props.className),
    },
    <React.Fragment>
      {children.props.children}
      <span className={clsx(classes.offset, className)} aria-hidden>
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
  open: PropTypes.bool,
  value: PropTypes.node,
};
