import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Placeholder() {
  return <Box sx={{ height: { xs: 587, sm: 303, md: 289 } }} />;
}
const StartToday = dynamic(() => import('./StartToday'), { loading: Placeholder });

export default function HeroEnd() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '500px',
  });
  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        background: `linear-gradient(180deg, ${
          (theme.vars || theme).palette.grey[50]
        } 0%, #FFFFFF 100%)`,
        ...theme.applyDarkStyles({
          background: `linear-gradient(180deg, ${
            (theme.vars || theme).palette.primaryDark[900]
          } 0%, #001E3C 100%)`,
        }),
      })}
    >
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        {inView ? <StartToday /> : <Placeholder />}
      </Container>
    </Box>
  );
}
