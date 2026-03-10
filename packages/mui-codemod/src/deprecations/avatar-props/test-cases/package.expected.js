import Avatar from '@org/ui/material/Avatar';
import { Avatar as MyAvatar } from '@org/ui/material';

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
