import { styled, alpha } from '@mui/material/styles';

interface DemoToolbarRootProps {
  demoOptions: any;
  openDemoSource: any;
}

const DemoToolbarRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'demoOptions' && prop !== 'openDemoSource',
})<DemoToolbarRootProps>(({ theme, demoOptions, openDemoSource }) => [
  {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      marginTop: demoOptions.bg === 'inline' ? theme.spacing(1) : -1,
      top: 0,
      padding: theme.spacing(0.5, 1),
      backgroundColor: alpha(theme.palette.grey[50], 0.2),
      borderRadius: openDemoSource ? 0 : '0 0 12px 12px',
      transition: theme.transitions.create('border-radius'),
      ...(theme.direction === 'rtl' && {
        left: theme.spacing(1),
      }),
      ...(theme.direction !== 'rtl' && {
        right: theme.spacing(1),
      }),
    },
  },
  theme.applyDarkStyles({
    [theme.breakpoints.up('sm')]: {
      backgroundColor: alpha(theme.palette.primaryDark[800], 0.2),
    },
  }),
]);

export default DemoToolbarRoot;
