import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import { PlanName, PlanPrice } from './PricingTable';

function Plan({
  plan,
  benefits,
  unavailable,
}: {
  plan: 'community' | 'pro' | 'premium';
  benefits?: Array<string>;
  unavailable?: boolean;
}) {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, ...(unavailable && { '& .MuiTypography-root': { opacity: 0.2 } }) }}
    >
      <PlanName plan={plan} />
      <Box {...(plan === 'community' && { my: 2 })} {...(plan === 'premium' && { mb: 2 })}>
        <PlanPrice plan={plan} />
      </Box>
      {unavailable ? (
        <Button
          variant="outlined"
          disabled
          fullWidth
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ py: 1, '&.Mui-disabled': { color: 'text.secondary' } }}
        >
          Available later this year!
        </Button>
      ) : (
        <Button variant="outlined" fullWidth endIcon={<KeyboardArrowRightRounded />} sx={{ py: 1 }}>
          Get Started
        </Button>
      )}
      {benefits &&
        benefits.map((text) => (
          <Box key={text} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <img src={`/static/branding/pricing/yes-${mode}.svg`} alt="" />
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="extraBold"
              sx={{ ml: 1 }}
            >
              {text}
            </Typography>
          </Box>
        ))}
    </Paper>
  );
}

export default function PricingList() {
  return (
    <Container sx={{ py: 2, display: { xs: 'block', md: 'none' } }}>
      <Plan
        plan="community"
        benefits={[
          'Lifetime access to @mui/core, @mui/system and @mui/unstyled',
          'Lifetime access to @mui/data-grid',
          'Community access',
          'Bug reports & feature requests',
        ]}
      />
      <Box height={20} />
      <Plan
        plan="pro"
        benefits={[
          'Everything included in the Community plan',
          'Access to @mui/x-data-grid',
          'One year access to updates to the @mui/x-data-grid',
          'One year of special support and priority over Community on bug reports & feature requests',
        ]}
      />
      <Box height={20} />
      <Plan unavailable plan="premium" />
    </Container>
  );
}
