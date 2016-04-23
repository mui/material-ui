import React from 'react';

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

class BottomNavigation extends React.Component {
  static propTypes = {
    /**
     * The `BottomNavigationItem`s to populate the `BottomNavigation` with.
     */
    children: React.PropTypes.node,
    /**
     * Applied to the bottom navigation's root element.
     */
    className: React.PropTypes.string,
    /**
     * The index of the currently selected navigation item.
     */
    selectedIndex: React.PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  render() {
    const {
      className,
      children,
      style,
      selectedIndex,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.context);

    const preparedChildren = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        style: Object.assign({}, styles.item, child.props.style),
        selected: index === selectedIndex,
      });
    });

    return (
      <div
        {...other}
        className={className}
        style={Object.assign({}, styles.root, style)}
      >
        {preparedChildren}
      </div>
    );
  }
}

export default BottomNavigation;
