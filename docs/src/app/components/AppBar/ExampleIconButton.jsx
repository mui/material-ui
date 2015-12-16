import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const AppBarExampleIconButton = React.createClass({
  render() {
    return (
      <AppBar
        title={<span style={styles.title} onTouchTap={handleTouchTap}>Title</span>}
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={<FlatButton label="Save" />}
      />
   );
  },
});

export default AppBarExampleIconButton;
