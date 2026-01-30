import * as React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconImage from 'docs/src/components/icon/IconImage';
import LicenseModelSwitch from 'docs/src/components/pricing/LicenseModelSwitch';
import { useLicenseModel } from 'docs/src/components/pricing/LicenseModelContext';
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
      { text: 'All Pro', text2: 'features', icon: 'check' },
      { text: 'Access new features first', icon: 'check' },
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
      { text: 'Multi-app license included', icon: 'check' },
      { text: 'Technical support for all libraries', icon: 'check' },
      { text: 'Guaranteed response time', icon: 'check' },
      { text: 'Pre-screening', icon: 'check' },
      { text: 'Issue escalation', icon: 'check' },
      { text: 'Customer Success Manager', icon: 'check' },
      { text: 'Available from 15 seats', icon: 'check' },
      { highlight: 'Priority', text2: 'support', icon: 'support', supportType: 'priority' },
    ],
  },
};

export const multiAppPlanInfo: Partial<Record<PlanName, Feature[]>> = {
  pro: [
    { text: 'Multi-app license included', icon: 'check' },
    { text: 'All Community features', icon: 'check' },
    { text: 'MUI X', highlight: 'Pro', text2: 'access', icon: 'check' },
    { text: '10+', highlight: 'Pro', text2: 'features', icon: 'check' },
    { highlight: 'Pro', text2: 'support', icon: 'support', supportType: 'pro' },
  ],
  premium: [
    { text: 'Multi-app license included', icon: 'check' },
    { text: 'All Pro', text2: 'features and…', icon: 'check' },
    { text: 'Access new features first', icon: 'check' },
    { text: 'MUI X', highlight: 'Premium', text2: 'access', icon: 'check' },
    { text: '5+', highlight: 'Premium', text2: 'features', icon: 'check' },
    { text: 'Self served up to 15 seats', icon: 'check' },
    { highlight: 'Premium', text2: 'support', icon: 'support', supportType: 'premium' },
  ],
};

export function getPlanFeatures(plan: PlanName, multiApp: boolean): Feature[] {
  if (multiApp && (plan === 'pro' || plan === 'premium') && multiAppPlanInfo[plan]) {
    return multiAppPlanInfo[plan]!;
  }
  return planInfo[plan].features;
}

const formatter = new Intl.NumberFormat('en-US');

function formatCurrency(value: number) {
  return `$${formatter.format(value)}`;
}

interface PlanPriceProps {
  plan: 'community' | 'pro' | 'premium' | 'enterprise';
  multiApp?: boolean;
}

export function PlanPrice(props: PlanPriceProps) {
  const { plan, multiApp = false } = props;

  const { licenseModel } = useLicenseModel();
  const annual = licenseModel === 'annual';
  const planPriceMinHeight = 24;
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
      return `Equivalent to $${displayedValue.toFixed(2)} / month / dev`;
    }
    return '';
  };

  const getProStoreUrl = (license: string, isMultiApp: boolean) => {
    if (isMultiApp) {
      return license === 'annual'
        ? 'https://mui.com/store/items/mui-x-pro/?addons=mui-x-multi-app-license'
        : 'https://mui.com/store/items/mui-x-pro-perpetual/?addons=mui-x-multi-app-license';
    }
    return license === 'annual'
      ? 'https://mui.com/store/items/mui-x-pro/'
      : 'https://mui.com/store/items/mui-x-pro-perpetual/';
  };

  if (plan === 'pro') {
    const annualValue = 299;
    const perpetualValue = 657;
    const monthlyValueForAnnual = annualValue / 12;

    const proAnnualValueWithMultiApp = 499;
    const proPerpetualValueWithMultiApp = 1097;
    const proMonthlyValueForAnnualWithMultiApp =
      Math.round((proAnnualValueWithMultiApp / 12) * 100) / 100;

    let priceForExplanation: number;
    if (multiApp) {
      priceForExplanation = proMonthlyValueForAnnualWithMultiApp;
    } else if (annual) {
      priceForExplanation = monthlyValueForAnnual;
    } else {
      priceForExplanation = perpetualValue;
    }
    const priceExplanation = getPriceExplanation(priceForExplanation);

    let mainDisplayValue: number = annual ? annualValue : perpetualValue;
    if (annual && multiApp) {
      mainDisplayValue = proAnnualValueWithMultiApp;
    } else if (!annual && multiApp) {
      mainDisplayValue = proPerpetualValueWithMultiApp;
    } else if (annual && !multiApp) {
      mainDisplayValue = annualValue;
    } else if (!annual && !multiApp) {
      mainDisplayValue = perpetualValue;
    }

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
        </Box>
        <Button
          component={Link}
          noLinkStyle
          href={getProStoreUrl(licenseModel, multiApp)}
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ py: 1, width: '100%', mt: 2, mb: 2 }}
        >
          Buy now
        </Button>
      </Box>
    );
  }

  if (plan === 'premium') {
    const premiumAnnualValue = 599;

    const premiumPerpetualValue = 1318;
    const premiumMonthlyValueForAnnual = premiumAnnualValue / 12;

    const premiumAnnualValueWithPrioritySupport = 999;
    const premiumPerpetualValueWithPrioritySupport = 2198;
    const premiumMonthlyValueForAnnualWithPrioritySupport =
      Math.round((premiumAnnualValueWithPrioritySupport / 12) * 100) / 100;

    const priceExplanation = getPriceExplanation(
      multiApp ? premiumMonthlyValueForAnnualWithPrioritySupport : premiumMonthlyValueForAnnual,
    );

    let premiumDisplayedValue: number = premiumAnnualValue;
    if (annual && multiApp) {
      premiumDisplayedValue = premiumAnnualValueWithPrioritySupport;
    } else if (!annual && multiApp) {
      premiumDisplayedValue = premiumPerpetualValueWithPrioritySupport;
    } else if (annual && !multiApp) {
      premiumDisplayedValue = premiumAnnualValue;
    } else if (!annual && !multiApp) {
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
        </Box>
        <Button
          component={Link}
          noLinkStyle
          href={getHref(annual, multiApp)}
          variant="contained"
          fullWidth
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ py: 1, mt: 2, mb: 2 }}
        >
          Buy now
        </Button>
      </Box>
    );
  }

  if (plan === 'enterprise') {
    const enterpriseAnnualValue = 1399;
    const enterprisePerpetualValue = 2798;
    const enterpriseMonthlyValueForAnnual = enterpriseAnnualValue / 12;

    const priceExplanation = getPriceExplanation(enterpriseMonthlyValueForAnnual);

    const enterpriseDisplayedValue = annual ? enterpriseAnnualValue : enterprisePerpetualValue;

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
            {formatCurrency(enterpriseDisplayedValue)}
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
        </Box>
        <Button
          component={Link}
          noLinkStyle
          href="mailto:sales@mui.com"
          variant="contained"
          fullWidth
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ py: 1, width: '100%', mt: 2, mb: 2 }}
        >
          Contact Sales
        </Button>
      </Box>
    );
  }

  return null;
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

