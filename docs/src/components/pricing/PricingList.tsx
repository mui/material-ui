import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import Link from 'docs/src/modules/components/Link';
import PricingTable, { PlanName, PlanPrice } from 'docs/src/components/pricing/PricingTable';

const Plan = React.forwardRef<
  HTMLDivElement,
  {
    plan: 'community' | 'pro' | 'premium';
    benefits?: Array<string>;
    unavailable?: boolean;
  } & PaperProps
>(({ plan, benefits, unavailable, sx, ...props }, ref) => {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  return (
    <Paper
      ref={ref}
      variant="outlined"
      sx={{ p: 2, ...(unavailable && { '& .MuiTypography-root': { opacity: 0.2 } }), ...sx }}
      {...props}
    >
      <PlanName plan={plan} />
      <Box {...(plan === 'community' && { my: 2 })} {...(plan === 'premium' && { mb: 2 })}>
        <PlanPrice plan={plan} />
      </Box>
      {unavailable ? (
        <Button
          component={Link}
          noLinkStyle
          href={plan === 'community' ? '/getting-started/usage/' : '/components/data-grid/'}
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
});

export default function PricingList() {
  const [planIndex, setPlanIndex] = React.useState(0);
  return (
    <Container sx={{ pb: 2, mt: '-1px', display: { xs: 'block', md: 'none' } }}>
      <Tabs
        value={planIndex}
        variant="fullWidth"
        onChange={(event, value) => setPlanIndex(value)}
        sx={{
          mb: 2,
          position: 'sticky',
          top: 63,
          bgcolor: 'background.paper',
          zIndex: 1,
          mx: { xs: -2, sm: -3 },
          borderTop: '1px solid',
          borderColor: 'divider',
          '& .MuiTab-root': {
            borderBottom: '1px solid',
            borderColor: 'divider',
            '&.Mui-selected': {
              bgcolor: 'grey.50',
            },
          },
        }}
      >
        <Tab label="Community" />
        <Tab
          label="Pro"
          sx={{ borderWidth: '0 1px 0 1px', borderStyle: 'solid', borderColor: 'divider' }}
        />
        <Tab label="Premium" />
      </Tabs>
      {planIndex === 0 && (
        <Fade in>
          <div>
            <Plan plan="community" />
            <PricingTable columnHeaderHidden plans={['community']} />
          </div>
        </Fade>
      )}
      {planIndex === 1 && (
        <Fade in>
          <div>
            <Plan plan="pro" />
            <PricingTable columnHeaderHidden plans={['pro']} />
          </div>
        </Fade>
      )}

      {planIndex === 2 && (
        <Fade in>
          <div>
            <Plan plan="premium" />
            <PricingTable columnHeaderHidden plans={['premium']} />
          </div>
        </Fade>
      )}
    </Container>
  );
}
