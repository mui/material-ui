import Tabs from '@mui/material-v7/Tabs';
import { Tabs as MyTabs } from '@mui/material-v7';

<Tabs
  ScrollButtonComponent={CustomScrollButton}
  TabScrollButtonProps={{ disableRipple: true }}
  TabIndicatorProps={{ className: 'indicator' }}
/>;

<MyTabs
  ScrollButtonComponent={CustomScrollButton}
  TabScrollButtonProps={{ disableRipple: true }}
  TabIndicatorProps={{ className: 'indicator' }}
/>;

<Tabs
  slots={{ StartScrollButtonIcon: CustomIcon, EndScrollButtonIcon: CustomIcon2 }}
/>;

<MyTabs
  slots={{ StartScrollButtonIcon: CustomIcon }}
/>;

<CustomTabs
  ScrollButtonComponent={CustomScrollButton}
  TabScrollButtonProps={{ disableRipple: true }}
  TabIndicatorProps={{ className: 'indicator' }}
/>;
