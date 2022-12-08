import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ColorInversionMotivation() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, pt: 3 }}>
      {/* Left: The global variants are applied to children only */}
      <Card sx={{ gap: 2, maxWidth: 300, boxShadow: 'md' }}>
        <Chip
          size="sm"
          variant="soft"
          sx={{ alignSelf: 'flex-start', borderRadius: 'xl' }}
        >
          New
        </Chip>
        <IconButton
          variant="outlined"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
        >
          <BookmarkOutlinedIcon />
        </IconButton>
        <Typography fontSize="xl2" fontWeight="lg">
          Learn how to build super fast websites.
        </Typography>
        <Button variant="solid" endDecorator={<KeyboardArrowRightIcon />}>
          Read more
        </Button>
      </Card>

      {/* Right: The global variants are applied to both parent and children */}
      <Card
        variant="solid"
        color="primary"
        sx={{ gap: 2, maxWidth: 300, boxShadow: 'md' }}
      >
        <Chip
          size="sm"
          variant="soft"
          sx={{ alignSelf: 'flex-start', borderRadius: 'xl' }}
        >
          New
        </Chip>
        <IconButton
          variant="outlined"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
        >
          <BookmarkOutlinedIcon />
        </IconButton>
        <Typography fontSize="xl2" fontWeight="lg">
          Learn how to build super fast websites.
        </Typography>
        <Button variant="solid" endDecorator={<KeyboardArrowRightIcon />}>
          Read more
        </Button>
      </Card>
    </Box>
  );
}
