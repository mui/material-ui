import { styled } from '@mui/zero-runtime';
import BasicAlerts from '../../../../../docs/data/material/components/alert/BasicAlerts';
import ColorAlerts from '../../../../../docs/data/material/components/alert/ColorAlerts';
import DescriptionAlerts from '../../../../../docs/data/material/components/alert/DescriptionAlerts';
import FilledAlerts from '../../../../../docs/data/material/components/alert/FilledAlerts';
import IconAlerts from '../../../../../docs/data/material/components/alert/IconAlerts';
import OutlinedAlerts from '../../../../../docs/data/material/components/alert/OutlinedAlerts';
import SimpleAlert from '../../../../../docs/data/material/components/alert/SimpleAlert';

const Main = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
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
      <h1>Alert</h1>
      <h2>Basic</h2>
      <BasicAlerts />
      <h2>Color</h2>
      <ColorAlerts />
      <h2>Description</h2>
      <DescriptionAlerts />
      <h2>Filled</h2>
      <FilledAlerts />
      <h2>Icon</h2>
      <IconAlerts />
      <h2>Outlined</h2>
      <OutlinedAlerts />
      <h2>Simple</h2>
      <SimpleAlert />
    </Main>
  );
}
