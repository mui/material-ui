import * as React from 'react';
import Grid from '@mui/material/Grid';
import IconImage, { IconImageProps } from 'docs/src/components/icon/IconImage';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

// These are all placeholders!!!
// TODO: fill with real data once design is approved

export const CORE_CUSTOMERS: Array<IconImageProps> = [
  {
    alt: 'Spotify logo',
    name: 'companies/spotify',
    width: 100,
    height: 52,
  },
  {
    alt: 'Amazon logo',
    name: 'companies/amazon',
    width: 80,
    height: 52,
  },
  {
    alt: 'Nasa logo',
    name: 'companies/nasa',
    mode: '',
    width: 52,
    height: 42,
  },
  {
    alt: 'Netflix logo',
    name: 'companies/netflix',
    mode: '',
    width: 80,
    height: 52,
  },
  {
    alt: 'Unity logo',
    name: 'companies/unity',
    width: 69,
    height: 52,
  },
  {
    alt: 'Shutterstock logo',
    name: 'companies/shutterstock',
    width: 100,
    height: 52,
  },
];

export const ADVANCED_CUSTOMERS: Array<IconImageProps> = [
  {
    alt: 'Southwest logo',
    name: 'companies/southwest',
    width: 130,
    height: 54,
    style: {
      marginTop: -10,
    },
  },
  {
    alt: 'Tesla logo',
    name: 'companies/tesla',
    width: 140,
    height: 52,
    style: {
      marginTop: -11,
    },
  },
  {
    alt: 'Apple logo',
    name: 'companies/apple',
    width: 29,
    height: 52,
    style: {
      marginTop: -21,
    },
  },
  {
    alt: 'Siemens logo',
    name: 'companies/siemens',
    mode: '',
    width: 119,
    height: 59,
    style: {
      marginTop: -13,
    },
  },
  {
    alt: 'Volvo logo',
    name: 'companies/volvo',
    width: 128,
    height: 52,
    style: {
      marginTop: -11,
    },
  },
  {
    alt: 'Deloitte logo',
    name: 'companies/deloitte',
    width: 97,
    height: 52,
    style: {
      marginTop: -12,
    },
  },
];

export const DESIGNKITS_CUSTOMERS: Array<IconImageProps> = [
  {
    alt: 'Spotify logo',
    name: 'companies/spotify',
    width: 100,
    height: 52,
  },
  {
    alt: 'Amazon logo',
    name: 'companies/amazon',
    width: 80,
    height: 52,
  },
  {
    alt: 'Apple logo',
    name: 'companies/apple',
    width: 29,
    height: 52,
  },
  {
    alt: 'Netflix logo',
    name: 'companies/netflix',
    mode: '',
    width: 80,
    height: 52,
  },
  {
    alt: 'X logo',
    name: 'companies/x',
    mode: '',
    width: 30,
    height: 30,
  },
  {
    alt: 'Salesforce logo',
    name: 'companies/salesforce',
    mode: '',
    width: 50,
    height: 52,
  },
];

export const TEMPLATES_CUSTOMERS: Array<IconImageProps> = [
  {
    alt: 'Ebay logo',
    name: 'companies/ebay',
    width: 73,
    height: 52,
  },
  {
    alt: 'Amazon logo',
    name: 'companies/amazon',
    width: 80,
    height: 52,
  },
  {
    alt: 'Samsung logo',
    name: 'companies/samsung',
    mode: '',
    width: 88,
    height: 52,
  },
  {
    alt: 'Patreon logo',
    name: 'companies/patreon',
    width: 103,
    height: 52,
  },
  {
    alt: 'AT&T logo',
    name: 'companies/atandt',
    width: 71,
    height: 52,
  },
  {
    alt: 'Verizon logo',
    name: 'companies/verizon',
    width: 91,
    height: 52,
  },
];

interface CustomerData extends IconImageProps {
  hasCaseStudy?: boolean;
  caseStudyUrl?: string;
}

export default function LogosGrid({ data = [] }: { data?: Array<CustomerData> }) {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return null;
  }

  const sortedData = [...data].sort((a, b) => {
    if (a.hasCaseStudy && !b.hasCaseStudy) {
      return -1;
    }
    if (!a.hasCaseStudy && b.hasCaseStudy) {
      return 1;
    }
    return 0;
  });

  return (
    <Grid
      container
      sx={{
        gap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      spacing={2}
    >
      {sortedData.map((imgProps) => (
        <Grid
          key={imgProps.name}
          component={imgProps.hasCaseStudy ? Link : 'div'}
          href={imgProps.caseStudyUrl}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            objectFit: 'contain',
            p: 4,
            gap: 1,
            textDecoration: 'none',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(170, 180, 190, 0.2)',
            cursor: imgProps.hasCaseStudy ? 'pointer' : 'default',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': imgProps.hasCaseStudy
              ? {
                  transform: 'translateY(-4px)',
                }
              : {},
            ...theme.applyDarkStyles({
              background: (theme.vars || theme).palette.primaryDark[800],
              border: '1px solid',
              borderColor: (theme.vars || theme).palette.primaryDark[700],
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            }),
          }}
          size={{ xs: 6, sm: 4, md: 2 }}
        >
          <IconImage
            alt={imgProps.alt}
            loading="eager"
            {...imgProps}
            sx={{
              filter: 'grayscale(100%) brightness(0)',
              ...theme.applyDarkStyles({
                filter: 'grayscale(100%) brightness(0) invert(1)',
              }),
              ...imgProps.style,
            }}
          />
          {imgProps.hasCaseStudy && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
              }}
            >
              Read more
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Typography>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
