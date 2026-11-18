import * as React from 'react';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { mergeProps } from '@base-ui/react/merge-props';

import resolveComponentProps from '@mui/utils/resolveComponentProps';

import AddIcon from '../internal/svg-icons/Add';
import RemoveIcon from '../internal/svg-icons/Remove';
import KeyboardArrowDownIcon from '../internal/svg-icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '../internal/svg-icons/KeyboardArrowUp';
import ImportExportIcon from '../internal/svg-icons/ImportExport';
import OpenInFullIcon from '../internal/svg-icons/OpenInFull';

import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import type { NumberFieldClasses } from './numberFieldClasses';
import useSlot from '../utils/useSlot';
import OutlinedInput from '../OutlinedInput';
import type { OutlinedInputProps } from '../OutlinedInput';
import FilledInput from '../FilledInput';
import Input from '../Input';
import { useDefaultProps } from '../DefaultPropsProvider';
import inputBaseClasses from '../InputBase/inputBaseClasses';
import NumberFieldAdornmentSlot from './NumberFieldAdornmentSlot';
import { getControlElements, omitNullishEventHandlers, resolveInputProps } from './utils';
import type { ResolvedInputSlotProps } from './utils/resolveInputProps';
import IconButton from '../IconButton';
import type { IconButtonProps } from '../IconButton';
import NumberFieldButtonSlot from './NumberFieldButtonSlot';
import RenderElement from './RenderElement';
import NumberFieldInputRoot from './NumberFieldInputRoot';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

type NumberFieldSlotProps = NonNullable<NumberFieldProps['slotProps']>;

type NumberFieldButtonSlotProps = IconButtonProps &
  Pick<BaseNumberField.Decrement.Props | BaseNumberField.Increment.Props, 'render'>;

interface NumberFieldInputProps {
  baseProps: React.ComponentPropsWithRef<'input'>;
  baseState: BaseNumberField.Input.State;
  classes: Omit<NumberFieldClasses, 'scrubbing'>;
  materialProps: NumberFieldOwnerState;
  externalForwardedProps: {
    slots: NonNullable<NumberFieldProps['slots']>;
    slotProps: Omit<NumberFieldSlotProps, 'input'> & {
      // NumberField resolves this shared callback before passing props to the adapters.
      input?: ResolvedInputSlotProps | undefined;
    };
  };
}

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
      props: ({ size }: Pick<IconButtonProps, 'size'>) => size === 'medium',
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
      props: ({
        ownerState,
        size,
      }: { ownerState: NumberFieldOwnerState } & Pick<IconButtonProps, 'size'>) =>
        ownerState.controlsPosition === 'stacked' && size === 'small',
      style: { fontSize: theme.typography.pxToRem(20) },
    },
    {
      props: { controlsPosition: 'stacked', variant: 'standard' },
      // Fit both chevrons within the standard input's existing height.
      style: { '--NumberField-buttonPadding': '6px', fontSize: theme.typography.pxToRem(16) },
    },
    {
      props: ({
        ownerState,
        size,
      }: { ownerState: NumberFieldOwnerState } & Pick<IconButtonProps, 'size'>) =>
        ownerState.controlsPosition === 'stacked' &&
        ownerState.variant === 'standard' &&
        size === 'small',
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
const NumberFieldScrubArea = styled('span', {
  name: 'MuiNumberField',
  slot: 'scrubArea',
})<{ ownerState: NumberFieldOwnerState }>(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '--NumberField-scrubAreaPadding': '4px',
    padding: 'var(--NumberField-scrubAreaPadding)',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 0,
    color: (theme.vars || theme).palette.action.active,
    cursor: 'ew-resize',
    variants: [
      {
        props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
          ownerState.scrubAreaPosition === 'start' && ownerState.controlsPosition !== 'split',
        style: { marginInlineStart: 'calc(-1 * var(--NumberField-scrubAreaPadding))' },
      },
      {
        props: { scrubAreaPosition: 'end', controlsPosition: false },
        style: { marginInlineEnd: 'calc(-1 * var(--NumberField-scrubAreaPadding))' },
      },
      { props: { 'data-direction': 'vertical' }, style: { cursor: 'ns-resize' } },
      { props: { size: 'small' }, style: { fontSize: theme.typography.pxToRem(18) } },
      {
        props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
          ownerState.disabled || ownerState.readOnly,
        style: {
          color: (theme.vars || theme).palette.action.disabled,
          cursor: 'default',
        },
      },
    ],
  })),
);
const NumberFieldScrubAreaCursor = styled('span', {
  name: 'MuiNumberField',
  slot: 'scrubAreaCursor',
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 0,
    // Match Base UI's black/white SVG cursor and shadow at the larger size.
    color: (theme.vars || theme).palette.common.black,
    filter: 'drop-shadow(0 1px 1px #0008)',
    '& svg': {
      stroke: (theme.vars || theme).palette.common.white,
      strokeWidth: 1,
    },
    zIndex: theme.zIndex.tooltip + 1,
  })),
);

