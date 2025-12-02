import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useColorScheme, keyframes } from '@mui/material/styles';

interface CustomerLogo {
  name: string;
  lightLogo: string;
  darkLogo?: string;
}

interface CustomersLogoSliderProps {
  logos?: CustomerLogo[];
}

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const defaultCustomerLogos: CustomerLogo[] = [
  {
    name: 'Spotify',
    lightLogo: '/static/branding/companies/slider/spotify.png',
    darkLogo: '/static/branding/companies/spotify-dark.svg',
  },
  {
    name: 'Amazon',
    lightLogo: '/static/branding/companies/slider/amazon.png',
    darkLogo: '/static/branding/companies/slider/amazon_dark.png',
  },
  {
    name: 'NASA',
    lightLogo: '/static/branding/companies/slider/nasa.png',
  },
  {
    name: 'Netflix',
    lightLogo: '/static/branding/companies/slider/netflix.png',
  },
  {
    name: 'Unity',
    lightLogo: '/static/branding/companies/slider/unity.png',
    darkLogo: '/static/branding/companies/slider/unity_dark.png',
  },
  {
    name: 'AT&T',
    lightLogo: '/static/branding/companies/slider/atnt.png',
    darkLogo: '/static/branding/companies/slider/atnt_dark.png',
  },
  {
    name: 'Apple',
    lightLogo: '/static/branding/companies/slider/apple.png',
    darkLogo: '/static/branding/companies/slider/apple_dark.png',
  },
  {
    name: 'Tesla',
    lightLogo: '/static/branding/companies/slider/tesla.png',
    darkLogo: '/static/branding/companies/slider/tesla_dark.png',
  },
  {
    name: 'Samsung',
    lightLogo: '/static/branding/companies/slider/samsung.png',
  },
  {
    name: 'Verizon',
    lightLogo: '/static/branding/companies/slider/verizon.png',
    darkLogo: '/static/branding/companies/slider/verizon.png',
  },
  {
    name: 'Shutterstock',
    lightLogo: '/static/branding/companies/slider/shutterstock.png',
    darkLogo: '/static/branding/companies/slider/shutterstock_dark.png',
  },
  {
    name: 'Volvo',
    lightLogo: '/static/branding/companies/slider/volvo.png',
    darkLogo: '/static/branding/companies/slider/volvo.png',
  },
  {
    name: 'Deloitte',
    lightLogo: '/static/branding/companies/slider/deloitte.png',
    darkLogo: '/static/branding/companies/slider/deloitte_dark.png',
  },
];

export default function CustomersLogoSlider({
  logos = defaultCustomerLogos,
}: CustomersLogoSliderProps) {
  const { mode } = useColorScheme();

  React.useEffect(() => {
    logos.forEach((logo) => {
      const lightImg = new Image();
      lightImg.src = logo.lightLogo;

      if (logo.darkLogo) {
        const darkImg = new Image();
        darkImg.src = logo.darkLogo;
      }
    });
  }, [logos]);

  const logoWidth = 180;
  const totalWidth = logos.length * logoWidth;

  return (
    <Container
      sx={{
        p: 0,
        mb: 2,
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          '&:hover .marquee-content': {
            animationPlayState: 'paused',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: `${totalWidth * 2}px`,
            height: '130px',
          }}
        >
          <Box
            className="marquee-content"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 4, sm: 6, md: 4 },
              animation: `${scroll} 50s linear infinite`,
              width: `${totalWidth}px`,
              flexShrink: 0,
            }}
          >
            {logos.map((logo, index) => (
              <Box
                key={`first-${logo.name}-${index}`}
                component="img"
                alt={`${logo.name} logo`}
                src={mode === 'dark' && logo.darkLogo ? logo.darkLogo : logo.lightLogo}
                sx={{
                  height: { xs: 42, sm: 50, md: 70 },
                  width: '150px',
                  objectFit: 'contain',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease-in-out',
                  flexShrink: 0,
                  '&:hover': {
                    opacity: 1,
                  },
                }}
                onError={(err) => {
                  if (mode === 'dark' && logo.darkLogo) {
                    (err.target as HTMLImageElement).src = logo.lightLogo;
                  }
                }}
              />
            ))}
          </Box>
          <Box
            className="marquee-content"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 4, sm: 6, md: 4 },
              animation: `${scroll} 50s linear infinite`,
              width: `${totalWidth}px`,
              flexShrink: 0,
            }}
          >
            {logos.map((logo, index) => (
              <Box
                key={`second-${logo.name}-${index}`}
                component="img"
                alt={`${logo.name} logo`}
                src={mode === 'dark' && logo.darkLogo ? logo.darkLogo : logo.lightLogo}
                sx={{
                  height: { xs: 42, sm: 50, md: 70 },
                  width: '150px',
                  objectFit: 'contain',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease-in-out',
                  flexShrink: 0,
                  '&:hover': {
                    opacity: 1,
                  },
                }}
                onError={(err) => {
                  if (mode === 'dark' && logo.darkLogo) {
                    (err.target as HTMLImageElement).src = logo.lightLogo;
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
