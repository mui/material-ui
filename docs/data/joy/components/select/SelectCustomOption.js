import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function SelectCustomOption() {
  return (
    <Select
      defaultValue="1"
      componentsProps={{
        listbox: {
          sx: {
            '--List-decorator-width': '44px',
          },
        },
      }}
      sx={{
        '--List-decorator-width': '44px',
        minWidth: 240,
      }}
    >
      <Option value="1">
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/1.jpg" />
        </ListItemDecorator>
        Eric
      </Option>
      <ListDivider role="none" inset="startContent" />
      <Option value="2">
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Smith
      </Option>
      <ListDivider role="none" inset="startContent" />
      <Option value="3">
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/3.jpg" />
        </ListItemDecorator>
        Erika
      </Option>
    </Select>
  );
}
