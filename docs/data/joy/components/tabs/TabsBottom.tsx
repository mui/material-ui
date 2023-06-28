import * as React from 'react';
import Box from '@mui/joy/Box';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export default function TabsBottom() {
  return (
    <Tabs
      aria-label="Bottom tabs"
      flip
      size="sm"
      defaultValue={0}
      sx={{
        height: 160,
        width: 300,
        borderRadius: 'sm',
        border: '3px solid',
        borderColor: 'background.level3',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <TabList>
        <Tab orientation="vertical" value={0}>
          <ListItemDecorator>
            <PhoneIcon />
          </ListItemDecorator>
          Recents
        </Tab>
        <Tab orientation="vertical" value={1}>
          <ListItemDecorator>
            <FavoriteIcon />
          </ListItemDecorator>
          Favorite
        </Tab>
        <Tab orientation="vertical" value={2}>
          <ListItemDecorator>
            <PersonPinIcon />
          </ListItemDecorator>
          Nearby
        </Tab>
      </TabList>
      <TabPanel value={0}>Recents tab</TabPanel>
      <TabPanel value={1}>Favorite tab</TabPanel>
      <TabPanel value={2}>Nearby tab</TabPanel>
    </Tabs>
  );
}
