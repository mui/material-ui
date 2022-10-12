import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';

function Placeholder() {
  return (
    <Box
      sx={(theme) => ({
        height: { xs: 1484, sm: 825, md: 605 },
        borderRadius: 1,
        bgcolor: 'grey.100',
        ...theme.applyDarkStyles({
          bgcolor: 'primaryDark.900',
        }),
      })}
    />
  );
}

const MaterialDesignComponents = dynamic(() => import('./MaterialDesignComponents'), {
  loading: Placeholder,
});

function DesignSystemComponents() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '500px',
  });
  return (
    <Container ref={ref} sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <SectionHeadline
        overline="Production-ready components"
        title={
          <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
            Beautiful and powerful, <GradientText>right out of the box</GradientText>
          </Typography>
        }
      />
      {inView ? <MaterialDesignComponents /> : <Placeholder />}
    </Container>
  );
}

export default DesignSystemComponents;
