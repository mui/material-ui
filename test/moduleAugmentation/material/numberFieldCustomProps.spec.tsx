import * as React from 'react';
import NumberField, { numberFieldClasses } from '@mui/material/NumberField';
import { createTheme } from '@mui/material/styles';
import type { ComponentsOverrides } from '@mui/material/styles';

// Keep extensions isolated from the ordinary specs so invalid-prop checks stay strict.
declare module '@mui/material/NumberField' {
  interface NumberFieldPropsColorOverrides {
    brand: true;
  }
  interface NumberFieldPropsSizeOverrides {
    compact: true;
  }
  interface NumberFieldRootSlotPropsOverrides {
    customRootProp?: string;
  }
  interface NumberFieldControlsSlotPropsOverrides {
    customControlsProp?: 'controls';
  }
  interface NumberFieldInputSlotPropsOverrides {
    customInputProp?: string;
  }
  interface NumberFieldHtmlInputSlotPropsOverrides {
    customNativeProp?: 'native';
  }
  interface NumberFieldInputLabelSlotPropsOverrides {
    customLabelProp?: string;
  }
  interface NumberFieldFormHelperTextSlotPropsOverrides {
    customHelperProp?: string;
  }
  interface NumberFieldIncrementButtonSlotPropsOverrides {
    stepLabel?: 'increase';
  }
  interface NumberFieldDecrementButtonSlotPropsOverrides {
    stepLabel?: 'decrease';
  }
  interface NumberFieldScrubAreaSlotPropsOverrides {
    customScrubProp?: 'area';
  }
  interface NumberFieldScrubAreaCursorSlotPropsOverrides {
    customCursorProp?: 'cursor';
  }
}

// NumberField inherits FormControl props, so their size/color extensions must agree.
declare module '@mui/material/FormControl' {
  interface FormControlPropsColorOverrides {
    brand: true;
  }
  interface FormControlPropsSizeOverrides {
    compact: true;
  }
}

<NumberField
  color="brand"
  size="compact"
  slotProps={{
    controls: ({ position }) => ({
      customControlsProp: 'controls',
      title: position,
      render: <section />,
    }),
    root: { customRootProp: 'root' },
    input: { customInputProp: 'input', render: <section /> },
    htmlInput: { customNativeProp: 'native', render: <input /> },
    inputLabel: {
      customLabelProp: 'label',
      shrink: true,
      render: <label htmlFor="amount">Amount</label>,
    },
    formHelperText: { customHelperProp: 'helper', render: <div /> },
    incrementButton: {
      stepLabel: 'increase',
      render: <button type="button" aria-label="Increase" />,
    },
    decrementButton: (ownerState) => ({
      stepLabel: 'decrease',
      disabled: ownerState.disabled,
      render: <button type="button" aria-label="Decrease" />,
    }),
    scrubArea: { customScrubProp: 'area', render: <div />, sx: { padding: 1 } },
    scrubAreaCursor: { customCursorProp: 'cursor', render: <div />, sx: { color: 'red' } },
  }}
/>;

// @ts-expect-error Slot extensions retain their declared value types.
<NumberField slotProps={{ input: { customInputProp: 1 } }} />;
// @ts-expect-error Controls slot extensions retain their declared value types.
<NumberField slotProps={{ controls: { customControlsProp: 'other' } }} />;
// @ts-expect-error Native slot extensions retain their declared value types.
<NumberField slotProps={{ htmlInput: { customNativeProp: 'other' } }} />;
// @ts-expect-error Increment and decrement extensions remain independent.
<NumberField slotProps={{ incrementButton: { stepLabel: 'decrease' } }} />;

// The same public extensions must be available in component defaults and variants.
createTheme({
  components: {
    MuiNumberField: {
      defaultProps: {
        color: 'brand',
        size: 'compact',
        controlsPosition: 'split',
        slotProps: { incrementButton: { stepLabel: 'increase' } },
      },
      styleOverrides: {
        root: {
          minWidth: 120,
          [`& .${numberFieldClasses.htmlInput}`]: { paddingTop: 3 },
          [`&.${numberFieldClasses.scrubbing}`]: { opacity: 0.8 },
        },
        input: { gap: 2 },
        inputLabel: { paddingTop: 7 },
        formHelperText: { marginLeft: 9 },
        controls: { gap: 2 },
        scrubArea: { padding: 2 },
        incrementButton: { padding: 1 },
        decrementButton: { padding: 1 },
      },
      variants: [{ props: { color: 'brand', size: 'compact' }, style: { minWidth: 160 } }],
    },
  },
});

const numberFieldOverrides: NonNullable<ComponentsOverrides['MuiNumberField']> = {};
// @ts-expect-error Style the native input through a descendant selector on root.
numberFieldOverrides.htmlInput = { paddingTop: 3 };
// @ts-expect-error Style the scrubbing state through a class selector on root.
numberFieldOverrides.scrubbing = { opacity: 0.8 };
