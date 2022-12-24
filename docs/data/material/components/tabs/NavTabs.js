import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LinkTab({ ctrlPressed, ...props }) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        if (!ctrlPressed) {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  ctrlPressed: PropTypes.bool,
};

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
  const [ctrlPressed, setCtrlPressed] = React.useState(false);

  React.useEffect(() => {
    const trackMetaKey = (event) => {
      console.log(event.key);
      if (['Control', 'Meta', 'Alt'].includes(event.key)) {
        if (event.type === 'keyup') {
          setCtrlPressed(false);
        }
        if (event.type === 'keydown') {
          setCtrlPressed(true);
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
        <LinkTab ctrlPressed={ctrlPressed} label="Page One" href="/drafts" />
        <LinkTab ctrlPressed={ctrlPressed} label="Page Two" href="/trash" />
        <LinkTab ctrlPressed={ctrlPressed} label="Page Three" href="/spam" />
      </Tabs>
    </Box>
  );
}
