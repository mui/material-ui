'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { alpha } from '@mui/system';
import {
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import { useSlotProps } from '@mui/base/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { useMenuItem } from '@mui/base/useMenuItem';
// TODO v6: Replace with @mui/material-next when the List components are available
import ListContext from '@mui/material/List/ListContext';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { listItemTextClasses } from '@mui/material/ListItemText';
import { styled, useThemeProps, rootShouldForwardProp } from '../styles';
import ButtonBase from '../ButtonBase';
import { dividerClasses } from '../Divider';
import { OptionProps, OptionOwnerState, OptionTypeMap } from './Option.types';
import optionClasses, { getOptionUtilityClass } from './optionClasses';

const overridesResolver = (props: OptionProps & { ownerState: OptionOwnerState }, styles: any) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
  ];
};

const useUtilityClasses = (ownerState: OptionOwnerState) => {
  const { disabled, dense, divider, disableGutters, selected, classes } = ownerState;
  const slots = {
    root: [
      'root',
      dense && 'dense',
      disabled && 'disabled',
      !disableGutters && 'gutters',
      divider && 'divider',
      selected && 'selected',
    ],
  };

  const composedClasses = composeClasses(slots, getOptionUtilityClass, classes);

  return {
    ...classes,
    ...composedClasses,
  };
};

const OptionRoot = styled(ButtonBase, {
  shouldForwardProp: (prop: string) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiOption',
  slot: 'Root',
  overridesResolver,
})<{ ownerState: OptionOwnerState }>(({ theme, ownerState }) => ({
  ...theme.typography.body1,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  ...(!ownerState.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16,
  }),
  ...(ownerState.divider && {
    borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
    backgroundClip: 'padding-box',
  }),
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: (theme.vars || theme).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
  [`&.${optionClasses.selected}`]: {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
      : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${optionClasses.focusVisible}`]: {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
        : alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
          ),
    },
  },
  [`&.${optionClasses.selected}:hover`]: {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
      : alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
        : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
  },
  [`&.${optionClasses.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus,
  },
  [`&.${optionClasses.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity,
  },
  [`& + .${dividerClasses.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  [`& + .${dividerClasses.inset}`]: {
    marginLeft: 52,
  },
  [`& .${listItemTextClasses.root}`]: {
    marginTop: 0,
    marginBottom: 0,
  },
  [`& .${listItemTextClasses.inset}`]: {
    paddingLeft: 36,
  },
  [`& .${listItemIconClasses.root}`]: {
    minWidth: 36,
  },
  ...(!ownerState.dense && {
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto',
    },
  }),
  ...(ownerState.dense && {
    minHeight: 32, // https://m2.material.io/components/menus#specs > Dense
    paddingTop: 4,
    paddingBottom: 4,
    ...theme.typography.body2,
    [`& .${listItemIconClasses.root} svg`]: {
      fontSize: '1.25rem',
    },
  }),
}));

const Option = React.forwardRef(function Option<RootComponentType extends React.ElementType>(
  inProps: OptionProps<RootComponentType>,
  ref: React.ForwardedRef<Element>,
) {
  const props = useThemeProps({ props: inProps, name: 'MuiOption' });
  const {
    autoFocus = false,
    component = 'li',
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = 'option',
    className,
    disabled: disabledProp,
    label: labelProp,
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const childContext = React.useMemo(
    () => ({
      dense: dense || context.dense || false,
      disableGutters,
    }),
    [context.dense, dense, disableGutters],
  );

  const optionRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(optionRef, ref);

  const { getRootProps, disabled, focusVisible, highlighted } = useMenuItem({
    disabled: disabledProp,
    rootRef: handleRef,
    label: labelProp,
  });

  useEnhancedEffect(() => {
    if (autoFocus) {
      if (optionRef.current) {
        optionRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'MUI: Unable to set focus to an Option whose component has not been rendered.',
        );
      }
    }
  }, [autoFocus]);

  const ownerState = {
    ...props,
    dense: childContext.dense,
    divider,
    disableGutters,
    disabled,
    focusVisible,
    highlighted,
  };

  const classes = useUtilityClasses(props);

  const Root = /* slots.root ?? */ OptionRoot;
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    // TODO v6: Add support for slotProps.root
    externalSlotProps: {},
    externalForwardedProps: other,
    additionalProps: {
      role,
      component,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
      classes,
    },
    className: clsx(classes.root, className),
    ownerState,
  });
  return (
    <ListContext.Provider value={childContext}>
      <OptionRoot {...rootProps} />
    </ListContext.Provider>
  );
}) as OverridableComponent<OptionTypeMap>;

Option.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * The content of the component.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Select component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the option.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label: PropTypes.string,
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Option;
