// the codemod should transform only Joy UI `Avatar`;
import { Avatar as JoyAvatar } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import MaterialAvatar from '@mui/material/Avatar';

<div>
  <JoyAvatar imgProps={{ ['aria-hidden']: true }} />
  <Avatar
    slotProps={{ root: { ['aria-hidden']: false }, img: { ['aria-label']: 'imgSlot' } }}
    imgProps={{ ['aria-hidden']: true }}
  />
  <MaterialAvatar imgProps={{ ['aria-hidden']: true }} />
</div>;
