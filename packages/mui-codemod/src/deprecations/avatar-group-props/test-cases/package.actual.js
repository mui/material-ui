import AvatarGroup from '@org/ui/material/AvatarGroup';
import { AvatarGroup as MyAvatarGroup } from '@org/ui/material';

<AvatarGroup
  componentsProps={{
    additionalAvatar: {color: "red"},
  }}
/>;
<MyAvatarGroup
componentsProps={{
  additionalAvatar: {color: "red"},
}}
/>;
<MyAvatarGroup
  componentsProps={{
    additionalAvatar: {color: "red"},
  }}
  slotProps={{
    additionalAvatar: {color: "blue"},
  }}
/>;
<MyAvatarGroup
  componentsProps={{
    additionalAvatar: {color: "red"},
  }}
  slotProps={{
    additionalAvatar: {color: "blue"},
    surplus: {color: "yellow"},
  }}
/>;

// should skip non MUI components
<NonMuiAvatarGroup
  componentsProps={{
    additionalAvatar: {color: "red"},
  }}
/>;
