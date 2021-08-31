import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card, { CardProps } from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InfoRounded from '@material-ui/icons/InfoRounded';

export default function RealEstateCard(props: CardProps) {
  return (
    <Card
      variant="outlined"
      {...props}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        p: 1,
        zIndex: 1,
        ...props.sx,
      }}
    >
      <CardMedia
        component="img"
        width="100"
        height="100"
        alt="123 Main St, Phoenix, AZ cover"
        src="/static/images/cards/real-estate.png"
        sx={{
          borderRadius: 0.5,
          width: 'clamp(100px, (304px - 100%) * 999 , 100%)',
        }}
      />
      <Box width="clamp(15px, (304px - 100%) * 999 , 100%)" height={15} />
      <Box sx={{ alignSelf: 'center' }}>
        <Typography variant="body2" color="text.secondary" noWrap>
          123 Main St, Phoenix, AZ
        </Typography>
        <Typography component="div" fontWeight="bold" noWrap>
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
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primary.900' : 'primary.50'),
            color: (theme) => (theme.palette.mode === 'dark' ? 'primary.200' : 'primary.700'),
          }}
        >
          <InfoRounded sx={{ fontSize: 16, mr: 0.5, mt: '1px' }} /> Confidence score of 85%
        </Box>
      </Box>
    </Card>
  );
}
