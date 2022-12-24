import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LinkTab({ metaKeyPressed, ...props }) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        if (!metaKeyPressed) {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  metaKeyPressed: PropTypes.bool,
};

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
  const [metaKeyPressed, setMetaKeyPressed] = React.useState(false);

  React.useEffect(() => {
    const trackMetaKey = (event, keyDirection) => {
      if (event.ctrlKey || event.metaKey) {
        if (keyDirection === 'down') {
          setMetaKeyPressed(true);
        }
        if (keyDirection === 'up') {
          setMetaKeyPressed(false);
        }
      }
    };

    document.addEventListener('keydown', (event) => trackMetaKey(event, 'down'));
    document.addEventListener('keyup', (event) => trackMetaKey(event, 'up'));

    return () => {
      document.removeEventListener('keydown', (event) =>
        trackMetaKey(event, 'down'),
      );

      document.removeEventListener('keyup', (event) => trackMetaKey(event, 'up'));
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab metaKeyPressed={metaKeyPressed} label="Page One" href="/drafts" />
        <LinkTab metaKeyPressed={metaKeyPressed} label="Page Two" href="/trash" />
        <LinkTab metaKeyPressed={metaKeyPressed} label="Page Three" href="/spam" />
      </Tabs>
    </Box>
  );
}
