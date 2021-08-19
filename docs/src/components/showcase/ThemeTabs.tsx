import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function ThemeTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="theme example" variant="fullWidth">
      <Tab label="Yesterday" />
      <Tab label="Today" />
      <Tab label="Tomorrow" />
    </Tabs>
  );
}
