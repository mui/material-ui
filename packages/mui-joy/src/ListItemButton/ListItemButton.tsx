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
    ...(!ownerState.color && {
      '--List-decorator-color': theme.vars.palette.text.tertiary, // for making icon color less obvious
    }),
    ...(ownerState.color &&
      ownerState.color !== 'context' && {
        '--List-decorator-color': theme.vars.palette[ownerState.color]?.textColor,
      }),
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'initial',
    textDecoration: 'initial', // reset native anchor tag
    color: 'initial',
    // In some cases, ListItemButton is a child of ListItem so the margin needs to be controlled by the ListItem.
    // The value is negative to account for the ListItem's padding
    margin: 'var(--List-itemButton-margin)',
    padding: 'min(0.375rem, var(--List-item-paddingX)) var(--List-item-paddingX)',
    paddingLeft: 'var(--List-insetStart, var(--List-item-paddingX))',
    minHeight: 'var(--List-item-minHeight)',
    border: 'none',
    borderRadius: 'var(--List-item-radius)',
    flex: 1,
    minWidth: 0,
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    ...theme.typography.body1,
    ...(ownerState.selected && {
      fontWeight: theme.vars.fontWeight.md,
    }),
    '&.Mui-focusVisible': theme.focus.default,
    [`& + .${listItemButtonClasses.root}`]: {
      marginTop: 'var(--List-gap)',
    },
  },
  ...(ownerState.selected
    ? [
        {
          ...(ownerState.selectedVariant === 'outlined' && {
            padding:
              'calc(min(0.375rem, var(--List-item-paddingX)) - var(--variant-outlinedBorderWidth)) calc(var(--List-item-paddingX) - var(--variant-outlinedBorderWidth))', // account for the border width
          }),
        },
        theme.variants[ownerState.selectedVariant!]?.[ownerState.color || 'primary'],
        theme.variants[`${ownerState.selectedVariant!}Hover`]?.[ownerState.color || 'primary'],
        theme.variants[`${ownerState.selectedVariant!}Active`]?.[ownerState.color || 'primary'],
        theme.variants[`${ownerState.selectedVariant!}Disabled`]?.[ownerState.color || 'primary'],
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
   * The variant to use.
   * @default 'light'
   */
  selectedVariant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined']),
    PropTypes.string,
  ]),
} as any;

export default ListItemButton;
