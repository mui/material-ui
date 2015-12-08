import React from 'react';
import StylePropable from './mixins/style-propable';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import {mixin} from 'core-decorators';

@mixin(StylePropable)
export default class AppCanvas extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      muiTheme: context.muiTheme
        ? context.muiTheme
        : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  }

  //for passing default theme context to children
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  }

  static contextTypes = {
    muiTheme: React.PropTypes.object,
  }

  static propTypes = {
    children: React.PropTypes.node,
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  }

  render() {
    let styles = {
      height: '100%',
      backgroundColor: this.state.muiTheme.rawTheme.palette.canvasColor,
      WebkitFontSmoothing: 'antialiased',
      direction: 'ltr',
    };

    let newChildren = React.Children.map(this.props.children, (currentChild) => {
      if (!currentChild) { // If undefined, skip it
        return null;
      }

      switch (currentChild.type.displayName) {
        case 'AppBar' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(currentChild.props.style, {
              position: 'fixed',
            }),
          });
        default:
          return currentChild;
      }
    }, this);

    return (
      <div style={this.prepareStyles(styles)}>
        {newChildren}
      </div>
    );
  }
}
