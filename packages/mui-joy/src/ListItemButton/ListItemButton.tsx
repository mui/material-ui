import * as React from 'react';
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
    // In some case, ListItemButton is a child of ListItem so the margin needs to be controlled by the ListItem.
    // The value is negative to account for the ListItem's padding
    margin: 'var(--ListItemButton-margin)',
    padding: 'min(0.375rem, var(--List-itemGutter)) var(--List-itemGutter)',
    paddingLeft: 'var(--List-insetLeft, var(--List-itemGutter))',
    minHeight: 'var(--List-itemMinHeight)',
    border: 'none',
    borderRadius:
      'max(var(--List-radius) - var(--List-gutter), min(var(--List-gutter) / 2, var(--List-radius) / 2))',
    flex: 1,
    minWidth: 0,
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    ...theme.typography.body1,
    '&.Mui-focusVisible': theme.focus.default,
  },
  ...(ownerState.selected
    ? [
        theme.variants[ownerState.selectedVariant!]?.[ownerState.color!],
        theme.variants[`${ownerState.selectedVariant!}Hover`]?.[ownerState.color!],
        theme.variants[`${ownerState.selectedVariant!}Active`]?.[ownerState.color!],
      ]
    : [
        theme.variants.text?.[ownerState.color!],
        theme.variants.textHover?.[ownerState.color!],
        theme.variants.textActive?.[ownerState.color!],
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
    color = 'neutral',
    selectedVariant = 'light',
    selected = false,
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
    selectedVariant,
    focusVisible,
    selected,
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

export default ListItemButton;
