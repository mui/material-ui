/* eslint-disable react/no-danger */
import { styled, alpha } from '@mui/material/styles';
import { brandingDarkTheme as darkTheme } from 'docs/src/modules/brandingTheme';

const StyledTableContainer = styled('div')(
  ({ theme }) => ({
    overflow: 'hidden',
    '& table': {
      borderRadius: '10px',
      marginLeft: -1,
      marginRight: -1,
      background: [
        'linear-gradient(to right, rgb(255, 255, 255) 5%, rgba(255, 255, 255, 0) 80%) local',
        'linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255) 100%) 100% center local',
        'linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 5%) scroll',
        'linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 5%) scroll',
      ].join(', '),
    },
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
      background: [
        'linear-gradient(to right, rgb(10, 25, 41) 5%, rgba(10, 25, 41, 0)) local',
        'linear-gradient(to right, rgba(10, 25, 41, 0), rgb(10, 25, 41) 100%) 100% center local',
        'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 5%) scroll',
        'linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 5%) scroll',
      ].join(', '),
      '& tr:hover': {
        backgroundColor: alpha(darkTheme.palette.primaryDark[800], 0.5),
      },
    },
  }),
);
export default StyledTableContainer;
