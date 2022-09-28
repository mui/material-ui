import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useSlotProps } from '@mui/base/utils';
import composeClasses from '@mui/base/composeClasses';
import { ListRoot } from '../List/List';
import { styled, useThemeProps } from '../styles';
import { getAutocompleteListboxUtilityClass } from './autocompleteListboxClasses';
import {
  AutocompleteListboxOwnerState,
  AutocompleteListboxTypeMap,
} from './AutocompleteListboxProps';
import listItemClasses from '../ListItem/listItemClasses';
import listClasses from '../List/listClasses';
import { scopedVariables } from '../List/ListProvider';

const useUtilityClasses = (ownerState: AutocompleteListboxOwnerState) => {
  const { variant, color, size } = ownerState;
  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getAutocompleteListboxUtilityClass, {});
};

export const AutocompleteListboxRoot = styled(ListRoot, {
  name: 'JoyAutocompleteListbox',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AutocompleteListboxOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--_outline-inside': '1', // to prevent the focus outline from being cut by overflow
    '--List-radius': theme.vars.radius.sm,
    '--List-item-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.surface,
    '--List-item-stickyTop': 'calc(var(--List-padding, var(--List-divider-gap)) * -1)',
    ...scopedVariables,
    boxShadow: theme.vars.shadow.md,
    ...(!variantStyle?.backgroundColor && {
      backgroundColor: theme.vars.palette.background.surface,
    }),
    zIndex: 1200,
    overflow: 'auto',
    maxHeight: '40vh',
    position: 'relative', // to make sure that the listbox is positioned for grouped options to work.
    [`& .${listItemClasses.nested}, & .${listItemClasses.nested} .${listClasses.root}`]: {
      // For grouped options autocomplete:
      // Force the position to make the scroll into view logic works because the `element.offsetTop` should reference to the listbox, not the grouped list.
      // See the implementation of the `useAutocomplete` line:370
      //
      // Resource: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
      position: 'initial',
    },
  };
});

const AutocompleteListbox = React.forwardRef(function AutocompleteListbox(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyAutocompleteListbox',
  });

  const {
    children,
    component,
    color = 'neutral',
    variant = 'outlined',
    size = 'md',
    ...other
  } = props;

  const ownerState = {
    ...props,
    size,
    component,
    color,
    variant,
    nesting: false,
    row: false,
    wrap: false,
  };

  const filteredOther: typeof other = {};
  // ignore props that might be injected by PopperUnstyled
  (Object.keys(other) as Array<keyof typeof other>).forEach((k) => {
    if (
      !k.match(
        /^(anchorEl|direction|disablePortal|modifiers|open|placement|popperOptions|popperRef|TransitionProps)$/,
      )
    ) {
      filteredOther[k] = other[k];
    }
  });

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: AutocompleteListbox,
    externalSlotProps: {},
    externalForwardedProps: filteredOther,
    ownerState,
    additionalProps: {
      ref,
      as: component,
      role: 'listbox',
    },
    className: classes.root,
  });

  return <AutocompleteListboxRoot {...rootProps}>{children}</AutocompleteListboxRoot>;
}) as OverridableComponent<AutocompleteListboxTypeMap>;

AutocompleteListbox.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The size of the component (affect other nested list* components).
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
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
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default AutocompleteListbox;
