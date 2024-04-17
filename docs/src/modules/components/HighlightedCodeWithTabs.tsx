import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Tabs, TabsOwnProps } from '@mui/base/Tabs';
import { TabsList as TabsListBase } from '@mui/base/TabsList';
import { TabPanel as TabPanelBase } from '@mui/base/TabPanel';
import { Tab as TabBase } from '@mui/base/Tab';
import useLocalStorageState from '@mui/utils/useLocalStorageState';
import HighlightedCode from './HighlightedCode';

const TabList = styled(TabsListBase)(({ theme }) => ({
  padding: 6,
  display: 'flex',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.primaryDark[700],
  backgroundColor: (theme.vars || theme).palette.primaryDark[900],
  borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
  borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
  ...theme.applyDarkStyles({
    backgroundColor: alpha(theme.palette.primaryDark[800], 0.5),
  }),
}));

const TabPanel = styled(TabPanelBase)<{ ownerState: { mounted: boolean } }>(({ ownerState }) => ({
  '& pre': {
    marginTop: -1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '& code': {
      opacity: ownerState.mounted ? 1 : 0,
    },
  },
}));

const Tab = styled(TabBase)<{ ownerState: { mounted: boolean } }>(({ theme, ownerState }) =>
  theme.unstable_sx({
    p: 0.8,
    border: 'none',
    bgcolor: 'transparent',
    color: (theme.vars || theme).palette.grey[500],
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightSemiBold,
    fontFamily: theme.typography.fontFamilyCode,
    outline: 'none',
    minWidth: 52,
    cursor: 'pointer',
    borderRadius: '8px',
    position: 'relative',
    '&:not(:first-of-type)': {
      marginLeft: 0.5,
    },
    ...(ownerState.mounted && {
      '&.base--selected': {
        color: '#FFF',
        '&::after': {
          content: "''",
          position: 'absolute',
          left: 0,
          bottom: '-6px',
          height: 2,
          width: '100%',
          bgcolor: (theme.vars || theme).palette.primary.light,
        },
      },
    }),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primaryDark[500], 0.5),
    },
    '&:focus-visible': {
      outline: '2px solid',
      outlineOffset: '-2px',
      outlineColor: (theme.vars || theme).palette.primary.light,
    },
  }),
);

type TabsConfig = {
  code: string | ((tab: string) => string);
  language: string;
  tab: string;
};

export default function HighlightedCodeWithTabs(
  props: {
    tabs: Array<TabsConfig>;
    storageKey?: string;
  } & Record<string, any>,
) {
  const { tabs, storageKey } = props;
  const availableTabs = React.useMemo(() => tabs.map(({ tab }) => tab), [tabs]);
  const [activeTab, setActiveTab] = useLocalStorageState(storageKey ?? null, availableTabs[0]);
  // During hydration, activeTab is null, default to first value.
  const value = activeTab ?? availableTabs[0];

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange: TabsOwnProps['onChange'] = (event, newValue) => {
    setActiveTab(newValue as string);
  };

  const ownerState = { mounted };
  return (
    <Tabs selectionFollowsFocus value={value} onChange={handleChange}>
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
