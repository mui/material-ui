// @ts-nocheck
import MaterialInput from '@mui/material/Input';
import Input from '@mui/base/Input';
import Switch from '@mui/base/Switch';
import Badge from '@mui/base/Badge';

<MaterialInput component={CustomRoot} />;

<Input<typeof CustomRoot> slots={{
  root: CustomRoot
}} />;

<Input<typeof CustomRoot> slots={{
  root: CustomRoot
}}></Input>;

<Switch<typeof CustomRoot>
  slots={{
    root: CustomRoot
  }}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slotProps={{ root: { className: 'root' } }}
/>;

<Badge<typeof CustomRoot>
  slots={{
    badge: CustomBadge,
    root: CustomRoot
  }}
  slotProps={{ badge: { className: 'badge' } }}
  randomProp="1"
  randomProp2="2"
  randomProp3="3" />;

<Input<'a'> slots={{
  root: 'a'
}} href='url'></Input>;
