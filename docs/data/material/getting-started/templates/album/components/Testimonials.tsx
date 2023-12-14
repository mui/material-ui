import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Remy Sharp',
    occupation: 'Senior engineer',
    testimonial:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur',
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: 'Travis Howard',
    occupation: 'Lead product designer',
    testimonial:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur',
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: 'Cindy Baker',
    occupation: 'CTO',
    testimonial:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur',
  },
];

export default function Testimonials() {
  return (
    <Box>
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          pt: 10,
          pb: 20,
        }}
      >
        <Box sx={{ width: '40%', mb: 8 }}>
          <Typography component="h2" variant="h4" color="text.primary" gutterBottom>
            Testimonials
          </Typography>
          <Typography variant="body1" color="text.secondary" component="p">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi.
            Aliquam in hendrerit urna.
          </Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {userTestimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <CardHeader
                avatar={testimonial.avatar}
                title={testimonial.name}
                subheader={testimonial.occupation}
              />
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
