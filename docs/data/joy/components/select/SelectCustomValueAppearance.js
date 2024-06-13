import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';

export default function SelectCustomValueAppearance() {
  const people = [
    { name: 'Eric', role: 'PM', status: '2days ago' },
    { name: 'Smith', role: 'Engineer', status: 'secs ago' },
    { name: 'Erika', role: 'Designer', status: '10hrs ago' },
  ];

  const colors = {
    PM: 'success',
    Engineer: 'primary',
    Designer: 'warning',
  };
  return (
    <Select
      defaultValue="Eric"
      slotProps={{
        listbox: {
          sx: {
            '--ListItemDecorator-size': '48px',
          },
        },
      }}
      sx={{ minWidth: 240 }}
    >
      {people.map((data, index) => (
        <Option
          key={data.name}
          value={data.name}
          label={data.name} // The appearance of the selected value will be a string
        >
          <ListItemDecorator>
            <Avatar src={`/static/images/avatar/${index + 1}.jpg`} />
          </ListItemDecorator>
          <Box component="span" sx={{ display: 'block' }}>
            <Typography component="span" level="title-sm">
              {data.name}
            </Typography>
            <Typography level="body-xs">{data.status}</Typography>
          </Box>
          <Chip
            size="sm"
            variant="outlined"
            color={colors[data.role]}
            sx={{
              ml: 'auto',
              borderRadius: '2px',
              minHeight: '20px',
              paddingInline: '4px',
              fontSize: 'xs',
              bgcolor: `${'var(--colors-role)'}.softBg`,
            }}
            style={{ '--colors-role': colors[data.role] }}
          >
            {data.role}
          </Chip>
        </Option>
      ))}
    </Select>
  );
}
