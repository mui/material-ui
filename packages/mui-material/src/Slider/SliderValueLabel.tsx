import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import { sliderUnstyledClasses } from '@mui/base/SliderUnstyled';
import { SliderValueLabelProps } from './SliderValueLabel.types';

export const sliderClasses = {
  ...sliderUnstyledClasses,
  ...generateUtilityClasses('MuiSlider', [
    'colorPrimary',
    'colorSecondary',
    'thumbColorPrimary',
    'thumbColorSecondary',
    'sizeSmall',
    'thumbSizeSmall',
    'valueLabel',
    'valueLabelOpen',
    'valueLabelCircle',
    'valueLabelLabel',
  ]),
};

const useValueLabelClasses = (open: SliderValueLabelProps['open']) => {
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
export default function SliderValueLabel(props: SliderValueLabelProps) {
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

SliderValueLabel.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  value: PropTypes.node,
};
