import Avatar from '@mui/material-v7/Avatar';
import { Avatar as MyAvatar } from '@mui/material-v7';

<Avatar
  slotProps={{
    img: {
      onError: () => {},
      onLoad: () => {},
    }
  }}
/>;
<MyAvatar
  slotProps={{
    img: {
      onError: () => {},
      onLoad: () => {},
    }
  }}
/>;
<MyAvatar
  slotProps={{
    img: {
      ...{
        onLoad: () => {},
      },

      ...{
        onError: () => {},
      }
    },
  }} />;

// should skip non MUI components
<NonMuiAvatar
  imgProps={{
    onError: () => {},
    onLoad: () => {},
  }}
/>;
