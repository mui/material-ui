import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function BasicButtonGroup() {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <CardContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Typography fontSize="lg" fontWeight="lg">
          Title
        </Typography>
        <Typography mb={3} maxWidth="32ch">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Typography>
        <ButtonGroup
          variant="soft"
          aria-label="outlined primary button group"
          stretch="0 1 120px"
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          <Button>Buy</Button>
          <Button>Learn</Button>
          <IconButton>
            <FavoriteBorder />
          </IconButton>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
