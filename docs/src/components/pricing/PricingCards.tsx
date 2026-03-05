import * as React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconImage from 'docs/src/components/icon/IconImage';
import LicenseModelSwitch from 'docs/src/components/pricing/LicenseModelSwitch';
import { useLicenseModel } from 'docs/src/components/pricing/LicenseModelContext';
import PrioritySupportSwitch from 'docs/src/components/pricing/PrioritySupportSwitch';
import { usePrioritySupport } from 'docs/src/components/pricing/PrioritySupportContext';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { Link } from '@mui/docs/Link';
import {
  ProSupportIcon,
  PremiumSupportIcon,
  PrioritySupportIcon,
} from 'docs/src/components/pricing/SupportIcons';

export interface Feature {
  text?: string;
  highlight?: string;
  text2?: string;
  icon?: 'support' | 'check';
  supportType?: 'community' | 'pro' | 'premium' | 'priority';
}

export type PlanName = 'community' | 'pro' | 'premium' | 'enterprise';

export const planInfo: Record<
  PlanName,
  {
    iconName: string;
    title: string;
    description: string;
    features: Feature[];
  }
> = {
  community: {
    iconName: 'pricing/x-plan-community',
    title: 'Community',
    description: 'Get started with the industry-standard React UI library, MIT-licensed.',
    features: [
      { text: '40+ free components', icon: 'check' },
      {
        icon: 'support',
        supportType: 'community',
      },
    ],
  },
  pro: {
    iconName: 'pricing/x-plan-pro',
    title: 'Pro',
    description: 'Best for professional developers or startups building data-rich applications.',
    features: [
      { text: 'All Community features and…', icon: 'check' },
      { text: 'MUI X', highlight: 'Pro', text2: 'access', icon: 'check' },
      { text: '10+', highlight: 'Pro', text2: 'features', icon: 'check' },
      { highlight: 'Pro', text2: 'support', icon: 'support', supportType: 'pro' },
    ],
  },
  premium: {
    iconName: 'pricing/x-plan-premium',
    title: 'Premium',
    description:
      'The most advanced features for data-rich applications along with standard support.',
    features: [
      { text: 'All Pro', text2: 'features and…', icon: 'check' },
      { text: 'MUI X', highlight: 'Premium', text2: 'access', icon: 'check' },
      { text: '5+', highlight: 'Premium', text2: 'features', icon: 'check' },
      { highlight: 'Premium', text2: 'support', icon: 'support', supportType: 'premium' },
    ],
  },
  enterprise: {
    iconName: 'pricing/x-plan-enterprise',
    title: 'Enterprise',
    description:
      'All features of Premium coupled with enterprise-grade support and customer success.',
    features: [
      { text: 'All Premium', text2: 'features and…', icon: 'check' },
      { text: 'Technical support for all libraries', icon: 'check' },
      { text: 'Guaranteed response time', icon: 'check' },
      { text: 'Pre-screening', icon: 'check' },
      { text: 'Issue escalation', icon: 'check' },
      { text: 'Customer Success Manager', icon: 'check' },
      { highlight: 'Priority', text2: 'support', icon: 'support', supportType: 'priority' },
    ],
  },
};

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
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', textAlign: 'center', minHeight: 38 }}
          >
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
  const perpetualMultiplier = 3;

  if (plan === 'pro') {
    const annualValue = 180;
    const perpetualValue = annualValue * perpetualMultiplier;
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
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                fontSize: '0.8125rem',
                minHeight: 38,
              }}
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

    const premiumPerpetualValue = premiumAnnualValue * perpetualMultiplier;
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
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                fontSize: '0.8125rem',
                minHeight: 38,
              }}
            >
              {priceExplanation}
            </Typography>
          }
        </Box>
        <Button
          component={Link}
          noLinkStyle
          href={getHref(annual, prioritySupport)}
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
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.40rem',
            color: 'primary.main',
            textAlign: 'center',
            mt: 1,
          }}
        >
          Custom pricing
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
        <Typography
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            fontSize: '0.8125rem',
            minHeight: 38,
          }}
        >
          Got a big team? Request a personalized quote!
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

