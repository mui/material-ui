import React from 'react';
import StylePropable from '../mixins/style-propable';
import ColorManipulator from '../utils/color-manipulator';
import muiThemeable from '../muiThemeable';

const SelectableContainerEnhance = (Component) => {
  let composed = React.createClass({

    mixins: [
      StylePropable,
    ],

    displayName: `Selectable${Component.displayName}`,

    propTypes: {
      /**
       * The MUI Theme to use to render this component with.
       */
      _muiTheme: React.PropTypes.object.isRequired,

      children: React.PropTypes.node,
      selectedItemStyle: React.PropTypes.object,
      valueLink: React.PropTypes.shape({
        value: React.PropTypes.any,
        requestChange: React.PropTypes.func,
      }).isRequired,
    },

    getValueLink: function(props) {
      return props.valueLink || {
        value: props.value,
        requestChange: props.onChange,
      };
    },

    render() {
      const {children, selectedItemStyle} = this.props;
      let listItems;
      let keyIndex = 0;
      let styles = {};

      if (!selectedItemStyle) {
        let textColor = this.props._muiTheme.baseTheme.palette.textColor;
        let selectedColor = ColorManipulator.fade(textColor, 0.2);
        styles = {
          backgroundColor: selectedColor,
        };
      }

      listItems = React.Children.map(children, (child) => {
        if (child.type.displayName === 'ListItem') {
          let selected = this._isChildSelected(child, this.props);
          let selectedChildrenStyles = {};
          if (selected) {
            selectedChildrenStyles = this.mergeStyles(styles, selectedItemStyle);
          }

          let mergedChildrenStyles = this.mergeStyles(
            child.props.style || {},
            selectedChildrenStyles
          );

          keyIndex += 1;

          return React.cloneElement(child, {
            onTouchTap: (e) => {
              this._handleItemTouchTap(e, child);
              if (child.props.onTouchTap) { child.props.onTouchTap(e); }
            },
            key: keyIndex,
            style: mergedChildrenStyles,
          });
        }
        else {
          return child;
        }
      });
      let newChildren = listItems;

      return (
        <Component {...this.props} {...this.state}>
          {newChildren}
        </Component>
      );
    },

    _isChildSelected(child, props) {
      let itemValue = this.getValueLink(props).value;
      let childValue = child.props.value;

      return (itemValue && itemValue === childValue);
    },

    _handleItemTouchTap(e, item) {
      let valueLink = this.getValueLink(this.props);
      let itemValue = item.props.value;
      let menuValue = valueLink.value;
      if ( itemValue !== menuValue) {
        valueLink.requestChange(e, itemValue);
      }
    },
  });

  composed = muiThemeable(composed);

  return composed;
};

export default SelectableContainerEnhance;
