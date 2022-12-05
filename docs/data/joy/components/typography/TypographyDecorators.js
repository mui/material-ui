import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export default function TypographyDecorators() {
  return (
    <Box>
      <Typography startDecorator={<InfoOutlined />} mb={2}>
        The icon automatically adjusts to the scale
      </Typography>
      <Typography
        level="h6"
        endDecorator={<Chip size="sm">123</Chip>}
        justifyContent="center"
      >
        The display also changes to flexbox
      </Typography>
    </Box>
  );
}
