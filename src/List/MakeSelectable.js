import React, {Component, PropTypes} from 'react';
import {fade} from '../utils/colorManipulator';

export const MakeSelectable = (Component) => {
  return class extends Component {
    static propTypes = {
      children: PropTypes.node,
      onChange: PropTypes.func,
      selectedItemStyle: PropTypes.object,
      value: PropTypes.any,
    };

    static contextTypes = {
      muiTheme: PropTypes.object.isRequired,
    };

    extendChild(child, styles, selectedItemStyle) {
      if (child && child.type && child.type.muiName === 'ListItem') {
        const selected = this.isChildSelected(child, this.props);
        let selectedChildrenStyles;
        if (selected) {
          selectedChildrenStyles = Object.assign({}, styles, selectedItemStyle);
        }

        const mergedChildrenStyles = Object.assign({}, child.props.style, selectedChildrenStyles);

        this.keyIndex += 1;

        return React.cloneElement(child, {
          onTouchTap: (event) => {
            this.handleItemTouchTap(event, child);
            if (child.props.onTouchTap) {
              child.props.onTouchTap(event);
            }
          },
          key: this.keyIndex,
          style: mergedChildrenStyles,
          nestedItems: child.props.nestedItems.map((child) => this.extendChild(child, styles, selectedItemStyle)),
          initiallyOpen: this.isInitiallyOpen(child),
        });
      } else {
        return child;
      }
    }

    isInitiallyOpen(child) {
      if (child.props.initiallyOpen) {
        return child.props.initiallyOpen;
      }
      return this.hasSelectedDescendant(false, child);
    }

    hasSelectedDescendant = (previousValue, child) => {
      if (React.isValidElement(child) && child.props.nestedItems && child.props.nestedItems.length > 0) {
        return child.props.nestedItems.reduce(this.hasSelectedDescendant, previousValue);
      }
      return previousValue || this.isChildSelected(child, this.props);
    };

    isChildSelected(child, props) {
      return props.value === child.props.value;
    }

    handleItemTouchTap = (event, item) => {
      const itemValue = item.props.value;

      if (itemValue !== this.props.value) {
        this.props.onChange(event, itemValue);
      }
    };

    render() {
      const {
        children,
        selectedItemStyle,
        ...other,
      } = this.props;

      this.keyIndex = 0;
      const styles = {};

      if (!selectedItemStyle) {
        const textColor = this.context.muiTheme.baseTheme.palette.textColor;
        styles.backgroundColor = fade(textColor, 0.2);
      }

      return (
        <Component {...other} {...this.state}>
          {React.Children.map(children, (child) => (
            this.extendChild(child, styles, selectedItemStyle))
          )}
        </Component>
      );
    }
  };
};

export default MakeSelectable;
