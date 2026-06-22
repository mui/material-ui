'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import NotchedOutline from './NotchedOutline';
import { useFormControlState } from '../FormControl/useFormControl';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import outlinedInputClasses, { getOutlinedInputUtilityClass } from './outlinedInputClasses';
import inputLabelClasses from '../InputLabel/inputLabelClasses';
import { getOutlinedInputVars } from './outlinedInputVars';
import InputBase, {
  rootOverridesResolver as inputBaseRootOverridesResolver,
  inputOverridesResolver as inputBaseInputOverridesResolver,
  InputBaseRoot,
  InputBaseInput,
} from '../InputBase/InputBase';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    notchedOutline: ['notchedOutline'],
    input: ['input'],
  };

  const composedClasses = composeClasses(slots, getOutlinedInputUtilityClass, classes);

  return {
    ...classes, // forward classes to the InputBase
    ...composedClasses,
  };
};

const OutlinedInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiOutlinedInput',
  slot: 'Root',
  overridesResolver: inputBaseRootOverridesResolver,
})(
  memoTheme(({ theme }) => {
    const borderColor =
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    // Material UI layer: public sized tokens honor cssVarPrefix (default "mui").
    // Agnostic seams (`--comp-padBlock`, `--comp-padInline`, `--comp-labelY`) and
    // internal `--_*` defaults are literal and unprefixed. See ADR-0003.
    const v = getOutlinedInputVars(theme);
    return {
      // Density adapter (docs/adr/0001): each padding literal becomes
      // `var(--seam, var(--_<key>))`, tokenized in place. Both axes are sized —
      // each seam routes the per-size public token (block + inline). The internal
      // defaults live in the variants that consume them (below), like Button's
      // `--_pad`. Inline default is 14px for both sizes; the per-size inline
      // tokens let a design system tune it per size anyway.
      // The outlined label centers on the input's block padding. It's a preceding
      // sibling, so reach it via :has and derive its resting-Y seam straight from
      // the public sized token. Medium resolves to 16px (16.5 - 0.5 rounding).
      [`.${inputLabelClasses.root}:has(~ &)`]: {
        '--comp-labelY': `calc(var(${v.mediumPadBlock}, 16.5px) - 0.5px)`,
      },
      position: 'relative',
      borderRadius: (theme.vars || theme).shape.borderRadius,
      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: (theme.vars || theme).palette.text.primary,
      },
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.vars
            ? theme.alpha(theme.vars.palette.common.onBackground, 0.23)
            : borderColor,
        },
      },
      [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
        borderWidth: 2,
      },
      variants: [
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color },
            style: {
              [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: (theme.vars || theme).palette[color].main,
              },
            },
          })),
        {
          props: {}, // to override the above style
          style: {
            [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: (theme.vars || theme).palette.error.main,
            },
            [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: (theme.vars || theme).palette.action.disabled,
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            // Small label resolves to 9px (8.5 + 0.5).
            [`.${inputLabelClasses.root}:has(~ &)`]: {
              '--comp-labelY': `calc(var(${v.smallPadBlock}, 8.5px) + 0.5px)`,
            },
          },
        },
        {
          props: ({ ownerState }) => ownerState.startAdornment,
          style: {
            '--_padInline': '14px',
            '--comp-padInline': `var(${v.mediumPadInline}, var(--_padInline))`,
            paddingLeft: 'var(--comp-padInline, var(--_padInline))',
          },
        },
        {
          props: ({ ownerState, size }) => ownerState.startAdornment && size === 'small',
          style: {
            '--comp-padInline': `var(${v.smallPadInline}, var(--_padInline))`,
          },
        },
        {
          props: ({ ownerState }) => ownerState.endAdornment,
          style: {
            '--_padInline': '14px',
            '--comp-padInline': `var(${v.mediumPadInline}, var(--_padInline))`,
            paddingRight: 'var(--comp-padInline, var(--_padInline))',
          },
        },
        {
          props: ({ ownerState, size }) => ownerState.endAdornment && size === 'small',
          style: {
            '--comp-padInline': `var(${v.smallPadInline}, var(--_padInline))`,
          },
        },
        {
          props: ({ ownerState }) => ownerState.multiline,
          style: {
            '--_padBlock': '16.5px',
            '--_padInline': '14px',
            '--comp-padBlock': `var(${v.mediumPadBlock}, var(--_padBlock))`,
            '--comp-padInline': `var(${v.mediumPadInline}, var(--_padInline))`,
            padding:
              'var(--comp-padBlock, var(--_padBlock)) var(--comp-padInline, var(--_padInline))',
          },
        },
        {
          props: ({ ownerState, size }) => ownerState.multiline && size === 'small',
          style: {
            '--_padBlock': '8.5px',
            '--comp-padBlock': `var(${v.smallPadBlock}, var(--_padBlock))`,
            '--comp-padInline': `var(${v.smallPadInline}, var(--_padInline))`,
          },
        },
      ],
    };
  }),
);

