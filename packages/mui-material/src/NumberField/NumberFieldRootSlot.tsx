import * as React from 'react';
import clsx from 'clsx';

import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { HTMLProps } from '@base-ui/react/types';
import { mergeProps } from '@base-ui/react/merge-props';

import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import type { NumberFieldClasses } from './numberFieldClasses';
import numberFieldClasses from './numberFieldClasses';
import FormControl from '../FormControl';
import useSlot from '../utils/useSlot';
import { styled } from '../zero-styled';
import InputLabel from '../InputLabel';
import type { InputLabelProps } from '../InputLabel';
import FormHelperText from '../FormHelperText';
import RenderElement from './RenderElement';

interface NumberFieldRootProps {
  baseProps: HTMLProps;
  baseState: BaseNumberField.Root.State;
  children: React.ReactNode;
  classes: Pick<NumberFieldClasses, 'root' | 'inputLabel' | 'formHelperText'>;
  hasHelperText: boolean;
  helperTextId: string | undefined;
  materialProps: NumberFieldOwnerState;
  externalForwardedProps: Pick<NumberFieldProps, 'slots' | 'slotProps'>;
}

const NumberFieldRoot = styled(FormControl, {
  name: 'MuiNumberField',
  slot: 'root',
  overridesResolver: ({ ownerState }, styles) => [
    styles.root,
    // Keep the Material variant's native input styles and apply overrides through its class.
    { [`& .${numberFieldClasses.htmlInput}`]: styles.htmlInput },
    ownerState.scrubbing && styles.scrubbing,
  ],
})({});

const NumberFieldInputLabel = styled(InputLabel, {
  name: 'MuiNumberField',
  slot: 'inputLabel',
})({});

const NumberFieldFormHelperText = styled(FormHelperText, {
  name: 'MuiNumberField',
  slot: 'formHelperText',
})({});

// This component is a placeholder for FormControl to correctly set the shrink label state on SSR.
function SSRInitialFilled(_: { value: string; startAdornment?: React.ReactNode }) {
  return null;
}
SSRInitialFilled.muiName = 'Input';

/**
 * @ignore - internal component.
 */
const NumberFieldRootSlot = React.forwardRef(
  (props: NumberFieldRootProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      baseProps,
      baseState,
      children,
      classes,
      hasHelperText,
      helperTextId,
      materialProps,
      externalForwardedProps,
    } = props;
    const ownerState = materialProps;
    const { id, label, helperText } = materialProps;

    const hasLabel = label != null && label !== '' && label !== false;
    const labelId = hasLabel && id ? `${id}-label` : undefined;

    const [RootSlot, rootProps] = useSlot('root', {
      elementType: NumberFieldRoot,
      externalForwardedProps,
      ownerState,
      className: clsx(classes.root, materialProps.className),
      ref,
      getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
      additionalProps: {
        color: ownerState.color,
        error: ownerState.error,
        fullWidth: ownerState.fullWidth,
        size: ownerState.size,
        variant: ownerState.variant,
      },
      // FormControl's internal component prop preserves its styles and context.
      // A replacement slots.root bypasses this render bridge.
      internalForwardedProps: ownerState.render
        ? { component: RenderElement, render: ownerState.render, renderState: baseState }
        : undefined,
    });

    const [InputLabelSlot, inputLabelSlotProps] = useSlot('inputLabel', {
      elementType: NumberFieldInputLabel,
      externalForwardedProps,
      ownerState,
      className: classes.inputLabel,
    });

    const [FormHelperTextSlot, formHelperTextSlotProps] = useSlot('formHelperText', {
      elementType: NumberFieldFormHelperText,
      externalForwardedProps,
      ownerState,
      className: classes.formHelperText,
    });

    const { render: inputLabelRender, ...inputLabelProps } = inputLabelSlotProps;
    const { render: formHelperTextRender, ...formHelperTextProps } = formHelperTextSlotProps;

    // FormControl needs the adornment before effects run to initialize label shrink.
    const resolvedInputSlotProps = externalForwardedProps.slotProps?.input;
    const startAdornment =
      resolvedInputSlotProps && 'startAdornment' in resolvedInputSlotProps
        ? resolvedInputSlotProps.startAdornment
        : undefined;
    const adornedStart =
      ownerState.controlsPosition === 'split' ||
      ownerState.scrubAreaPosition === 'start' ||
      Boolean(startAdornment);
    const { hiddenLabel = ownerState.variant === 'filled' && !hasLabel ? true : undefined } =
      rootProps;

    return (
      <RootSlot
        {...rootProps}
        disabled={ownerState.disabled}
        hiddenLabel={hiddenLabel}
        required={ownerState.required}
      >
        <SSRInitialFilled value={baseState.inputValue} startAdornment={adornedStart} />
        {hasLabel && (
          <InputLabelSlot
            id={labelId}
            {...(inputLabelProps as InputLabelProps)}
            {...(!externalForwardedProps.slots?.inputLabel &&
              inputLabelRender && {
                component: RenderElement,
                render: inputLabelRender,
                renderState: baseState,
              })}
          >
            {label}
          </InputLabelSlot>
        )}
        {children}
        {hasHelperText && (
          <FormHelperTextSlot
            {...formHelperTextProps}
            id={helperTextId}
            {...(!externalForwardedProps.slots?.formHelperText &&
              formHelperTextRender && {
                component: RenderElement,
                render: formHelperTextRender,
                renderState: baseState,
              })}
          >
            {helperText}
          </FormHelperTextSlot>
        )}
      </RootSlot>
    );
  },
);

export default NumberFieldRootSlot;
