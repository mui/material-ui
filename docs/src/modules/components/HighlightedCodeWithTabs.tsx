import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Tabs, TabsOwnProps } from '@mui/base/Tabs';
import { TabsList as TabsListBase } from '@mui/base/TabsList';
import { TabPanel as TabPanelBase } from '@mui/base/TabPanel';
import { Tab as TabBase } from '@mui/base/Tab';
import useLocalStorageState from '@mui/utils/useLocalStorageState';
import HighlightedCode from './HighlightedCode';

export const CodeTabList = styled(TabsListBase)<{
  ownerState: { mounted: boolean; contained?: boolean };
}>(({ theme, ownerState }) => ({
  padding: ownerState?.contained ? theme.spacing(1.5, 1) : theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(0.5),
  borderLeft: '1px solid',
  borderRight: '1px solid',
  borderTop: ownerState?.contained ? 'none' : '1px solid',
  borderBottom: ownerState?.contained ? 'none' : '1px solid',
  borderTopLeftRadius: ownerState?.contained ? 0 : (theme.vars || theme).shape.borderRadius,
  borderTopRightRadius: ownerState?.contained ? 0 : (theme.vars || theme).shape.borderRadius,
  borderColor: ownerState?.contained
    ? (theme.vars || theme).palette.divider
    : (theme.vars || theme).palette.primaryDark[700],
  backgroundColor: ownerState?.contained
    ? alpha(theme.palette.grey[50], 0.2)
    : (theme.vars || theme).palette.primaryDark[900],
  ...theme.applyDarkStyles({
    backgroundColor: alpha(theme.palette.primaryDark[800], 0.2),
  }),
}));

export const CodeTabPanel = styled(TabPanelBase)<{
  ownerState: { mounted: boolean; contained?: boolean };
}>(({ ownerState }) => ({
  marginTop: ownerState?.contained ? -1 : 0,
  '& pre': {
    marginTop: ownerState?.contained ? 0 : -1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '& code': {
      opacity: ownerState.mounted ? 1 : 0,
    },
  },
}));

export const CodeTab = styled(TabBase)<{ ownerState: { mounted: boolean; contained?: boolean } }>(
  ({ theme, ownerState }) =>
    theme.unstable_sx({
      height: 26,
      p: '0 8px',
      border: ownerState?.contained ? '1px solid transparent' : 'none',
      bgcolor: 'transparent',
      color: ownerState?.contained
        ? (theme.vars || theme).palette.text.tertiary
        : (theme.vars || theme).palette.grey[500],
      fontSize: theme.typography.pxToRem(ownerState?.contained ? 13 : 12),
      fontFamily: ownerState?.contained
        ? theme.typography.fontFamily
        : theme.typography.fontFamilyCode,
      fontWeight: ownerState?.contained
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightBold,
      lineHeight: 1.2,
      outline: 'none',
      minWidth: 52,
      cursor: 'pointer',
      borderRadius: 99,
      position: 'relative',
      transition: ownerState?.contained ? 'background, color, 100ms ease' : 'unset',
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.divider,
      },
      '&:focus-visible': {
        outline: '3px solid',
        outlineOffset: '1px',
        outlineColor: (theme.vars || theme).palette.primary.light,
      },
      ...(!ownerState?.contained && {
        '&:hover': {
          backgroundColor: alpha(theme.palette.primaryDark[500], 0.5),
          color: (theme.vars || theme).palette.grey[400],
        },
        ...(ownerState.mounted && {
          '&.base--selected': {
            color: '#FFF',
            '&::after': {
              content: "''",
              position: 'absolute',
              left: 0,
              bottom: '-8px',
              height: 2,
              width: '100%',
              bgcolor: (theme.vars || theme).palette.primary.light,
            },
          },
        }),
      }),
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
  const defaultizedActiveTab = activeTab ?? availableTabs[0];

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange: TabsOwnProps['onChange'] = (event, newValue) => {
    setActiveTab(newValue as string);
  };

  const ownerState = { mounted };
  return (
    <Tabs selectionFollowsFocus value={defaultizedActiveTab} onChange={handleChange}>
      <CodeTabList ownerState={ownerState}>
        {tabs.map(({ tab }) => (
          <CodeTab ownerState={ownerState} key={tab} value={tab}>
            {tab}
          </CodeTab>
        ))}
      </CodeTabList>
      {tabs.map(({ tab, language, code }) => (
        <CodeTabPanel ownerState={ownerState} key={tab} value={tab}>
          <HighlightedCode
            // @ts-ignore
            language={language || 'bash'}
            code={typeof code === 'function' ? code(tab) : code}
          />
        </CodeTabPanel>
      ))}
    </Tabs>
  );
}
