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
  const demo = (
    <Card sx={{ gap: 2, maxWidth: { xs: '100%', sm: 300 } }}>
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
      <Typography level="title-lg" sx={{ fontWeight: 'lg' }}>
        Learn how to build super fast websites.
      </Typography>
      <Button variant="solid" endDecorator={<KeyboardArrowRightIcon />}>
        Read more
      </Button>
    </Card>
  );
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {/* Left: The global variants are applied to children only */}
      <Box sx={{ maxWidth: { xs: '100%', sm: 300 } }}>
        {demo}
        <Typography level="body-sm" sx={{ mt: 2, textAlign: 'center' }}>
          <b>One layer</b>
          <br />
          Global variants are applied only to the children.
        </Typography>
      </Box>
      {/* Right: The global variants are applied to both parent and children */}
      <Box sx={{ maxWidth: { xs: '100%', sm: 300 } }}>
        {React.cloneElement(demo, {
          variant: 'solid',
          color: 'primary',
        })}
        <Typography level="body-sm" sx={{ mt: 2, textAlign: 'center' }}>
          <b>Two layers</b>
          <br />
          Global variants are applied to the card <i>and</i> children.
        </Typography>
      </Box>
    </Box>
  );
}
