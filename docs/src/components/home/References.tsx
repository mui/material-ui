import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
    <Container ref={ref} sx={{ py: { xs: 4, sm: 6, md: 10 } }}>
      <Box sx={{ minHeight: { xs: 236, sm: 144, md: 52 } }}>
        {inView && <CompaniesGrid data={companies} />}
      </Box>
      <Typography
        textAlign="center"
        variant="body2"
        sx={(theme) => ({
          color: 'grey.800',
          ...theme.applyDarkStyles({
            color: 'grey.500',
          }),
          minHeight: 42, // hard-coded to reduce CLS (layout shift)
          mt: 4,
          mx: 'auto',
          maxWidth: 400,
        })}
      >
        The world&apos;s best product teams trust MUI to deliver an unrivaled experience for both
        developers and users.
      </Typography>
    </Container>
  );
}

export default References;
