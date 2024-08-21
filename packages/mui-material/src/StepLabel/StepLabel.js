'use client';
import composeClasses from '@mui/utils/composeClasses';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import StepContext from '../Step/StepContext';
import StepIcon from '../StepIcon';
import StepperContext from '../Stepper/StepperContext';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import stepLabelClasses, { getStepLabelUtilityClass } from './stepLabelClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, orientation, active, completed, error, disabled, alternativeLabel } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      error && 'error',
      disabled && 'disabled',
      alternativeLabel && 'alternativeLabel',
    ],
    label: [
      'label',
      active && 'active',
      completed && 'completed',
      error && 'error',
      disabled && 'disabled',
      alternativeLabel && 'alternativeLabel',
    ],
    iconContainer: [
      'iconContainer',
      active && 'active',
      completed && 'completed',
      error && 'error',
      disabled && 'disabled',
      alternativeLabel && 'alternativeLabel',
    ],
    labelContainer: ['labelContainer', alternativeLabel && 'alternativeLabel'],
  };

  return composeClasses(slots, getStepLabelUtilityClass, classes);
};

const StepLabelRoot = styled('span', {
  name: 'MuiStepLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[ownerState.orientation]];
  },
})({
  display: 'flex',
  alignItems: 'center',
  [`&.${stepLabelClasses.alternativeLabel}`]: {
    flexDirection: 'column',
  },
  [`&.${stepLabelClasses.disabled}`]: {
    cursor: 'default',
  },
  variants: [
    {
      props: { orientation: 'vertical' },
      style: {
        textAlign: 'left',
        padding: '8px 0',
      },
    },
  ],
});

const StepLabelLabel = styled('span', {
  name: 'MuiStepLabel',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    display: 'block',
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest,
    }),
    [`&.${stepLabelClasses.active}`]: {
      color: (theme.vars || theme).palette.text.primary,
      fontWeight: 500,
    },
    [`&.${stepLabelClasses.completed}`]: {
      color: (theme.vars || theme).palette.text.primary,
      fontWeight: 500,
    },
    [`&.${stepLabelClasses.alternativeLabel}`]: {
      marginTop: 16,
    },
    [`&.${stepLabelClasses.error}`]: {
      color: (theme.vars || theme).palette.error.main,
    },
  })),
);

const StepLabelIconContainer = styled('span', {
  name: 'MuiStepLabel',
  slot: 'IconContainer',
  overridesResolver: (props, styles) => styles.iconContainer,
})({
  flexShrink: 0,
  display: 'flex',
  paddingRight: 8,
  [`&.${stepLabelClasses.alternativeLabel}`]: {
    paddingRight: 0,
  },
});

const StepLabelLabelContainer = styled('span', {
  name: 'MuiStepLabel',
  slot: 'LabelContainer',
  overridesResolver: (props, styles) => styles.labelContainer,
})(
  memoTheme(({ theme }) => ({
    width: '100%',
    color: (theme.vars || theme).palette.text.secondary,
    [`&.${stepLabelClasses.alternativeLabel}`]: {
      textAlign: 'center',
    },
  })),
);

const StepLabel = React.forwardRef(function StepLabel(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiStepLabel' });
  const {
    children,
    className,
    componentsProps = {},
    error = false,
    icon: iconProp,
    optional,
    slots = {},
    slotProps = {},
    StepIconComponent: StepIconComponentProp,
    StepIconProps,
    ...other
  } = props;

  const { alternativeLabel, orientation } = React.useContext(StepperContext);
  const { active, disabled, completed, icon: iconContext } = React.useContext(StepContext);
  const icon = iconProp || iconContext;

  let StepIconComponent = StepIconComponentProp;

  if (icon && !StepIconComponent) {
    StepIconComponent = StepIcon;
  }

  const ownerState = {
    ...props,
    active,
    alternativeLabel,
    completed,
    disabled,
    error,
    orientation,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps: {
      stepIcon: StepIconProps,
      ...componentsProps,
      ...slotProps,
    },
  };

  const [LabelSlot, labelProps] = useSlot('label', {
    elementType: StepLabelLabel,
    externalForwardedProps,
    ownerState,
  });

  const [StepIconSlot, stepIconProps] = useSlot('stepIcon', {
    elementType: StepIconComponent,
    externalForwardedProps,
    ownerState,
  });

  return (
    <StepLabelRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      {icon || StepIconSlot ? (
        <StepLabelIconContainer className={classes.iconContainer} ownerState={ownerState}>
          <StepIconSlot
            completed={completed}
            active={active}
            error={error}
            icon={icon}
            {...stepIconProps}
          />
        </StepLabelIconContainer>
      ) : null}
      <StepLabelLabelContainer className={classes.labelContainer} ownerState={ownerState}>
        {children ? (
          <LabelSlot {...labelProps} className={clsx(classes.label, labelProps?.className)}>
            {children}
          </LabelSlot>
        ) : null}
        {optional}
      </StepLabelLabelContainer>
    </StepLabelRoot>
  );
});

StepLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  componentsProps: PropTypes.shape({
    label: PropTypes.object,
  }),
  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * Override the default label of the step icon.
   */
  icon: PropTypes.node,
  /**
   * The optional node to display.
   */
  optional: PropTypes.node,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    stepIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    label: PropTypes.elementType,
    stepIcon: PropTypes.elementType,
  }),
  /**
   * The component to render in place of the [`StepIcon`](/material-ui/api/step-icon/).
   */
  StepIconComponent: PropTypes.elementType,
  /**
   * Props applied to the [`StepIcon`](/material-ui/api/step-icon/) element.
   */
  StepIconProps: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

if (StepLabel) {
  StepLabel.muiName = 'StepLabel';
}

export default StepLabel;
