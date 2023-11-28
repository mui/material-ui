import * as React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';

import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

export default function EditorToolbar(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      {...other}
      sx={[
        { display: 'flex', gap: 0.5, '& > button': { '--Icon-fontSize': '16px' } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Select size="sm" defaultValue="1" sx={{ minWidth: 160 }}>
        <Option value="1">Normal text</Option>
        <Option value="2" sx={{ fontFamily: 'code' }}>
          Code text
        </Option>
      </Select>
      <IconButton size="sm" variant="plain" color="neutral">
        <FormatBoldRoundedIcon />
      </IconButton>
      <IconButton size="sm" variant="plain" color="neutral">
        <FormatItalicRoundedIcon />
      </IconButton>
      <IconButton size="sm" variant="plain" color="neutral">
        <StrikethroughSRoundedIcon />
      </IconButton>
      <IconButton size="sm" variant="plain" color="neutral">
        <FormatListBulletedRoundedIcon />
      </IconButton>
    </Box>
  );
}
