import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const DiamondSponsors = dynamic(() => import('./DiamondSponsors'));
const GoldSponsors = dynamic(() => import('./GoldSponsors'));

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
      {inView && <DiamondSponsors />}
      <Box sx={{ mb: 4 }} />
      {inView && <GoldSponsors />}
    </Container>
  );
};

export default Sponsors;
