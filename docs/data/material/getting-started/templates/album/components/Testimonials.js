import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Masonry from '@mui/lab/Masonry';
import { useMediaQuery } from '@mui/material';

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Remy Sharp',
    occupation: 'Senior engineer',
    testimonial:
      "I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: 'Travis Howard',
    occupation: 'Lead product designer',
    testimonial:
      "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product, providing the kind of support that enhances the overall user experience and instills confidence in the brand.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: 'Cindy Baker',
    occupation: 'CTO',
    testimonial:
      'The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.',
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Remy Sharp',
    occupation: 'Senior engineer',
    testimonial:
      "I appreciate the attention to detail in the design of this product. The small touches make a big difference, and it's evident that the creators focused on delivering a premium experience.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: 'Travis Howard',
    occupation: 'Lead product designer',
    testimonial:
      "I've tried other similar products, but this one stands out for its innovative features. It's clear that the makers put a lot of thought into creating a solution that truly addresses user needs.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: 'Cindy Baker',
    occupation: 'CTO',
    testimonial:
      "The quality of this product exceeded my expectations. It's durable, well-designed, and built to last. Definitely worth the investment!",
  },
];

export default function Testimonials() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const columns = isSmallScreen ? 1 : 3;

  return (
    <Box>
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            mb: 8,
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" color="text.primary" gutterBottom>
            Testimonials
          </Typography>
          <Typography variant="body1" color="text.secondary" component="p">
            See what our customers love about our products. Discover how we excel in
            efficiency, durability, and satisfaction. Join us for quality,
            innovation, and reliable support.
          </Typography>
        </Box>
        <Masonry columns={columns} spacing={2}>
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
        </Masonry>
      </Container>
    </Box>
  );
}
