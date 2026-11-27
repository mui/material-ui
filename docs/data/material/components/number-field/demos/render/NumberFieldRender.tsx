import NumberField from '@mui/material/NumberField';

export default function NumberFieldRender() {
  return (
    // @focus-start @padding 2
    <NumberField
      label="Tickets"
      defaultValue={2}
      min={1}
      max={10}
      helperText="Tickets selected:"
      render={<section aria-label="Ticket selection" />}
      slotProps={{
        formHelperText: {
          render: (props, state) => (
            <p {...props}>
              {props.children} {state.value ?? 0}
            </p>
          ),
        },
      }}
    />
    // @focus-end
  );
}
