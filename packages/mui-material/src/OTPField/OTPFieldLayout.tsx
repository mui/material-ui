'use client';

import * as React from 'react';
import { DirectionProvider, useDirection } from '@base-ui/react/direction-provider';
import { mergeProps } from '@base-ui/react/merge-props';
import type { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { useRender } from '@base-ui/react/use-render';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import { useRtl } from '@mui/system/RtlProvider';
import FormControl from '../FormControl';
import FormHelperText from '../FormHelperText';
import FormLabel from '../FormLabel';
import useSlot from '../utils/useSlot';
import { styled } from '../zero-styled';
import { OTPFieldContextProvider } from './OTPFieldContext';
import type { OTPFieldOwnerState, OTPFieldProps } from './OTPField.types';
import type { OTPFieldClasses } from './otpFieldClasses';

const OTPFieldGroup = styled('div', { name: 'MuiOTPField', slot: 'Group' })<{
  ownerState: OTPFieldOwnerState;
}>(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  'label + &': { marginTop: theme.spacing(0.5) },
}));

interface OTPFieldLayoutProps {
  children: React.ReactNode;
  rootRef: React.ForwardedRef<HTMLDivElement>;
  groupProps: React.ComponentPropsWithRef<'div'>;
  baseState: BaseOTPField.Root.State;
  ownerState: OTPFieldOwnerState;
  classes: OTPFieldClasses;
  externalForwardedProps: Pick<OTPFieldProps, 'slotProps' | 'slots'> &
    React.HTMLAttributes<HTMLDivElement>;
}

const OTPFieldRoot = styled(FormControl, { name: 'MuiOTPField', slot: 'Root' })({
  maxWidth: '100%',
});
const OTPFieldLabel = styled(FormLabel, { name: 'MuiOTPField', slot: 'Label' })({});
const OTPFieldFormHelperText = styled(FormHelperText, {
  name: 'MuiOTPField',
  slot: 'FormHelperText',
})({});

interface RenderElementProps extends React.HTMLAttributes<HTMLElement> {
  render: NonNullable<OTPFieldProps['render']>;
  renderState: BaseOTPField.Root.State;
}

const RenderElement = React.forwardRef(function RenderElement(
  { render, renderState, ...props }: RenderElementProps,
  ref: React.Ref<HTMLElement>,
) {
  return useRender({
    // Passing state directly to the callback keeps the OTP value out of generated data attributes.
    render: typeof render === 'function' ? (hostProps) => render(hostProps, renderState) : render,
    props,
    ref,
  });
});

// useRender gives a JSX element's own attributes precedence. Read those when linking the slots.
function getRenderElement(render: OTPFieldProps['render'], slot: React.ElementType | undefined) {
  return !slot && React.isValidElement<React.HTMLAttributes<HTMLElement>>(render)
    ? render
    : undefined;
}

