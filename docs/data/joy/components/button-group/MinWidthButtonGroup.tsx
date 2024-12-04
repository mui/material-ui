import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Typography from '@mui/joy/Typography';

export default function MinWidthButtonGroup() {
  return (
    <Card
      variant="outlined"
      sx={{ width: '100%', overflow: 'auto', resize: 'horizontal' }}
    >
      <CardContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>Title</Typography>
        <Typography sx={{ mb: 3, maxWidth: '32ch' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Typography>
        <ButtonGroup
          variant="soft"
          aria-label="outlined primary button group"
          buttonFlex="0 1 200px"
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          <Button>Buy</Button>
          <Button>Learn</Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
