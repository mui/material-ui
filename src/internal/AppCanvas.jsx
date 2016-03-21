import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

const AppCanvas = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
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

  render() {
    const {
      baseTheme,
      prepareStyles,
    } = this.state.muiTheme;

    const styles = {
      height: '100%',
      color: baseTheme.palette.textColor,
      backgroundColor: baseTheme.palette.canvasColor,
      direction: 'ltr',
    };

    const newChildren = React.Children.map(this.props.children, (currentChild) => {
      if (!currentChild) { // If undefined, skip it
        return null;
      }

      switch (currentChild.type.displayName) {
        case 'AppBar' :
          return React.cloneElement(currentChild, {
            style: Object.assign({}, currentChild.props.style, {
              position: 'fixed',
            }),
          });
        default:
          return currentChild;
      }
    }, this);

    return (
      <div style={prepareStyles(styles)}>
        {newChildren}
      </div>
    );
  },

});

export default AppCanvas;
