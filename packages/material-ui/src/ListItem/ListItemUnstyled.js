import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, elementTypeAcceptingRef } from '@material-ui/utils';
import ButtonBase from '../ButtonBase';
import isMuiElement from '../utils/isMuiElement';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

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
    components = {},
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
    className,
    dense: childContext.dense,
    disableGutters,
    divider,
    disabled,
    button,
    alignItems,
    hasSecondaryAction,
    selected,
    as: componentProp || 'li',
    ...other,
  };

  const Component = components.root || componentProp || 'li';

  if (button) {
    componentProps.focusVisibleClassName = focusVisibleClassName;
    componentProps.as = ButtonBase;
    componentProps.component = componentProp || 'div'
  }

  if (hasSecondaryAction) {
    const Container = components.container || ContainerComponent;

    // Use div by default.
    componentProps.as = !componentProps.component && !componentProp ? 'div' : componentProps.as;

    // Avoid nesting of li > li.
    if (ContainerComponent === 'li') {
      if (componentProps.as === 'li') {
        componentProps.as = 'div';
      }
    }

    return (
      <ListContext.Provider value={childContext}>
        <Container
          as={ContainerComponent}
          className={ContainerClassName}
          ref={handleRef}
          {...ContainerProps}
        >
          <Component {...componentProps}>{children}</Component>
          {children.pop()}
        </Container>
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
   */
  alignItems: PropTypes.oneOf(['center', 'flex-start']),
  /**
   * If `true`, the list item will be focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the list item will be a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
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
   * See [CSS API](#css) below for more details.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  components: PropTypes.shape({ root: PropTypes.component, container: PropTypes.component }),
  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   */
  ContainerComponent: elementTypeAcceptingRef,
  /**
   * Props applied to the container component if used.
   */
  ContainerProps: PropTypes.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the list item will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   */
  divider: PropTypes.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * Use to apply selected styling.
   */
  selected: PropTypes.bool,
};

export default ListItem;
