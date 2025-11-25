import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Carousel from '@mui/carousel/Carousel';

const testimonials = [
  {
    id: 1,
    quote: 'This product has completely transformed how we work. The team collaboration features are outstanding.',
    author: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp Inc.',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: 2,
    quote: 'I have tried many similar solutions, but this one stands out for its simplicity and power.',
    author: 'Michael Chen',
    role: 'Senior Developer',
    company: 'StartupXYZ',
    avatar: 'https://i.pravatar.cc/150?u=michael',
  },
  {
    id: 3,
    quote: 'The customer support is exceptional. They went above and beyond to help us succeed.',
    author: 'Emily Rodriguez',
    role: 'CEO',
    company: 'GrowthLabs',
    avatar: 'https://i.pravatar.cc/150?u=emily',
  },
];

export default function TestimonialCarousel() {
  return (
    <Box sx={{ maxWidth: 700, margin: 'auto' }}>
      <Carousel
        autoPlay
        autoPlayInterval={5000}
        enableLoop
        transition="fade"
        aria-label="Customer testimonials"
      >
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} elevation={0} sx={{ bgcolor: 'grey.50' }}>
            <CardContent sx={{ py: 4, px: 3 }}>
              <FormatQuoteIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography
                variant="h6"
                component="blockquote"
                sx={{ fontStyle: 'italic', mb: 3, lineHeight: 1.8 }}
              >
                "{testimonial.quote}"
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={testimonial.avatar} alt={testimonial.author} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}, {testimonial.company}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
}
