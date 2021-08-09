import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const Img = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});

export const CORE_COMPANIES = [
  {
    src: '/static/branding/companies/coursera.svg',
    alt: 'Coursera logo',
    width: 102,
    height: 16,
  },
  {
    src: '/static/branding/companies/amazon.svg',
    alt: 'Amazon logo',
    width: 92,
    height: 28,
  },
  {
    src: '/static/branding/companies/nasa.svg',
    alt: 'Nasa logo',
    width: 64,
    height: 53,
  },
  {
    src: '/static/branding/companies/netflix.svg',
    alt: 'Netflix logo',
    width: 88,
    height: 24,
  },
  {
    src: '/static/branding/companies/unity.svg',
    alt: 'Unity logo',
    width: 110,
    height: 40,
  },
  {
    src: '/static/branding/companies/shutterstock.svg',
    alt: 'Shutterstock logo',
    width: 138,
    height: 21,
  },
];

export default function CompaniesGrid({ data }: { data: Array<JSX.IntrinsicElements['img']> }) {
  return (
    <Grid container spacing={2}>
      {data.map((imgProps) => (
        <Grid
          key={imgProps.src}
          item
          xs={6}
          sm={4}
          md={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Img alt={imgProps.alt} loading="lazy" {...imgProps} />
        </Grid>
      ))}
    </Grid>
  );
}
