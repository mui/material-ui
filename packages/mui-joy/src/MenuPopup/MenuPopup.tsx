import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled, useThemeProps } from '../styles';
import { MenuPopupTypeMap } from './MenuPopupProps';
import { getMenuPopupUtilityClass } from './menuPopupClasses';
import MenuPopupContext from './MenuPopupContext';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenuPopupUtilityClass, {});
};

const MenuPopupRoot = styled(PopperUnstyled)({
  zIndex: 1,
});

const MenuPopup = React.forwardRef(function MenuPopup(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiMenuPopup',
  });

  const { anchorEl, children, className, component, onClose, open = false, ...other } = props;

  const classes = useUtilityClasses();

  return (
    <MenuPopupRoot
      ref={ref}
      anchorEl={anchorEl}
      keepMounted
      open={open}
      role={undefined}
      className={clsx(classes.root, className)}
      {...other}
    >
      <MenuPopupContext.Provider value={{ open, onClose }}>{children}</MenuPopupContext.Provider>
    </MenuPopupRoot>
  );
}) as OverridableComponent<MenuPopupTypeMap>;

MenuPopup.propTypes /* remove-proptypes */ = {
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
} as any;

export default MenuPopup;
