import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '../styles/colorManipulator';
import styled, { rootShouldForwardProp } from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import listItemButtonClasses, { getListItemButtonUtilityClass } from './listItemButtonClasses';

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
    button: ['button', disabled && 'disabled', selected && 'selected'],
  };

  const composedClasses = composeClasses(slots, getListItemButtonUtilityClass, classes);

  return {
    ...classes,
    ...composedClasses,
  };
};

const ListItemButtonRoot = styled('li', {
  name: 'MuiListItemButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return {
      ...styles.root,
      ...(styleProps.dense && styles.dense),
      ...(styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart),
      ...(styleProps.divider && styles.divider),
      ...(!styleProps.disableGutters && styles.gutters),
    };
  },
})({
  position: 'relative',
});

const ListItemButtonButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiListItemButton',
  slot: 'Button',
  overridesResolver: (props, styles) => styles.button,
})(({ theme, styleProps }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
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
  /* Styles applied to the root element if `divider={true}`. */
  ...(styleProps.divider && {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundClip: 'padding-box',
  }),
  /* Styles applied to the root element if `alignItems="flex-start"`. */
  ...(styleProps.alignItems === 'flex-start' && {
    alignItems: 'flex-start',
  }),
  /* Styles applied to the root element unless `disableGutters={true}`. */
  ...(!styleProps.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16,
  }),
  /* Styles applied to the root element if dense. */
  ...(styleProps.dense && {
    paddingTop: 4,
    paddingBottom: 4,
  }),
  /* Styles applied to the button element if secondary action is valid. */
  ...(styleProps.hasSecondaryAction && {
    paddingRight: 48,
  }),
}));

const ListItemButton = React.forwardRef(function ListItemButton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiListItemButton' });
  const {
    autoFocus = false,
    component,
    className,
    children,
    alignItems = 'center',
    dense = false,
    disableGutters = false,
    divider = false,
    disabled = false,
    selected = false,
    focusVisibleClassName,
    buttonBaseRef,
    ButtonBaseProps = {},
    secondaryAction,
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
    disabled,
    selected,
    hasSecondaryAction: !!secondaryAction,
  };

  const classes = useUtilityClasses(styleProps);

  const handleRef = useForkRef(listItemRef, buttonBaseRef);

  return (
    <ListContext.Provider value={childContext}>
      <ListItemButtonRoot
        as={component}
        ref={ref}
        className={clsx(classes.root, className)}
        styleProps={styleProps}
        {...other}
      >
        <ListItemButtonButton
          ref={handleRef}
          component={ButtonBaseProps.component || 'div'}
          disabled={disabled}
          focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
          {...ButtonBaseProps}
          styleProps={styleProps}
          classes={{ ...classes, root: classes.button }}
        >
          {children}
        </ListItemButtonButton>
        {secondaryAction && <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>}
      </ListItemButtonRoot>
    </ListContext.Provider>
  );
});

ListItemButton.propTypes /* remove-proptypes */ = {
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
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * These props will be forwarded to the ButtonBase
   * @default {}
   */
  ButtonBaseProps: PropTypes.object,
  /**
   * Pass a ref to the `button` element.
   */
  buttonBaseRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
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
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus. The class name will be applied when the element gains the focus through keyboard interaction. It&#39;s a polyfill for the <a href=\"https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo\">CSS :focus-visible selector</a>. The rationale for using this feature <a href=\"https://github.com/WICG/focus-visible/blob/master/explainer.md\">is explained here</a>. A <a href=\"https://github.com/WICG/focus-visible\">polyfill can be used</a> to apply a <code>focus-visible</code> class to other components if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * A function to be called when user click the Button
   */
  onClick: PropTypes.func,
  /**
   * The secondary action component.
   */
  secondaryAction: PropTypes.node,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

ListItemButton.muiName = 'ListItemButton';

export default ListItemButton;
