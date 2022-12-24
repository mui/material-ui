import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LinkTab({ modifierKeyPressed, ...props }) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        if (!modifierKeyPressed) {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  modifierKeyPressed: PropTypes.bool,
};

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
  const [modifierKeyPressed, setModifierKeyPressed] = React.useState(false);

  React.useEffect(() => {
    const trackMetaKey = (event) => {
      if (['Control', 'Meta', 'Alt'].includes(event.key)) {
        if (event.type === 'keyup') {
          setModifierKeyPressed(false);
        }
        if (event.type === 'keydown') {
          setModifierKeyPressed(true);
        }
      }
    };

    document.addEventListener('keydown', trackMetaKey);
    document.addEventListener('keyup', trackMetaKey);

    return () => {
      document.removeEventListener('keydown', trackMetaKey);
      document.removeEventListener('keyup', trackMetaKey);
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab
          modifierKeyPressed={modifierKeyPressed}
          label="Page One"
          href="/drafts"
        />
        <LinkTab
          modifierKeyPressed={modifierKeyPressed}
          label="Page Two"
          href="/trash"
        />
        <LinkTab
          modifierKeyPressed={modifierKeyPressed}
          label="Page Three"
          href="/spam"
        />
      </Tabs>
    </Box>
  );
}
