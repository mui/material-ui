import * as React from 'react';
import Grid from '@mui/material/Grid';
import IconImage, { IconImageProps } from 'docs/src/components/icon/IconImage';

export const CORE_CUSTOMERS: Array<IconImageProps> = [
  {
    name: 'spotify',
    width: 100,
    height: 52,
  },
  {
    name: 'amazon',
    width: 80,
    height: 52,
  },
  {
    name: 'nasa',
    width: 52,
    height: 42,
  },
  {
    name: 'netflix',
    width: 80,
    height: 52,
  },
  {
    name: 'unity',
    width: 69,
    height: 52,
  },
  {
    name: 'shutterstock',
    width: 100,
    height: 52,
  },
];

export const ADVANCED_CUSTOMERS: Array<IconImageProps> = [
  {
    name: 'southwest',
    width: 125,
    height: 52,
  },
  {
    name: 'boeing',
    width: 95,
    height: 52,
    style: {
      marginTop: '-8px',
    },
  },
  {
    name: 'apple',
    width: 29,
    height: 52,
    style: {
      marginTop: '-6px',
    },
  },
  {
    name: 'siemens',
    width: 105,
    height: 52,
    style: {
      marginTop: '-2px',
    },
  },
  {
    name: 'volvo',
    width: 131,
    height: 52,
  },
  {
    name: 'deloitte',
    width: 97,
    height: 52,
    style: {
      marginTop: '-4px',
    },
  },
];

export const DESIGNKITS_CUSTOMERS: Array<IconImageProps> = [
  {
    name: 'spotify',
    width: 100,
    height: 52,
  },
  {
    name: 'amazon',
    width: 80,
    height: 52,
  },
  {
    name: 'apple',
    width: 29,
    height: 52,
  },
  {
    name: 'netflix',
    width: 80,
    height: 52,
  },
  {
    name: 'twitter',
    width: 31,
    height: 52,
  },
  {
    name: 'salesforce',
    width: 50,
    height: 52,
  },
];

export const TEMPLATES_CUSTOMERS: Array<IconImageProps> = [
  {
    name: 'ebay',
    width: 73,
    height: 52,
  },
  {
    name: 'amazon',
    width: 80,
    height: 52,
  },
  {
    name: 'samsung',
    width: 88,
    height: 52,
  },
  {
    name: 'patreon',
    width: 103,
    height: 52,
  },
  {
    name: 'atandt',
    alt: 'AT&T logo',
    width: 71,
    height: 52,
  },
  {
    name: 'verizon',
    width: 91,
    height: 52,
  },
];

export default function CompaniesGrid({ data }: { data: Array<IconImageProps> }) {
  return (
    <Grid container spacing={4}>
      {data.map((imgProps) => (
        <Grid
          key={imgProps.name}
          item
          xs={6}
          sm={4}
          md={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            objectFit: 'contain',
          }}
        >
          <IconImage alt={imgProps.alt || `${imgProps.name} logo`} {...imgProps} />
        </Grid>
      ))}
    </Grid>
  );
}
