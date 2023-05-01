import MaterialInput from '@mui/material/Input';
import Input from '@mui/base/Input';
import Switch from '@mui/base/Switch';
import Badge from '@mui/base/Badge';
import PopperUnstyled from '@mui/base/Popper';
import { Popper } from '@mui/base';
import { Popper as PopperBase } from '@mui/base';

<MaterialInput component={CustomRoot} />;

<Input slots={{
  root: CustomRoot
}} />;

<Input slots={{
  root: CustomRoot
}} {...others}></Input>;

<Switch
  slots={{
    root: CustomRoot
  }}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slotProps={{ root: { className: 'root' } }}
/>;

<Badge
  slots={{
    badge: CustomBadge,
    root: CustomRoot
  }}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slotProps={{ badge: { className: 'badge' } }} />;

<Input slots={{
  root: 'a'
}} href='url'></Input>;

<PopperUnstyled component='button' />;
<Popper component='button' />;
<PopperBase component='button' />;