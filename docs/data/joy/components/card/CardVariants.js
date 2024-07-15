import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function CardVariants() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 2,
      }}
    >
      <Card variant="plain">
        <CardContent>
          <Typography level="title-md">Plain card</Typography>
          <Typography>Description of the card.</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography level="title-md">Outlined card (default)</Typography>
          <Typography>Description of the card.</Typography>
        </CardContent>
      </Card>

      <Card variant="soft">
        <CardContent>
          <Typography level="title-md">Soft card</Typography>
          <Typography>Description of the card.</Typography>
        </CardContent>
      </Card>

      <Card variant="solid">
        <CardContent>
          <Typography level="title-md" textColor="inherit">
            Solid card
          </Typography>
          <Typography textColor="inherit">Description of the card.</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
