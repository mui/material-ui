import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useThemeProps } from '../styles';
import { resolveSxValue } from '../styles/styleUtils';
import styled from '../styles/styled';
import { getSheetUtilityClass } from './sheetClasses';
import { SheetProps, SheetTypeMap } from './SheetProps';

const useUtilityClasses = (ownerState: SheetProps) => {
  const { elevation, variant, color } = ownerState;

  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      elevation && `elevation${capitalize(elevation)}`,
    ],
  };

  return composeClasses(slots, getSheetUtilityClass, {});
};

const SheetRoot = styled('div', {
  name: 'JoySheet',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SheetProps }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  const childRadius = resolveSxValue({ theme, ownerState }, 'borderRadius');
  return [
    {
      '--List-item-stickyBackground':
        variantStyle?.backgroundColor ||
        variantStyle?.background ||
        theme.vars.palette.background.body, // for sticky List
      // minus the sheet's border width to have consistent radius between sheet and children
      ...(childRadius !== undefined && {
        '--List-radius': `calc(${childRadius} - var(--variant-borderWidth, 0px))`,
        '--internal-action-radius': `calc(${childRadius} - var(--variant-borderWidth, 0px))`,
      }),
      // TODO: discuss the theme transition.
      // This value is copied from mui-material Sheet.
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      boxShadow: theme.vars.shadow[ownerState.elevation!],
      backgroundColor: theme.vars.palette.background.body,
      position: 'relative',
    },
    variantStyle,
  ];
});

const Sheet = React.forwardRef(function Sheet(inProps, ref) {
  const props = useThemeProps<typeof inProps & SheetProps>({
    props: inProps,
    name: 'JoySheet',
  });

  const {
    className,
    color = 'neutral',
    component = 'div',
    variant = 'plain',
    elevation,
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    elevation,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SheetRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    />
  );
}) as OverridableComponent<SheetTypeMap>;

Sheet.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
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
   * Shadow depth, corresponds to the `theme.shadow` scale.
   * It accepts theme values between 'xs' and 'xl'.
   */
  elevation: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']),
    PropTypes.string,
  ]),
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
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Sheet;
