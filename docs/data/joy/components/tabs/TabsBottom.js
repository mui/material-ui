import * as React from 'react';
import Box from '@mui/joy/Box';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export default function TabsBottom() {
  return (
    <Box
      sx={{
        height: 160,
        width: 300,
        borderRadius: 'sm',
        border: '3px solid',
        borderColor: 'background.level3',
        bgcolor: 'background.level1',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Tabs
        aria-label="Bottom tabs"
        flip
        size="sm"
        defaultValue={0}
        sx={{ position: 'absolute', bottom: 0, width: '100%' }}
      >
        <TabList>
          <Tab orientation="vertical">
            <ListItemDecorator>
              <PhoneIcon />
            </ListItemDecorator>
            Recents
          </Tab>
          <Tab orientation="vertical">
            <ListItemDecorator>
              <FavoriteIcon />
            </ListItemDecorator>
            Favorite
          </Tab>
          <Tab orientation="vertical">
            <ListItemDecorator>
              <PersonPinIcon />
            </ListItemDecorator>
            Nearby
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