/** @ignore - internal component. */
function OTPFieldLayout({
  groupProps,
  baseState,
  ownerState,
  classes,
  externalForwardedProps,
  rootRef,
  children,
}: OTPFieldLayoutProps) {
  const { slots, slotProps } = externalForwardedProps;
  const { helperText, id, label, render } = ownerState;
  const formControlState = typeof slots?.root === 'string' ? undefined : ownerState;

  // FormControl, FormLabel, and FormHelperText use component to replace their host
  // while keeping Material styles and context. An explicit slot supplies its own host.
  function getHostProps(renderProp: OTPFieldProps['render'], slot: React.ElementType | undefined) {
    return renderProp && !slot
      ? { component: RenderElement, render: renderProp, renderState: baseState }
      : undefined;
  }

  const [RootSlot, rootProps] = useSlot('root', {
    elementType: OTPFieldRoot,
    externalForwardedProps,
    ownerState,
    className: classes.root,
    ref: rootRef,
    additionalProps: { color: formControlState?.color, fullWidth: formControlState?.fullWidth },
    internalForwardedProps: getHostProps(render, slots?.root),
  });
  const [LabelSlot, { render: labelRender, ...labelProps }] = useSlot('label', {
    elementType: OTPFieldLabel,
    externalForwardedProps,
    ownerState,
    className: classes.label,
    additionalProps: { htmlFor: id },
  });
  const [HelperTextSlot, { render: helperRender, ...helperProps }] = useSlot('formHelperText', {
    elementType: OTPFieldFormHelperText,
    externalForwardedProps,
    ownerState,
    className: classes.formHelperText,
  });
  const hasLabel = label != null && label !== '' && label !== false;
  const hasHelperText = helperText != null && helperText !== '' && helperText !== false;
  const labelId = hasLabel
    ? (getRenderElement(labelRender, slots?.label)?.props.id ??
      labelProps.id ??
      (id && `${id}-label`))
    : undefined;
  const helperId = hasHelperText
    ? (getRenderElement(helperRender, slots?.formHelperText)?.props.id ??
      helperProps.id ??
      (id && `${id}-helper-text`))
    : undefined;

  // The slotProps callback receives Material ownerState. Its className and style callbacks
  // receive live Base UI state, including whether the code is complete.
  const {
    render: groupRender,
    className,
    style,
    ...otherGroupProps
  } = resolveComponentProps(slotProps?.group, ownerState) ?? {};
  const resolvedGroupProps = {
    ...otherGroupProps,
    className: resolveComponentProps(className, baseState),
    style: resolveComponentProps(style, baseState),
  };
  const [GroupSlot, groupSlotProps] = useSlot('group', {
    elementType: OTPFieldGroup,
    externalForwardedProps: { slots, slotProps: { group: resolvedGroupProps } },
    ownerState,
    className: classes.group,
    // Base UI runs the consumer's handlers first for cancellation. useSlot combines the refs.
    getSlotProps: (externalHandlers) => mergeProps(groupProps, externalHandlers),
    internalForwardedProps: groupRender
      ? { as: RenderElement, render: groupRender, renderState: baseState }
      : undefined,
  });
  const groupRenderElement = getRenderElement(groupRender, slots?.group);
  const groupRenderProps = groupRenderElement?.props;
  const ariaLabel = groupRenderProps?.['aria-label'] ?? groupSlotProps['aria-label'];
  // An explicit aria-labelledby wins over aria-label. Use Base UI's inferred label ID
  // only when the consumer hasn't supplied either name.
  const labelledBy =
    groupRenderProps?.['aria-labelledby'] ??
    otherGroupProps['aria-labelledby'] ??
    ownerState['aria-labelledby'] ??
    (ariaLabel?.trim() ? undefined : (groupSlotProps['aria-labelledby'] ?? labelId));
  const describedBy =
    [groupRenderProps?.['aria-describedby'] ?? groupSlotProps['aria-describedby'], helperId]
      .filter(Boolean)
      .join(' ') || undefined;

  const isRtl = useRtl();
  const inheritedDirection = useDirection();
  // Base UI reads direction from its provider when moving focus with the arrow keys.
  const dir =
    groupRenderProps?.dir ??
    groupSlotProps.dir ??
    getRenderElement(render, slots?.root)?.props.dir ??
    rootProps.dir;
  const themeDirection = isRtl ? 'rtl' : inheritedDirection;
  const direction = dir === 'ltr' || dir === 'rtl' ? dir : themeDirection;
  const contextValue = React.useMemo(
    () => ({ ownerState, classes, ariaLabel, labelledBy, describedBy }),
    [ownerState, classes, ariaLabel, labelledBy, describedBy],
  );

  return (
    <RootSlot
      {...rootProps}
      disabled={formControlState?.disabled}
      error={formControlState?.error}
      required={formControlState?.required}
      size={formControlState?.size}
    >
      {hasLabel && (
        <LabelSlot {...labelProps} {...getHostProps(labelRender, slots?.label)} id={labelId}>
          {label}
        </LabelSlot>
      )}
      <DirectionProvider direction={direction}>
        <OTPFieldContextProvider value={contextValue}>
          <GroupSlot
            {...groupSlotProps}
            {...(groupRenderElement &&
              helperId && {
                // useRender applies the element's own props last. Keep its description in sync with the inputs.
                render: React.cloneElement(groupRenderElement, { 'aria-describedby': describedBy }),
              })}
            role="group"
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
          >
            {children}
          </GroupSlot>
        </OTPFieldContextProvider>
      </DirectionProvider>
      {hasHelperText && (
        <HelperTextSlot
          {...helperProps}
          {...getHostProps(helperRender, slots?.formHelperText)}
          id={helperId}
        >
          {helperText}
        </HelperTextSlot>
      )}
    </RootSlot>
  );
}

export default OTPFieldLayout;
