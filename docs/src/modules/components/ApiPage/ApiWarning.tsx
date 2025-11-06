import * as React from 'react';
import { alpha } from '@mui/system';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from '@mui/docs/branding';

const StyledAlert = styled(Alert)(
  ({ theme }) => ({
    '&.MuiAlert-standardWarning': {
      alignItems: 'center',
      padding: '2px 12px',
      fontWeight: theme.typography.fontWeightRegular,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      backgroundColor: alpha(lightTheme.palette.warning[50], 0.5),
      borderColor: `var(--muidocs-palette-warning-200, ${lightTheme.palette.warning[200]})`,
      '& .MuiAlert-icon': {
        height: 'fit-content',
        padding: 0,
      },
      '& code': { all: 'unset' },
      '& strong': {
        color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
      },
      '& svg': {
        fill: `var(--muidocs-palette-warning-600, ${lightTheme.palette.warning[600]})`,
      },
      '& a': {
        color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
        textDecorationColor: alpha(lightTheme.palette.warning.main, 0.4),
        '&:hover': {
          textDecorationColor: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
        },
      },
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '&.MuiAlert-standardWarning': {
        color: `var(--muidocs-palette-warning-50, ${darkTheme.palette.warning[50]})`,
        backgroundColor: alpha(darkTheme.palette.warning[700], 0.15),
        borderColor: alpha(darkTheme.palette.warning[600], 0.3),
        '& strong': {
          color: `var(--muidocs-palette-warning-200, ${darkTheme.palette.warning[200]})`,
        },
        '& svg': {
          fill: `var(--muidocs-palette-warning-400, ${darkTheme.palette.warning[400]})`,
        },
        '& a': {
          color: `var(--muidocs-palette-warning-200, ${darkTheme.palette.warning[200]})`,
          textDecorationColor: alpha(darkTheme.palette.warning.main, 0.4),
          '&:hover': {
            textDecorationColor: `var(--muidocs-palette-warning-200, ${darkTheme.palette.warning[200]})`,
          },
        },
      },
    },
  }),
);

interface DeprecationAlertProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ApiWarning({ children, className }: DeprecationAlertProps) {
  return (
    <StyledAlert
      className={className}
      severity="warning"
      icon={<WarningRoundedIcon fontSize="small" />}
    >
      {children}
    </StyledAlert>
  );
}
