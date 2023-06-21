import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

export default function LicenseCard() {
  return (
    <Card
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        width: 343,
        maxWidth: '100%',
        // to make the demo resizeable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Typography level="body3">Individual License</Typography>
      <Typography level="h2">
        $58{' '}
        <Typography fontSize="sm" textColor="text.tertiary">
          /month
        </Typography>
      </Typography>
      <Typography level="body2">
        This license allows you to use the Symbol System Design with unlimited amount
        of personal and commercial projects.
      </Typography>
      <CardActions>
        <Button variant="solid">Purchase Now</Button>
      </CardActions>
      <Typography level="body2" textAlign="center">
        Compatible with Sketch 55+
      </Typography>
    </Card>
  );
}
