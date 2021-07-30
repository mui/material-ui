import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CompaniesGrid, { CORE_COMPANIES } from './CompaniesGrid';

const ReferencesCore = () => {
  return (
    <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <CompaniesGrid data={CORE_COMPANIES} />
      <Typography
        color="grey.800"
        maxWidth={450}
        textAlign="center"
        mx="auto"
        mt={4}
        variant="body2"
      >
        From startups to Fortune 500s, the world&apos;s best product teams leverage MUI to build
        their UIs.
      </Typography>
    </Container>
  );
};

export default ReferencesCore;
