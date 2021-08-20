import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import GradientText from 'docs/src/components/typography/GradientText';

const placeholder = (
  <Box
    sx={{
      height: { xs: 1484, sm: 825, md: 605 },
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.100'),
      borderRadius: 1,
    }}
  />
);

const MaterialDesignComponents = dynamic(() => import('./MaterialDesignComponents'), {
  loading: () => placeholder,
});

const DesignSystemComponents = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  return (
    <Container ref={ref} sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Typography variant="body2" color="primary" fontWeight="bold">
        What do you get?
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
        Simple, accessible, declarative <GradientText>components</GradientText>
      </Typography>
      {inView ? <MaterialDesignComponents /> : placeholder}
    </Container>
  );
};

export default DesignSystemComponents;
