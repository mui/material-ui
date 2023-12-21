import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { greyColor } from '../getAlbumTheme';

import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Adaptable performance',
    description:
      'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Built to last',
    description:
      'Experience unmatched durability that goes above and beyond, ensuring a lasting investment.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Great user experience',
    description:
      'Seamlessly integrate our product into your routine with an intuitive and easy-to-use interface.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Innovative functionality',
    description:
      'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Reliable support',
    description:
      'Count on our responsive customer support, offering assistance that goes beyond the purchase.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Precision in Every Detail',
    description:
      'Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.',
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
                  borderColor: greyColor[800],
                  backgroundColor: greyColor[900],
                  borderRadius: '8px',
                  p: 2,
                  height: '100%',
                }}
              >
                <Box>
                  <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                  <Typography variant="h6" color="inherit">
                    {item.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="inherit" sx={{ opacity: '70%' }}>
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
