import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import { sliderUnstyledClasses } from '@mui/base/SliderUnstyled';

export const sliderClasses = {
  ...sliderUnstyledClasses,
  ...generateUtilityClasses('MuiSlider', [
    'colorPrimary',
    'colorSecondary',
    'thumbColorPrimary',
    'thumbColorSecondary',
    'sizeSmall',
    'sizeMedium',
    'thumbSizeSmall',
    'thumbSizeMedium',
    'valueLabel',
    'valueLabelOpen',
    'valueLabelCircle',
    'valueLabelLabel',
  ]),
};

const useValueLabelClasses = (props) => {
  const { open } = props;

  const utilityClasses = {
    offset: clsx({
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
export default function SliderValueLabelUnstyled(props) {
  const { children, className, value } = props;
  const classes = useValueLabelClasses(props);

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
  theme: PropTypes.any,
  value: PropTypes.node,
};
