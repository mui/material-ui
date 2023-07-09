import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Tabs, { TabsOwnProps } from '@mui/base/Tabs';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tab from '@mui/base/Tab';
import HighlightedCode from './HighlightedCode';

const StyledTabList = styled(TabsList)(({ theme }) => ({
  display: 'flex',
  backgroundColor: (theme.vars || theme).palette.primaryDark[600],
  borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
  borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
  ...theme.applyDarkStyles({
    backgroundColor: (theme.vars || theme).palette.primaryDark[700],
  }),
}));

const StyledTabPanel = styled(TabPanel)<{ ownerState: { mounted: boolean } }>(({ ownerState }) => ({
  '& pre': {
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '& code': {
      opacity: ownerState.mounted ? 1 : 0,
    },
  },
}));

const StyledTab = styled(Tab)<{ ownerState: { mounted: boolean } }>(({ theme, ownerState }) =>
  theme.unstable_sx({
    py: 1.5,
    px: 2,
    border: 'none',
    borderBottom: '2px solid transparent',
    bgcolor: 'primaryDark.800',
    color: 'rgba(255 255 255 / 0.6)',
    fontSize: '0.75rem',
    fontWeight: 'semiBold',
    fontFamily: theme.typography.fontFamilyCode,
    outline: 'none',
    minWidth: 80,
    cursor: 'pointer',
    '&:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */':
      {
        borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
      },
    '&:not(:first-child)': {
      marginLeft: '1px',
    },
    '&:last-child': {
      borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
    },
    ...(ownerState.mounted && {
      '&.Mui-selected': {
        color: '#fff',
        borderColor: (theme.vars || theme).palette.primary.light,
      },
    }),
    '&:hover': {
      backgroundColor: 'rgba(255 255 255 / 0.08)',
    },
    '&:focus-visible': {
      outline: '2px solid',
      outlineOffset: '-2px',
      outlineColor: (theme.vars || theme).palette.primary.main,
    },
  }),
);

type TabsConfig = {
  code: string | ((tab: string) => string);
  language: string;
  tab: string;
};
export default function HighlightedCodeWithTabs({
  tabs,
  storageKey,
}: {
  tabs: Array<TabsConfig>;
  storageKey?: string;
} & Record<string, any>) {
  const availableTabs = React.useMemo(() => tabs.map(({ tab }) => tab), [tabs]);
  const [activeTab, setActiveTab] = React.useState(availableTabs[0]);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      setActiveTab((prev) => {
        if (storageKey === undefined) {
          return prev;
        }
        const storedValues = localStorage.getItem(storageKey);

        return storedValues && availableTabs.includes(storedValues) ? storedValues : prev;
      });
    } catch (error) {
      // ignore error
    }
    setMounted(true);
  }, [availableTabs, storageKey]);

  const handleChange: TabsOwnProps['onChange'] = (event, newValue) => {
    setActiveTab(newValue as string);
    if (storageKey === undefined) {
      return;
    }
    try {
      localStorage.setItem(storageKey, newValue as string);
    } catch (error) {
      // ignore error
    }
  };

  const ownerState = { mounted };
  return (
    <Tabs selectionFollowsFocus value={activeTab} onChange={handleChange}>
      <StyledTabList>
        {tabs.map(({ tab }) => (
          <StyledTab ownerState={ownerState} key={tab} value={tab}>
            {tab}
          </StyledTab>
        ))}
        <Box sx={{ ml: 'auto' }} />
      </StyledTabList>
      {tabs.map(({ tab, language, code }) => (
        <StyledTabPanel ownerState={ownerState} key={tab} value={tab}>
          <HighlightedCode
            // @ts-ignore
            language={language || 'bash'}
            code={typeof code === 'function' ? code(tab) : code}
          />
        </StyledTabPanel>
      ))}
    </Tabs>
  );
}
