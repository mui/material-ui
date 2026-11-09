import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const theme = createTheme({
  focusVisible: {
    outlineWidth: 2,
    outlineOffset: 1,
    boxShadow: '0 0 0 1px #fff',
    insetOverrides: {
      boxShadow: 'inset 0 0 0 3px #fff',
    },
  },
  colorSchemes: { light: true, dark: true },
  // These demos opt out of the ripple, so the focus ring is the only keyboard indicator.
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function FocusVisibleInsetOverrides() {
  // @focus-start @padding 1
  const [tab, setTab] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Press <kbd>Tab</kbd> and the arrow keys.
        </Typography>
        <Card sx={{ width: '100%', maxWidth: 360 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label="Settings sections"
          >
            <Tab label="Account" />
            <Tab label="Notifications" />
          </Tabs>
          <Divider />
          <List component="nav" aria-label="Account settings">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Security" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Billing" />
            </ListItemButton>
          </List>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained">Save</Button>
          </CardActions>
        </Card>
      </Stack>
    </ThemeProvider>
  );
  // @focus-end
}
