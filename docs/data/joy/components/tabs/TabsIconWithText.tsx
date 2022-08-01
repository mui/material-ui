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
    <Tabs aria-label="Icon tabs" defaultValue={0}>
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
  );
}
