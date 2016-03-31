import React from 'react';

class AppCanvas extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  render() {
    const {
      baseTheme,
      prepareStyles,
    } = this.context.muiTheme;

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

      switch (currentChild.type.muiName) {
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
  }
}

export default AppCanvas;
