import * as React from 'react';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { mergeProps } from '@base-ui/react/merge-props';

import AddIcon from '../internal/svg-icons/Add';
import RemoveIcon from '../internal/svg-icons/Remove';
import KeyboardArrowDownIcon from '../internal/svg-icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '../internal/svg-icons/KeyboardArrowUp';

import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import type { NumberFieldClasses } from './numberFieldClasses';
import useSlot from '../utils/useSlot';
import OutlinedInput from '../OutlinedInput';
import type { OutlinedInputProps } from '../OutlinedInput';
import FilledInput from '../FilledInput';
import Input from '../Input';
import InputAdornment from '../InputAdornment';
import { useDefaultProps } from '../DefaultPropsProvider';
import inputBaseClasses from '../InputBase/inputBaseClasses';
import NumberFieldScrubAreaSlot from './NumberFieldScrubAreaSlot';
import { getControlElements, isRenderableNode } from './utils';
import filledSplitEndAdornmentOffset from './utils/filledSplitEndAdornmentOffset';
import type { ResolvedInputSlotProps } from './utils/resolveInputProps';
import IconButton from '../IconButton';
import type { IconButtonProps } from '../IconButton';
import NumberFieldButtonSlot from './NumberFieldButtonSlot';
import RenderElement from './RenderElement';
import NumberFieldInputRootSlot from './NumberFieldInputRootSlot';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

type NumberFieldSlotProps = NonNullable<NumberFieldProps['slotProps']>;

type NumberFieldButtonSlotProps = IconButtonProps &
  Pick<BaseNumberField.Decrement.Props | BaseNumberField.Increment.Props, 'render'>;

interface NumberFieldInputProps {
  baseProps: React.ComponentPropsWithRef<'input'>;
  baseState: BaseNumberField.Input.State;
  classes: Omit<NumberFieldClasses, 'scrubbing'>;
  helperTextId: string | undefined;
  materialProps: NumberFieldOwnerState;
  externalForwardedProps: {
    slots: NonNullable<NumberFieldProps['slots']>;
    slotProps: Omit<NumberFieldSlotProps, 'input'> & {
      input?: ResolvedInputSlotProps | undefined;
    };
  };
}

const NumberFieldStartAdornment = styled(InputAdornment, {
  name: 'MuiNumberField',
  slot: 'startAdornment',
})<{ ownerState: NumberFieldOwnerState }>({});

const NumberFieldEndAdornment = styled(InputAdornment, {
  name: 'MuiNumberField',
  slot: 'endAdornment',
})<{ ownerState: NumberFieldOwnerState }>({ variants: [filledSplitEndAdornmentOffset] });

const inputStyles = {
  variants: [
    {
      props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
        ownerState.controlsPosition === 'split',
      style: {
        [`& > .${inputBaseClasses.input}`]: { textAlign: 'center' },
      },
    },
  ],
};

const variantComponent = {
  standard: styled(Input, { name: 'MuiNumberField', slot: 'input' })(inputStyles),
  filled: styled(FilledInput, { name: 'MuiNumberField', slot: 'input' })(inputStyles),
  outlined: styled(OutlinedInput, { name: 'MuiNumberField', slot: 'input' })(inputStyles),
};

const variantName = {
  standard: 'MuiInput',
  filled: 'MuiFilledInput',
  outlined: 'MuiOutlinedInput',
};

const buttonStyles = memoTheme(({ theme }) => ({
  '--NumberField-buttonPadding': '8px',
  paddingInline: 'var(--NumberField-buttonPadding)',
  borderRadius: (theme.vars || theme).shape.borderRadius,
  variants: [
    { props: { size: 'small' }, style: { '--NumberField-buttonPadding': '5px' } },
    { props: { size: 'large' }, style: { '--NumberField-buttonPadding': '12px' } },
    {
      props: { size: 'medium' },
      style: {
        '--NumberField-buttonPadding': '6px',
        padding: 'var(--NumberField-buttonPadding)',
        fontSize: theme.typography.pxToRem(20),
      },
    },
    {
      props: { variant: 'standard' },
      // The standard input has no vertical padding to accommodate taller controls.
      style: { '--NumberField-buttonPadding': '4px', padding: 'var(--NumberField-buttonPadding)' },
    },
    {
      props: { controlsPosition: 'stacked' },
      style: {
        '--NumberField-buttonPadding': '4px',
        flex: '1 1 0',
        padding: '0 var(--NumberField-buttonPadding)',
        fontSize: theme.typography.pxToRem(28),
      },
    },
    {
      props: { controlsPosition: 'stacked', size: 'small' },
      style: { fontSize: theme.typography.pxToRem(20) },
    },
    {
      props: { controlsPosition: 'stacked', variant: 'standard' },
      // Fit both chevrons within the standard input's existing height.
      style: { '--NumberField-buttonPadding': '6px', fontSize: theme.typography.pxToRem(16) },
    },
    {
      props: { controlsPosition: 'stacked', variant: 'standard', size: 'small' },
      style: { fontSize: theme.typography.pxToRem(14) },
    },
  ],
}));
const NumberFieldIncrementButton = styled(IconButton, {
  name: 'MuiNumberField',
  slot: 'incrementButton',
})(buttonStyles, {
  // Keep the icon aligned with the plain input's text inset, without double padding.
  marginInlineEnd: 'calc(-1 * var(--NumberField-buttonPadding))',
});
const NumberFieldDecrementButton = styled(IconButton, {
  name: 'MuiNumberField',
  slot: 'decrementButton',
})(buttonStyles, {
  variants: [
    {
      props: { controlsPosition: 'split' },
      style: { marginInlineStart: 'calc(-1 * var(--NumberField-buttonPadding))' },
    },
    {
      props: { controlsPosition: 'stacked' },
      style: { marginInlineEnd: 'calc(-1 * var(--NumberField-buttonPadding))' },
    },
  ],
});

