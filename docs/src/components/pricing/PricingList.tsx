import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';

function Plan({
  icon,
  title,
  description,
  price,
  benefits,
  unavailable,
}: {
  icon: string;
  title: string;
  description: string;
  price: React.ReactElement;
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
      <Typography
        variant="body2"
        fontWeight="bold"
        sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {title} <img src={`/static/branding/pricing/block-${icon}.svg`} alt="" />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      {price}
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
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
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
        icon="green"
        title="Community"
        description="Get started with the most popular and industry-standard UI library to build interfaces with React."
        price={
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Typography variant="h4" fontWeight="bold" color="grey.600">
              $0
            </Typography>
            <Box sx={{ width: 5 }} />
            <Typography variant="body2" color="text.secondary">
              / free forever!
            </Typography>
          </Box>
        }
        benefits={[
          'Lifetime access to @mui/core, @mui/system and @mui/unstyled',
          'Lifetime access to @mui/data-grid',
          'Community access',
          'Bug reports & feature requests',
        ]}
      />
      <Box height={20} />
      <Plan
        icon="blue"
        title="Pro"
        description="Best for professional developers building enterprise or data-rich applications."
        price={
          <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
              <Typography
                variant="caption"
                fontWeight="bold"
                color="error.main"
                sx={{
                  borderRadius: 0.5,
                  bgcolor: 'error.200',
                  textDecoration: 'line-through',
                  p: '4px',
                }}
              >
                $249
              </Typography>
              <Box sx={{ width: 10 }} />
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                $186
              </Typography>
              <Box sx={{ width: 5 }} />
              <Typography variant="body2" color="text.secondary">
                / per developer.
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              <i>Price capped at 10 developers.</i>
            </Typography>
          </React.Fragment>
        }
        benefits={[
          'Everything included in the Community plan',
          'Access to @mui/x-data-grid',
          'One year access to updates to the @mui/x-data-grid',
          'One year of special support and priority over Community on bug reports & feature requests',
        ]}
      />
      <Box height={20} />
      <Plan
        unavailable
        icon="gold"
        title="Premium"
        description="Unlock all the most advances features including premium support."
        price={
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Typography variant="h4" fontWeight="bold" color="grey.600">
              $599
            </Typography>
            <Box sx={{ width: 5 }} />
            <Typography variant="body2" color="text.secondary">
              / per developer
            </Typography>
          </Box>
        }
      />
    </Container>
  );
}
