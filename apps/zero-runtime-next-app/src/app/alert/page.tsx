import { styled } from '@mui/zero-runtime';
import BasicAlerts from '../../../../../docs/data/material/components/alert/BasicAlerts';

const Main = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginInline: 'auto',
  maxWidth: '900px',
  paddingBlock: '16px',
  [theme.breakpoints.up('sm')]: {
    paddingInline: '24px',
  },
  [theme.breakpoints.up('lg')]: {
    paddingInline: '60px',
  },
}));

export default function MaterialUILayout() {
  return (
    <Main>
      <h1>Material-UI</h1>
      <p>This is an example app using Material-UI.</p>
      <BasicAlerts />
    </Main>
  );
}
