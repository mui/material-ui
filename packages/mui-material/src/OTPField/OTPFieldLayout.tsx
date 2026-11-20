'use client';

import * as React from 'react';
import clsx from 'clsx';
import { mergeProps } from '@base-ui/react/merge-props';
import type { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { useRender } from '@base-ui/react/use-render';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import FormControl from '../FormControl';
import FormHelperText from '../FormHelperText';
import FormLabel from '../FormLabel';
import useSlot from '../utils/useSlot';
import { styled } from '../zero-styled';
import { OTPFieldContextProvider } from './OTPFieldContext';
import type { OTPFieldOwnerState, OTPFieldProps } from './OTPField.types';
import type { OTPFieldClasses } from './otpFieldClasses';

const OTPFieldGroup = styled('div', { name: 'MuiOTPField', slot: 'Group' })(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  'label + &': { marginTop: theme.spacing(0.5) },
}));

interface OTPFieldLayoutProps extends Pick<
  OTPFieldProps,
  'label' | 'helperText' | 'children' | 'inputRef' | 'autoFocus' | 'id'
> {
  rootRef: React.ForwardedRef<HTMLDivElement>;
  groupProps: React.ComponentPropsWithRef<'div'>;
  state: BaseOTPField.Root.State;
  size: OTPFieldOwnerState['size'];
  error: boolean;
  classes: OTPFieldClasses;
  getInputAriaLabel: NonNullable<OTPFieldProps['getInputAriaLabel']>;
  externalForwardedProps: Pick<OTPFieldProps, 'slotProps' | 'slots'> &
    React.HTMLAttributes<HTMLDivElement>;
}

const OTPFieldRoot = styled(FormControl, { name: 'MuiOTPField', slot: 'Root' })({});
const OTPFieldLabel = styled(FormLabel, { name: 'MuiOTPField', slot: 'Label' })({});
const OTPFieldHelperText = styled(FormHelperText, { name: 'MuiOTPField', slot: 'HelperText' })({});

/** @ignore - internal component. */
function OTPFieldLayout({
  groupProps,
  state,
  size,
  error,
  classes,
  externalForwardedProps,
  rootRef,
  id,
  label,
  helperText,
  autoFocus,
  inputRef,
  getInputAriaLabel,
  children,
}: OTPFieldLayoutProps) {
  const { slots, slotProps } = externalForwardedProps;
  const { length, disabled, readOnly, required } = state;
  const ownerState = React.useMemo(
    () => ({ length, disabled, readOnly, required, error, size }),
    [length, disabled, readOnly, required, error, size],
  );
  const common = { ownerState, externalForwardedProps, shouldForwardComponentProp: true };
  const [Root, rootProps] = useSlot('root', {
    ...common,
    elementType: OTPFieldRoot,
    className: classes.root,
    ref: rootRef,
  });
  const [Label, labelProps] = useSlot('label', {
    ...common,
    elementType: OTPFieldLabel,
    className: classes.label,
  });
  const [HelperText, helperProps] = useSlot('helperText', {
    ...common,
    elementType: OTPFieldHelperText,
    className: classes.helperText,
  });
  const hasLabel = label != null && label !== '' && label !== false;
  const hasHelperText = helperText != null && helperText !== '' && helperText !== false;
  const labelId = hasLabel ? (labelProps.id ?? (id && `${id}-label`)) : undefined;
  const helperId = hasHelperText ? (helperProps.id ?? (id && `${id}-helper-text`)) : undefined;

  const {
    render,
    ref: groupRef,
    className,
    style,
    ...otherGroupProps
  } = resolveComponentProps(slotProps?.group, ownerState) ?? {};
  const Group = slots?.group ?? OTPFieldGroup;
  const mergedGroupProps = mergeProps(groupProps, otherGroupProps);
  const labelledBy = otherGroupProps['aria-labelledby'] ?? groupProps['aria-labelledby'] ?? labelId;
  const describedBy =
    [mergedGroupProps['aria-describedby'], helperId].filter(Boolean).join(' ') || undefined;
  const groupRender =
    typeof render === 'function'
      ? (props: React.HTMLAttributes<HTMLDivElement>) => render(props, state)
      : render;
  const group = useRender({
    render: (!slots?.group && groupRender) || <Group />,
    ref: groupRef,
    props: mergeProps(mergedGroupProps, {
      className: clsx(
        classes.group,
        typeof className === 'function' ? className(state) : className,
      ),
      style: typeof style === 'function' ? style(state) : style,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
      role: 'group',
      children,
    }),
  });

  const ariaLabel = mergedGroupProps['aria-label'];
  const contextValue = React.useMemo(
    () => ({
      autoFocus,
      inputRef,
      getInputAriaLabel,
      ariaLabel,
      labelledBy,
      describedBy,
      classes,
      ownerState,
    }),
    [
      autoFocus,
      inputRef,
      getInputAriaLabel,
      ariaLabel,
      labelledBy,
      describedBy,
      classes,
      ownerState,
    ],
  );

  return (
    <Root
      {...rootProps}
      {...(typeof Root !== 'string' && {
        disabled: ownerState.disabled,
        error: ownerState.error,
        required: ownerState.required,
        size: ownerState.size,
      })}
    >
      {hasLabel && (
        <Label {...labelProps} id={labelId} htmlFor={id}>
          {label}
        </Label>
      )}
      <OTPFieldContextProvider value={contextValue}>{group}</OTPFieldContextProvider>
      {hasHelperText && (
        <HelperText {...helperProps} id={helperId}>
          {helperText}
        </HelperText>
      )}
    </Root>
  );
}

export default OTPFieldLayout;
