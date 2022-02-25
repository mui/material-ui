import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import { useButton } from '@mui/base/ButtonUnstyled';
import { styled, useThemeProps } from '../styles';
import {
  ListItemButtonProps,
  ExtendListItemButton,
  ListItemButtonTypeMap,
} from './ListItemButtonProps';
import listItemButtonClasses, { getListItemButtonUtilityClass } from './listItemButtonClasses';
import listItemClasses from '../ListItem/listItemClasses';

const useUtilityClasses = (ownerState: ListItemButtonProps & { focusVisible: boolean }) => {
  const { color, disabled, focusVisible, focusVisibleClassName, selected, variant } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      color && `color${capitalize(color)}`,
      selected && 'selected',
      variant && `variant${capitalize(variant)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getListItemButtonUtilityClass, {});

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

const ListItemButtonRoot = styled('div', {
  name: 'MuiListItemButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemButtonProps }>(({ theme, ownerState }) => [
  {
    ...(ownerState.color &&
      ownerState.color !== 'context' && {
        '--List-decorator-color':
          theme.vars.palette[ownerState.color]?.[`${ownerState.variant!}Color`],
      }),
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'initial',
    textDecoration: 'initial', // reset native anchor tag
    // In some cases, ListItemButton is a child of ListItem so the margin needs to be controlled by the ListItem. The value is negative to account for the ListItem's padding
    margin: 'var(--List-itemButton-margin)',
    padding: 'var(--List-item-paddingY)',
    paddingLeft:
      'calc(var(--List-item-paddingLeft) + var(--List-item-startActionWidth, var(--internal-startActionWidth, 0px)))', // --internal variable makes it possible to customize the actionWidth from the top List
    paddingRight:
      'calc(var(--List-item-paddingRight) + var(--List-item-endActionWidth, var(--internal-endActionWidth, 0px)))', // --internal variable makes it possible to customize the actionWidth from the top List
    minHeight: 'var(--List-item-minHeight)',
    border: 'none',
    borderRadius: 'var(--List-item-radius)',
    flex: 1,
    minWidth: 0,
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontSize: 'var(--List-item-fontSize)',
    fontFamily: theme.vars.fontFamily.body,
    ...(ownerState.selected && {
      fontWeight: theme.vars.fontWeight.md,
    }),
    '&.Mui-focusVisible': theme.focus.default,
    // Can't use :last-child or :first-child selector because ListItemButton can be inside ListItem with start/end action
    // We want to be specific on what siblings the gap should be added.
    [`& + .${listItemButtonClasses.root}`]: {
      marginTop: 'var(--List-gap)',
    },
    [`& + .${listItemClasses.root}`]: {
      marginTop: 'var(--List-gap)',
    },
    // default color & background styles when `color` prop is not specified or set as default
    ...(!ownerState.color &&
      !ownerState.selected && {
        color: theme.vars.palette.text.secondary,
        '&:hover': {
          color: theme.vars.palette.text.primary,
        },
      }),
  },
  {
    ...(ownerState.variant === 'outlined' && {
      // account for the border width
      padding: 'calc(var(--List-item-paddingY) - var(--variant-outlinedBorderWidth))',
      paddingLeft:
        'calc(var(--List-item-paddingLeft) + var(--List-item-startActionWidth, var(--internal-startActionWidth, 0px)) - var(--variant-outlinedBorderWidth))', // --internal variable makes it possible to customize the actionWidth from the top List
      paddingRight:
        'calc(var(--List-item-paddingRight) + var(--List-item-endActionWidth, var(--internal-endActionWidth, 0px)) - var(--variant-outlinedBorderWidth))', // --internal variable makes it possible to customize the actionWidth from the top List
    }),
  },
  theme.variants[ownerState.variant!]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color || 'neutral'],
  theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color || 'neutral'],
  theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color || 'neutral'],
]);

const ListItemButton = React.forwardRef(function ListItemButton(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItemButton',
  });

  const {
    children,
    className,
    action,
    component = 'div',
    selected = false,
    color = selected ? 'primary' : undefined,
    variant = 'text',
    ...other
  } = props;

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const ComponentProp = component;

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    component: ComponentProp,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current?.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    component,
    color,
    focusVisible,
    selected,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListItemButtonRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
      {...getRootProps()}
    >
      {children}
    </ListItemButtonRoot>
  );
}) as ExtendListItemButton<ListItemButtonTypeMap>;

ListItemButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['context', 'danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default ListItemButton;
