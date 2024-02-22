'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { StyledListItemButton } from '../ListItemButton/ListItemButton';
import { styled, useThemeProps } from '../styles';
import { useVariantColor } from '../styles/variantColorInheritance';
import { getAutocompleteOptionUtilityClass } from './autocompleteOptionClasses';
import { AutocompleteOptionOwnerState, AutocompleteOptionTypeMap } from './AutocompleteOptionProps';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: AutocompleteOptionOwnerState) => {
  const { color, variant } = ownerState;

  const slots = {
    root: [
      'root',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
  };

  return composeClasses(slots, getAutocompleteOptionUtilityClass, {});
};

export const StyledAutocompleteOption = styled(StyledListItemButton as unknown as 'li')<{
  ownerState: AutocompleteOptionOwnerState;
}>(({ theme, ownerState }) => ({
  '&[aria-disabled="true"]': theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  '&[aria-selected="true"]': {
    ...theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
    fontWeight: theme.vars.fontWeight.md,
  },
}));

const AutocompleteOptionRoot = styled(StyledAutocompleteOption, {
  name: 'JoyAutocompleteOption',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({});
/**
 *
 * Demos:
 *
 * - [Autocomplete](https://mui.com/joy-ui/react-autocomplete/)
 *
 * API:
 *
 * - [AutocompleteOption API](https://mui.com/joy-ui/api/autocomplete-option/)
 */
const AutocompleteOption = React.forwardRef(function AutocompleteOption(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyAutocompleteOption',
  });

  const {
    children,
    component = 'li',
    color: colorProp = 'neutral',
    variant: variantProp = 'plain',
    className,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { variant = variantProp, color = colorProp } = useVariantColor(
    inProps.variant,
    inProps.color,
  );

  const ownerState = {
    ...props,
    component,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: AutocompleteOptionRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      as: component,
      role: 'option',
    },
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<AutocompleteOptionTypeMap>;

AutocompleteOption.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default AutocompleteOption;
