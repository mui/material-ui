import * as React from 'react';
import Box from '@mui/material/Box';
import Card, { CardProps } from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import InfoRounded from '@mui/icons-material/InfoRounded';

export default function RealEstateCard({ sx, ...props }: CardProps) {
  return (
    <Card
      variant="outlined"
      {...props}
      sx={[
        (theme) => ({
          display: 'flex',
          flexWrap: 'wrap',
          bgcolor: '#fff',
          p: 1,
          zIndex: 1,
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.800',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
          sx={(theme) => ({
            mt: 0.75,
            px: 1,
            py: 0.5,
            typography: 'caption',
            borderRadius: 1,
            display: 'flex',
            bgcolor: 'primary.50',
            color: 'primary.700',
            ...theme.applyDarkStyles({
              bgcolor: 'primary.900',
              color: 'primary.200',
            }),
          })}
        >
          <InfoRounded sx={{ fontSize: 16, mr: 0.5, mt: '1px' }} /> Confidence score of 85%
        </Box>
      </Box>
    </Card>
  );
}
