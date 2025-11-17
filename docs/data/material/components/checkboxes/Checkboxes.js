import Checkbox from '@mui/material/Checkbox';

export default function Checkboxes() {
  return (
    <div>
      <Checkbox slotProps={{ input: { 'aria-label': 'checked checkbox' } }} defaultChecked />
      <Checkbox slotProps={{ input: { 'aria-label': 'unchecked checkbox' } }} />
      <Checkbox slotProps={{ input: { 'aria-label': 'disabled checkbox' } }} disabled />
      <Checkbox slotProps={{ input: { 'aria-label': 'disabled checked checkbox' } }} disabled checked />
    </div>
  );
}
