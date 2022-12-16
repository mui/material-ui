import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export default function TabsIconWithText() {
  return (
    <div>
      <Tabs
        aria-label="Icon tabs"
        defaultValue={0}
        sx={{ mb: 2, borderRadius: 'lg' }}
      >
        <TabList>
          <Tab>
            <ListItemDecorator>
              <PhoneIcon />
            </ListItemDecorator>
            Recents
          </Tab>
          <Tab>
            <ListItemDecorator>
              <FavoriteIcon />
            </ListItemDecorator>
            Favorite
          </Tab>
          <Tab>
            <ListItemDecorator>
              <PersonPinIcon />
            </ListItemDecorator>
            Nearby
          </Tab>
        </TabList>
      </Tabs>
      <Tabs aria-label="Icon tabs" defaultValue={0} sx={{ borderRadius: 'lg' }}>
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
    </div>
  );
}
