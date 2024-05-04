import AvatarGroup from '@mui/material/AvatarGroup';
import { AvatarGroup as MyAvatarGroup } from '@mui/material';

<AvatarGroup
  slotProps={{
    additionalAvatar: {color: "red"}
  }}
/>;
<MyAvatarGroup
slotProps={{
  additionalAvatar: {color: "red"}
}}
/>;
<MyAvatarGroup
  slotProps={{
    additionalAvatar: {
      ...{color: "red"},
      ...{color: "blue"}
    }
  }} />;

// should skip non MUI components
<NonMuiAvatarGroup
  componentsProps={{
    additionalAvatar: {color: "red"}
  }}
/>;
