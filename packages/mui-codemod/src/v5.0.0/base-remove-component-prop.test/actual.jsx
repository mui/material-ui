import MaterialInput from '@mui/material/Input';
import Input from '@mui/base/Input';
import Switch from '@mui/base/Switch';
import Badge from '@mui/base/Badge';
import PopperUnstyled from '@mui/base/Popper';
import { Popper } from '@mui/base';

<MaterialInput component={CustomRoot} />;

<Input component={CustomRoot} />;

<Input component={CustomRoot} {...others}></Input>;

<Switch
  component={CustomRoot}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slotProps={{ root: { className: 'root' } }}
/>;

<Badge
  slots={{ badge: CustomBadge }}
  component={CustomRoot}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slotProps={{ badge: { className: 'badge' } }}
/>;

<Input component='a' href='url'></Input>;

<PopperUnstyled component='button' />;
<Popper component='button' />;