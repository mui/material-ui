import Avatar from '@mui/material-v7/Avatar';
import { Avatar as MyAvatar } from '@mui/material-v7';

<Avatar
  imgProps={{
    onError: () => {},
    onLoad: () => {},
  }}
/>;
<MyAvatar
  imgProps={{
    onError: () => {},
    onLoad: () => {},
  }}
/>;
<MyAvatar
  imgProps={{
    onLoad: () => {},
  }}
  slotProps={{
    img: {
      onError: () => {},
    },
  }}
/>;

// should skip non MUI components
<NonMuiAvatar
  imgProps={{
    onError: () => {},
    onLoad: () => {},
  }}
/>;
