import * as React from 'react';
import PropTypes from 'prop-types';
import { PickersDay as XPickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The PickersDay component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        'The component will no longer be exported from `@mui/lab` in the first release of July 2022.',
        '',
        "You should use `import { PickersDay } from '@mui/x-date-pickers'`",
        "or `import { PickersDay } from '@mui/x-date-pickers/PickersDay'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type PickersDayComponent = (<TDate>(
  props: PickersDayProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const PickersDay = React.forwardRef(function DeprecatedPickersDay<TDate>(
  props: PickersDayProps<TDate>,
  ref: React.Ref<any>,
) {
  warn();

  return <XPickersDay ref={ref} {...props} />;
}) as PickersDayComponent;

PickersDay.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
} as any;

export default PickersDay;