interface PricingCardWrapperProps {
  plan: PlanName;
  highlighted?: boolean;
}

function PricingCardWrapper({ plan, highlighted = false }: PricingCardWrapperProps) {
  const [multiApp, setMultiApp] = React.useState(false);

  const handleMultiAppChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMultiApp(event.target.checked);
  };

  const MultiAppDescription =
    'Choose this option if you need to use MUI X across multiple applications within your organization.';

  const tooltipProps = {
    enterDelay: 400,
    enterNextDelay: 50,
    enterTouchDelay: 500,
    placement: 'top' as const,
    describeChild: true,
    slotProps: {
      tooltip: {
        sx: {
          fontSize: 12,
        },
      },
    },
  };

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        border: '1px solid',
        borderColor: highlighted ? 'primary.200' : 'divider',
        borderRadius: 1,
        flexDirection: 'column',
        gap: 3,
        py: 3,
        px: 2,
        flex: '1 1 0px',
        ...(highlighted && {
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
          boxShadow: '0px 2px 12px 0px rgba(234, 237, 241, 0.3) inset',
          ...theme.applyDarkStyles({
            borderColor: `${alpha(theme.palette.primary[700], 0.4)}`,
            boxShadow: '0px 2px 12px 0px rgba(0, 0, 0, 0.25) inset',
          }),
        }),
      })}
    >
      <Box sx={{ height: 'fit-content' }}>
        <PlanNameDisplay plan={plan} disableDescription={false} />
        <PlanPrice plan={plan} multiApp={multiApp} />
      </Box>
      {plan !== 'community' && plan !== 'enterprise' && (
        <Box
          sx={(theme) => ({
            border: '1px solid',
            borderColor: 'primary.100',
            borderRadius: 1,
            padding: 2,
            ...theme.applyDarkStyles({
              borderColor: `${alpha(theme.palette.primary[700], 0.4)}`,
            }),
          })}
        >
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={multiApp} onChange={handleMultiAppChange} />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    fontWeight="semiBold"
                    color="text.primary"
                    variant="body2"
                    sx={{
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Multi App License
                  </Typography>
                  <Tooltip title={MultiAppDescription} {...tooltipProps}>
                    <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </Tooltip>
                </Box>
              }
              sx={{
                mb: 0.5,
                ml: 0,
                mr: 0,
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                '& .MuiFormControlLabel-label': {
                  marginRight: 'auto',
                },
              }}
              labelPlacement="start"
            />
          </FormGroup>
        </Box>
      )}
      {plan !== 'community' && plan !== 'enterprise' && <Divider />}
      <Box textAlign="left">
        {getPlanFeatures(plan, multiApp).map((feature, index) => (
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
        <PricingCardWrapper plan="community" />
        <PricingCardWrapper plan="pro" />
        <PricingCardWrapper plan="premium" highlighted />
        <PricingCardWrapper plan="enterprise" />
      </Box>
    </React.Fragment>
  );
}
