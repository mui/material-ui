import React from 'react';
import ThemeManager from '../styles/theme-manager';
import StylePropable from '../mixins/style-propable';
import ColorManipulator from '../utils/color-manipulator';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';

export const SelectableContainerEnhance = (Component) => {
  const composed = React.createClass({

    mixins: [
      StylePropable,
    ],

    contextTypes: {
      muiTheme: React.PropTypes.object,
    },

    displayName: `Selectable${Component.displayName}`,

    propTypes: {
      children: React.PropTypes.node,
      selectedItemStyle: React.PropTypes.object,
      valueLink: React.PropTypes.shape({
        value: React.PropTypes.any,
        requestChange: React.PropTypes.func,
      }).isRequired,
    },

    childContextTypes: {
      muiTheme: React.PropTypes.object,
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

    getInitialState() {
      return {
        muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      };
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
        let textColor = this.state.muiTheme.rawTheme.palette.textColor;
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

  return composed;
};

