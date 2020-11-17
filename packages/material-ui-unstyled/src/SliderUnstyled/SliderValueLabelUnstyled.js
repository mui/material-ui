import * as React from 'react';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@material-ui/utils';

const getUtilityClass = (name) => {
  return `MuiSlider-valueLabel${capitalize(name)}`;
};

const useValueLabelClasses = (props) => {
  const { open } = props;

  const utilityClasses = {
    offset: clsx('MuiSlider-valueLabel', getUtilityClass('offset'), {
      [getUtilityClass('open')]: open,
    }),
    circle: getUtilityClass('circle'),
    label: getUtilityClass('label'),
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
