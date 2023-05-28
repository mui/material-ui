import * as React from 'react';

import Box, { BoxProps } from '@mui/joy/Box';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';

export default function EditorToolbar({ sx, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        { display: 'flex', gap: 0.5, '& > button': { '--Icon-fontSize': '16px' } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Select defaultValue="1" sx={{ minWidth: 160 }}>
        <Option value="1">Normal text</Option>
        <Option value="2" sx={{ fontFamily: 'code' }}>
          Code text
        </Option>
      </Select>
      <IconButton variant="plain" color="neutral">
        <i data-feather="bold" />
      </IconButton>
      <IconButton variant="plain" color="neutral">
        <i data-feather="italic" />
      </IconButton>
      <IconButton variant="plain" color="neutral">
        <i data-feather="link-2" />
      </IconButton>
      <IconButton variant="plain" color="neutral">
        <i data-feather="list" />
      </IconButton>
    </Box>
  );
}
