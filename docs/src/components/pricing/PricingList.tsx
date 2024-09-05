import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper, { PaperProps } from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { Link } from '@mui/docs/Link';
import PricingTable, { PlanName, PlanPrice } from 'docs/src/components/pricing/PricingTable';
import { useLicenseModel } from 'docs/src/components/pricing/LicenseModelContext';

const Plan = React.forwardRef<
  HTMLDivElement,
  {
    plan: 'community' | 'pro' | 'premium';
    benefits?: Array<string>;
    unavailable?: boolean;
  } & PaperProps
>(function Plan({ plan, benefits, unavailable, sx, ...props }, ref) {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const { licenseModel } = useLicenseModel();

  return (
    <Paper
      ref={ref}
      variant="outlined"
      sx={{ p: 2, ...(unavailable && { '& .MuiTypography-root': { opacity: 0.5 } }), ...sx }}
      {...props}
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
          sx={{ py: 1, '&.Mui-disabled': { color: 'text.disabled' } }}
        >
          In progress!
        </Button>
      ) : (
        <Button
          variant={plan.match(/(pro|premium)/) ? 'contained' : 'outlined'}
          fullWidth
          component={Link}
          noLinkStyle
          href={
            {
              community: '/material-ui/getting-started/usage/',
              pro:
                licenseModel === 'annual'
                  ? 'https://mui.com/store/items/mui-x-pro/'
                  : 'https://mui.com/store/items/mui-x-pro-perpetual/',
              premium:
                licenseModel === 'annual'
                  ? 'https://mui.com/store/items/mui-x-premium/'
                  : 'https://mui.com/store/items/mui-x-premium-perpetual/',
            }[plan]
          }
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ py: 1 }}
        >
          {plan.match(/(pro|premium)/) ? 'Buy now' : 'Get started'}
        </Button>
      )}
      {benefits &&
        benefits.map((text) => (
          <Box key={text} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <img src={`/static/branding/pricing/yes-${mode}.svg`} alt="" />
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontWeight: 'extraBold', ml: 1 }}
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
    <React.Fragment>
      <Tabs
        value={planIndex}
        variant="fullWidth"
        onChange={(event, value) => setPlanIndex(value)}
        sx={[
          {
            mb: 2,
            position: 'sticky',
            top: 55,
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
          },
          (theme) =>
            theme.applyDarkStyles({
              '& .MuiTab-root': {
                '&.Mui-selected': {
                  bgcolor: 'primaryDark.800',
                },
              },
            }),
        ]}
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
    </React.Fragment>
  );
}