const NotchedOutlineRoot = styled(NotchedOutline, {
  name: 'MuiOutlinedInput',
  slot: 'NotchedOutline',
})(
  memoTheme(({ theme }) => {
    const borderColor =
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    return {
      borderColor: theme.vars
        ? theme.alpha(theme.vars.palette.common.onBackground, 0.23)
        : borderColor,
    };
  }),
);

const OutlinedInputInput = styled(InputBaseInput, {
  name: 'MuiOutlinedInput',
  slot: 'Input',
  overridesResolver: inputBaseInputOverridesResolver,
})(
  memoTheme(({ theme }) => {
    const v = getOutlinedInputVars(theme);
    return {
      // Both axes route the per-size public token over the internal default into
      // the literal agnostic seam (`var(--comp-<key>, var(--_<key>))`), specialized
      // by the size variant below. Defaults are the Material px (inline 14px).
      '--_padBlock': '16.5px',
      '--_padInline': '14px',
      '--comp-padBlock': `var(${v.mediumPadBlock}, var(--_padBlock))`,
      '--comp-padInline': `var(${v.mediumPadInline}, var(--_padInline))`,
      padding: 'var(--comp-padBlock, var(--_padBlock)) var(--comp-padInline, var(--_padInline))',
      '&:-webkit-autofill': {
        ...(!theme.vars && {
          WebkitBoxShadow: theme.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
          WebkitTextFillColor: theme.palette.mode === 'light' ? null : '#fff',
          caretColor: theme.palette.mode === 'light' ? null : '#fff',
        }),
        borderRadius: 'inherit',
        ...(theme.vars &&
          theme.applyStyles('dark', {
            WebkitBoxShadow: '0 0 0 100px #266798 inset',
            WebkitTextFillColor: '#fff',
            caretColor: '#fff',
          })),
      },
      variants: [
        {
          props: { size: 'small' },
          style: {
            '--_padBlock': '8.5px',
            '--comp-padBlock': `var(${v.smallPadBlock}, var(--_padBlock))`,
            '--comp-padInline': `var(${v.smallPadInline}, var(--_padInline))`,
          },
        },
        {
          props: ({ ownerState }) => ownerState.multiline,
          style: {
            padding: 0,
          },
        },
        {
          props: ({ ownerState }) => ownerState.startAdornment,
          style: {
            paddingLeft: 0,
          },
        },
        {
          props: ({ ownerState }) => ownerState.endAdornment,
          style: {
            paddingRight: 0,
          },
        },
      ],
    };
  }),
);

const OutlinedInput = React.forwardRef(function OutlinedInput(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiOutlinedInput' });
  const {
    fullWidth = false,
    inputComponent = 'input',
    label,
    multiline = false,
    notched,
    slots = {},
    slotProps = {},
    type = 'text',
    ...other
  } = props;

  const classes = useUtilityClasses(props);

  const [fcs, muiFormControl] = useFormControlState({
    props,
    states: ['color', 'disabled', 'error', 'focused', 'hiddenLabel', 'size', 'required'],
  });

  const ownerState = {
    ...props,
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    type,
  };

  const RootSlot = slots.root ?? OutlinedInputRoot;
  const InputSlot = slots.input ?? OutlinedInputInput;

  const [NotchedSlot, notchedProps] = useSlot('notchedOutline', {
    elementType: NotchedOutlineRoot,
    className: classes.notchedOutline,
    shouldForwardComponentProp: true,
    ownerState,
    externalForwardedProps: {
      slots,
      slotProps,
    },
    additionalProps: {
      label:
        label != null && label !== '' && fcs.required ? (
          <React.Fragment>
            {label}
            &thinsp;{'*'}
          </React.Fragment>
        ) : (
          label
        ),
    },
  });

  return (
    <InputBase
      slots={{ root: RootSlot, input: InputSlot }}
      slotProps={slotProps}
      renderSuffix={(state) => (
        <NotchedSlot
          {...notchedProps}
          notched={
            typeof notched !== 'undefined'
              ? notched
              : Boolean(state.startAdornment || state.filled || state.focused)
          }
        />
      )}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      multiline={multiline}
      ref={ref}
      type={type}
      {...other}
      classes={{
        ...classes,
        notchedOutline: null,
      }}
    />
  );
});

OutlinedInput.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary']),
    PropTypes.string,
  ]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: PropTypes.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`.
   */
  label: PropTypes.node,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(['dense', 'none']),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: PropTypes.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.object,
    notchedOutline: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.object,
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    notchedOutline: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
};

OutlinedInput.muiName = 'Input';

export default OutlinedInput;
