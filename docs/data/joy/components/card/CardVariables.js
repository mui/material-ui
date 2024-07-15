import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function CardVariables() {
  return (
    <JoyVariablesDemo
      componentName="Card"
      data={[
        {
          var: '--Card-padding',
          defaultValue: '16px',
          type: 'number',
        },
        {
          var: '--Card-radius',
          defaultValue: '12px',
          type: 'number',
        },
      ]}
      renderDemo={(sx) => (
        <Card variant="outlined" sx={{ maxWidth: 240, boxShadow: 'none', ...sx }}>
          <CardContent>
            <Typography sx={{ fontWeight: 'lg' }}>Card title</Typography>
            <Typography level="body-sm">An interesting description.</Typography>
          </CardContent>
          <CardActions buttonFlex="1">
            <Button variant="solid" color="primary" size="sm">
              Buy
            </Button>
            <IconButton variant="outlined" color="neutral" size="sm">
              <BookmarkBorderIcon />
            </IconButton>
          </CardActions>
        </Card>
      )}
    />
  );
}
