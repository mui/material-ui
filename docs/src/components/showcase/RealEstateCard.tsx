import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InfoRounded from '@material-ui/icons/InfoRounded';

export default function RealEstateCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        p: 1,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <CardMedia
        component="img"
        width="146"
        height="100"
        alt="123 Main St, Phoenix, AZ cover"
        src="/static/images/cards/real-estate.png"
        sx={{
          borderRadius: 0.5,
          width: { xs: '100%', sm: 146 },
          mr: { sm: 1.5 },
          mb: { xs: 1.5, sm: 0 },
        }}
      />
      <Box sx={{ alignSelf: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          123 Main St, Phoenix, AZ
        </Typography>
        <Typography component="div" fontWeight="bold">
          $280k - $310k
        </Typography>
        <Box
          sx={{
            mt: 0.75,
            px: 1,
            py: 0.5,
            typography: 'caption',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primary.900' : 'primary.50'),
            color: (theme) => (theme.palette.mode === 'dark' ? 'primary.200' : 'primary.700'),
          }}
        >
          <InfoRounded sx={{ fontSize: 16, mr: 0.5 }} /> Confidence score of 85%
        </Box>
      </Box>
    </Card>
  );
}
