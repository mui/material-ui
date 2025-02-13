import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export default function TabsIcon() {
  return (
    <Tabs aria-label="Icon tabs" defaultValue={0}>
      <TabList>
        <Tab>
          <PhoneIcon />
        </Tab>
        <Tab>
          <FavoriteIcon />
        </Tab>
        <Tab>
          <PersonPinIcon />
        </Tab>
      </TabList>
    </Tabs>
  );
}
