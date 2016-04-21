import React, {Component, PropTypes} from 'react';
import {fade} from '../utils/colorManipulator';
import deprecated from '../utils/deprecatedPropType';

export const MakeSelectable = (Component) => {
  return class extends Component {
    static propTypes = {
      children: PropTypes.node,
      onChange: PropTypes.func,
      selectedItemStyle: PropTypes.object,
      value: PropTypes.any,
      valueLink: deprecated(PropTypes.shape({
        value: PropTypes.any,
        requestChange: PropTypes.func,
      }), 'This property is deprecated due to his low popularity. Use the value and onChange property.'),
    };

    static contextTypes = {
      muiTheme: PropTypes.object.isRequired,
    };

    getValueLink(props) {
      return props.valueLink || {
        value: props.value,
        requestChange: props.onChange,
      };
    }

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
      return this.getValueLink(props).value === child.props.value;
    }

    handleItemTouchTap = (event, item) => {
      const valueLink = this.getValueLink(this.props);
      const itemValue = item.props.value;

      if (itemValue !== valueLink.value) {
        valueLink.requestChange(event, itemValue);
      }
    };

    render() {
      const {
        children,
        selectedItemStyle,
      } = this.props;

      this.keyIndex = 0;
      const styles = {};

      if (!selectedItemStyle) {
        const textColor = this.context.muiTheme.baseTheme.palette.textColor;
        styles.backgroundColor = fade(textColor, 0.2);
      }

      return (
        <Component {...this.props} {...this.state}>
          {React.Children.map(children, (child) => (
            this.extendChild(child, styles, selectedItemStyle))
          )}
        </Component>
      );
    }
  };
};

export default MakeSelectable;
