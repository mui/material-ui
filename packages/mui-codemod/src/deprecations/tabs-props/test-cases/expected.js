import Tabs from '@mui/material/Tabs';
import { Tabs as MyTabs } from '@mui/material';

<Tabs
  slots={{
    scrollButton: CustomScrollButton
  }}
  slotProps={{
    scrollButton: { disableRipple: true },
    indicator: { className: 'indicator' }
  }} />;

<MyTabs
  slots={{
    scrollButton: CustomScrollButton
  }}
  slotProps={{
    scrollButton: { disableRipple: true },
    indicator: { className: 'indicator' }
  }} />;

<CustomTabs
  ScrollButtonComponent={CustomScrollButton}
  TabScrollButtonProps={{ disableRipple: true }}
  TabIndicatorProps={{ className: 'indicator' }}
/>;
