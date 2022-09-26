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

  const {
    children,
    component = 'li',
    color = 'neutral',
    variant = 'plain',
    className,
    ...other
  } = props;

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
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default AutocompleteOption;
