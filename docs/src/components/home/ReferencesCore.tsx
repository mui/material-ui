import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CompaniesGrid, { CORE_CUSTOMERS } from 'docs/src/components/home/CompaniesGrid';

const ReferencesCore = () => {
  return (
    <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <CompaniesGrid data={CORE_CUSTOMERS} />
      <Typography
        color={(theme) => (theme.palette.mode === 'dark' ? 'grey.500' : 'grey.800')}
        textAlign="center"
        variant="body2"
        sx={{
          minHeight: 42, // a hack to reduce CLS (layout shift)
          mt: 4,
          mx: 'auto',
          maxWidth: 450,
        }}
      >
        From startups to Fortune 500s, the world&apos;s best product teams leverage MUI to build
        their UIs.
      </Typography>
    </Container>
  );
};

export default ReferencesCore;
