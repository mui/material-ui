'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { chainPropTypes } from '@mui/utils';
import {
  capitalize,
  unstable_useId as useId,
  unstable_memoTheme as memoTheme,
} from '@mui/material/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useDefaultProps } from '@mui/material/DefaultPropsProvider';
import Button from '@mui/material/Button';
import { ButtonGroupContext } from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import resolveProps from '@mui/utils/resolveProps';
import { styled } from '../zero-styled';
import loadingButtonClasses, { getLoadingButtonUtilityClass } from './loadingButtonClasses';

const useUtilityClasses = (ownerState) => {
  const { loading, loadingPosition, classes } = ownerState;

  const slots = {
    root: ['root', loading && 'loading'],
    label: ['label'],
    startIcon: [loading && `startIconLoading${capitalize(loadingPosition)}`],
    endIcon: [loading && `endIconLoading${capitalize(loadingPosition)}`],
    loadingIndicator: [
      'loadingIndicator',
      loading && `loadingIndicator${capitalize(loadingPosition)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getLoadingButtonUtilityClass, classes);

  return {
    ...classes, // forward the outlined, color, etc. classes to Button
    ...composedClasses,
  };
};

// TODO use `import rootShouldForwardProp from '../styles/rootShouldForwardProp';` once move to core
const rootShouldForwardProp = (prop) =>
  prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';
const LoadingButtonRoot = styled(Button, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiLoadingButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [
      styles.root,
      styles.startIconLoadingStart && {
        [`& .${loadingButtonClasses.startIconLoadingStart}`]: styles.startIconLoadingStart,
      },
      styles.endIconLoadingEnd && {
        [`& .${loadingButtonClasses.endIconLoadingEnd}`]: styles.endIconLoadingEnd,
      },
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]:
      {
        transition: theme.transitions.create(['opacity'], {
          duration: theme.transitions.duration.short,
        }),
        opacity: 0,
      },
    variants: [
      {
        props: {
          loadingPosition: 'center',
        },
        style: {
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
            duration: theme.transitions.duration.short,
          }),
          [`&.${loadingButtonClasses.loading}`]: {
            color: 'transparent',
          },
        },
      },
      {
        props: ({ ownerState }) => ownerState.loadingPosition === 'start' && ownerState.fullWidth,
        style: {
          [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]:
            {
              transition: theme.transitions.create(['opacity'], {
                duration: theme.transitions.duration.short,
              }),
              opacity: 0,
              marginRight: -8,
            },
        },
      },
      {
        props: ({ ownerState }) => ownerState.loadingPosition === 'end' && ownerState.fullWidth,
        style: {
          [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]:
            {
              transition: theme.transitions.create(['opacity'], {
                duration: theme.transitions.duration.short,
              }),
              opacity: 0,
              marginLeft: -8,
            },
        },
      },
    ],
  })),
);

const LoadingButtonLoadingIndicator = styled('span', {
  name: 'MuiLoadingButton',
  slot: 'LoadingIndicator',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.loadingIndicator,
      styles[`loadingIndicator${capitalize(ownerState.loadingPosition)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    visibility: 'visible',
    display: 'flex',
    variants: [
      {
        props: {
          loadingPosition: 'start',
          size: 'small',
        },
        style: {
          left: 10,
        },
      },
      {
        props: ({ loadingPosition, ownerState }) =>
          loadingPosition === 'start' && ownerState.size !== 'small',
        style: {
          left: 14,
        },
      },
      {
        props: {
          variant: 'text',
          loadingPosition: 'start',
        },
        style: {
          left: 6,
        },
      },
      {
        props: {
          loadingPosition: 'center',
        },
        style: {
          left: '50%',
          transform: 'translate(-50%)',
          color: (theme.vars || theme).palette.action.disabled,
        },
      },
      {
        props: {
          loadingPosition: 'end',
          size: 'small',
        },
        style: {
          right: 10,
        },
      },
      {
        props: ({ loadingPosition, ownerState }) =>
          loadingPosition === 'end' && ownerState.size !== 'small',
        style: {
          right: 14,
        },
      },
      {
        props: {
          variant: 'text',
          loadingPosition: 'end',
        },
        style: {
          right: 6,
        },
      },
      {
        props: ({ ownerState }) => ownerState.loadingPosition === 'start' && ownerState.fullWidth,
        style: {
          position: 'relative',
          left: -10,
        },
      },
      {
        props: ({ ownerState }) => ownerState.loadingPosition === 'end' && ownerState.fullWidth,
        style: {
          position: 'relative',
          right: -10,
        },
      },
    ],
  })),
);

const LoadingButtonLabel = styled('span', {
  name: 'MuiLoadingButton',
  slot: 'Label',
  overridesResolver: (props, styles) => {
    return [styles.label];
  },
})({
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit',
});

const LoadingButton = React.forwardRef(function LoadingButton(inProps, ref) {
  const contextProps = React.useContext(ButtonGroupContext);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({ props: resolvedProps, name: 'MuiLoadingButton' });
  const {
    children,
    disabled = false,
    id: idProp,
    loading = false,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = 'center',
    variant = 'text',
    ...other
  } = props;

  const id = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? (
    <CircularProgress aria-labelledby={id} color="inherit" size={16} />
  );

  const ownerState = {
    ...props,
    disabled,
    loading,
    loadingIndicator,
    loadingPosition,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const loadingButtonLoadingIndicator = loading ? (
    <LoadingButtonLoadingIndicator className={classes.loadingIndicator} ownerState={ownerState}>
      {loadingIndicator}
    </LoadingButtonLoadingIndicator>
  ) : null;

  return (
    <LoadingButtonRoot
      disabled={disabled || loading}
      id={id}
      ref={ref}
      {...other}
      variant={variant}
      classes={classes}
      ownerState={ownerState}
    >
      {ownerState.loadingPosition === 'end' ? (
        <LoadingButtonLabel className={classes.label}>{children}</LoadingButtonLabel>
      ) : (
        loadingButtonLoadingIndicator
      )}

      {ownerState.loadingPosition === 'end' ? (
        loadingButtonLoadingIndicator
      ) : (
        <LoadingButtonLabel className={classes.label}>{children}</LoadingButtonLabel>
      )}
    </LoadingButtonRoot>
  );
});

LoadingButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the loading indicator is shown and the button becomes disabled.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: chainPropTypes(PropTypes.oneOf(['start', 'end', 'center']), (props) => {
    if (props.loadingPosition === 'start' && !props.startIcon) {
      return new Error(
        `MUI: The loadingPosition="start" should be used in combination with startIcon.`,
      );
    }
    if (props.loadingPosition === 'end' && !props.endIcon) {
      return new Error(
        `MUI: The loadingPosition="end" should be used in combination with endIcon.`,
      );
    }
    return null;
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string,
  ]),
};

export default LoadingButton;
