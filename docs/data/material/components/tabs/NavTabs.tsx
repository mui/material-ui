import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return <Tab component="a" {...props} />;
}

export default function NavTabs() {
  const tabValues = {
    drafts: 0,
    trash: 1,
    spam: 2,
  };

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const value = (new URLSearchParams(window.location.search).get('tab') ||
    'drafts') as keyof typeof tabValues;

  const redirectUrl = (tab: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('tab', tab);
    return `${window.location.pathname}?${searchParams}${window.location.hash}`;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabValues[value]} aria-label="nav tabs example">
        <LinkTab label="Page One" href={redirectUrl('drafts')} />
        <LinkTab label="Page Two" href={redirectUrl('trash')} />
        <LinkTab label="Page Three" href={redirectUrl('spam')} />
      </Tabs>
    </Box>
  );
}
