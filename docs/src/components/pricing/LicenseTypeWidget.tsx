import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLicenseType } from 'docs/src/components/pricing/LicenseTypeContext';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  margin: '14px auto 4px',
  padding: 2,
  maxWidth: 170,
  minHeight: 0,
  overflow: 'visible',
  borderRadius: 20,
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  backgroundColor: (theme.vars || theme).palette.grey[50],
  '& .MuiTabs-scroller': {
    overflow: 'visible!important',
  },
  '& span': {
    zIndex: 1,
  },
  '& .MuiTab-root': {
    padding: '2px 10px',
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    minWidth: 0,
    minHeight: 0,
    color: (theme.vars || theme).palette.grey[700],
    borderRadius: 20,
    '&:hover': {
      color: (theme.vars || theme).palette.grey[800],
    },
    '&.Mui-focusVisible': {
      outline: `2px solid ${(theme.vars || theme).palette.primary.main}`,
      outlineOffset: 2,
    },
    '&.Mui-selected': {
      color: (theme.vars || theme).palette.grey[900],
      fontWeight: 600,
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#fff',
    height: '100%',
    borderRadius: 20,
    zIndex: 0,
    boxShadow: '0px 4px 20px rgba(45, 56, 67, 0.1)',
  },
  ...theme.applyDarkStyles({
    borderColor: (theme.vars || theme).palette.grey[800],
    backgroundColor: (theme.vars || theme).palette.grey[900],
    color: (theme.vars || theme).palette.grey[400],
    '& .MuiTabs-indicator': {
      backgroundColor: (theme.vars || theme).palette.grey[700],
      height: '100%',
      borderRadius: 20,
    },
    '& .MuiTab-root': {
      color: (theme.vars || theme).palette.grey[400],
      '&:hover': {
        color: (theme.vars || theme).palette.grey[300],
      },
      '&.Mui-selected': {
        color: '#fff',
      },
    },
  }),
}));

const perpetualDescription =
  'One-time purchase to use the current released versions forever. 12 months of updates included.';
const annualDescription =
  'Upon expiration, your permission to use the Software in development ends. The license is perpetual in production.';

const tooltipProps = {
  enterDelay: 400,
  enterNextDelay: 50,
  enterTouchDelay: 500,
  placement: 'top' as 'top',
  describeChild: true,
  slotProps: {
    tooltip: {
      sx: {
        fontSize: 12,
      },
    },
  },
};

export default function LicenseTypeWidget() {
  const { licenseType, setLicenseType } = useLicenseType();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setLicenseType(newValue);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledTabs
        aria-label="license type"
        selectionFollowsFocus
        value={licenseType}
        onChange={handleChange}
      >
        <Tab
          disableFocusRipple
          value="Perpetual"
          label={
            <Tooltip title={perpetualDescription} {...tooltipProps}>
              <span>Perpetual</span>
            </Tooltip>
          }
        />
        <Tab
          disableFocusRipple
          value="Annual"
          label={
            <Tooltip title={annualDescription} {...tooltipProps}>
              <span>Annual</span>
            </Tooltip>
          }
        />
      </StyledTabs>
    </Box>
  );
}
