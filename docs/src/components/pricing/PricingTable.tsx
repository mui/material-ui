import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useRouter } from 'next/router';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LaunchRounded from '@mui/icons-material/LaunchRounded';
import UnfoldMoreRounded from '@mui/icons-material/UnfoldMoreRounded';
import { Link } from '@mui/docs/Link';
import IconImage from 'docs/src/components/icon/IconImage';
import LicenseModelSwitch from 'docs/src/components/pricing/LicenseModelSwitch';
import { useLicenseModel } from 'docs/src/components/pricing/LicenseModelContext';

const planInfo = {
  community: {
    iconName: 'pricing/x-plan-community',
    title: 'Community',
    description: 'Get started with the industry-standard React UI library, MIT-licensed.',
  },
  pro: {
    iconName: 'pricing/x-plan-pro',
    title: 'Pro',
    description: 'Best for professional developers building enterprise or data-rich applications.',
  },
  premium: {
    iconName: 'pricing/x-plan-premium',
    title: 'Premium',
    description:
      'The most advanced features for data-rich applications, as well as the highest priority for support.',
  },
} as const;

const formatter = new Intl.NumberFormat('en-US');

function formatCurrency(value: number) {
  return `$${formatter.format(value)}`;
}

export function PlanName({
  plan,
  disableDescription = false,
}: {
  plan: 'community' | 'pro' | 'premium';
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
            minHeight: { md: 63 },
          }}
        >
          {description}
        </Typography>
      )}
    </React.Fragment>
  );
}

interface PlanPriceProps {
  plan: 'community' | 'pro' | 'premium';
}

export function PlanPrice(props: PlanPriceProps) {
  const { plan } = props;

  const { licenseModel } = useLicenseModel();
  const annual = licenseModel === 'annual';
  const planPriceMinHeight = 64;

  if (plan === 'community') {
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, mb: 4 }}>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: 'bold', color: 'success.600', mt: 4.5 }}
          >
            $0
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Free forever!
        </Typography>
      </React.Fragment>
    );
  }

  const monthlyDisplay = annual;

  const priceUnit = monthlyDisplay ? '/ month / dev' : '/ dev';
  const getPriceExplanation = (displayedValue: number) => {
    if (!annual) {
      return `$${displayedValue}/dev billed once.`;
    }
    return monthlyDisplay
      ? `Billed annually at $${displayedValue}/dev.`
      : `$${displayedValue}/dev/month billed annualy.`;
  };

  if (plan === 'pro') {
    const monthlyValue = annual ? 15 : 15 * 3;
    const annualValue = monthlyValue * 12;

    const mainDisplayValue = monthlyDisplay ? monthlyValue : annualValue;
    const priceExplanation = getPriceExplanation(monthlyDisplay ? annualValue : monthlyValue);

    return (
      <React.Fragment>
        <LicenseModelSwitch />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, mb: 4 }}>
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
            gap: 2,
            mb: 2,
            minHeight: planPriceMinHeight,
          }}
        >
          {(annual || monthlyDisplay) && (
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              {priceExplanation}
            </Typography>
          )}

          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            No extra fees for orders with over 10 devs&nbsp;
            <span>
              <Tooltip title="Our pricing policies are changing. Read more on our blog.">
                <Link href="/blog/mui-x-sep-2024-price-update/">
                  by Aug 30
                  <OpenInNewRoundedIcon sx={{ fontSize: '16px', ml: 0.5 }} />
                </Link>
              </Tooltip>
            </span>
            .
          </Typography>
        </Box>
      </React.Fragment>
    );
  }
  // else Premium

  const originalPriceMultiplicator = monthlyDisplay ? 1 : 12;
  const premiumOriginalValue = annual
    ? 49 * originalPriceMultiplicator
    : 49 * 3 * originalPriceMultiplicator;
  const premiumMonthlyValue = annual ? 37 : 37 * 3;
  const premiumAnnualValue = premiumMonthlyValue * 12;

  const premiumDisplayedValue = monthlyDisplay ? premiumMonthlyValue : premiumAnnualValue;
  const priceExplanation = getPriceExplanation(
    monthlyDisplay ? premiumAnnualValue : premiumMonthlyValue,
  );

  return (
    <React.Fragment>
      <LicenseModelSwitch />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, mb: 4 }}>
        <Typography
          variant="caption"
          sx={[
            {
              fontWeight: 'medium',
            },
            (theme) => ({
              borderRadius: 0.5,
              alignSelf: 'flex-end',
              textDecoration: 'line-through',
              py: 0.5,
              px: 1,
              mb: 0.5,
              fontWeight: 'medium',
              bgcolor: 'error.50',
              color: 'error.500',
              border: '1px solid',
              borderColor: 'error.100',
              ...theme.applyDarkStyles({
                color: 'error.300',
                bgcolor: 'error.900',
                borderColor: 'error.800',
              }),
            }),
          ]}
        >
          {formatCurrency(premiumOriginalValue)}
        </Typography>
        <Box sx={{ width: 10 }} />
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
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
          gap: 2,
          mb: 2,
          minHeight: planPriceMinHeight,
        }}
      >
        {(annual || monthlyDisplay) && (
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            {priceExplanation}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          🐦 Early Bird: <strong>25% off</strong> if ordered &nbsp;
          <span>
            <Tooltip title="Our pricing policies are changing. Read more on our blog.">
              <Link href="/blog/mui-x-sep-2024-price-update/">
                by Aug 30
                <OpenInNewRoundedIcon sx={{ fontSize: '16px', ml: 0.5 }} />{' '}
              </Link>
            </Tooltip>
          </span>
          .
        </Typography>
      </Box>
    </React.Fragment>
  );
}

function Info(props: { value: React.ReactNode; metadata?: React.ReactNode }) {
  const { value, metadata } = props;
  return (
    <React.Fragment>
      {typeof value === 'string' ? (
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          {value}
        </Typography>
      ) : (
        value
      )}
      {metadata && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 'normal',
            display: 'block',
            mt: 0.8,
            textAlign: 'center',
          }}
        >
          {metadata}
        </Typography>
      )}
    </React.Fragment>
  );
}

