import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

const data = [
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270',
    title: 'Mountain view',
    description: '3.98M views',
  },
];

export default function FlexRowRatio() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        overflow: 'auto',
        width: 343,
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {data.map((item) => (
        <Sheet
          key={item.title}
          variant="outlined"
          sx={{
            gap: 2,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'sm',
          }}
        >
          <AspectRatio
            ratio="1"
            sx={{ minWidth: 60, borderRadius: 'sm', overflow: 'auto' }}
          >
            <img src={item.src} alt={item.title} />
          </AspectRatio>
          <Box sx={{ whiteSpace: 'nowrap' }}>
            <Typography fontWeight="md">{item.title}</Typography>
            <Typography level="body2">{item.description}</Typography>
          </Box>
        </Sheet>
      ))}
    </Box>
  );
}
