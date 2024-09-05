import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export default function LicenseCard() {
  return (
    <Card
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        boxShadow: 'lg',
        width: 400,
        maxWidth: '100%',
        // to make the demo resizeable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Chip size="sm" variant="soft">
          Sketch 55+
        </Chip>
        <Chip size="sm" variant="soft">
          Figma
        </Chip>
      </Box>
      <div>
        <Typography level="h2">
          $58{' '}
          <Typography textColor="text.tertiary" sx={{ fontSize: 'sm' }}>
            /month
          </Typography>
        </Typography>
      </div>
      <CardContent>
        <Typography level="title-lg">Individual License</Typography>
        <Typography level="body-md">
          This license allows you to use the Symbol System Design with unlimited
          amount of personal and commercial projects.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="solid">Purchase Now</Button>
      </CardActions>
    </Card>
  );
}
