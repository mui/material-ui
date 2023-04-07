import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TabsUnstyled, { TabsUnstyledOwnProps } from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

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

export default function Installation({
  installation,
  managers = ['yarn', 'npm'],
  ...props
}: {
  installation: string;
  managers?: Array<string>;
} & Record<string, any>) {
  const [manager, setManager] = React.useState(managers[0]);
  const [mounted, setMounted] = React.useState(false);

  const keys = installation
    .split(' ')
    .filter((item) => item.startsWith('%'))
    .map((item) => item.replace('%', ''));
  const [selectedOptions, setSelectedOptions] = React.useState(
    keys
      .map((item) => {
        const result = props[item];
        // eslint-disable-next-line no-nested-ternary
        return result && Array.isArray(result) && result.length > 0
          ? Array.isArray(result[0])
            ? result[0][1]
            : result[0]
          : undefined;
      })
      .filter((item) => !!item),
  );

  const finalInstallation = keys.reduce(
    (result, item, index) => result.replace(`%${item}`, selectedOptions[index]),
    installation,
  );

  React.useEffect(() => {
    try {
      setManager((prev) => localStorage.getItem(STORAGE_KEY) || prev);
    } catch (error) {
      // ignore error
    }
    setMounted(true);
  }, []);

  const handleChange: TabsUnstyledOwnProps['onChange'] = (event, newValue) => {
    setManager(newValue as string);
    try {
      localStorage.setItem(STORAGE_KEY, newValue as string);
    } catch (error) {
      // ignore error
    }
  };

  const ownerState = { mounted };
  return (
    <React.Fragment>
      {keys.length > 0 && (
        <Box sx={{ display: 'flex', gap: 3, width: 'max-content', py: 1, pb: 1.5 }}>
          {keys.map((item, index) => {
            const options = props[item] as undefined | Array<string> | Array<[string, string]>;
            if (options && options.length > 0) {
              return (
                <Box>
                  <Typography
                    role="presentation"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      mb: '2px',
                      color: 'text.secondary',
                    }}
                  >
                    {item}
                  </Typography>
                  <ToggleButtonGroup
                    size="small"
                    key={selectedOptions[index]}
                    fullWidth
                    color="primary"
                    value={selectedOptions[index]}
                    exclusive
                    onChange={(event, value) => {
                      if (value) {
                        setSelectedOptions((prev) => {
                          const newValue = [...prev];
                          newValue[index] = value;
                          return newValue;
                        });
                      }
                    }}
                    aria-label={item}
                  >
                    {options.map((opt) => {
                      const label = Array.isArray(opt) ? opt[0] : opt;
                      const value = Array.isArray(opt) ? opt[1] : opt;
                      return (
                        <ToggleButton
                          key={value}
                          value={value}
                          sx={{
                            width: 'max-content',
                            minWidth: 64,
                            py: 0.5,
                            px: 1,
                          }}
                        >
                          {label}
                        </ToggleButton>
                      );
                    })}
                  </ToggleButtonGroup>
                </Box>
              );
            }
            return null;
          })}
        </Box>
      )}
      <TabsUnstyled selectionFollowsFocus value={manager} onChange={handleChange}>
        <TabsListUnstyled slots={{ root: StyledTabList }}>
          {managers.map((item) => (
            <TabUnstyled
              slots={{ root: StyledTab }}
              // @ts-ignore
              slotProps={{ root: { ownerState } }}
              key={item}
              value={item}
            >
              {item}
            </TabUnstyled>
          ))}
          <Box sx={{ ml: 'auto' }} />
        </TabsListUnstyled>
        {managers.map((item) => (
          <TabPanelUnstyled
            slots={{ root: StyledTabPanel }}
            // @ts-ignore
            slotProps={{ root: { ownerState } }}
            key={item}
            value={item}
          >
            <HighlightedCode
              language="bash"
              code={`${
                { yarn: 'yarn add', npm: 'npm install', pnpm: 'pnpm add' }[item]
              } ${finalInstallation}`}
            />
          </TabPanelUnstyled>
        ))}
      </TabsUnstyled>
    </React.Fragment>
  );
}
