import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

export default function ColorInversionSurface() {
  const creditCard = (
    <Card
      size="lg"
      variant="solid"
      color="warning"
      invertedColors
      sx={{
        gap: 2,
        minWidth: 300,
        boxShadow: 'md',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent orientation="horizontal">
        <div>
          <Typography level="title-lg">$4,236</Typography>
          <Typography sx={{ fontSize: 'xs', fontFamily: 'code' }}>CREDIT</Typography>
        </div>
        <SvgIcon sx={{ ml: 'auto' }}>
          <svg
            width="50"
            height="39"
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
              fill="currentColor"
            />
            <path
              d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
              fill="#312ECB"
            />
          </svg>
        </SvgIcon>
      </CardContent>
      <Typography level="title-lg" sx={{ fontFamily: 'code' }}>
        •••• •••• •••• 1212
      </Typography>
      <CardContent orientation="horizontal" sx={{ justifyContent: 'space-between' }}>
        <div>
          <Typography sx={{ fontSize: 'xs', fontFamily: 'code' }}>
            CARD NAME
          </Typography>
          <Typography level="title-sm" sx={{ fontSize: 'sm' }}>
            JOHN DOE
          </Typography>
        </div>
        <div>
          <Typography
            sx={{ fontSize: 'xs', textAlign: 'right', fontFamily: 'code' }}
          >
            EXPIRE
          </Typography>
          <Typography level="title-sm" sx={{ fontSize: 'sm', textAlign: 'right' }}>
            07/25
          </Typography>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}
    >
      {creditCard}
      {React.cloneElement(creditCard, { variant: 'soft' })}
    </Box>
  );
}
