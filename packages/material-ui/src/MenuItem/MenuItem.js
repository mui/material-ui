import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled, { rootShouldForwardProp } from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getMenuItemUtilityClass } from './menuItemClasses';
import ListContext from '../List/ListContext';
import ListItemButton from '../ListItemButton';
import { dividerClasses } from '../Divider';
import { listItemIconClasses } from '../ListItemIcon';
import { listItemTextClasses } from '../ListItemText';
import { overridesResolver as listItemButtonOverridesResolver } from '../ListItemButton/ListItemButton';

const useUtilityClasses = (styleProps) => {
  const { selected, dense, classes } = styleProps;
  const slots = {
    root: ['root', selected && 'selected', dense && 'dense'],
  };

  return composeClasses(slots, getMenuItemUtilityClass, classes);
};

const MenuItemRoot = styled(ListItemButton, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver: listItemButtonOverridesResolver,
})(({ theme, styleProps }) => ({
  ...theme.typography.body1,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: 'border-box',
  width: 'auto',
  whiteSpace: 'nowrap',
  [`& + .${dividerClasses.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  [`& .${listItemTextClasses.root}`]: {
    marginTop: 0,
    marginBottom: 0,
  },
  [`& .${listItemTextClasses.inset}`]: {
    paddingLeft: 36,
  },
  [`& .${listItemIconClasses.root}`]: {
    minWidth: 36,
    '& svg': {
      fontSize: '1.25rem',
    },
  },
  ...(!styleProps.dense && {
    [theme.breakpoints.up('md')]: {
      padding: '12px 24px',
      [`& .${listItemTextClasses.inset}`]: {
        paddingLeft: 44,
      },
      [`& .${listItemIconClasses.root}`]: {
        minWidth: 44,
        '& svg': {
          fontSize: '1.5rem',
        },
      },
    },
  }),
}));

const MenuItem = React.forwardRef(function MenuItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiMenuItem' });
  const {
    children,
    component = 'li',
    dense: denseProp = false,
    disableGutters = false,
    role = 'menuitem',
    selected,
    tabIndex: tabIndexProp,
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const dense = denseProp || context.dense || false;
  const childContext = {
    dense: false, // fix dense to false, so ListItemText does not get smaller.
    alignItems: props.alignItems || false,
    disableGutters,
  };

  const styleProps = { dense };

  const classes = useUtilityClasses(props);

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return (
    <MenuItemRoot
      role={role}
      tabIndex={tabIndex}
      component={component}
      selected={selected}
      dense={dense}
      disableGutters={disableGutters}
      ref={ref}
      {...other}
      styleProps={styleProps}
      classes={classes}
    >
      <ListContext.Provider value={childContext}>{children}</ListContext.Provider>
    </MenuItemRoot>
  );
});

MenuItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: PropTypes.oneOf(['center', 'flex-start']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * `classes` prop applied to the [`ListItem`](/api/list-item/) element.
   * @deprecated this prop will be removed in v6, use `classes` instead
   */
  ListItemClasses: PropTypes.object,
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * @default 0
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default MenuItem;
