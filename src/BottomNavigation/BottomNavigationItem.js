import React from 'react';
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, context) {
  const {selected} = props;

  const {muiTheme} = context;
  const {bottomNavigation} = muiTheme;

  const color = selected ? bottomNavigation.selectedColor :
                           bottomNavigation.unselectedColor;
  const styles = {
    root: {
      transition: 'padding-top 0.3s',
      paddingTop: selected ? 6 : 8,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
      minWidth: 80,
      maxWidth: 168,
    },
    label: {
      fontSize: selected ? bottomNavigation.selectedFontSize :
                           bottomNavigation.unselectedFontSize,
      transition: 'color 0.3s, font-size 0.3s',
      color: color,
    },
    icon: {
      display: 'block',
    },
    iconColor: color,
  };

  return styles;
}

class BottomNavigationItem extends React.Component {
  static propTypes = {
    /**
     * Set the icon representing the view for this item.
     */
    icon: React.PropTypes.node,
    /**
     * Set the label describing the view for this item.
     */
    label: React.PropTypes.node,
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
      label,
      icon,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const styledIcon = React.cloneElement(icon, {
      style: Object.assign({}, styles.icon, icon.style),
      color: Object.prototype.hasOwnProperty.call(icon.props, 'color') ?
        icon.props.color :
        styles.iconColor,
    });

    return (
      <EnhancedButton
        {...other}
        style={Object.assign({}, styles.root, style)}
      >
        {styledIcon}
        <div style={prepareStyles(styles.label)}>{label}</div>
      </EnhancedButton>
    );
  }
}

export default BottomNavigationItem;
