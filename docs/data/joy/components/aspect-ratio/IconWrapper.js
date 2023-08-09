import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Stack from '@mui/joy/Stack';
import Favorite from '@mui/icons-material/Favorite';

export default function IconWrapper() {
  return (
    <Stack direction="row" spacing={2}>
      <AspectRatio ratio="1" variant="solid" color="primary" sx={{ minWidth: 40 }}>
        {/* an extra div is required to make the icon center */}
        <div>
          <Favorite />
        </div>
      </AspectRatio>
      <AspectRatio
        ratio="1"
        variant="outlined"
        color="success"
        sx={{ minWidth: 40, borderRadius: 'sm' }}
      >
        <div>
          <Favorite />
        </div>
      </AspectRatio>
      <AspectRatio
        ratio="1"
        variant="soft"
        color="danger"
        sx={{ minWidth: 40, borderRadius: '50%' }}
      >
        <div>
          <Favorite />
        </div>
      </AspectRatio>
    </Stack>
  );
}
