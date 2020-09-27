import * as React from 'react';
import { capitalize } from '@material-ui/core/utils';
import clsx from 'clsx';

const getUtilityClass = (name) => {
  return `MuiSlider-valueLabel${capitalize(name)}`;
};

const useValueLabelClasses = (props) => {
  const { open, valueLabelDisplay } = props;

  const utilityClasses = {
    offset: clsx('MuiSlider-valueLabel', getUtilityClass('offset'), {
      [getUtilityClass('open')]: open || valueLabelDisplay === 'on',
    }),
    container: getUtilityClass('container'),
    arrow: getUtilityClass('arrow'),
    label: getUtilityClass('label'),
  };

  return utilityClasses;
};

/**
 * @ignore - internal component.
 */
function ValueLabel(props) {
  const { children, className, value, valueLabelDisplay, components = {}, theme } = props;
  const classes = useValueLabelClasses(props);

  if (valueLabelDisplay === 'off') {
    return children;
  }

  const Root = components.Root || 'span';

  return React.cloneElement(
    children,
    {
      className: clsx(children.props.className),
    },
    <Root className={clsx(classes.offset, className)} theme={theme}>
      <span className={classes.container}>
        <span className={classes.label}>{value}</span>
        <span className={classes.arrow} />
      </span>
    </Root>,
  );
}

export default ValueLabel;