function getHref(annual: boolean, prioritySupport: boolean): string {
  if (annual && prioritySupport) {
    return 'https://mui.com/store/items/mui-x-premium/?addons=mui-x-priority-support';
  }
  if (!annual && prioritySupport) {
    return 'https://mui.com/store/items/mui-x-premium-perpetual/?addons=mui-x-priority-support';
  }
  if (annual && !prioritySupport) {
    return 'https://mui.com/store/items/mui-x-premium/';
  }
  return 'https://mui.com/store/items/mui-x-premium-perpetual/';
}

export function FeatureItem({ feature, idPrefix }: { feature: Feature; idPrefix?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        pl: feature.icon === 'check' ? 0.4 : null,
      }}
    >
      {feature.icon === 'check' && (
        <IconImage name="pricing/yes" sx={{ fontSize: 20, color: 'primary.main' }} />
      )}
      {feature.icon === 'support' && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
          }}
        >
          {(() => {
            if (feature.supportType === 'pro') {
              return <ProSupportIcon idPrefix={idPrefix} />;
            }
            if (feature.supportType === 'premium') {
              return <PremiumSupportIcon idPrefix={idPrefix} />;
            }
            if (feature.supportType === 'priority') {
              return <PrioritySupportIcon idPrefix={idPrefix} />;
            }
            return null;
          })()}
        </Box>
      )}
      <Typography
        component="span"
        variant="body2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {feature.text}
        {feature.highlight && (
          <Typography
            variant="body2"
            component="span"
            sx={{
              color: 'primary.main',
              fontWeight: 500,
            }}
          >
            {feature.highlight}
          </Typography>
        )}
        {feature.text2 && ` ${feature.text2}`}
      </Typography>
    </Box>
  );
}

export function PlanNameDisplay({
  plan,
  disableDescription = true,
}: {
  plan: keyof typeof planInfo;
  disableDescription?: boolean;
}) {
  const { title, iconName, description } = planInfo[plan];
  return (
    <React.Fragment>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pr: 0.5,
        }}
      >
        <IconImage name={iconName} mode="" loading="eager" sx={{ mr: 1 }} /> {title}
      </Typography>
      {!disableDescription && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'baseline',
            mt: 1,
            minHeight: 96,
            height: 48,
            lineHeight: '24px',
          }}
        >
          {description}
        </Typography>
      )}
    </React.Fragment>
  );
}

export default function PricingCards() {
  return (
    <React.Fragment>
      <LicenseModelSwitch />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          mt: 3,
          mb: 8,
          gap: 2,
          mx: 'auto',
          maxWidth: '100%',
        }}
      >
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
            <PlanNameDisplay plan="community" disableDescription={false} />
            <PlanPrice plan="community" />
          </Box>
          <Divider />
          <Box textAlign="left">
            {planInfo.community.features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
              >
                <FeatureItem feature={feature} />
              </Box>
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
            <PlanNameDisplay plan="pro" disableDescription={false} />
            <PlanPrice plan="pro" />
          </Box>
          <Divider />
          <Box textAlign="left">
            {planInfo.pro.features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
              >
                <FeatureItem feature={feature} />
              </Box>
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
            <PlanNameDisplay plan="premium" disableDescription={false} />
            <PlanPrice plan="premium" />
          </Box>
          <Box textAlign="left">
            {planInfo.premium.features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
              >
                <FeatureItem feature={feature} />
              </Box>
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
            <PlanNameDisplay plan="enterprise" disableDescription={false} />
            <PlanPrice plan="enterprise" />
          </Box>
          <Divider />
          <Box textAlign="left">
            {planInfo.enterprise.features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
              >
                <FeatureItem feature={feature} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
