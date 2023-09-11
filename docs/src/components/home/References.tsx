import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import {
  CORE_CUSTOMERS,
  ADVANCED_CUSTOMERS,
  DESIGNKITS_CUSTOMERS,
  TEMPLATES_CUSTOMERS,
} from 'docs/src/components/home/CompaniesGrid';

export { CORE_CUSTOMERS, ADVANCED_CUSTOMERS, DESIGNKITS_CUSTOMERS, TEMPLATES_CUSTOMERS };

const CompaniesGrid = dynamic(() => import('./CompaniesGrid'));

function References({
  companies,
}: {
  companies:
    | typeof CORE_CUSTOMERS
    | typeof ADVANCED_CUSTOMERS
    | typeof DESIGNKITS_CUSTOMERS
    | typeof TEMPLATES_CUSTOMERS;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  return (
    <Section ref={ref}>
      <Box sx={{ minHeight: { xs: 236, sm: 144, md: 52 } }}>
        {inView && <CompaniesGrid data={companies} />}
      </Box>
      <Typography
        textAlign="center"
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 4,
          mx: 'auto',
          maxWidth: 400,
          minHeight: 42, // hard-coded to reduce CLS (layout shift)
        }}
      >
        The world&apos;s best product teams trust MUI to deliver an unrivaled experience for both
        developers and users.
      </Typography>
    </Section>
  );
}

export default References;