/**
 * @ignore - internal component.
 */
function NumberFieldInputSlot(props: NumberFieldInputProps) {
  const { baseProps, baseState, classes, materialProps, externalForwardedProps } = props;
  const { inputValue } = baseState;
  const { autoFocus, variant, label, id, fullWidth, inputRef, placeholder } = materialProps;
  const ownerState = materialProps;

  const hasHelperText = materialProps.helperText != null && materialProps.helperText !== '';
  const helperTextId = hasHelperText && id ? `${id}-helper-text` : undefined;

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

  const { render: inputRender, ...inputSlotProps } = externalForwardedProps.slotProps.input ?? {};
  const [InputSlot, inputProps] = useSlot('input', {
    elementType: InputComponent,
    externalForwardedProps: {
      ...externalForwardedProps,
      slotProps: { ...externalForwardedProps.slotProps, input: inputSlotProps },
    },
    additionalProps: inputAdditionalProps,
    ownerState,
    className: classes.input,
  });

  const { materialInputProps, nativeSlotProps } = resolveInputProps({
    inputProps,
    htmlInputSlotProps: externalForwardedProps.slotProps.htmlInput,
    ownerState,
  });

  // Find a custom Material root from slotProps.input.slots.root or the selected
  // input's theme defaults so Group can share its element without replacing it.
  const { slots: materialSlots } = useDefaultProps({
    props: { slots: materialInputProps.slots },
    // Read defaults for the selected Material input, rather than NumberField.
    // eslint-disable-next-line mui/material-ui-name-matches-component-name
    name: variantName[variant],
  });
  const materialRootComponent = materialSlots?.root;
  const materialSlotProps = {
    ...materialInputProps.slotProps,
    root: {
      ...materialInputProps.slotProps?.root,
      ...(!materialRootComponent && { as: NumberFieldInputRoot }),
      numberFieldInputRoot: {
        render: externalForwardedProps.slots.input ? undefined : inputRender,
        renderState: baseState,
        rootComponent: materialRootComponent,
      },
    },
  };

  const { render: htmlInputRender, ...htmlInputSlotProps } = nativeSlotProps;
  const useHtmlInputRender = Boolean(
    htmlInputRender && !externalForwardedProps.slots.htmlInput && !materialInputProps.slots?.input,
  );
  const [HtmlInputSlot, htmlInputProps] = useSlot('htmlInput', {
    elementType: 'input',
    externalForwardedProps: {
      ...externalForwardedProps,
      slotProps: {
        ...externalForwardedProps.slotProps,
        htmlInput: htmlInputSlotProps,
      },
    },
    ownerState,
    className: undefined,
    getSlotProps: (externalHandlers) => {
      // An unspecified Base UI validation state must not clear Material's aria-invalid.
      const { 'aria-invalid': ariaInvalid, ...restBaseProps } = baseProps;

      // Compose the selected consumer handlers with Base UI; useSlot merges their refs.
      return mergeProps(ariaInvalid === undefined ? restBaseProps : baseProps, externalHandlers);
    },
  });

  // Build direction-aware defaults without evaluating the consumer's slot callback twice.
  const { render: scrubAreaRender, ...resolvedScrubAreaSlotProps } =
    resolveComponentProps(externalForwardedProps.slotProps.scrubArea, ownerState) ?? {};
  const scrubDirection = resolvedScrubAreaSlotProps.direction ?? 'horizontal';
  const [ScrubAreaSlot, scrubAreaSlotProps] = useSlot('scrubArea', {
    elementType: NumberFieldScrubArea,
    externalForwardedProps: {
      ...externalForwardedProps,
      slotProps: {
        ...externalForwardedProps.slotProps,
        scrubArea: resolvedScrubAreaSlotProps,
      },
    },
    ownerState,
    className: classes.scrubArea,
    internalForwardedProps: scrubAreaRender
      ? { as: RenderElement, render: scrubAreaRender, renderState: baseState }
      : undefined,
    additionalProps: {
      'data-direction': scrubDirection,
      children: (
        <ImportExportIcon
          fontSize="inherit"
          style={{ transform: scrubDirection === 'horizontal' ? 'rotate(90deg)' : undefined }}
        />
      ),
    },
  });
  const [ScrubAreaCursorSlot, scrubAreaCursorSlotProps] = useSlot('scrubAreaCursor', {
    elementType: NumberFieldScrubAreaCursor,
    externalForwardedProps,
    ownerState,
    className: classes.scrubAreaCursor,
    additionalProps: {
      // Rotate the SVG, since Base UI updates the cursor container's transform as it moves.
      // Inline transforms also preserve the drag axis when RTL styles are flipped.
      children: (
        <OpenInFullIcon
          fontSize="inherit"
          style={{
            transform: scrubDirection === 'horizontal' ? 'rotate(45deg)' : 'rotate(-45deg)',
          }}
        />
      ),
    },
  });
  const { render: scrubAreaCursorRender, ...scrubAreaCursorProps } = scrubAreaCursorSlotProps;

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
      size: ownerState.size,
      children: <DecrementIcon fontSize="inherit" />,
    },
  });
  const [IncrementButtonSlot, incrementButtonProps] = useSlot('incrementButton', {
    elementType: NumberFieldIncrementButton,
    externalForwardedProps,
    ownerState,
    className: classes.incrementButton,
    additionalProps: {
      size: ownerState.size,
      children: <IncrementIcon fontSize="inherit" />,
    },
  });

  const {
    direction,
    pixelSensitivity,
    teleportDistance,
    children: scrubAreaChildren,
    ...restScrubAreaProps
  } = scrubAreaSlotProps;
  const scrubAreaProps = omitNullishEventHandlers(restScrubAreaProps);

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

  const scrubAreaAdornment = ownerState.scrubAreaPosition !== false && (
    <NumberFieldAdornmentSlot
      slotName="scrubAreaAdornment"
      position={ownerState.scrubAreaPosition}
      className={classes.scrubAreaAdornment}
      baseState={baseState}
      materialProps={ownerState}
      externalForwardedProps={externalForwardedProps}
    >
      <BaseNumberField.ScrubArea
        direction={direction}
        pixelSensitivity={pixelSensitivity}
        teleportDistance={teleportDistance}
        render={<ScrubAreaSlot {...scrubAreaProps} />}
      >
        {scrubAreaChildren}
        <BaseNumberField.ScrubAreaCursor
          render={
            <ScrubAreaCursorSlot
              {...scrubAreaCursorProps}
              {...(!externalForwardedProps.slots.scrubAreaCursor &&
                scrubAreaCursorRender && {
                  as: RenderElement,
                  render: scrubAreaCursorRender,
                  renderState: baseState,
                })}
            />
          }
        />
      </BaseNumberField.ScrubArea>
    </NumberFieldAdornmentSlot>
  );

  const incrementButton = (
    <BaseNumberField.Increment
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

  const consumerStartAdornment = materialInputProps.startAdornment;
  const consumerEndAdornment = materialInputProps.endAdornment;

  const { startControls, endControls, adornedStart } = getControlElements({
    IncrementButton: incrementButton,
    DecrementButton: decrementButton,
    startAdornment: consumerStartAdornment,
    classes,
    ownerState,
    baseState,
    externalForwardedProps,
  });

  const startScrubArea = ownerState.scrubAreaPosition === 'start' && scrubAreaAdornment;
  const endScrubArea = ownerState.scrubAreaPosition === 'end' && scrubAreaAdornment;

  // An empty fragment would still mark the input as adorned and shrink its label.
  const startAdornment = adornedStart ? (
    <React.Fragment>
      {startControls}
      {startScrubArea}
      {consumerStartAdornment}
    </React.Fragment>
  ) : (
    consumerStartAdornment
  );
  const endAdornment =
    endControls || endScrubArea ? (
      <React.Fragment>
        {consumerEndAdornment}
        {endScrubArea}
        {endControls}
      </React.Fragment>
    ) : (
      consumerEndAdornment
    );

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

  return (
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
        ...materialInputProps.slots,
        ...(materialRootComponent && { root: NumberFieldInputRoot }),
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
}

export default NumberFieldInputSlot;
