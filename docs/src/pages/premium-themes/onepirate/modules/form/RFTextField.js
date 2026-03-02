import TextField from '../components/TextField';
import PropTypes from 'prop-types';

function RFTextField(props) {
  const {
    autoComplete,
    input,
    slotProps,
    meta: { touched, error, submitError },
    ...other
  } = props;

  return (
    <TextField
      error={Boolean(!!touched && (error || submitError))}
      {...input}
      {...other}
      slotProps={{
        ...slotProps,
        htmlInput: {
          autoComplete,
          ...slotProps?.htmlInput,
        },
      }}
      helperText={touched ? error || submitError : ''}
      variant="standard"
    />
  );
}

RFTextField.propTypes = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  input: PropTypes.shape({
    checked: PropTypes.bool,
    multiple: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    active: PropTypes.bool,
    data: PropTypes.object,
    dirty: PropTypes.bool,
    dirtySinceLastSubmit: PropTypes.bool,
    error: PropTypes.any,
    initial: PropTypes.any,
    invalid: PropTypes.bool,
    length: PropTypes.number,
    modified: PropTypes.bool,
    modifiedSinceLastSubmit: PropTypes.bool,
    pristine: PropTypes.bool,
    submitError: PropTypes.any,
    submitFailed: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    submitting: PropTypes.bool,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    validating: PropTypes.bool,
    visited: PropTypes.bool,
  }).isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    formHelperText: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    htmlInput: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.shape({
        component: PropTypes.elementType,
        key: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.shape({
            '__@toStringTag@1136': PropTypes.oneOf(['BigInt']).isRequired,
            toLocaleString: PropTypes.func.isRequired,
            toString: PropTypes.func.isRequired,
            valueOf: PropTypes.func.isRequired,
          }),
          PropTypes.shape({
            '__@toPrimitive@2449': PropTypes.func.isRequired,
            '__@toStringTag@1136': PropTypes.string.isRequired,
            description: PropTypes.string,
            toString: PropTypes.func.isRequired,
            valueOf: PropTypes.func.isRequired,
          }),
          PropTypes.string,
        ]),
        sx: PropTypes.oneOfType([
          PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
          ),
          PropTypes.func,
          PropTypes.object,
        ]),
      }),
    ]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    inputLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    select: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};

export default RFTextField;
