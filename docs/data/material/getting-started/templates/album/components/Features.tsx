import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Dashboard',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
    image:
      'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Mobile integration',
    description: 'Aliquam in hendrerit urna.',
    image:
      'url("https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=3602&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Available in all platforms',
    description: 'Pellentesque sit amet sapien fringilla, mattis ligula consectetur',
    image:
      'url("https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography
                component="h2"
                variant="h4"
                color="text.primary"
                gutterBottom
              >
                Product features
              </Typography>
              <Typography variant="body1" color="text.secondary" component="p">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa
                mi. Aliquam in hendrerit urna.
              </Typography>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              sx={{ width: '100%' }}
            >
              {items.map(({ icon, title, description }, index) => (
                <Card
                  variant="outlined"
                  key={index}
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    backgroundColor:
                      selectedItemIndex === index ? '#F0F4F8' : 'transparent',
                    borderColor: selectedItemIndex === index ? '#CDD7E1' : '#F0F4F8',
                    width: '100%',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      textAlign: 'left',
                      p: 2,
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { md: 'center' },
                      gap: 2,
                      width: '100%',
                    }}
                  >
                    <Box sx={{ opacity: '50%' }}>{icon}</Box>
                    <span>
                      <Typography
                        component="span"
                        color="text.primary"
                        variant="body2"
                        fontWeight="bold"
                        display="block"
                      >
                        {title}
                      </Typography>
                      <Typography
                        component="span"
                        color="text.secondary"
                        variant="body2"
                        fontWeight="regular"
                        display="block"
                        sx={{ my: 0.5 }}
                      >
                        {description}
                      </Typography>
                      <Link
                        color="primary"
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          '& > svg': { transition: '0.2s' },
                          '&:hover > svg': { transform: 'translateX(2px)' },
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <span>Learn more</span>
                        <ChevronRightRoundedIcon
                          fontSize="small"
                          sx={{ mt: '1px', ml: '2px' }}
                        />
                      </Link>
                    </span>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundImage: items[selectedItemIndex].image,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                height: '100%',
                minHeight: '400px',
                marginBottom: '16px',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
