import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

export default function MinMaxRatio() {
  return (
    <Box sx={{ width: 300, resize: 'horizontal', overflow: 'auto', p: 1 }}>
      <AspectRatio minHeight={120} maxHeight={200}>
        <img
          src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369"
          alt=""
        />
      </AspectRatio>
    </Box>
  );
}
