import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: '300px' }}>
      <Typography level="h2" sx={{ fontSize: 'lg', mb: 1, alignSelf: 'flex-start' }}>
        Bahamas Islands
      </Typography>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
        <BookmarkAdd />
      </IconButton>
      <Typography level="body2">24 April - 02 May, 2021</Typography>
      <Typography level="body3">Category/Ocean</Typography>
      <AspectRatio min="120px" max="200px" sx={{ my: 2 }}>
        <img
          src="https://images.unsplash.com/photo-1501698335706-90b736210a61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
          alt=""
        />
      </AspectRatio>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">Total Price</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            $2950
          </Typography>
        </div>
        <Button
          variant="outlined"
          color="neutral"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto' }}
        >
          Explore
        </Button>
      </Box>
    </Card>
  );
}
