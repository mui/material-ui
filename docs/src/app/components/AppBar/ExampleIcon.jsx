import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

const AppBarExampleIcon = React.createClass({
  render() {
    return (
      <AppBar
        title="Title"
        position="static"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  },
});

export default AppBarExampleIcon;
