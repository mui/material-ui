import * as React from 'react';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Avatar from '@mui/joy/Avatar';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function AvatarGroupVariables() {
  return (
    <JoyVariablesDemo
      componentName="AvatarGroup"
      childrenAccepted
      data={[
        {
          var: '--AvatarGroup-gap',
          defaultValue: '-8px',
        },
        {
          var: '--Avatar-size',
          defaultValue: '40px',
        },
        {
          var: '--Avatar-ringSize',
          defaultValue: '4px',
        },
      ]}
      renderDemo={(sx) => (
        <AvatarGroup sx={sx}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar>+3</Avatar>
        </AvatarGroup>
      )}
    />
  );
}
