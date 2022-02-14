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
import { getListItemButtonUtilityClass } from './listItemButtonClasses';

const useUtilityClasses = (ownerState: ListItemButtonProps & { focusVisible: boolean }) => {
  const { color, disabled, focusVisible, focusVisibleClassName, selectedVariant, selected } =
    ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      color && `color${capitalize(color)}`,
      selected && 'selected',
      selected && selectedVariant && `selectedVariant${capitalize(selectedVariant)}`,
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
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'initial',
    textDecoration: 'initial', // reset native anchor tag
    color: 'initial',
    // In some cases, ListItemButton is a child of ListItem so the margin needs to be controlled by the ListItem.
    // The value is negative to account for the ListItem's padding
    margin: 'var(--ListItemButton-margin)',
    padding: 'min(0.375rem, var(--List-itemGutter)) var(--List-itemGutter)',
    ...(ownerState.selected &&
      ownerState.selectedVariant === 'outlined' && {
        padding:
          'calc(min(0.375rem, var(--List-itemGutter)) - var(--variant-outlinedBorderWidth)) calc(var(--List-itemGutter) - var(--variant-outlinedBorderWidth))', // account for the border width
      }),
    paddingLeft: 'var(--List-insetStart, var(--List-itemGutter))',
    minHeight: 'var(--List-itemMinHeight)',
    border: 'none',
    borderRadius: 'var(--List-itemRadius)',
    flex: 1,
    minWidth: 0,
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontSize: theme.vars.fontSize.md,
    fontFamily: theme.vars.fontFamily.body,
    lineHeight: theme.vars.lineHeight.md,
    ...(ownerState.selected && {
      fontWeight: theme.vars.fontWeight.md,
    }),
    '&.Mui-focusVisible': theme.focus.default,
  },
  ...(ownerState.selected
    ? [
        theme.variants[ownerState.selectedVariant!]?.[ownerState.selectedColor!],
        theme.variants[`${ownerState.selectedVariant!}Hover`]?.[ownerState.selectedColor!],
        theme.variants[`${ownerState.selectedVariant!}Active`]?.[ownerState.selectedColor!],
        theme.variants[`${ownerState.selectedVariant!}Disabled`]?.[ownerState.selectedColor!],
      ]
    : [
        theme.variants.text?.[ownerState.color!],
        theme.variants.textHover?.[ownerState.color || 'neutral'],
        theme.variants.textActive?.[ownerState.color || 'neutral'],
        theme.variants.textDisabled?.[ownerState.color || 'neutral'],
      ]),
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
    color,
    selected = false,
    selectedColor = 'primary',
    selectedVariant = 'light',
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
    selectedColor,
    selectedVariant,
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
   * The color of the component when it is selected. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  selectedColor: PropTypes.oneOf([
    'context',
    'danger',
    'info',
    'neutral',
    'primary',
    'success',
    'warning',
  ]),
  /**
   * The variant to use.
   * @default 'light'
   */
  selectedVariant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined']),
    PropTypes.string,
  ]),
} as any;

export default ListItemButton;