/**
 * @ignore - internal component.
 */
function NumberFieldInputSlot(props: NumberFieldInputProps) {
  const { baseProps, baseState, classes, helperTextId, materialProps, externalForwardedProps } =
    props;
  const { inputValue } = baseState;
  const { autoFocus, variant, label, id, fullWidth, inputRef, placeholder } = materialProps;
  const ownerState = materialProps;

  const InputComponent = variantComponent[variant];
  const inputLabelSlotProps = externalForwardedProps.slotProps.inputLabel;
  const inputAdditionalProps: Pick<OutlinedInputProps, 'label' | 'notched'> = {};

  if (variant === 'outlined') {
    if (
      inputLabelSlotProps &&
      'shrink' in inputLabelSlotProps &&
      typeof inputLabelSlotProps.shrink !== 'undefined'
    ) {
      inputAdditionalProps.notched = inputLabelSlotProps.shrink;
    }
    inputAdditionalProps.label = label;
  }

  const [InputSlot, { render: inputRender, ...materialInputProps }] = useSlot('input', {
    elementType: InputComponent,
    externalForwardedProps,
    additionalProps: inputAdditionalProps,
    ownerState,
    className: classes.input,
  });

  const customInput = externalForwardedProps.slots.input;
  const groupRender = customInput ? undefined : inputRender;
  // A local render clears the variant's themed root. An explicit root slot still wins.
  const inputSlots = groupRender
    ? { root: undefined, ...materialInputProps.slots }
    : materialInputProps.slots;
  const { slots: materialSlots } = useDefaultProps({
    props: { slots: inputSlots },
    // Read defaults for the selected Material input, rather than NumberField.
    // eslint-disable-next-line mui/material-ui-name-matches-component-name
    name: variantName[variant],
  });
  const materialRootComponent = customInput ? undefined : materialSlots?.root;
  const materialSlotProps = customInput
    ? materialInputProps.slotProps
    : {
        ...materialInputProps.slotProps,
        root: {
          ...materialInputProps.slotProps?.root,
          ...(!materialRootComponent && { as: NumberFieldInputRootSlot }),
          numberFieldInputRoot: {
            render: groupRender,
            rootComponent: materialRootComponent,
          },
        },
      };

  const [HtmlInputSlot, { render: htmlInputRender, ...htmlInputProps }] = useSlot('htmlInput', {
    elementType: 'input',
    externalForwardedProps,
    ownerState,
    className: classes.htmlInput,
    getSlotProps: (externalHandlers) => {
      // An unspecified Base UI validation state must not clear Material's aria-invalid.
      const { 'aria-invalid': ariaInvalid, ...restBaseProps } = baseProps;

      // Compose the selected consumer handlers with Base UI; useSlot merges their refs.
      return mergeProps(ariaInvalid === undefined ? restBaseProps : baseProps, externalHandlers);
    },
  });
  const useHtmlInputRender = Boolean(
    htmlInputRender && !externalForwardedProps.slots.htmlInput && !materialInputProps.slots?.input,
  );

  const [DecrementIcon, IncrementIcon] =
    ownerState.controlsPosition === 'stacked'
      ? [KeyboardArrowDownIcon, KeyboardArrowUpIcon]
      : [RemoveIcon, AddIcon];
  const [DecrementButtonSlot, decrementButtonProps] = useSlot('decrementButton', {
    elementType: NumberFieldDecrementButton,
    externalForwardedProps,
    ownerState,
    className: classes.decrementButton,
    additionalProps: {
      children: <DecrementIcon fontSize="inherit" />,
    },
  });
  const [IncrementButtonSlot, incrementButtonProps] = useSlot('incrementButton', {
    elementType: NumberFieldIncrementButton,
    externalForwardedProps,
    ownerState,
    className: classes.incrementButton,
    additionalProps: {
      children: <IncrementIcon fontSize="inherit" />,
    },
  });

  const {
    disabled: decrementButtonDisabled,
    render: decrementButtonRender,
    ...restDecrementButtonProps
  } = decrementButtonProps as NumberFieldButtonSlotProps;
  const {
    disabled: incrementButtonDisabled,
    render: incrementButtonRender,
    ...restIncrementButtonProps
  } = incrementButtonProps as NumberFieldButtonSlotProps;

  const scrubArea = ownerState.scrubAreaPosition !== false && (
    <NumberFieldScrubAreaSlot
      position={ownerState.scrubAreaPosition}
      baseState={baseState}
      ownerState={ownerState}
      classes={classes}
      externalForwardedProps={externalForwardedProps}
    />
  );

  const incrementButton = (
    <BaseNumberField.Increment
      aria-controls={baseProps.id}
      disabled={incrementButtonDisabled}
      nativeButton={restIncrementButtonProps.nativeButton}
      render={(buttonBaseProps, buttonBaseState) => (
        <NumberFieldButtonSlot
          ButtonSlot={IncrementButtonSlot}
          buttonProps={restIncrementButtonProps}
          baseProps={buttonBaseProps}
          baseState={buttonBaseState}
          materialProps={ownerState}
          render={externalForwardedProps.slots.incrementButton ? undefined : incrementButtonRender}
        />
      )}
    />
  );
  const decrementButton = (
    <BaseNumberField.Decrement
      aria-controls={baseProps.id}
      disabled={decrementButtonDisabled}
      nativeButton={restDecrementButtonProps.nativeButton}
      render={(buttonBaseProps, buttonBaseState) => (
        <NumberFieldButtonSlot
          ButtonSlot={DecrementButtonSlot}
          buttonProps={restDecrementButtonProps}
          baseProps={buttonBaseProps}
          baseState={buttonBaseState}
          materialProps={ownerState}
          render={externalForwardedProps.slots.decrementButton ? undefined : decrementButtonRender}
        />
      )}
    />
  );

  const consumerStartAdornment = isRenderableNode(ownerState.startAdornment) && (
    <NumberFieldStartAdornment
      position="start"
      className={classes.startAdornment}
      ownerState={ownerState}
    >
      {ownerState.startAdornment}
    </NumberFieldStartAdornment>
  );
  const consumerEndAdornment = isRenderableNode(ownerState.endAdornment) && (
    <NumberFieldEndAdornment
      position="end"
      className={classes.endAdornment}
      ownerState={ownerState}
    >
      {ownerState.endAdornment}
    </NumberFieldEndAdornment>
  );

  const { startControls, endControls } = getControlElements({
    IncrementButton: incrementButton,
    DecrementButton: decrementButton,
    classes,
    ownerState,
    baseState,
    externalForwardedProps,
  });

  const startScrubArea = ownerState.scrubAreaPosition === 'start' && scrubArea;
  const endScrubArea = ownerState.scrubAreaPosition === 'end' && scrubArea;

  // Keep the consumer adornment mounted when controls move. An empty fragment would shrink the label.
  const startAdornment =
    startControls || startScrubArea || consumerStartAdornment ? (
      <React.Fragment>
        {startControls}
        {startScrubArea}
        {consumerStartAdornment}
      </React.Fragment>
    ) : null;
  const endAdornment =
    endControls || endScrubArea || consumerEndAdornment ? (
      <React.Fragment>
        {consumerEndAdornment}
        {endScrubArea}
        {endControls}
      </React.Fragment>
    ) : null;

  // Keep Material styling and native behavior aligned with Base UI's resolved state.
  const inputStateProps = {
    disabled: ownerState.disabled,
    required: ownerState.required,
    readOnly: ownerState.readOnly,
  };

  // Apply behavioral flags after native consumer props, preserving merged handlers and refs.
  const finalHtmlInputProps = {
    ...htmlInputProps,
    ...inputStateProps,
    ...(useHtmlInputRender && { render: htmlInputRender, renderState: baseState }),
  };

  const input = (
    <InputSlot
      aria-describedby={helperTextId}
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      value={inputValue}
      id={id}
      inputRef={inputRef}
      onBlur={materialProps.onBlur}
      onFocus={materialProps.onFocus}
      placeholder={placeholder}
      {...materialInputProps}
      slots={{
        input: externalForwardedProps.slots.htmlInput ? HtmlInputSlot : undefined,
        ...inputSlots,
        ...(materialRootComponent && { root: NumberFieldInputRootSlot }),
      }}
      slotProps={materialSlotProps}
      // InputBase receives render/state through inputProps; its leaf override
      // preserves the styled input layer for every variant.
      {...(useHtmlInputRender && { inputComponent: RenderElement })}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      {...inputStateProps}
      inputProps={finalHtmlInputProps}
    />
  );

  // Let a replacement input choose its own root and pass Group props through to it.
  return customInput ? <BaseNumberField.Group render={input} /> : input;
}

export default NumberFieldInputSlot;
