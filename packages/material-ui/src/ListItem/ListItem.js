import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, elementTypeAcceptingRef } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';
import isMuiElement from '../utils/isMuiElement';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';

export const styles = (theme) => ({
  /* Styles applied to the (normally root) `component` element. May be wrapped by a `container`. */
  root: {
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
    '&$focusVisible': {
      backgroundColor: theme.palette.action.focus,
    },
    '&$selected': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      '&$focusVisible': {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
        ),
      },
    },
    '&$disabled': {
      opacity: theme.palette.action.disabledOpacity,
    },
  },
  /* Styles applied to the `container` element if `children` includes `ListItemSecondaryAction`. */
  container: {
    position: 'relative',
  },
  /* Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`. */
  focusVisible: {},
  /* Styles applied to the `component` element if dense. */
  dense: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  /* Styles applied to the `component` element if `alignItems="flex-start"`. */
  alignItemsFlexStart: {
    alignItems: 'flex-start',
  },
  /* Pseudo-class applied to the inner `component` element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the inner `component` element if `divider={true}`. */
  divider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundClip: 'padding-box',
  },
  /* Styles applied to the inner `component` element if `disableGutters={false}`. */
  gutters: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  /* Styles applied to the inner `component` element if `button={true}`. */
  button: {
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
    '&$selected:hover': {
      backgroundColor: fade(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
  /* Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`. */
  secondaryAction: {
    // Add some space to avoid collision as `ListItemSecondaryAction`
    // is absolutely positioned.
    paddingRight: 48,
  },
  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {},
});

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */
const ListItem = React.forwardRef(function ListItem(props, ref) {
  const {
    alignItems = 'center',
    autoFocus = false,
    button = false,
    children: childrenProp,
    classes,
    className,
    component: componentProp,
    ContainerComponent = 'li',
    ContainerProps: { className: ContainerClassName, ...ContainerProps } = {},
    dense = false,
    disabled = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    selected = false,
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

  const children = React.Children.toArray(childrenProp);
  const hasSecondaryAction =
    children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);

  const handleRef = useForkRef(listItemRef, ref);

  const componentProps = {
    className: clsx(
      classes.root,
      {
        [classes.dense]: childContext.dense,
        [classes.gutters]: !disableGutters,
        [classes.divider]: divider,
        [classes.disabled]: disabled,
        [classes.button]: button,
        [classes.alignItemsFlexStart]: alignItems === 'flex-start',
        [classes.secondaryAction]: hasSecondaryAction,
        [classes.selected]: selected,
      },
      className,
    ),
    disabled,
    ...other,
  };

  let Component = componentProp || 'li';

  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = clsx(classes.focusVisible, focusVisibleClassName);
    Component = ButtonBase;
  }

  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? 'div' : Component;

    // Avoid nesting of li > li.
    if (ContainerComponent === 'li') {
      if (Component === 'li') {
        Component = 'div';
      } else if (componentProps.component === 'li') {
        componentProps.component = 'div';
      }
    }

    return (
      <ListContext.Provider value={childContext}>
        <ContainerComponent
          className={clsx(classes.container, ContainerClassName)}
          ref={handleRef}
          {...ContainerProps}
        >
          <Component {...componentProps}>{children}</Component>
          {children.pop()}
        </ContainerComponent>
      </ListContext.Provider>
    );
  }

  return (
    <ListContext.Provider value={childContext}>
      <Component ref={handleRef} {...componentProps}>
        {children}
      </Component>
    </ListContext.Provider>
  );
});

ListItem.propTypes = {
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
   * If `true`, the list item will be focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the list item will be a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
   * @default false
   */
  button: PropTypes.bool,
  /**
   * The content of the component. If a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: chainPropTypes(PropTypes.node, (props) => {
    const children = React.Children.toArray(props.children);

    // React.Children.toArray(props.children).findLastIndex(isListItemSecondaryAction)
    let secondaryActionIndex = -1;
    for (let i = children.length - 1; i >= 0; i -= 1) {
      const child = children[i];
      if (isMuiElement(child, ['ListItemSecondaryAction'])) {
        secondaryActionIndex = i;
        break;
      }
    }

    //  is ListItemSecondaryAction the last child of ListItem
    if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) {
      return new Error(
        'Material-UI: You used an element after ListItemSecondaryAction. ' +
          'For ListItem to detect that it has a secondary action ' +
          'you must pass it as the last child to ListItem.',
      );
    }

    return null;
  }),
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
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   */
  ContainerComponent: elementTypeAcceptingRef,
  /**
   * Props applied to the container component if used.
   * @default {}
   */
  ContainerProps: PropTypes.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the list item will be disabled.
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
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiListItem' })(ListItem);
