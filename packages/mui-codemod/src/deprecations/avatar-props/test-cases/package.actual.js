import Avatar from '@org/ui/material/Avatar';
import { Avatar as MyAvatar } from '@org/ui/material';

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
