import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';
import StylePropable from '../mixins/style-propable';
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

    mixins: [
      StylePropable,
    ],

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
      let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
      this.setState({muiTheme: newMuiTheme});
    },

    getValueLink: function(props) {
      return props.valueLink || {
        value: props.value,
        requestChange: props.onChange,
      };
    },

    extendChild(child, styles, selectedItemStyle) {
      if (child && child.type && child.type.displayName === 'ListItem') {
        let selected = this.isChildSelected(child, this.props);
        let selectedChildrenStyles = {};
        if (selected) {
          selectedChildrenStyles = this.mergeStyles(styles, selectedItemStyle);
        }

        let mergedChildrenStyles = this.mergeStyles(child.props.style || {}, selectedChildrenStyles);

        this.keyIndex += 1;

        return React.cloneElement(child, {
          onTouchTap: (e) => {
            this.handleItemTouchTap(e, child);
            if (child.props.onTouchTap) {
              child.props.onTouchTap(e);
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
      let itemValue = this.getValueLink(props).value;
      let childValue = child.props.value;

      return (itemValue === childValue);
    },

    handleItemTouchTap(e, item) {
      let valueLink = this.getValueLink(this.props);
      let itemValue = item.props.value;
      let menuValue = valueLink.value;
      if ( itemValue !== menuValue) {
        valueLink.requestChange(e, itemValue);
      }
    },

    render() {
      const {children, selectedItemStyle} = this.props;
      this.keyIndex = 0;
      let styles = {};

      if (!selectedItemStyle) {
        let textColor = this.state.muiTheme.rawTheme.palette.textColor;
        let selectedColor = ColorManipulator.fade(textColor, 0.2);
        styles = {
          backgroundColor: selectedColor,
        };
      }

      let newChildren = React.Children.map(children, (child) => this.extendChild(child, styles, selectedItemStyle));

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
