/* eslint-disable react/no-danger */
import { styled, alpha } from '@mui/material/styles';
import { brandingDarkTheme as darkTheme } from 'docs/src/modules/brandingTheme';

const StyledTableContainer = styled('div')(
  ({ theme }) => ({
    '&& th': {
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: 'left',
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(14),
    },
    '& tr': {
      scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
      '&:hover': {
        backgroundColor: alpha(darkTheme.palette.grey[50], 0.5),
      },
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& tr:hover': {
        backgroundColor: alpha(darkTheme.palette.primaryDark[800], 0.5),
      },
    },
  }),
);
export default StyledTableContainer;
