import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ConstructionIcon from '@mui/icons-material/Construction';
import HeadsetIcon from '@mui/icons-material/Headset';

const items = [
  {
    icon: <AccessTimeIcon />,
    title: 'Item 1 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
  {
    icon: <ArchitectureIcon />,
    title: 'Item 2 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
  {
    icon: <CloudQueueIcon />,
    title: 'Item 3 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
  {
    icon: <AutoFixHighIcon />,
    title: 'Item 4 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
  {
    icon: <ConstructionIcon />,
    title: 'Item 5 Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  },
  {
    icon: <HeadsetIcon />,
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
          alignItems: 'center',
          py: 10,
        }}
      >
        <Box sx={{ width: '60%', mb: 8, textAlign: 'center' }}>
          <Typography component="h2" variant="h4" color="inherit" gutterBottom>
            Highlights
          </Typography>
          <Typography variant="body1" color="inherit" component="p">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi.
            Aliquam in hendrerit urna.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                color="inherit"
                spacing={1}
                sx={{ my: 4 }}
              >
                {item.icon}
                <Typography variant="h6" align="center" color="inherit">
                  {item.title}
                </Typography>
                <Typography variant="body1" align="center" color="inherit">
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
