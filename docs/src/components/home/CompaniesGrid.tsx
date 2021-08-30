import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import IconImage, { IconImageProps } from 'docs/src/components/icon/IconImage';

export const CORE_CUSTOMERS: Array<IconImageProps> = [
  {
    name: 'spotify',
    alt: 'Spotify logo',
    width: 100,
    height: 52,
  },
  {
    name: 'amazon',
    alt: 'Amazon logo',
    width: 80,
    height: 52,
  },
  {
    name: 'nasa',
    alt: 'Nasa logo',
    width: 52,
    height: 42,
  },
  {
    name: 'netflix',
    alt: 'Netflix logo',
    width: 80,
    height: 52,
  },
  {
    name: 'unity',
    alt: 'Unity logo',
    width: 69,
    height: 52,
  },
  {
    name: 'shutterstock',
    alt: 'Shutterstock logo',
    width: 100,
    height: 52,
  },
];

export const ADVANCED_CUSTOMERS: Array<IconImageProps> = [
  {
    name: 'southwest',
    alt: 'Southwest logo',
    width: 125,
    height: 19,
  },
  {
    name: 'boeing',
    alt: 'Boeing logo',
    width: 95,
    height: 22,
  },
  {
    name: 'siemens',
    alt: 'Siemens logo',
    width: 105,
    height: 25,
  },
  {
    name: 'deloitte',
    alt: 'Deloitte logo',
    width: 97,
    height: 21,
  },
  {
    name: 'volvo',
    alt: 'Volvo logo',
    width: 131,
    height: 18,
  },
  {
    name: 'unity',
    alt: 'Unity logo',
    width: 69,
    height: 25,
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
          <IconImage alt={imgProps.alt} {...imgProps} />
        </Grid>
      ))}
    </Grid>
  );
}
