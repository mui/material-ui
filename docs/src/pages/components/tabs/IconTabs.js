import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

export default function IconTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
      <Tab icon={<PhoneIcon />} aria-label="phone" />
      <Tab icon={<FavoriteIcon />} aria-label="favorite" />
      <Tab icon={<PersonPinIcon />} aria-label="person" />
    </Tabs>
  );
}
