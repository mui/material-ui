import * as React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LicenseModelSwitch from 'docs/src/components/pricing/LicenseModelSwitch';
import { useLicenseModel } from 'docs/src/components/pricing/LicenseModelContext';
import PrioritySupportSwitch from 'docs/src/components/pricing/PrioritySupportSwitch';
import { usePrioritySupport } from 'docs/src/components/pricing/PrioritySupportContext';
import IconImage from 'docs/src/components/icon/IconImage';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { Link } from '@mui/docs/Link';
import { PlanName, planInfo } from 'docs/src/components/pricing/PricingTable';

const formatter = new Intl.NumberFormat('en-US');

function formatCurrency(value: number) {
  return `$${formatter.format(value)}`;
}

interface PlanPriceProps {
  plan: 'community' | 'pro' | 'premium' | 'enterprise';
}

export function PlanPrice(props: PlanPriceProps) {
  const { plan } = props;

  const { licenseModel } = useLicenseModel();
  const annual = licenseModel === 'annual';
  const planPriceMinHeight = 24;

  const { prioritySupport } = usePrioritySupport();

  if (plan === 'community') {
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: 'bold', color: 'success.600' }}
          >
            $0
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 1.5,
            minHeight: planPriceMinHeight,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            Free forever!
          </Typography>
        </Box>
        <Button
          component={Link}
          noLinkStyle
          href="/material-ui/getting-started/usage/"
          variant="outlined"
          fullWidth
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ py: 1, mt: 2 }}
        >
          Get started
        </Button>
      </React.Fragment>
    );
  }

  const priceUnit = annual ? '/ year / dev' : '/ dev';
  const getPriceExplanation = (displayedValue: number) => {
    if (annual) {
      return `Equivalent to $${displayedValue} / month / dev`;
    }
    return '';
  };

  if (plan === 'pro') {
    const annualValue = 180;
    const perpetualValue = annualValue * 3;
    const monthlyValueForAnnual = annualValue / 12;

    const mainDisplayValue = annual ? annualValue : perpetualValue;
    const priceExplanation = getPriceExplanation(annual ? monthlyValueForAnnual : perpetualValue);

    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', flex: '1 1 auto', flexDirection: 'column' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            {formatCurrency(mainDisplayValue)}
          </Typography>
          <Box sx={{ width: 5 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: '3px' }}>
            {priceUnit}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 1.5,
            minHeight: planPriceMinHeight,
          }}
        >
          {
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.8125rem' }}
            >
              {priceExplanation}
            </Typography>
          }
        </Box>
        <Button
          component={Link}
          noLinkStyle
          href={
            licenseModel === 'annual'
              ? 'https://mui.com/store/items/mui-x-pro/'
              : 'https://mui.com/store/items/mui-x-pro-perpetual/'
          }
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ py: 1, width: '100%', mt: 2 }}
        >
          Buy now
        </Button>
      </Box>
    );
  }

  if (plan === 'premium') {
    const premiumAnnualValue = 588;
    const premiumPerpetualValue = premiumAnnualValue * 3;
    const premiumMonthlyValueForAnnual = premiumAnnualValue / 12;

    const premiumAnnualValueWithPrioritySupport = premiumAnnualValue + 399;
    const premiumPerpetualValueWithPrioritySupport = premiumPerpetualValue + 399;
    const premiumMonthlyValueForAnnualWithPrioritySupport = 82; // premiumAnnualValueWithPrioritySupport / 12;

    const priceExplanation = getPriceExplanation(
      prioritySupport
        ? premiumMonthlyValueForAnnualWithPrioritySupport
        : premiumMonthlyValueForAnnual,
    );

    let premiumDisplayedValue: number = premiumAnnualValue;
    if (annual && prioritySupport) {
      premiumDisplayedValue = premiumAnnualValueWithPrioritySupport;
    } else if (!annual && prioritySupport) {
      premiumDisplayedValue = premiumPerpetualValueWithPrioritySupport;
    } else if (annual && !prioritySupport) {
      premiumDisplayedValue = premiumAnnualValue;
    } else if (!annual && !prioritySupport) {
      premiumDisplayedValue = premiumPerpetualValue;
    }

    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', flex: '1 1 auto', flexDirection: 'column' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            {formatCurrency(premiumDisplayedValue)}
          </Typography>
          <Box sx={{ width: 5 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: '3px' }}>
            {priceUnit}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 1.5,
            minHeight: planPriceMinHeight,
          }}
        >
          {
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.8125rem' }}
            >
              {priceExplanation}
            </Typography>
          }
        </Box>
        <Button
          component={Link}
          noLinkStyle
          href={
            licenseModel === 'annual'
              ? 'https://mui.com/store/items/mui-x-premium/'
              : 'https://mui.com/store/items/mui-x-premium-perpetual/'
          }
          variant="contained"
          fullWidth
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ py: 1, mt: 2, mb: 2 }}
        >
          Buy now
        </Button>
        <PrioritySupportSwitch />
      </Box>
    );
  }

  // else enterprise
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 1 auto', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        {/* <BusinessIcon sx={{ fontSize: 65, color: 'text.tertiary' }} /> */}
      </Box>
      <Typography
        variant="h5"
        component="div"
        sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center', mt: 1 }}
      >
        Custom pricing
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 1.5,
          minHeight: planPriceMinHeight,
        }}
      >
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.8125rem' }}>
          Got a bigger team? Request a quote!
        </Typography>
      </Box>
      <Button
        component={Link}
        noLinkStyle
        href="mailto:sales@mui.com"
        variant="contained"
        fullWidth
        endIcon={<KeyboardArrowRightRounded />}
        sx={{ py: 1, width: '100%', mt: 2 }}
      >
        Contact Sales
      </Button>
    </Box>
  );
}

