import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Tabs, TabsOwnProps } from '@mui/base/Tabs';
import { TabsList as TabListBase } from '@mui/base/TabsList';
import { TabPanel as TabPanelBase } from '@mui/base/TabPanel';
import { Tab as TabBase } from '@mui/base/Tab';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

export const TabList = styled(TabListBase)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(0.5),
  borderLeft: '1px solid',
  borderRight: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: alpha((theme.vars || theme).palette.grey[50], 0.2),
  ...theme.applyDarkStyles({
    backgroundColor: alpha((theme.vars || theme).palette.primaryDark[800], 0.2),
  }),
}));

export const TabPanel = styled(TabPanelBase)<{ ownerState: { mounted: boolean } }>(
  ({ ownerState }) => ({
    marginTop: -1,
    '& pre': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      '& code': {
        opacity: ownerState.mounted ? 1 : 0,
      },
    },
  }),
);

export const Tab = styled(TabBase)(({ theme }) => ({
  padding: '6px',
  border: 'none',
  background: 'transparent',
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightSemiBold,
  fontFamily: theme.typography.fontFamily,
  color: (theme.vars || theme).palette.text.tertiary,
  letterSpacing: '0.2px',
  outline: 'none',
  minWidth: 52,
  borderRadius: '8px',
  position: 'relative',
  transition: 'background, color, 100ms ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[100], 0.5),
    color: (theme.vars || theme).palette.text.secondary,
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineOffset: '-2px',
    outlineColor: (theme.vars || theme).palette.primary.light,
  },
  ...theme.applyDarkStyles({
    '&:hover': {
      backgroundColor: alpha((theme.vars || theme).palette.primaryDark[700], 0.6),
      color: (theme.vars || theme).palette.grey[400],
    },
  }),
}));

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
      <TabList>
        {tabs.map(({ tab }) => (
          <Tab ownerState={ownerState} key={tab} value={tab}>
            {tab}
          </Tab>
        ))}
      </TabList>
      {tabs.map(({ tab, language, code }) => (
        <TabPanel ownerState={ownerState} key={tab} value={tab}>
          <HighlightedCode
            // @ts-ignore
            language={language || 'bash'}
            code={typeof code === 'function' ? code(tab) : code}
          />
        </TabPanel>
      ))}
    </Tabs>
  );
}
