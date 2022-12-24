import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface LinkTabProps {
  label?: string;
  href?: string;
  modifierKeyPressed?: boolean;
}

function LinkTab({ modifierKeyPressed, ...props }: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!modifierKeyPressed) {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
  const [modifierKeyPressed, setModifierKeyPressed] = React.useState(false);

  React.useEffect(() => {
    const trackModifierKey = (event: KeyboardEvent) => {
      if (['Control', 'Meta', 'Alt'].includes(event.key)) {
        if (event.type === 'keyup') {
          setModifierKeyPressed(false);
        }
        if (event.type === 'keydown') {
          setModifierKeyPressed(true);
        }
      }
    };

    document.addEventListener('keydown', trackModifierKey);
    document.addEventListener('keyup', trackModifierKey);

    return () => {
      document.removeEventListener('keydown', trackModifierKey);
      document.removeEventListener('keyup', trackModifierKey);
    };
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
