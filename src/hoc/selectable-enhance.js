import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';
import ColorManipulator from '../utils/color-manipulator';

export const SelectableContainerEnhance = (Component) => {
  const composed = React.createClass({

    displayName: `Selectable${Component.displayName}`,

    propTypes: {
      children: React.PropTypes.node,
      selectedItemStyle: React.PropTypes.object,
      valueLink: React.PropTypes.shape({
        value: React.PropTypes.any,
        requestChange: React.PropTypes.func,
      }).isRequired,
    },

    contextTypes: {
      muiTheme: React.PropTypes.object,
    },

    childContextTypes: {
      muiTheme: React.PropTypes.object,
    },

    getInitialState() {
      return {
        muiTheme: this.context.muiTheme || getMuiTheme(),
      };
    },

    getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
      };
    },

    componentWillReceiveProps(nextProps, nextContext) {
      this.setState({
        muiTheme: nextContext.muiTheme || this.state.muiTheme,
      });
    },

    getValueLink: function(props) {
      return props.valueLink || {
        value: props.value,
        requestChange: props.onChange,
      };
    },

    extendChild(child, styles, selectedItemStyle) {
      if (child && child.type && child.type.displayName === 'ListItem') {
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
    },

    isInitiallyOpen(child) {
      if (child.props.initiallyOpen) {
        return child.props.initiallyOpen;
      }
      return this.hasSelectedDescendant(false, child);
    },

    hasSelectedDescendant(previousValue, child) {
      if (React.isValidElement(child) && child.props.nestedItems && child.props.nestedItems.length > 0) {
        return child.props.nestedItems.reduce(this.hasSelectedDescendant, previousValue);
      }
      return previousValue || this.isChildSelected(child, this.props);
    },

    isChildSelected(child, props) {
      const itemValue = this.getValueLink(props).value;
      const childValue = child.props.value;

      return (itemValue === childValue);
    },

    handleItemTouchTap(event, item) {
      const valueLink = this.getValueLink(this.props);
      const itemValue = item.props.value;
      const menuValue = valueLink.value;
      if ( itemValue !== menuValue) {
        valueLink.requestChange(event, itemValue);
      }
    },

    render() {
      const {children, selectedItemStyle} = this.props;
      this.keyIndex = 0;
      let styles = {};

      if (!selectedItemStyle) {
        const textColor = this.state.muiTheme.rawTheme.palette.textColor;
        const selectedColor = ColorManipulator.fade(textColor, 0.2);
        styles = {
          backgroundColor: selectedColor,
        };
      }

      const newChildren = React.Children.map(children, (child) => this.extendChild(child, styles, selectedItemStyle));

      return (
        <Component {...this.props} {...this.state}>
          {newChildren}
        </Component>
      );
    },
  });

  return composed;
};

export default SelectableContainerEnhance;
