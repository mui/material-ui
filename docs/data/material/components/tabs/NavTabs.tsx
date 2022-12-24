import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface LinkTabProps {
  label?: string;
  href?: string;
  metaKeyPressed?: boolean;
}

function LinkTab({ metaKeyPressed, ...props }: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!metaKeyPressed) {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
  const [metaKeyPressed, setMetaKeyPressed] = React.useState(false);

  React.useEffect(() => {
    const trackMetaKey = (event: KeyboardEvent, keyDirection: 'up' | 'down') => {
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
