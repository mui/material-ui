import * as React from 'react';
import { styled } from '@mui/material/styles';
import TabsUnstyled, { TabsUnstyledOwnProps } from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const TabsList = styled(TabsListUnstyled)(({ theme }) => ({
  backgroundColor: (theme.vars || theme).palette.primaryDark[700],
  borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
  borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
}));

const TabPanel = styled(TabPanelUnstyled)<{ ownerState: { mounted: boolean } }>(
  ({ theme, ownerState }) => ({
    '& pre': {
      marginTop: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopColor: (theme.vars || theme).palette.primaryDark[500],
      '& code': {
        opacity: ownerState.mounted ? 1 : 0,
      },
    },
  }),
);

const Tab = styled(TabUnstyled)<{ ownerState: { mounted: boolean } }>(({ theme, ownerState }) =>
  theme.unstable_sx({
    py: 1.25,
    px: 2,
    border: 'none',
    borderBottom: '2px solid transparent',
    bgcolor: 'primaryDark.800',
    color: 'rgba(255 255 255 / 0.72)',
    fontSize: '0.75rem',
    fontWeight: 600,
    fontFamily: theme.typography.fontFamilyCode,
    outline: 'none',
    minWidth: 60,
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
        borderColor: (theme.vars || theme).palette.primary.main,
      },
    }),
    '&:hover, &:focus-visible': {
      backgroundColor: 'primaryDark.600',
    },
    '&:focus-visible': {
      outline: '2px solid',
      outlineOffset: '-2px',
      outlineColor: (theme.vars || theme).palette.primary.main,
    },
  }),
);

const STORAGE_KEY = 'package-manager';

export default function Installation({
  installation,
  managers = ['yarn', 'npm'],
}: {
  installation: string;
  managers?: Array<string>;
}) {
  const [value, setValue] = React.useState(managers[0]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      setValue((prev) => localStorage.getItem(STORAGE_KEY) || prev);
    } catch (error) {
      // ignore error
    }
    setMounted(true);
  }, []);

  const handleChange: TabsUnstyledOwnProps['onChange'] = (event, newValue) => {
    setValue(newValue as string);
    try {
      localStorage.setItem(STORAGE_KEY, newValue as string);
    } catch (error) {
      // ignore error
    }
  };

  const ownerState = { mounted };
  return (
    <TabsUnstyled selectionFollowsFocus value={value} onChange={handleChange}>
      <TabsList>
        {managers.map((item) => (
          <Tab key={item} value={item} ownerState={ownerState}>
            {item}
          </Tab>
        ))}
      </TabsList>
      {managers.map((item) => (
        <TabPanel key={item} value={item} ownerState={ownerState}>
          <HighlightedCode
            language="bash"
            code={`${
              { yarn: 'yarn add', npm: 'npm install', pnpm: 'pnpm add' }[item]
            } ${installation}`}
          />
        </TabPanel>
      ))}
    </TabsUnstyled>
  );
}
