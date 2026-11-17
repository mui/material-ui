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
import inputBaseClasses from '../InputBase/inputBaseClasses';
import NumberFieldAdornmentSlot from './NumberFieldAdornmentSlot';
import { getControlElements, omitNullishEventHandlers, resolveInputProps } from './utils';
import type { ResolvedInputSlotProps } from './utils/resolveInputProps';
import IconButton from '../IconButton';
import type { IconButtonProps } from '../IconButton';
import NumberFieldButtonSlot from './NumberFieldButtonSlot';
import RenderElement from './RenderElement';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import slotShouldForwardProp from '../styles/slotShouldForwardProp';

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

// Control buttons provide their own spacing against the input's outer edges.
const inputStyles = {
  variants: [
    {
      props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
        ownerState.controlsPosition !== false,
      style: {
        paddingRight: 0,
      },
    },
    {
      props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
        ownerState.controlsPosition === 'split',
      style: {
        paddingLeft: 0,
        [`& > .${inputBaseClasses.input}`]: { textAlign: 'center' },
      },
    },
  ],
};

const inputOptions = {
  // InputBase forwards `as` to its styled root, preserving the Material input.
  shouldForwardProp: (prop: string) => prop === 'as' || slotShouldForwardProp(prop),
};

const variantComponent = {
  standard: styled(Input, inputOptions)(inputStyles),
  filled: styled(FilledInput, inputOptions)(inputStyles),
  outlined: styled(OutlinedInput, inputOptions)(inputStyles),
};

const buttonStyles = memoTheme(({ theme }) => ({
  borderRadius: (theme.vars || theme).shape.borderRadius,
  variants: [
    {
      props: ({ size }: Pick<IconButtonProps, 'size'>) => size === 'medium',
      style: { padding: 6, fontSize: theme.typography.pxToRem(20) },
    },
    {
      props: { variant: 'standard' },
      // The standard input has no vertical padding to accommodate taller controls.
      style: { padding: 4 },
    },
    {
      props: { controlsPosition: 'stacked' },
      style: { flex: '1 1 0', padding: '0 4px', fontSize: theme.typography.pxToRem(28) },
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
      style: { padding: '0 6px', fontSize: theme.typography.pxToRem(16) },
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
})(buttonStyles);
const NumberFieldDecrementButton = styled(IconButton, {
  name: 'MuiNumberField',
  slot: 'decrementButton',
})(buttonStyles);
const NumberFieldScrubArea = styled('span', {
  name: 'MuiNumberField',
  slot: 'scrubArea',
})<{ ownerState: NumberFieldOwnerState }>(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: 4,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 0,
    color: (theme.vars || theme).palette.action.active,
    cursor: 'ew-resize',
    variants: [
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
const NumberFieldInputSlot = React.forwardRef(
  (props: NumberFieldInputProps, ref: React.Ref<HTMLDivElement>) => {
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
      className: undefined,
      ref,
      internalForwardedProps: inputRender
        ? { as: RenderElement, render: inputRender, renderState: baseState }
        : undefined,
    });

    const { materialInputProps, nativeSlotProps } = resolveInputProps({
      inputProps,
      htmlInputSlotProps: externalForwardedProps.slotProps.htmlInput,
      ownerState,
    });

    const { render: htmlInputRender, ...htmlInputSlotProps } = nativeSlotProps;
    const useHtmlInputRender = Boolean(
      htmlInputRender &&
      !externalForwardedProps.slots.htmlInput &&
      !materialInputProps.slots?.input,
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
    const { render: scrubAreaCursorRender, ...resolvedScrubAreaCursorSlotProps } =
      resolveComponentProps(externalForwardedProps.slotProps.scrubAreaCursor, ownerState) ?? {};
    const [ScrubAreaCursorSlot, scrubAreaCursorProps] = useSlot('scrubAreaCursor', {
      elementType: NumberFieldScrubAreaCursor,
      externalForwardedProps: {
        ...externalForwardedProps,
        slotProps: {
          ...externalForwardedProps.slotProps,
          scrubAreaCursor: resolvedScrubAreaCursorSlotProps,
        },
      },
      ownerState,
      className: classes.scrubAreaCursor,
      internalForwardedProps: scrubAreaCursorRender
        ? { as: RenderElement, render: scrubAreaCursorRender, renderState: baseState }
        : undefined,
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
            render={<ScrubAreaCursorSlot {...scrubAreaCursorProps} />}
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
            render={
              externalForwardedProps.slots.incrementButton ? undefined : incrementButtonRender
            }
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
            render={
              externalForwardedProps.slots.decrementButton ? undefined : decrementButtonRender
            }
          />
        )}
      />
    );

    const consumerStartAdornment =
      'startAdornment' in materialInputProps ? materialInputProps.startAdornment : undefined;
    const consumerEndAdornment =
      'endAdornment' in materialInputProps ? materialInputProps.endAdornment : undefined;

    const { startControls, endControls, adornedStart } = getControlElements({
      controlsPosition: ownerState.controlsPosition,
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
        slots={{
          input: externalForwardedProps.slots.htmlInput ? HtmlInputSlot : undefined,
        }}
        {...materialInputProps}
        // InputBase receives render/state through inputProps; its leaf override
        // preserves the styled input layer for every variant.
        {...(useHtmlInputRender && { inputComponent: RenderElement })}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        {...inputStateProps}
        inputProps={finalHtmlInputProps}
      />
    );
  },
);

export default NumberFieldInputSlot;
