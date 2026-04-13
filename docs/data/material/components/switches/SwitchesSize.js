import Switch from '@mui/material/Switch';

const label = { slotProps: { input: { 'aria-label': 'Size switch demo' } } };

export default function SwitchesSize() {
  return (
    <div>
      <Switch {...label} defaultChecked size="small" />
      <Switch {...label} defaultChecked />
    </div>
  );
}
