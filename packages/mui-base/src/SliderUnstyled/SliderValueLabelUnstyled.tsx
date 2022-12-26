import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import sliderUnstyledClasses from './sliderUnstyledClasses';
import { SliderValueLabelUnstyledProps } from './SliderValueLabelUnstyled.types';

const useValueLabelClasses = (props: SliderValueLabelUnstyledProps) => {
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
export default function SliderValueLabelUnstyled(props: SliderValueLabelUnstyledProps) {
  const { children, className, value } = props;
  const classes = useValueLabelClasses(props);

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
  // eslint-disable-next-line react/no-unused-prop-types
  open: PropTypes.bool,
  value: PropTypes.node,
};
