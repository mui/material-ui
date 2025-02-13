import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

export default function CongratCard() {
  return (
    <Card
      data-resizable
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        width: 343,
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
        '--icon-size': '100px',
      }}
    >
      <CardOverflow variant="solid" color="warning">
        <AspectRatio
          variant="outlined"
          color="warning"
          ratio="1"
          sx={{
            m: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50%',
            width: 'var(--icon-size)',
            boxShadow: 'sm',
            bgcolor: 'background.surface',
            position: 'relative',
          }}
        >
          <div>
            <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem' }} />
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
        🎊 Congrats Julia 🎊
      </Typography>
      <CardContent sx={{ maxWidth: '40ch' }}>
        You just gain one Cookhat for Salad cooking. Share your achievement with your
        friends.
      </CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          '--Button-radius': '40px',
          width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
        }}
      >
        <Button variant="solid" color="warning">
          Share
        </Button>
        <Button variant="plain" color="neutral">
          Skip
        </Button>
      </CardActions>
    </Card>
  );
}
