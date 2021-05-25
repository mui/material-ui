import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '../styles/colorManipulator';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';
import listItemButtonClasses, { getListItemButtonUtilityClass } from './listItemButtonClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return {
    ...styles.root,
    ...(styleProps.dense && styles.dense),
    ...(styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart),
    ...(styleProps.divider && styles.divider),
    ...(!styleProps.disableGutters && styles.gutters),
  };
};

const useUtilityClasses = (styleProps) => {
  const { alignItems, classes, dense, disabled, disableGutters, divider, selected } = styleProps;

  const slots = {
    root: [
      'root',
      dense && 'dense',
      !disableGutters && 'gutters',
      divider && 'divider',
      disabled && 'disabled',
      alignItems === 'flex-start' && 'alignItemsFlexStart',
      selected && 'selected',
    ],
  };

  return composeClasses(slots, getListItemButtonUtilityClass, classes);
};

const ListItemButtonRoot = experimentalStyled(
  ButtonBase,
  {},
  { name: 'ListItemButtonRoot', slot: 'Root', overridesResolver },
)(({ theme, styleProps }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'left',
  paddingTop: 8,
  paddingBottom: 8,
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
  [`&.${listItemButtonClasses.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${listItemButtonClasses.focusVisible}`]: {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
      ),
    },
  },
  [`&.${listItemButtonClasses.selected}:hover`]: {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
    ),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
  },
  [`&.${listItemButtonClasses.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus,
  },
  [`&.${listItemButtonClasses.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity,
  },
  /* Styles applied to the inner `component` element if `divider={true}`. */
  ...(styleProps.divider && {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundClip: 'padding-box',
  }),
  /* Styles applied to the component element if `alignItems="flex-start"`. */
  ...(styleProps.alignItems === 'flex-start' && {
    alignItems: 'flex-start',
  }),
  /* Styles applied to the inner `component` element unless `disableGutters={true}`. */
  ...(!styleProps.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16,
  }),
  /* Styles applied to the component element if dense. */
  ...(styleProps.dense && {
    paddingTop: 4,
    paddingBottom: 4,
  }),
}));

const ListItemButton = React.forwardRef(function ListItemButton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiListItemButton' });
  const {
    autoFocus = false,
    className,
    component = 'div',
    children,
    alignItems = 'center',
    dense = false,
    disableGutters = false,
    divider = false,
    selected = false,
    focusVisibleClassName,
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const childContext = {
    dense: dense || context.dense || false,
    alignItems,
    disableGutters,
  };

  const listItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'Material-UI: Unable to set focus to a ListItem whose component has not been rendered.',
        );
      }
    }
  }, [autoFocus]);

  const styleProps = {
    ...props,
    alignItems,
    dense: childContext.dense,
    disableGutters,
    divider,
  };

  const classes = useUtilityClasses(styleProps);

  const handleRef = useForkRef(listItemRef, ref);

  return (
    <ListItemButtonRoot
      ref={handleRef}
      className={clsx(classes.root, className)}
      component={component}
      styleProps={styleProps}
      {...other}
    >
      {children}
    </ListItemButtonRoot>
  );
});

ListItemButton.muiName = 'ListItemButton';

export default ListItemButton;
