import OTPField from '@mui/material/OTPField';

export default function OTPFieldRender() {
  return (
    // @focus-start @padding 2
    <OTPField
      label="Pairing code"
      length={4}
      helperText="Enter the four digits shown on your device."
      render={<section aria-label="Device pairing" />}
      slotProps={{
        formHelperText: {
          render: (props, state) => (
            <p {...props} role="status">
              {state.complete ? 'All four digits entered.' : props.children}
            </p>
          ),
        },
      }}
    />
    // @focus-end
  );
}
