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

const TabPanel = styled(TabPanelUnstyled)(({ theme }) => ({
  '& pre': {
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopColor: (theme.vars || theme).palette.primaryDark[500],
  },
}));

const Tab = styled(TabUnstyled)(({ theme }) =>
  theme.unstable_sx({
    py: 1,
    px: 2,
    border: 'none',
    borderBottom: '2px solid transparent',
    bgcolor: 'primaryDark.800',
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: 600,
    fontFamily: theme.typography.fontFamilyCode,
    outline: 'none',
    minWidth: 60,
    '&:first-child': {
      borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
    },
    '&:not(:first-child)': {
      marginLeft: '1px',
    },
    '&:last-child': {
      borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
    },
    '&:not([aria-selected="true"])': {
      color: 'rgba(255 255 255 / 0.72)',
    },
    '&[aria-selected="true"]': {
      borderColor: (theme.vars || theme).palette.primary.main,
    },
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
  dep,
  managers = ['yarn', 'npm'],
}: {
  dep: string;
  managers?: Array<string>;
}) {
  const [value, setValue] = React.useState(managers[0]);

  React.useEffect(() => {
    try {
      setValue((prev) => localStorage.getItem(STORAGE_KEY) || prev);
    } catch (error) {
      // ignore error
    }
  }, []);

  const handleChange: TabsUnstyledOwnProps['onChange'] = (event, newValue) => {
    setValue(newValue as string);
    try {
      localStorage.setItem(STORAGE_KEY, newValue as string);
    } catch (error) {
      // ignore error
    }
  };
  return (
    <TabsUnstyled selectionFollowsFocus value={value} onChange={handleChange}>
      <TabsList>
        {managers.map((item) => (
          <Tab key={item} value={item}>
            {item}
          </Tab>
        ))}
      </TabsList>
      {managers.map((item) => (
        <TabPanel key={item} value={item}>
          <HighlightedCode
            language="bash"
            code={`${{ yarn: 'yarn add', npm: 'npm install', pnpm: 'pnpm add' }[item]} ${dep}`}
          />
        </TabPanel>
      ))}
    </TabsUnstyled>
  );
}
