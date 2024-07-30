import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Tabs, TabsOwnProps } from '@mui/base/Tabs';
import { TabsList as TabsListBase } from '@mui/base/TabsList';
import { TabPanel as TabPanelBase } from '@mui/base/TabPanel';
import { Tab as TabBase } from '@mui/base/Tab';
import useLocalStorageState from '@mui/utils/useLocalStorageState';
import { HighlightedCode } from '../HighlightedCode';

export const CodeTabList = styled(TabsListBase)<{
  ownerState: { mounted: boolean; contained?: boolean };
}>(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  borderLeft: '1px solid',
  borderRight: '1px solid',
  overflowX: 'auto',
  ...theme.applyDarkStyles({
    backgroundColor: alpha(theme.palette.primaryDark[800], 0.2),
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState?.contained,
      style: {
        padding: theme.spacing(1.5, 1),
      },
    },
    {
      props: ({ ownerState }) => !ownerState?.contained,
      style: {
        padding: theme.spacing(1),
      },
    },
    {
      props: ({ ownerState }) => ownerState?.contained,
      style: {
        borderTop: 'none',
      },
    },
    {
      props: ({ ownerState }) => !ownerState?.contained,
      style: {
        borderTop: '1px solid',
      },
    },
    {
      props: ({ ownerState }) => ownerState?.contained,
      style: {
        borderBottom: 'none',
      },
    },
    {
      props: ({ ownerState }) => !ownerState?.contained,
      style: {
        borderBottom: '1px solid',
      },
    },
    {
      props: ({ ownerState }) => ownerState?.contained,
      style: {
        borderTopLeftRadius: 0,
      },
    },
    {
      props: ({ ownerState }) => !ownerState?.contained,
      style: {
        borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
      },
    },
    {
      props: ({ ownerState }) => ownerState?.contained,
      style: {
        borderTopRightRadius: 0,
      },
    },
    {
      props: ({ ownerState }) => !ownerState?.contained,
      style: {
        borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
      },
    },
    {
      props: ({ ownerState }) => ownerState?.contained,
      style: {
        borderColor: (theme.vars || theme).palette.divider,
      },
    },
    {
      props: ({ ownerState }) => !ownerState?.contained,
      style: {
        borderColor: (theme.vars || theme).palette.primaryDark[700],
      },
    },
    {
      props: ({ ownerState }) => ownerState?.contained,
      style: {
        backgroundColor: alpha(theme.palette.grey[50], 0.2),
      },
    },
    {
      props: ({ ownerState }) => !ownerState?.contained,
      style: {
        backgroundColor: (theme.vars || theme).palette.primaryDark[900],
      },
    },
  ],
}));

export const CodeTabPanel = styled(TabPanelBase)<{
  ownerState: { mounted: boolean; contained?: boolean };
}>({
  '& pre': {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '& code': {},
  },
  variants: [
    {
      props: ({ ownerState }) => ownerState?.contained,
      style: {
        marginTop: -1,
      },
    },
    {
      props: ({ ownerState }) => !ownerState?.contained,
      style: {
        marginTop: 0,
      },
    },
    {
      props: ({ ownerState }) => ownerState?.contained,
      style: {
        '& pre': {
          marginTop: 0,
        },
      },
    },
    {
      props: ({ ownerState }) => !ownerState?.contained,
      style: {
        '& pre': {
          marginTop: -1,
        },
      },
    },
    {
      props: ({ ownerState }) => ownerState.mounted,
      style: {
        '& pre': {
          '& code': {
            opacity: 1,
          },
        },
      },
    },
    {
      props: ({ ownerState }) => !ownerState.mounted,
      style: {
        '& pre': {
          '& code': {
            opacity: 0,
          },
        },
      },
    },
  ],
});

export const CodeTab = styled(TabBase)<{ ownerState: { mounted: boolean; contained?: boolean } }>(
  ({ theme }) => ({
    variants: [
      {
        props: ({ ownerState }) => ownerState?.contained,
        style: {
          border: '1px solid transparent',
          fontSize: theme.typography.pxToRem(13),
        },
      },
      {
        props: ({ ownerState }) => !ownerState?.contained,
        style: {
          border: 'none',
          fontSize: theme.typography.pxToRem(12),
        },
      },
      {
        props: ({ ownerState }) => ownerState?.contained,
        style: {
          color: (theme.vars || theme).palette.text.tertiary,
        },
      },
      {
        props: ({ ownerState }) => !ownerState?.contained,
        style: {
          color: (theme.vars || theme).palette.grey[500],
        },
      },
      {
        props: ({ ownerState }) => ownerState?.contained,
        style: {
          fontFamily: theme.typography.fontFamily,
        },
      },
      {
        props: ({ ownerState }) => !ownerState?.contained,
        style: {
          fontFamily: theme.typography.fontFamilyCode,
        },
      },
      {
        props: ({ ownerState }) => ownerState?.contained,
        style: {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      {
        props: ({ ownerState }) => !ownerState?.contained,
        style: {
          fontWeight: theme.typography.fontWeightBold,
        },
      },
      {
        props: ({ ownerState }) => ownerState?.contained,
        style: {
          transition: 'background, color, 100ms ease',
        },
      },
      {
        props: ({ ownerState }) => !ownerState?.contained,
        style: {
          transition: 'unset',
        },
      },
      {
        props: ({ ownerState }) => !ownerState?.contained,
        style: {
          '&:hover': {
            backgroundColor: alpha(theme.palette.primaryDark[500], 0.5),
            color: (theme.vars || theme).palette.grey[400],
          },
        },
      },
      {
        props: ({ ownerState }) => !ownerState?.contained && ownerState.mounted,
        style: {
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
        },
      },
    ],
    ...theme.unstable_sx({
      flex: '0 0 auto',
      height: 26,
      p: '2px 8px',
      bgcolor: 'transparent',
      lineHeight: 1.2,
      outline: 'none',
      minWidth: 45,
      cursor: 'pointer',
      borderRadius: 99,
      position: 'relative',
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.divider,
      },
      '&:focus-visible': {
        outline: '3px solid',
        outlineOffset: '1px',
        outlineColor: (theme.vars || theme).palette.primary.light,
      },
    }),
  }),
);

type TabsConfig = {
  code: string | ((tab: string) => string);
  language: string;
  tab: string;
};

export function HighlightedCodeWithTabs(
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
            language={language || 'bash'}
            code={typeof code === 'function' ? code(tab) : code}
          />
        </CodeTabPanel>
      ))}
    </Tabs>
  );
}
