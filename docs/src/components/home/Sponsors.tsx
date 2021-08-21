import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const DiamondPlaceholder = () => (
  <Box
    sx={{
      borderRadius: 1,
      height: { xs: 437, sm: 271, md: 146 },
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.50'),
    }}
  />
);
const DiamondSponsors = dynamic(() => import('./DiamondSponsors'), {
  loading: DiamondPlaceholder,
});

const GoldPlaceholder = () => (
  <Box
    sx={{
      borderRadius: 1,
      height: { xs: 1200, sm: 623, md: 497, lg: 332 },
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.50'),
    }}
  />
);
const GoldSponsors = dynamic(() => import('./GoldSponsors'), {
  loading: GoldPlaceholder,
});

const Sponsors = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  return (
    <Container ref={ref} sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h2" sx={{ my: 1 }}>
        Our sponsors
      </Typography>
      <Typography color="text.secondary" sx={{ mb: { xs: 2, md: 4 }, maxWidth: 450 }}>
        The continued development and maintenance of MUI is greatly helped by our generous sponsors.
      </Typography>
      {inView ? <DiamondSponsors /> : <DiamondPlaceholder />}
      <Box sx={{ mb: 4 }} />
      {inView ? <GoldSponsors /> : <GoldPlaceholder />}
    </Container>
  );
};

export default Sponsors;
