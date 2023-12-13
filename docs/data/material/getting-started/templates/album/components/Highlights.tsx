import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Highlights() {
  return (
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bgcolor: 'rgba(0,0,0, 0.1)',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 8,
        }}
      >
        <Box
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
          }}
        />
        <Typography component="h2" variant="h6" sx={{ mb: 6 }}>
          Product highlights
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <Stack
              key={index}
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <AccessTimeIcon sx={{ fontSize: 40 }} />
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa
                mi. Aliquam in hendrerit urna.
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default Highlights;