export default function PricingCards() {
  return (
    <React.Fragment>
      <LicenseModelSwitch />
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, mb: 8, gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            flexDirection: 'column',
            gap: 3,
            py: 3,
            px: 2,
            flex: '1 1 0px',
          }}
        >
          <Box sx={{ height: 'fit-content' }}>
            <PlanName plan="community" disableDescription={false} />
            <PlanPrice plan="community" />
          </Box>
          <Divider />
          <Box textAlign="left">
            {planInfo.community.features.map((feature, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  display: 'flex',
                  color: 'text.secondary',
                  alignItems: 'center',
                  mb: 2,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
              >
                <IconImage name="pricing/yes" sx={{ mr: 1 }} />
                {feature}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            flexDirection: 'column',
            gap: 3,
            py: 3,
            px: 2,
            flex: '1 1 0px',
          }}
        >
          <Box sx={{ height: 'fit-content' }}>
            <PlanName plan="pro" disableDescription={false} />
            <PlanPrice plan="pro" />
          </Box>
          {/* <PricingTableBuyPro /> */}
          <Divider />
          <Box textAlign="left">
            {planInfo.pro.features.map((feature, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  display: 'flex',
                  color: 'text.secondary',
                  alignItems: 'center',
                  mb: 2,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
              >
                <IconImage name="pricing/yes" sx={{ mr: 1 }} />
                {feature}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            display: 'flex',
            border: '1px solid',
            borderColor: 'primary.200',
            borderRadius: 1,
            flexDirection: 'column',
            gap: 3,
            py: 3,
            px: 2,
            flex: '1 1 0px',
            background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
            boxShadow: '0px 2px 12px 0px rgba(234, 237, 241, 0.3) inset',
            ...theme.applyDarkStyles({
              borderColor: `${alpha(theme.palette.primary[700], 0.4)}`,
              boxShadow: '0px 2px 12px 0px rgba(0, 0, 0, 0.25) inset',
            }),
          })}
        >
          <Box sx={{ height: 'fit-content' }}>
            <PlanName plan="premium" disableDescription={false} />
            <PlanPrice plan="premium" />
          </Box>
          {/* <PricingTableBuyPremium />  */}
          <Box textAlign="left">
            {planInfo.premium.features.map((feature, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  display: 'flex',
                  color: 'text.secondary',
                  alignItems: 'center',
                  mb: 2,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
              >
                {/* <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} /> */}
                <IconImage name="pricing/yes" sx={{ mr: 1 }} />
                {feature}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            flexDirection: 'column',
            gap: 3,
            py: 3,
            px: 2,
            flex: '1 1 0px',
          }}
        >
          <Box sx={{ height: 'fit-content' }}>
            <PlanName plan="enterprise" disableDescription={false} />
            <PlanPrice plan="enterprise" />
          </Box>
          {/* <PricingTableBuyEnterprise /> */}
          <Divider />
          <Box textAlign="left">
            {planInfo.enterprise.features.map((feature, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  display: 'flex',
                  color: 'text.secondary',
                  alignItems: 'center',
                  mb: 2,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
              >
                <IconImage name="pricing/yes" sx={{ mr: 1 }} />
                {feature}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
