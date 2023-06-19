import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TabsUnstyled, { TabsUnstyledOwnProps } from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import HighlightedCode from './HighlightedCode';

const StyledTabList = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: (theme.vars || theme).palette.primaryDark[600],
  borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
  borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
  ...theme.applyDarkStyles({
    backgroundColor: (theme.vars || theme).palette.primaryDark[700],
  }),
}));

const StyledTabPanel = styled('div')<{ ownerState: { mounted: boolean } }>(({ ownerState }) => ({
  '& pre': {
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '& code': {
      opacity: ownerState.mounted ? 1 : 0,
    },
  },
}));

const StyledTab = styled('button')<{ ownerState: { mounted: boolean } }>(({ theme, ownerState }) =>
  theme.unstable_sx({
    py: 1.5,
    px: 2,
    border: 'none',
    borderBottom: '2px solid transparent',
    bgcolor: 'primaryDark.800',
    color: 'rgba(255 255 255 / 0.6)',
    fontSize: '0.75rem',
    fontWeight: 600,
    fontFamily: theme.typography.fontFamilyCode,
    outline: 'none',
    minWidth: 80,
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
      '&[aria-selected="true"]': {
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

const STORAGE_KEY = 'package-manager';

type TabsConfig = {
  code: string | ((tab: string) => string);
  language: string;
  tab: string;
};
export default function HighlightedCodeWithTabs({
  tabs,
}: {
  tabs: Array<TabsConfig>;
} & Record<string, any>) {
  const availableTabs = tabs.map(({ tab }) => tab);

  const [activeTab, setActiveTab] = React.useState(tabs[0]?.tab);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      setActiveTab((prev) => {
        const storedValues = localStorage.getItem(STORAGE_KEY);

        return storedValues && availableTabs.includes(storedValues) ? storedValues : prev;
      });
    } catch (error) {
      // ignore error
    }
    setMounted(true);
  }, [availableTabs]);

  const handleChange: TabsUnstyledOwnProps['onChange'] = (event, newValue) => {
    setActiveTab(newValue as string);
    try {
      localStorage.setItem(STORAGE_KEY, newValue as string);
    } catch (error) {
      // ignore error
    }
  };

  const ownerState = { mounted };
  return (
    <TabsUnstyled selectionFollowsFocus value={activeTab} onChange={handleChange}>
      <TabsListUnstyled slots={{ root: StyledTabList }}>
        {tabs.map(({ tab }) => (
          <TabUnstyled
            slots={{ root: StyledTab }}
            // @ts-ignore
            slotProps={{ root: { ownerState } }}
            key={tab}
            value={tab}
          >
            {tab}
          </TabUnstyled>
        ))}
        <Box sx={{ ml: 'auto' }} />
      </TabsListUnstyled>
      {tabs.map(({ tab, language, code }) => (
        <TabPanelUnstyled
          slots={{ root: StyledTabPanel }}
          // @ts-ignore
          slotProps={{ root: { ownerState } }}
          key={tab}
          value={tab}
        >
          <HighlightedCode
            // @ts-ignore
            language={language || 'bash'}
            code={typeof code === 'function' ? code(tab) : code}
          />
        </TabPanelUnstyled>
      ))}
    </TabsUnstyled>
  );
}
