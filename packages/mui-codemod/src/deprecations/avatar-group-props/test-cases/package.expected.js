import AvatarGroup from '@org/ui/material/AvatarGroup';
import { AvatarGroup as MyAvatarGroup } from '@org/ui/material';

<AvatarGroup
  slotProps={{
    surplus: {color: "red"},
  }}
/>;
<MyAvatarGroup
slotProps={{
  surplus: {color: "red"},
}}
/>;
<MyAvatarGroup
  slotProps={{
    surplus: {
      ...{color: "red"},
      ...{color: "blue"}
    },
  }} />;
<MyAvatarGroup
  slotProps={{
    surplus: {
      ...{
        ...{color: "red"},
        ...{color: "blue"}
      },

      ...{color: "yellow"}
    }
  }} />;

// should skip non MUI components
<NonMuiAvatarGroup
  componentsProps={{
    additionalAvatar: {color: "red"},
  }}
/>;
