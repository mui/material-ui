import React from 'react';
import AppBar from 'material-ui/app-bar';
import IconButton from 'material-ui/icon-button';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/flat-button';

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const AppBarExampleIconButton = () => {
  return (
    <AppBar
      title={<span style={styles.title} onTouchTap={handleTouchTap}>Title</span>}
      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
      iconElementRight={<FlatButton label="Save" />}
    />
 );
};

export default AppBarExampleIconButton;
