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
        'linear-gradient(to right, rgb(255, 255, 255) 5%, rgba(255, 255, 255, 0) 90%) local',
        'linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255) 100%) 100% center local',
        `linear-gradient(to right, ${alpha(
          theme.palette.grey[500],
          0.5,
        )}, rgba(0, 0, 0, 0) 5%) scroll`,
        `linear-gradient(to left, ${alpha(
          theme.palette.grey[500],
          0.2,
        )}, rgba(0, 0, 0, 0) 5%) scroll`,
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
      '& .MuiPropTable-description-column': {
        minWidth: 400,
      },
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& table': {
        background: [
          `linear-gradient(to right, ${theme.palette.primaryDark[900]} 5%, ${alpha(
            theme.palette.primaryDark[900],
            0,
          )} 80%) local`,
          `linear-gradient(to right, ${alpha(theme.palette.primaryDark[900], 0)}, ${
            theme.palette.primaryDark[900]
          } 100%) 100% center local`,
          `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 10%) scroll`,
          'linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 10%) scroll',
        ].join(', '),
      },
      '& tr': {
        '&:hover': {
          backgroundColor: alpha(darkTheme.palette.primaryDark[800], 0.5),
        },
      },
    },
  }),
);
export default StyledTableContainer;
