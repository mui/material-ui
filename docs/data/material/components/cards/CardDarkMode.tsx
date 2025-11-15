import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function CardDarkMode(): React.JSX.Element {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.level1' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Cards automatically adapt to light and dark color schemes. Toggle your theme using the theme switcher to see the difference in appearance.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
        }}
      >
        {/* Light mode section */}
        <div>
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
            Light Mode
          </Typography>
          <Card>
            <CardMedia
              sx={{ height: 140, bgcolor: 'action.hover' }}
              title="Example card"
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.primary',
                }}
              >
                Card Media
              </Box>
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>

        {/* Dark mode section */}
        <div>
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
            Dark Mode
          </Typography>
          <Card
            sx={{
              backgroundColor: '#1e1e1e',
              color: 'text.primary',
              '& .MuiCardMedia-root': {
                backgroundColor: '#2d2d2d',
              },
              '& .MuiTypography-body2': {
                color: '#b0b0b0',
              },
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              title="Example card"
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#2d2d2d',
                  color: '#fff',
                }}
              >
                Card Media
              </Box>
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </Box>
    </Box>
  );
}