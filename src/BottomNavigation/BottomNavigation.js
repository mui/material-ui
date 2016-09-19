import React, {PropTypes, Children, cloneElement} from 'react';

function getStyles(props, context) {
  const {
    bottomNavigation,
  } = context.muiTheme;

  const styles = {
    root: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: bottomNavigation.backgroundColor,
      height: bottomNavigation.height,
    },
    item: {
      flex: '1',
    },
  };

  return styles;
}

const BottomNavigation = (props, context) => {
  const {
    children,
    style,
    selectedIndex,
    ...other,
  } = props;

  const {prepareStyles} = context.muiTheme;
  const styles = getStyles(props, context);

  const preparedChildren = Children.map(children, (child, index) => {
    return cloneElement(child, {
      style: Object.assign({}, styles.item, child.props.style),
      selected: index === selectedIndex,
    });
  });

  return (
    <div {...other} style={prepareStyles(Object.assign({}, styles.root, style))}>
      {preparedChildren}
    </div>
  );
};

BottomNavigation.propTypes = {
  /**
   * The `BottomNavigationItem`s to populate the element with.
   */
  children: PropTypes.node,
  /**
   * The index of the currently selected navigation item.
   */
  selectedIndex: PropTypes.number,
  /**
   * @ignore
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

BottomNavigation.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default BottomNavigation;
