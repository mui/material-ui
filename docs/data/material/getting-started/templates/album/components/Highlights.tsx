import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import HeadsetRoundedIcon from '@mui/icons-material/HeadsetRounded';

const items = [
  {
    icon: <AccessTimeRoundedIcon />,
    title: 'Item 1 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
  {
    icon: <ArchitectureRoundedIcon />,
    title: 'Item 2 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
  {
    icon: <CloudQueueRoundedIcon />,
    title: 'Item 3 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Item 4 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Item 5 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
  {
    icon: <HeadsetRoundedIcon />,
    title: 'Item 6 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
];

export default function Highlights() {
  return (
    <Box sx={{ color: 'white', bgcolor: '#000' }}>
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          py: 12,
        }}
      >
        <Box sx={{ width: { sm: '100%', md: '60%' }, mb: 4 }}>
          <Typography component="h2" variant="h4" color="inherit" gutterBottom>
            Highlights
          </Typography>
          <Typography
            variant="body1"
            color="inherit"
            component="p"
            sx={{ opacity: '70%' }}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
            Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis
            ligula consectetur
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                spacing={1}
                sx={{
                  border: '1px solid',
                  borderColor: grey[900],
                  borderRadius: '8px',
                  p: 2,
                }}
              >
                <Box>
                  <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                  <Typography variant="h6" color="inherit">
                    {item.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="inherit" sx={{ opacity: '70%' }}>
                  {item.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
