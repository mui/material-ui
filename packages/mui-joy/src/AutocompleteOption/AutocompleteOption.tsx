import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { ListItemButtonRoot } from '../ListItemButton/ListItemButton';
import { styled, useThemeProps } from '../styles';
import autocompleteOptionClasses from './autocompleteOptionClasses';
import { AutocompleteOptionOwnerState, AutocompleteOptionTypeMap } from './AutocompleteOptionProps';

const AutocompleteOptionRoot = styled(ListItemButtonRoot as unknown as 'li', {
  name: 'JoyAutocompleteOption',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AutocompleteOptionOwnerState }>(({ theme, ownerState }) => ({
  '&[aria-disabled="true"]': theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  '&[aria-selected="true"]': {
    color: theme.vars.palette.primary.softColor,
    backgroundColor: theme.vars.palette.primary.softBg,
    fontWeight: theme.vars.fontWeight.md,
  },
}));

const AutocompleteOption = React.forwardRef(function AutocompleteOption(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyAutocompleteOption',
  });

  const { children, component, color = 'neutral', variant = 'plain', className, ...other } = props;

  const ownerState = {
    ...props,
    component,
    color,
    variant,
  };

  return (
    <AutocompleteOptionRoot
      ref={ref}
      as={component}
      ownerState={ownerState}
      className={clsx(autocompleteOptionClasses.root, className)}
      {...other}
    >
      {children}
    </AutocompleteOptionRoot>
  );
}) as OverridableComponent<AutocompleteOptionTypeMap>;

AutocompleteOption.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['context', 'danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default AutocompleteOption;