function ColumnHead({
  label,
  metadata,
  tooltip,
  href,
}: {
  label: React.ReactNode;
  metadata?: string;
  tooltip?: string;
  href?: string;
}) {
  const text = (
    <Typography
      {...(href && {
        component: Link,
        href,
        target: '_blank',
      })}
      variant="body2"
      sx={{
        '&:hover > svg': { color: 'primary.main' },
        ...(href && {
          fontWeight: 500,
          '&:hover > svg': {
            opacity: 1,
            ml: 0.5,
          },
        }),
      }}
    >
      {label}{' '}
      {href && (
        <LaunchRounded color="primary" sx={{ fontSize: 14, opacity: 0, transition: '0.3s' }} />
      )}
      {tooltip && (
        <InfoOutlinedIcon
          sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5, color: 'text.secondary' }}
        />
      )}
    </Typography>
  );
  return (
    <Box
      sx={{
        px: 1,
        alignSelf: 'center',
        justifySelf: 'flex-start',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {tooltip ? (
        <Tooltip title={tooltip} placement="right" describeChild>
          {text}
        </Tooltip>
      ) : (
        text
      )}
      {metadata && (
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', fontWeight: 'normal', display: 'block' }}
        >
          {metadata}
        </Typography>
      )}
    </Box>
  );
}

function ColumnHeadHighlight(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        () => ({
          p: 2,
          pt: 1.5,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: '10px 10px 0 0',
          borderWidth: '1px 1px 0 1px',
          borderStyle: 'solid',
          borderColor: 'grey.100',
          background: 'linear-gradient(0deg, rgba(250, 250, 250, 1)  0%, rgba(255,255,255,0) 100%)',
        }),
        (theme) =>
          theme.applyDarkStyles({
            borderColor: 'primaryDark.700',
            background: alpha(theme.palette.primaryDark[700], 0.3),
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function Cell({ highlighted = false, ...props }: BoxProps & { highlighted?: boolean }) {
  return (
    <Box
      {...props}
      sx={[
        {
          py: '16px',
          minHeight: 54,
          px: [1, 2],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        (theme) => ({
          ...(highlighted && {
            borderWidth: '0 1px 0 1px',
            borderStyle: 'solid',
            borderColor: 'grey.100',
            bgcolor: alpha(theme.palette.grey[50], 0.5),
          }),
        }),
        (theme) =>
          theme.applyDarkStyles({
            ...(highlighted && {
              borderColor: 'primaryDark.700',
              bgcolor: alpha(theme.palette.primaryDark[700], 0.3),
            }),
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function RowHead({
  children,
  startIcon,
  ...props
}: BoxProps & { startIcon?: React.ReactElement<any> }) {
  return (
    <Box
      {...props}
      sx={[
        {
          justifyContent: 'flex-start',
          borderRadius: 1,
          p: 1,
          transition: 'none',
          typography: 'body2',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'grey.50',
          border: '1px solid',
          borderColor: 'divider',
        },
        (theme) =>
          theme.applyDarkStyles({
            bgcolor: 'primaryDark.800',
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {startIcon && <Box sx={{ lineHeight: 0, mr: 1 }}>{startIcon}</Box>}
      {children}
    </Box>
  );
}

const rowHeaders: Record<string, React.ReactNode> = {
  // Core
  'Base UI': (
    <ColumnHead
      label="Base UI"
      tooltip="A library of headless ('unstyled') React UI components and low-level hooks, available in @mui/base."
    />
  ),
  'MUI System': (
    <ColumnHead
      label="MUI System"
      tooltip="CSS utilities for rapidly laying out custom designs, available in @mui/system."
    />
  ),
  'Material UI': (
    <ColumnHead
      label="Material UI"
      tooltip="A library of React UI components that implements Google's Material Design, available in @mui/material."
    />
  ),
  'Joy UI': (
    <ColumnHead
      label="Joy UI"
      tooltip="A library of beautifully designed React UI components, available in @mui/joy."
    />
  ),
  // Advanced
  'data-grid/column-groups': (
    <ColumnHead label="Column groups" href="/x/react-data-grid/column-groups/" />
  ),
  'data-grid/column-spanning': (
    <ColumnHead label="Column spanning" href="/x/react-data-grid/column-spanning/" />
  ),
  'data-grid/column-resizing': (
    <ColumnHead label="Column resizing" href="/x/react-data-grid/column-dimensions/#resizing" />
  ),
  'data-grid/column-autosizing': (
    <ColumnHead label="Column autosizing" href="/x/react-data-grid/column-dimensions/#autosizing" />
  ),
  'data-grid/column-reorder': (
    <ColumnHead label="Column reorder" href="/x/react-data-grid/column-ordering/" />
  ),
  'data-grid/column-pinning': (
    <ColumnHead label="Column pinning" href="/x/react-data-grid/column-pinning/" />
  ),
  'data-grid/column-sorting': (
    <ColumnHead label="Column sorting" href="/x/react-data-grid/sorting/" />
  ),
  'data-grid/multi-column-sorting': (
    <ColumnHead label="Multi-column sorting" href="/x/react-data-grid/sorting/#multi-sorting" />
  ),
  'data-grid/row-height': <ColumnHead label="Row height" href="/x/react-data-grid/row-height/" />,
  'data-grid/row-spanning': (
    <ColumnHead label="Row spanning" href="/x/react-data-grid/row-spanning/" />
  ),
  'data-grid/row-reordering': (
    <ColumnHead label="Row reordering" href="/x/react-data-grid/row-ordering/" />
  ),
  'data-grid/row-pinning': (
    <ColumnHead label="Row pinning" href="/x/react-data-grid/row-pinning/" />
  ),
  'data-grid/row-selection': (
    <ColumnHead label="Row selection" href="/x/react-data-grid/row-selection/" />
  ),
  'data-grid/row-multiselection': (
    <ColumnHead
      label="Multi-row selection"
      href="/x/react-data-grid/row-selection/#multiple-row-selection"
    />
  ),
  'data-grid/row-cell-selection': (
    <ColumnHead label="Cell selection (and Range)" href="/x/react-data-grid/cell-selection/" />
  ),
  'data-grid/filter-column': (
    <ColumnHead label="Column filters" href="/x/react-data-grid/filtering/" />
  ),
  'data-grid/filter-quick': (
    <ColumnHead label="Quick filter (Search)" href="/x/react-data-grid/filtering/quick-filter/" />
  ),
  'data-grid/header-filters': (
    <ColumnHead label="Header filters" href="/x/react-data-grid/filtering/header-filters/" />
  ),
  'data-grid/filter-multicolumn': (
    <ColumnHead label="Multi-column filtering" href="/x/react-data-grid/filtering/multi-filters/" />
  ),
  'data-grid/pagination': <ColumnHead label="Pagination" href="/x/react-data-grid/pagination/" />,
  'data-grid/pagination-large': (
    <ColumnHead
      label="Pagination > 100 rows per page"
      href="/x/react-data-grid/pagination/#size-of-the-page"
    />
  ),
  'data-grid/edit-row': (
    <ColumnHead label="Row editing" href="/x/react-data-grid/editing/#row-editing" />
  ),
  'data-grid/edit-cell': (
    <ColumnHead label="Cell editing" href="/x/react-data-grid/editing/#cell-editing" />
  ),
  'data-grid/file-csv': (
    <ColumnHead label="CSV export" href="/x/react-data-grid/export/#csv-export" />
  ),
  'data-grid/file-print': (
    <ColumnHead label="Print" href="/x/react-data-grid/export/#print-export" />
  ),
  'data-grid/file-clipboard-copy': (
    <ColumnHead label="Clipboard copy" href="/x/react-data-grid/clipboard/#clipboard-copy" />
  ),
  'data-grid/file-clipboard-paste': (
    <ColumnHead label="Clipboard paste" href="/x/react-data-grid/clipboard/#clipboard-paste" />
  ),
  'data-grid/file-excel': (
    <ColumnHead label="Excel export" href="/x/react-data-grid/export/#excel-export" />
  ),
  'data-grid/customizable-components': (
    <ColumnHead label="Customizable components" href="/x/react-data-grid/components/" />
  ),
  'data-grid/virtualize-column': (
    <ColumnHead
      label="Column virtualization"
      href="/x/react-data-grid/virtualization/#column-virtualization"
    />
  ),
  'data-grid/virtualize-row': (
    <ColumnHead
      label="Row virtualization > 100 rows"
      href="/x/react-data-grid/virtualization/#row-virtualization"
    />
  ),
  'data-grid/tree-data': <ColumnHead label="Tree data" href="/x/react-data-grid/tree-data/" />,
  'data-grid/master-detail': (
    <ColumnHead label="Master detail" href="/x/react-data-grid/master-detail/" />
  ),
  'data-grid/grouping': (
    <ColumnHead label="Row grouping" href="https://mui.com/x/react-data-grid/row-grouping/" />
  ),
  'data-grid/aggregation': (
    <ColumnHead label="Aggregation" href="/x/react-data-grid/aggregation/" />
  ),
  'data-grid/pivoting': <ColumnHead label="Pivoting" href="/x/react-data-grid/pivoting/" />,
  'data-grid/accessibility': (
    <ColumnHead label="Accessibility" href="/x/react-data-grid/accessibility/" />
  ),
  'data-grid/keyboard-nav': (
    <ColumnHead
      label="Keyboard navigation"
      href="/x/react-data-grid/accessibility/#keyboard-navigation"
    />
  ),
  'data-grid/localization': (
    <ColumnHead label="Localization" href="/x/react-data-grid/localization/" />
  ),
  'date-picker/simple': (
    <ColumnHead label="Date and Time Pickers" href="/x/react-date-pickers/date-picker/" />
  ),
  'date-picker/range': (
    <ColumnHead
      label="Date and Time Range Pickers"
      href="/x/react-date-pickers/date-range-picker/"
    />
  ),
  // charts - components
  'charts/line': <ColumnHead label="Line chart" href="/x/react-charts/lines/" />,
  'charts/bar': <ColumnHead label="Bar chart" href="/x/react-charts/bars/" />,
  'charts/scatter': <ColumnHead label="Scatter chart" href="/x/react-charts/scatter/" />,
  'charts/pie': <ColumnHead label="Pie chart" href="/x/react-charts/pie/" />,
  'charts/sparkline': <ColumnHead label="Sparkline" href="/x/react-charts/sparkline/" />,
  'charts/gauge': <ColumnHead label="Gauge" href="/x/react-charts/gauge/" />,
  'charts/treemap': <ColumnHead label="Treemap" href="/x/react-charts/treemap/" />,
  'charts/heatmap': <ColumnHead label="Heatmap" href="/x/react-charts/heatmap/" />,
  'charts/radar': <ColumnHead label="Radar" href="/x/react-charts/radar/" />,
  'charts/funnel': <ColumnHead label="Funnel" href="/x/react-charts/funnel/" />,
  'charts/sankey': <ColumnHead label="Sankey" href="/x/react-charts/sankey/" />,
  'charts/gantt': <ColumnHead label="Gantt" href="/x/react-charts/gantt/" />,
  'charts/gantt-advanced': <ColumnHead label="Advanced Gantt" />,
  'charts/candlestick': <ColumnHead label="Candlestick" />,
  'charts/large-dataset': <ColumnHead label="Large dataset with canvas" />,
  // charts - features
  'charts/legend': <ColumnHead label="Legend" href="/x/react-charts/legend/" />,
  'charts/tooltip': <ColumnHead label="Tooltip" href="/x/react-charts/tooltip/" />,
  'charts/mouse-zoom': <ColumnHead label="Zoom on mouse" />,
  'charts/export': <ColumnHead label="Export" />,
  // charts - datagrid
  'charts/cell-with-charts': (
    <ColumnHead label="Cell with chart" href="/x/react-data-grid/custom-columns/#sparkline" />
  ),
  'charts/filter-interaction': <ColumnHead label="Row filtering" />,
  'charts/selection-interaction': <ColumnHead label="Range selection" />,
  'tree-view/tree-view': <ColumnHead label="Tree View" href="/x/react-tree-view/" />,
  'mui-x-production': <ColumnHead label="Perpetual use in production" />,
  'mui-x-development': <ColumnHead label="Development license" tooltip="For active development" />,
  'mui-x-development-perpetual': (
    <ColumnHead label="Development license" tooltip="For active development" />
  ),
  'mui-x-updates': <ColumnHead label="Access to new releases" />,
  // Support
  'core-support': (
    <ColumnHead
      {...{
        label: 'Technical support for MUI Core',
        tooltip:
          'Support for MUI Core (for example Material UI) is provided by the community. MUI Core maintainers focus on solving root issues to support the community at large.',
      }}
    />
  ),
  'x-support': (
    <ColumnHead
      {...{
        label: 'Technical support for MUI X',
        tooltip:
          'You can ask for technical support, report bugs and submit unlimited feature requests to the advanced components. We take your subscription plan as one of the prioritization criteria.',
      }}
    />
  ),
  'tech-advisory': (
    <ColumnHead
      {...{
        label: 'Technical advisory',
        metadata: 'Subject to fair use policy',
        tooltip: 'Get the advice you need, from the people who build the product.',
      }}
    />
  ),
  'support-duration': (
    <ColumnHead
      {...{ label: 'Support duration', tooltip: 'Covers the duration of your subscription.' }}
    />
  ),
  'response-time': (
    <ColumnHead
      {...{ label: 'Guaranteed response time', tooltip: 'Maximum lead time for each response.' }}
    />
  ),
  'pre-screening': (
    <ColumnHead
      {...{
        label: 'Pre-screening',
        tooltip:
          'Ensure we have enough details in the ticket you submitted so our support team can work on it.',
      }}
    />
  ),
  'issue-escalation': (
    <ColumnHead
      {...{
        label: 'Issue escalation',
        tooltip: 'Escalate your tickets to highest priority in our support queue.',
      }}
    />
  ),
  'security-questionnaire': (
    <ColumnHead
      {...{
        label: (
          <React.Fragment>
            Security questionnaire & <Box component="span" sx={{ display: ['none', 'block'] }} />
            custom agreements
          </React.Fragment>
        ),
      }}
    />
  ),
};

const yes = <IconImage name="pricing/yes" title="Included" />;
const pending = <IconImage name="pricing/time" title="Work in progress" />;
const no = <IconImage name="pricing/no" title="Not included" />;
const toBeDefined = (
  <Typography
    component={Link}
    href="https://forms.gle/19vN87eBvmXPjBVp6"
    target="_blank"
    variant="body2"
    sx={{ '&:hover > svg': { color: 'primary.main', opacity: 1 }, fontWeight: 500, pl: '16px' }}
    title="To be determined"
  >
    TBD
    <LaunchRounded color="primary" sx={{ fontSize: 14, ml: 0.5, opacity: 0, transition: '0.3s' }} />
  </Typography>
);

const communityData: Record<string, React.ReactNode> = {
  // Core open-source libraries
  'Base UI': yes,
  'MUI System': yes,
  'Material UI': yes,
  'Joy UI': yes,
  // MUI X
  // data grid - columns
  'data-grid/column-groups': yes,
  'data-grid/column-spanning': yes,
  'data-grid/column-resizing': yes,
  'data-grid/column-autosizing': yes,
  'data-grid/column-reorder': no,
  'data-grid/column-pinning': no,
  // data grid - rows
  'data-grid/row-height': yes,
  'data-grid/row-spanning': pending,
  'data-grid/row-reordering': no,
  'data-grid/row-pinning': no,
  'data-grid/row-selection': yes,
  'data-grid/row-multiselection': no,
  'data-grid/row-cell-selection': no,
  // data grid - filter
  'data-grid/filter-quick': yes,
  'data-grid/filter-column': yes,
  'data-grid/header-filters': no,
  'data-grid/filter-multicolumn': no,
  'data-grid/column-sorting': yes,
  'data-grid/multi-column-sorting': no,
  'data-grid/pagination': yes,
  'data-grid/pagination-large': no,
  // data grid - edit
  'data-grid/edit-row': yes,
  'data-grid/edit-cell': yes,
  // data grid - export
  'data-grid/file-csv': yes,
  'data-grid/file-print': yes,
  'data-grid/file-clipboard-copy': yes,
  'data-grid/file-clipboard-paste': no,
  'data-grid/file-excel': no,
  'data-grid/customizable-components': yes,
  'data-grid/virtualize-column': yes,
  'data-grid/virtualize-row': no,
  'data-grid/tree-data': no,
  'data-grid/master-detail': no,
  'data-grid/grouping': no,
  'data-grid/aggregation': no,
  'data-grid/pivoting': no,
  'data-grid/accessibility': yes,
  'data-grid/keyboard-nav': yes,
  'data-grid/localization': yes,
  // picker
  'date-picker/simple': yes,
  'date-picker/range': no,
  // charts - components
  'charts/line': yes,
  'charts/bar': yes,
  'charts/scatter': yes,
  'charts/pie': yes,
  'charts/sparkline': yes,
  'charts/gauge': yes,
  'charts/treemap': pending,
  'charts/heatmap': no,
  'charts/radar': pending,
  'charts/funnel': no,
  'charts/sankey': no,
  'charts/gantt': no,
  'charts/gantt-advanced': no,
  'charts/candlestick': no,
  'charts/large-dataset': no,
  // charts - features
  'charts/legend': yes,
  'charts/tooltip': yes,
  'charts/mouse-zoom': no,
  'charts/export': no,
  // charts - datagrid
  'charts/cell-with-charts': yes,
  'charts/filter-interaction': no,
  'charts/selection-interaction': no,
  // Tree View
  'tree-view/tree-view': yes,
  // general
  'mui-x-production': yes,
  'mui-x-updates': yes,
  'mui-x-development': yes,
  'mui-x-development-perpetual': yes,
  // Support
  'core-support': <Info value="Community" />,
  'x-support': <Info value="Community" />,
  'tech-advisory': no,
  'support-duration': no,
  'response-time': no,
  'pre-screening': no,
  'issue-escalation': no,
  'security-questionnaire': no,
};

const proData: Record<string, React.ReactNode> = {
  // Core
  'Base UI': yes,
  'MUI System': yes,
  'Material UI': yes,
  'Joy UI': yes,
  // MUI X
  // data grid - columns
  'data-grid/column-groups': yes,
  'data-grid/column-spanning': yes,
  'data-grid/column-resizing': yes,
  'data-grid/column-autosizing': yes,
  'data-grid/column-reorder': yes,
  'data-grid/column-pinning': yes,
  // data grid - rows
  'data-grid/row-height': yes,
  'data-grid/row-spanning': pending,
  'data-grid/row-reordering': yes,
  'data-grid/row-pinning': yes,
  'data-grid/row-selection': yes,
  'data-grid/row-multiselection': yes,
  'data-grid/row-cell-selection': no,
  // data grid - filter
  'data-grid/filter-quick': yes,
  'data-grid/filter-column': yes,
  'data-grid/header-filters': yes,
  'data-grid/filter-multicolumn': yes,
  'data-grid/column-sorting': yes,
  'data-grid/multi-column-sorting': yes,
  'data-grid/pagination': yes,
  'data-grid/pagination-large': yes,
  // data grid - edit
  'data-grid/edit-row': yes,
  'data-grid/edit-cell': yes,
  // data grid - export
  'data-grid/file-csv': yes,
  'data-grid/file-print': yes,
  'data-grid/file-clipboard-copy': yes,
  'data-grid/file-clipboard-paste': no,
  'data-grid/file-excel': no,
  'data-grid/customizable-components': yes,
  'data-grid/virtualize-column': yes,
  'data-grid/virtualize-row': yes,
  'data-grid/tree-data': yes,
  'data-grid/master-detail': yes,
  'data-grid/grouping': no,
  'data-grid/aggregation': no,
  'data-grid/pivoting': no,
  'data-grid/accessibility': yes,
  'data-grid/keyboard-nav': yes,
  'data-grid/localization': yes,
  'date-picker/simple': yes,
  'date-picker/range': yes,

  // charts - components
  'charts/line': yes,
  'charts/bar': yes,
  'charts/scatter': yes,
  'charts/pie': yes,
  'charts/sparkline': yes,
  'charts/gauge': yes,
  'charts/treemap': pending,
  'charts/heatmap': pending,
  'charts/radar': pending,
  'charts/funnel': pending,
  'charts/sankey': pending,
  'charts/gantt': pending,
  'charts/gantt-advanced': no,
  'charts/candlestick': no,
  'charts/large-dataset': no,
  // charts - features
  'charts/legend': yes,
  'charts/tooltip': yes,
  'charts/mouse-zoom': pending,
  'charts/export': pending,
  // charts - datagrid
  'charts/cell-with-charts': yes,
  'charts/filter-interaction': pending,
  'charts/selection-interaction': no,
  // Tree View
  'tree-view/tree-view': yes,
  // general
  'mui-x-production': yes,
  'mui-x-development': <Info value="1 year" />,
  'mui-x-development-perpetual': <Info value="Perpetual" />,
  'mui-x-updates': <Info value="1 year" />,
  // Support
  'core-support': <Info value="Community" />,
  'x-support': <Info value={yes} metadata="Priority over Community" />,
  'tech-advisory': no,
  'support-duration': <Info value="1 year" />,
  'response-time': no,
  'pre-screening': no,
  'issue-escalation': no,
  'security-questionnaire': (
    <Info
      value="Available from 10+ devs"
      metadata={'Not available under the "Capped at 10 licenses" policy'}
    />
  ),
};

const premiumData: Record<string, React.ReactNode> = {
  // Core
  'Base UI': yes,
  'MUI System': yes,
  'Material UI': yes,
  'Joy UI': yes,
  // MUI X
  // data grid - columns
  'data-grid/column-groups': yes,
  'data-grid/column-spanning': yes,
  'data-grid/column-resizing': yes,
  'data-grid/column-autosizing': yes,
  'data-grid/column-reorder': yes,
  'data-grid/column-pinning': yes,
  // data grid - rows
  'data-grid/row-height': yes,
  'data-grid/row-spanning': pending,
  'data-grid/row-reordering': yes,
  'data-grid/row-pinning': yes,
  'data-grid/row-selection': yes,
  'data-grid/row-multiselection': yes,
  'data-grid/row-cell-selection': yes,
  // data grid - filter
  'data-grid/filter-quick': yes,
  'data-grid/filter-column': yes,
  'data-grid/header-filters': yes,
  'data-grid/filter-multicolumn': yes,
  'data-grid/column-sorting': yes,
  'data-grid/multi-column-sorting': yes,
  'data-grid/pagination': yes,
  'data-grid/pagination-large': yes,
  // data grid - edit
  'data-grid/edit-row': yes,
  'data-grid/edit-cell': yes,
  // data grid - export
  'data-grid/file-csv': yes,
  'data-grid/file-print': yes,
  'data-grid/file-clipboard-copy': yes,
  'data-grid/file-clipboard-paste': yes,
  'data-grid/file-excel': yes,
  'data-grid/customizable-components': yes,
  'data-grid/virtualize-column': yes,
  'data-grid/virtualize-row': yes,
  'data-grid/tree-data': yes,
  'data-grid/master-detail': yes,
  'data-grid/grouping': yes,
  'data-grid/aggregation': yes,
  'data-grid/pivoting': pending,
  'data-grid/accessibility': yes,
  'data-grid/keyboard-nav': yes,
  'data-grid/localization': yes,
  'date-picker/simple': yes,
  'date-picker/range': yes,

  // charts - components
  'charts/line': yes,
  'charts/bar': yes,
  'charts/scatter': yes,
  'charts/pie': yes,
  'charts/sparkline': yes,
  'charts/gauge': yes,
  'charts/treemap': pending,
  'charts/heatmap': pending,
  'charts/radar': pending,
  'charts/funnel': pending,
  'charts/sankey': pending,
  'charts/gantt': pending,
  'charts/gantt-advanced': toBeDefined,
  'charts/candlestick': toBeDefined,
  'charts/large-dataset': toBeDefined,
  // charts - features
  'charts/legend': yes,
  'charts/tooltip': yes,
  'charts/mouse-zoom': pending,
  'charts/export': pending,
  // charts - datagrid
  'charts/cell-with-charts': yes,
  'charts/filter-interaction': pending,
  'charts/selection-interaction': pending,
  // Tree View
  'tree-view/tree-view': yes,
  // general
  'mui-x-production': yes,
  'mui-x-development': <Info value="1 year" />,
  'mui-x-development-perpetual': <Info value="Perpetual" />,
  'mui-x-updates': <Info value="1 year" />,
  // Support
  'core-support': <Info value={pending} metadata="Priority add-on only" />,
  'x-support': <Info value={yes} metadata="Priority over Pro" />,
  'tech-advisory': pending,
  'support-duration': <Info value="1 year" />,
  'response-time': (
    <Info
      value={pending}
      metadata={
        <React.Fragment>
          Available later on
          <br />
          2 business days.
          <br />1 business day (priority add-on only)
        </React.Fragment>
      }
    />
  ),
  'pre-screening': <Info value={pending} metadata="4 hours (priority add-on only)" />,
  'issue-escalation': <Info value={pending} metadata="Priority add-on only" />,
  'security-questionnaire': <Info value="Available from 4+ devs" />,
};

function RowCategory(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        (theme) => ({
          py: 1.5,
          pl: 1.5,
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '.1rem',
          fontWeight: theme.typography.fontWeightBold,
          fontSize: theme.typography.pxToRem(11),
          color: (theme.vars || theme).palette.text.tertiary,
          borderBottom: '1px solid',
          bgcolor: (theme.vars || theme).palette.grey[50],
          borderColor: (theme.vars || theme).palette.grey[200],
          ...theme.applyDarkStyles({
            bgcolor: (theme.vars || theme).palette.primaryDark[900],
            borderColor: (theme.vars || theme).palette.primaryDark[600],
          }),
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function StickyHead({
  container,
  disableCalculation = false,
}: {
  container: React.RefObject<HTMLElement | null>;
  disableCalculation?: boolean;
}) {
  const [hidden, setHidden] = React.useState(true);
  React.useEffect(() => {
    function handleScroll() {
      if (container.current) {
        const rect = container.current.getBoundingClientRect();
        const appHeaderHeight = 64;
        const headHeight = 41;
        const tablePaddingTop = 40;
        if (
          rect.top + appHeaderHeight < 0 &&
          rect.height + rect.top - appHeaderHeight - headHeight - tablePaddingTop > 0
        ) {
          setHidden(false);
        } else {
          setHidden(true);
        }
      }
    }
    if (!disableCalculation) {
      document.addEventListener('scroll', handleScroll);
      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, [container, disableCalculation]);
  return (
    <Box
      sx={[
        (theme) => ({
          position: 'fixed',
          zIndex: 10,
          top: 56,
          left: 0,
          right: 0,
          transition: '0.3s',
          ...(hidden && {
            opacity: 0,
            top: 0,
          }),
          py: 1,
          display: { xs: 'none', md: 'block' },
          backdropFilter: 'blur(20px)',
          boxShadow: `inset 0px -1px 1px ${(theme.vars || theme).palette.grey[100]}`,
          backgroundColor: 'rgba(255,255,255,0.72)',
        }),
        (theme) =>
          theme.applyDarkStyles({
            boxShadow: `inset 0px -1px 1px ${(theme.vars || theme).palette.primaryDark[700]}`,
            backgroundColor: alpha(theme.palette.primaryDark[900], 0.7),
          }),
      ]}
    >
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: `minmax(160px, 1fr) repeat(3, minmax(240px, 1fr))`,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold', px: 2, py: 1 }}>
          Plans
        </Typography>
        {(['community', 'pro', 'premium'] as const).map((plan) => (
          <Box key={plan} sx={{ px: 2, py: 1 }}>
            <PlanName plan={plan} disableDescription />
          </Box>
        ))}
      </Container>
    </Box>
  );
}

const divider = <Divider />;

function renderMasterRow(key: string, gridSx: object, plans: Array<any>) {
  return (
    <Box
      sx={[
        gridSx,
        (theme) => ({
          '&:hover > div': {
            bgcolor: alpha(theme.palette.grey[50], 0.4),
          },
          ...theme.applyDarkStyles({
            '&:hover > div': {
              bgcolor: theme.palette.primaryDark[800],
            },
          }),
        }),
      ]}
    >
      {rowHeaders[key]}
      {plans.map((id, index) => (
        <Cell key={id} highlighted={index % 2 === 1}>
          {id === 'community' && communityData[key]}
          {id === 'pro' && proData[key]}
          {id === 'premium' && premiumData[key]}
        </Cell>
      ))}
    </Box>
  );
}

function PricingTableDevelopment(props: any) {
  const { renderRow } = props;
  const { licenseModel } = useLicenseModel();

  return licenseModel === 'annual'
    ? renderRow('mui-x-development')
    : renderRow('mui-x-development-perpetual');
}

function PricingTableBuyPro() {
  const { licenseModel } = useLicenseModel();

  return (
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
      sx={{ py: 1, mt: 'auto' }}
    >
      Buy now
    </Button>
  );
}

function PricingTableBuyPremium() {
  const { licenseModel } = useLicenseModel();

  return (
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
      sx={{ py: 1, mt: 'auto' }}
    >
      Buy now
    </Button>
  );
}

const StyledCollapse = styled(Collapse, {
  name: 'MuiSlider',
  slot: 'Track',
})(({ theme }) => {
  return {
    position: 'relative',
    marginLeft: theme.spacing(1.5),
    borderLeftWidth: '2px',
    borderLeftStyle: 'solid',
    borderColor: theme.palette.grey[100],
    ...theme.applyDarkStyles({
      borderColor: theme.palette.primaryDark[700],
    }),
  };
});

export default function PricingTable({
  columnHeaderHidden,
  plans = ['community', 'pro', 'premium'],
  ...props
}: BoxProps & {
  columnHeaderHidden?: boolean;
  plans?: Array<'community' | 'pro' | 'premium'>;
}) {
  const router = useRouter();
  const [dataGridCollapsed, setDataGridCollapsed] = React.useState(false);
  const [chartsCollapsed, setChartsCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (router.query['expand-path'] === 'all') {
      setDataGridCollapsed(true);
      setChartsCollapsed(true);
    }
  }, [router.query]);

  const tableRef = React.useRef<HTMLDivElement | null>(null);
  const gridSx = {
    display: 'grid',
    gridTemplateColumns: `minmax(160px, 1fr) repeat(${plans.length}, minmax(${
      columnHeaderHidden ? '0px' : '240px'
    }, 1fr))`,
  };
  const nestedGridSx = {
    ...gridSx,
    // Hack to keep nested grid aligned with others
    ml: '-14px',
    '&>div:first-of-type': {
      ml: '14px',
      width: 'calc(100% - 14px)', // avoid overflow on hover transparent background
    },
  };

  const dataGridUnfoldMore = (
    <UnfoldMoreRounded
      fontSize="small"
      sx={{ color: 'grey.600', opacity: dataGridCollapsed ? 0 : 1 }}
    />
  );

  const chartsUnfoldMore = (
    <UnfoldMoreRounded
      fontSize="small"
      sx={{ color: 'grey.600', opacity: chartsCollapsed ? 0 : 1 }}
    />
  );

  const renderRow = (key: string) => renderMasterRow(key, gridSx, plans);
  const renderNestedRow = (key: string) => renderMasterRow(key, nestedGridSx, plans);

  return (
    <Box ref={tableRef} {...props} sx={{ pt: 8, ...props.sx }}>
      <StickyHead container={tableRef} disableCalculation={columnHeaderHidden} />
      {!columnHeaderHidden && (
        <Box sx={gridSx}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', p: 2 }}>
            Plans
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, pt: 1.5 }}>
            <PlanName plan="community" />
            <PlanPrice plan="community" />
            <Button
              component={Link}
              noLinkStyle
              href="/material-ui/getting-started/usage/"
              variant="outlined"
              fullWidth
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ py: 1, mt: 'auto' }}
            >
              Get started
            </Button>
          </Box>
          <ColumnHeadHighlight>
            <div>
              <PlanName plan="pro" />
              <PlanPrice plan="pro" />
            </div>
            <PricingTableBuyPro />
          </ColumnHeadHighlight>
          <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, pt: 1.5 }}>
            <PlanName plan="premium" />
            <PlanPrice plan="premium" />
            <PricingTableBuyPremium />
          </Box>
        </Box>
      )}
      <RowHead startIcon={<IconImage name="product-core" width={28} height={28} />}>
        MUI Core (open-source)
      </RowHead>
      {renderRow('Material UI')}
      {divider}
      {renderRow('Joy UI')}
      {divider}
      {renderRow('Base UI')}
      {divider}
      {renderRow('MUI System')}
      <RowHead startIcon={<IconImage name="product-advanced" width={28} height={28} />}>
        MUI X (open-core)
      </RowHead>
      <Box
        sx={{
          position: 'relative',
          minHeight: 58,
          '& svg': { transition: '0.3s' },
          '&:hover svg': { color: 'primary.main' },
          ...gridSx,
        }}
      >
        <Cell />
        <Cell sx={{ minHeight: 60 }}>{dataGridUnfoldMore}</Cell>
        <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
          {dataGridUnfoldMore}
        </Cell>
        <Cell sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
          {dataGridUnfoldMore}
        </Cell>
        <Button
          fullWidth
          onClick={() => setDataGridCollapsed((bool) => !bool)}
          endIcon={
            <KeyboardArrowRightRounded
              color="primary"
              sx={{ transform: dataGridCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)' }}
            />
          }
          sx={[
            (theme) => ({
              px: 1,
              justifyContent: 'flex-start',
              fontSize: '0.875rem',
              fontWeight: 'medium',
              borderRadius: '0px',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.06),
                '@media (hover: none)': {
                  bgcolor: 'initial',
                },
              },
            }),
            (theme) =>
              theme.applyDarkStyles({
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.06),
                },
              }),
          ]}
        >
          Data Grid
        </Button>
      </Box>
      <StyledCollapse in={dataGridCollapsed} timeout={700}>
        <RowCategory>Column features</RowCategory>
        {renderNestedRow('data-grid/column-groups')}
        {divider}
        {renderNestedRow('data-grid/column-spanning')}
        {divider}
        {renderNestedRow('data-grid/column-resizing')}
        {divider}
        {renderNestedRow('data-grid/column-autosizing')}
        {divider}
        {renderNestedRow('data-grid/column-reorder')}
        {divider}
        {renderNestedRow('data-grid/column-pinning')}
        {divider}
        <RowCategory>Row features</RowCategory>
        {renderNestedRow('data-grid/row-height')}
        {divider}
        {renderNestedRow('data-grid/row-spanning')}
        {divider}
        {renderNestedRow('data-grid/row-reordering')}
        {divider}
        {renderNestedRow('data-grid/row-pinning')}
        {divider}
        <RowCategory>Selection features</RowCategory>
        {renderNestedRow('data-grid/row-selection')}
        {divider}
        {renderNestedRow('data-grid/row-multiselection')}
        {divider}
        {renderNestedRow('data-grid/row-cell-selection')}
        {divider}
        <RowCategory>Filtering features</RowCategory>
        {renderNestedRow('data-grid/filter-column')}
        {divider}
        {renderNestedRow('data-grid/filter-quick')}
        {divider}
        {renderNestedRow('data-grid/header-filters')}
        {divider}
        {renderNestedRow('data-grid/filter-multicolumn')}
        {divider}
        <RowCategory>Sorting</RowCategory>
        {renderNestedRow('data-grid/column-sorting')}
        {divider}
        {renderNestedRow('data-grid/multi-column-sorting')}
        {divider}
        <RowCategory>Pagination features</RowCategory>
        {renderNestedRow('data-grid/pagination')}
        {divider}
        {renderNestedRow('data-grid/pagination-large')}
        {divider}
        <RowCategory>Editing features</RowCategory>
        {renderNestedRow('data-grid/edit-row')}
        {divider}
        {renderNestedRow('data-grid/edit-cell')}
        {divider}
        <RowCategory>Import & export</RowCategory>
        {renderNestedRow('data-grid/file-csv')}
        {divider}
        {renderNestedRow('data-grid/file-print')}
        {divider}
        {renderNestedRow('data-grid/file-clipboard-copy')}
        {divider}
        {renderNestedRow('data-grid/file-clipboard-paste')}
        {divider}
        {renderNestedRow('data-grid/file-excel')}
        {divider}
        <RowCategory>Rendering features</RowCategory>
        {renderNestedRow('data-grid/customizable-components')}
        {divider}
        {renderNestedRow('data-grid/virtualize-column')}
        {divider}
        {renderNestedRow('data-grid/virtualize-row')}
        {divider}
        <RowCategory>Group & pivot</RowCategory>
        {renderNestedRow('data-grid/tree-data')}
        {divider}
        {renderNestedRow('data-grid/master-detail')}
        {divider}
        {renderNestedRow('data-grid/grouping')}
        {divider}
        {renderNestedRow('data-grid/aggregation')}
        {divider}
        {renderNestedRow('data-grid/pivoting')}
        {divider}
        <RowCategory>Miscellaneous</RowCategory>
        {renderNestedRow('data-grid/accessibility')}
        {divider}
        {renderNestedRow('data-grid/keyboard-nav')}
        {divider}
        {renderNestedRow('data-grid/localization')}
      </StyledCollapse>
      {divider}
      {renderRow('date-picker/simple')}
      {divider}
      {renderRow('date-picker/range')}
      {divider}
      <Box
        sx={{
          position: 'relative',
          minHeight: 58,
          '& svg': { transition: '0.3s' },
          '&:hover svg': { color: 'primary.main' },
          ...gridSx,
        }}
      >
        <Cell />
        <Cell sx={{ minHeight: 60 }}>{chartsUnfoldMore}</Cell>
        <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
          {chartsUnfoldMore}
        </Cell>
        <Cell sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>{chartsUnfoldMore}</Cell>
        <Button
          fullWidth
          onClick={() => setChartsCollapsed((bool) => !bool)}
          endIcon={
            <KeyboardArrowRightRounded
              color="primary"
              sx={{ transform: chartsCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)' }}
            />
          }
          sx={[
            (theme) => ({
              px: 1,
              justifyContent: 'flex-start',
              fontSize: '0.875rem',
              fontWeight: 'medium',
              borderRadius: '0px',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.06),
                '@media (hover: none)': {
                  bgcolor: 'initial',
                },
              },
            }),
            (theme) =>
              theme.applyDarkStyles({
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.06),
                },
              }),
          ]}
        >
          Charts
        </Button>
      </Box>
      <StyledCollapse in={chartsCollapsed} timeout={700}>
        <RowCategory>Components</RowCategory>
        {renderNestedRow('charts/line')}
        {divider}
        {renderNestedRow('charts/bar')}
        {divider}
        {renderNestedRow('charts/scatter')}
        {divider}
        {renderNestedRow('charts/pie')}
        {divider}
        {renderNestedRow('charts/sparkline')}
        {divider}
        {renderNestedRow('charts/gauge')}
        {divider}
        {renderNestedRow('charts/treemap')}
        {divider}
        {renderNestedRow('charts/radar')}
        {divider}
        {renderNestedRow('charts/heatmap')}
        {divider}
        {renderNestedRow('charts/funnel')}
        {divider}
        {renderNestedRow('charts/sankey')}
        {divider}
        {renderNestedRow('charts/gantt')}
        {divider}
        {renderNestedRow('charts/gantt-advanced')}
        {divider}
        {renderNestedRow('charts/candlestick')}
        {divider}
        {renderNestedRow('charts/large-dataset')}
        {divider}
        <RowCategory>Interactions</RowCategory>
        {renderNestedRow('charts/legend')}
        {divider}
        {renderNestedRow('charts/tooltip')}
        {divider}
        {renderNestedRow('charts/mouse-zoom')}
        {divider}
        {renderNestedRow('charts/export')}
        {divider}
        <RowCategory>Data Grid Integration</RowCategory>
        {renderNestedRow('charts/cell-with-charts')}
        {divider}
        {renderNestedRow('charts/filter-interaction')}
        {divider}
        {renderNestedRow('charts/selection-interaction')}
      </StyledCollapse>
      {divider}
      {renderRow('tree-view/tree-view')}
      {divider}
      {renderRow('mui-x-production')}
      {divider}
      <PricingTableDevelopment renderRow={renderRow} />
      {divider}
      {renderRow('mui-x-updates')}
      <RowHead>Support</RowHead>
      {renderRow('core-support')}
      {divider}
      {renderRow('x-support')}
      {divider}
      {renderRow('support-duration')}
      {divider}
      {renderRow('response-time')}
      {divider}
      {renderRow('pre-screening')}
      {divider}
      {renderRow('issue-escalation')}
      {divider}
      {renderRow('security-questionnaire')}
      {divider}
    </Box>
  );
}
