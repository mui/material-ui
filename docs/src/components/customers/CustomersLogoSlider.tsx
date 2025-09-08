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
  to { transform: translateX(-50%); }
`;

const defaultCustomerLogos: CustomerLogo[] = [
  {
    name: 'Spotify',
    lightLogo: '/static/branding/companies/spotify-light.svg',
    darkLogo: '/static/branding/companies/spotify-dark.svg',
  },
  {
    name: 'Amazon',
    lightLogo: '/static/branding/companies/amazon-light.svg',
    darkLogo: '/static/branding/companies/amazon-dark.svg',
  },
  {
    name: 'NASA',
    lightLogo: '/static/branding/companies/nasa.svg',
  },
  {
    name: 'Netflix',
    lightLogo: '/static/branding/companies/netflix.svg',
  },
  {
    name: 'Unity',
    lightLogo: '/static/branding/companies/unity-light.svg',
    darkLogo: '/static/branding/companies/unity-dark.svg',
  },
  {
    name: 'AT&T',
    lightLogo: '/static/branding/companies/atandt-light.svg',
    darkLogo: '/static/branding/companies/atandt-dark.svg',
  },
  {
    name: 'Apple',
    lightLogo: '/static/branding/companies/apple-light.svg',
    darkLogo: '/static/branding/companies/apple-dark.svg',
  },
  {
    name: 'Tesla',
    lightLogo: '/static/branding/companies/tesla-light.svg',
    darkLogo: '/static/branding/companies/tesla-dark.svg',
  },
  {
    name: 'Samsung',
    lightLogo: '/static/branding/companies/samsung.svg',
  },
  {
    name: 'Verizon',
    lightLogo: '/static/branding/companies/verizon-light.svg',
    darkLogo: '/static/branding/companies/verizon-dark.svg',
  },
  {
    name: 'Shutterstock',
    lightLogo: '/static/branding/companies/shutterstock-light.svg',
    darkLogo: '/static/branding/companies/shutterstock-dark.svg',
  },
  {
    name: 'Volvo',
    lightLogo: '/static/branding/companies/volvo-light.svg',
    darkLogo: '/static/branding/companies/volvo-dark.svg',
  },
  {
    name: 'Deloitte',
    lightLogo: '/static/branding/companies/deloitte-light.svg',
    darkLogo: '/static/branding/companies/deloitte-dark.svg',
  },
];

export default function CustomersLogoSlider({
  logos = defaultCustomerLogos,
}: CustomersLogoSliderProps) {
  const { mode } = useColorScheme();

  const duplicatedLogos = [...logos, ...logos];

  return (
    <Container
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 4, sm: 6, md: 8 },
            animation: `${scroll} 20s linear infinite`,
            width: '100%',
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <Box
              key={`${logo.name}-${index}`}
              component="img"
              alt={`${logo.name} logo`}
              src={mode === 'dark' && logo.darkLogo ? logo.darkLogo : logo.lightLogo}
              sx={{
                height: { xs: 42, sm: 50, md: 70 },
                width: 'auto',
                maxWidth: { xs: 120, sm: 140, md: 160 },
                objectFit: 'contain',
                opacity: 0.7,
                transition: 'opacity 0.3s ease-in-out',
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
    </Container>
  );
}
