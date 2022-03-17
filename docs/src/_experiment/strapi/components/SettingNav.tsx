import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import HistoryEdu from '@mui/icons-material/HistoryEdu';
import Apps from '@mui/icons-material/Apps';
import VpnKey from '@mui/icons-material/VpnKey';
import Webhook from '@mui/icons-material/Webhook';
import Visibility from '@mui/icons-material/Visibility';
import Person from '@mui/icons-material/Person';

export default function SettingNav({ activeIndex }: { activeIndex?: number }) {
  const activate = (index: number) => {
    const selected = index === activeIndex;
    if (typeof activeIndex !== 'number' || !selected) {
      return {};
    }
    return {
      selected: true,
      variant: 'light' as const,
    };
  };
  return (
    <Box
      sx={{
        width: 230,
        borderRight: '1px solid',
        borderColor: 'neutral.outlinedBorder',
      }}
    >
      <nav aria-labelledby="settings">
        <Box sx={{ py: '1.5rem', px: '1.5rem' }}>
          <Typography id="settings" level="header2">
            <b>Settings</b>
          </Typography>
        </Box>
        <Box
          sx={{
            ml: '1.5rem',
            borderBottom: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            width: '24px',
          }}
        />
        <List
          aria-labelledby="settings"
          size="sm"
          sx={{
            mt: 2,
            pl: '22px',
            '--List-background': 'initial',
            '--List-nestedInsetStart': '0px',
            '--List-gap': '16px',
            '--List-decorator-width': '26px',
            '& .MuiListItemButton-root.Mui-selected': {
              borderRight: '2px solid',
              borderColor: 'currentColor',
            },
          }}
        >
          <ListItem nested>
            <ListItem
              id="global-settings"
              component="div"
              sx={{ typography: 'tableLabel', color: 'text.secondary', mb: 0.5 }}
            >
              Global settings
            </ListItem>
            <List aria-labelledby="global-settings" sx={{ '--List-gap': '0px' }}>
              <ListItem>
                <ListItemButton {...activate(0)}>
                  <ListItemDecorator>
                    <Apps />
                  </ListItemDecorator>
                  Application
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(1)}>
                  <ListItemDecorator>
                    <VpnKey />
                  </ListItemDecorator>
                  API Tokens
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(2)}>
                  <ListItemDecorator>
                    <HistoryEdu />
                  </ListItemDecorator>
                  Content manager
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(3)}>
                  <ListItemDecorator>
                    <Webhook />
                  </ListItemDecorator>
                  Webhooks
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested>
            <ListItem
              id="admin-panel"
              component="div"
              sx={{ typography: 'tableLabel', color: 'text.secondary', mb: 0.5 }}
            >
              Administration panel
            </ListItem>
            <List aria-labelledby="admin-panel" sx={{ '--List-gap': '0px' }}>
              <ListItem>
                <ListItemButton {...activate(4)}>
                  <ListItemDecorator>
                    <Visibility />
                  </ListItemDecorator>
                  Roles
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton {...activate(5)}>
                  <ListItemDecorator>
                    <Person />
                  </ListItemDecorator>
                  Users
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
