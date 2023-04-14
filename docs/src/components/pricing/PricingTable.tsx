import * as React from 'react';
import { alpha } from '@mui/material/styles';
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
import Link from 'docs/src/modules/components/Link';
import IconImage, { IconImageProps } from 'docs/src/components/icon/IconImage';
import LaunchRounded from '@mui/icons-material/LaunchRounded';
import UnfoldMoreRounded from '@mui/icons-material/UnfoldMoreRounded';

const planInfo = {
  community: {
    color: 'green',
    title: 'Community',
    description: 'Get started with the industry-standard React UI library, MIT-licensed.',
  },
  pro: {
    color: 'blue',
    title: 'Pro',
    description: 'Best for professional developers building enterprise or data-rich applications.',
  },
  premium: {
    color: 'gold',
    title: 'Premium',
    description:
      'The most advanced features for data-rich applications, as well as the highest priority for support.',
  },
} as const;

export function PlanName({
  plan,
  centered = false,
  disableDescription = false,
}: {
  plan: 'community' | 'pro' | 'premium';
  centered?: boolean;
  disableDescription?: boolean;
}) {
  const { title, color, description } = planInfo[plan];
  return (
    <React.Fragment>
      {centered ? (
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <IconImage name={`block-${color}` as IconImageProps['name']} sx={{ mr: 1 }} /> {title}
        </Typography>
      ) : (
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          {title} <IconImage name={`block-${color}` as IconImageProps['name']} />
        </Typography>
      )}
      {!disableDescription && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, minHeight: { md: 63 } }}>
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

  if (plan === 'community') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography variant="h4" component="div" fontWeight="bold" color="success.600">
          $0
        </Typography>
        <Box sx={{ width: 5 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: '4px' }}>
          – free forever
        </Typography>
      </Box>
    );
  }
  if (plan === 'pro') {
    return (
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
          <Typography variant="h4" component="div" fontWeight="bold" color="primary.main">
            $15
          </Typography>
          <Box sx={{ width: 5 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: '3px' }}>
            / dev / month
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Billed annually at $180/dev.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          No additional fee beyond 10 devs.
        </Typography>
      </div>
    );
  }
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography
          variant="body2"
          fontWeight="bold"
          color="error.500"
          sx={(theme) => ({
            borderRadius: 0.5,
            bgcolor: 'error.100',
            textDecoration: 'line-through',
            p: '3px 4px',
            ...theme.applyDarkStyles({
              bgcolor: 'error.900',
            }),
          })}
        >
          $49
        </Typography>
        <Box sx={{ width: 10 }} />
        <Typography variant="h4" component="div" fontWeight="bold" color="primary.main">
          $37
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          fontWeight="bold"
          color="primary.main"
          sx={{ mb: 1 }}
        >
          *
        </Typography>
        <Box sx={{ width: 5 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: '3px' }}>
          / dev / month
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Billed annually at $444/dev.
      </Typography>
      <Link variant="body2" href="#early-bird" sx={{ mb: 2 }}>
        * Early bird special.
      </Link>
    </div>
  );
}

function Info(props: { value: React.ReactNode; metadata?: React.ReactNode }) {
  const { value, metadata } = props;
  return (
    <React.Fragment>
      {typeof value === 'string' ? (
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      ) : (
        value
      )}
      {metadata && (
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="normal"
          sx={{ display: 'block', mt: 0.8, textAlign: 'center' }}
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
  nested = false,
  href,
}: {
  label: string;
  metadata?: string;
  tooltip?: string;
  nested?: boolean;
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
    <Box sx={{ pl: nested ? 2.5 : 1, pr: 1, alignSelf: 'center', justifySelf: 'flex-start' }}>
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
          color="text.secondary"
          fontWeight="normal"
          sx={{ display: 'block' }}
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
        (theme) => ({
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: '10px 10px 0 0',
          borderWidth: '1px 1px 0 1px',
          borderStyle: 'solid',
          borderColor: 'grey.100',
          bgcolor: alpha(theme.palette.grey[50], 0.5),
        }),
        (theme) =>
          theme.applyDarkStyles({
            borderColor: 'primaryDark.700',
            bgcolor: alpha(theme.palette.primaryDark[900], 0.5),
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function Recommended(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        {
          typography: 'caption',
          color: 'primary.500',
          p: '2px 8px',
          border: '1px solid',
          borderRadius: 2,
          position: 'absolute',
          top: 0,
          left: 20,
          transform: 'translateY(-50%)',
          borderColor: 'primary.100',
          bgcolor: 'primary.50',
        },
        (theme) =>
          theme.applyDarkStyles({
            borderColor: 'primaryDark.500',
            bgcolor: 'primaryDark.800',
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      Recommended
    </Box>
  );
}

function Cell({ highlighted = false, ...props }: BoxProps & { highlighted?: boolean }) {
  return (
    <Box
      {...props}
      sx={[
        {
          py: '18px',
          px: 2,
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
              bgcolor: alpha(theme.palette.primaryDark[900], 0.5),
            }),
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function RowHead({ children, startIcon, ...props }: BoxProps & { startIcon?: React.ReactElement }) {
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
        },
        (theme) =>
          theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
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
    <ColumnHead label="Column groups" nested href="/x/react-data-grid/column-groups/" />
  ),
  'data-grid/column-spanning': (
    <ColumnHead label="Column spanning" nested href="/x/react-data-grid/column-spanning/" />
  ),
  'data-grid/column-resizing': (
    <ColumnHead
      label="Column resizing"
      nested
      href="/x/react-data-grid/column-dimensions/#resizing"
    />
  ),
  'data-grid/column-reorder': (
    <ColumnHead label="Column reorder" nested href="/x/react-data-grid/column-ordering/" />
  ),
  'data-grid/column-pinning': (
    <ColumnHead label="Column pinning" nested href="/x/react-data-grid/column-pinning/" />
  ),
  'data-grid/column-sorting': (
    <ColumnHead label="Column sorting" nested href="/x/react-data-grid/sorting/" />
  ),
  'data-grid/multi-column-sorting': (
    <ColumnHead
      label="Multi-column sorting"
      nested
      href="/x/react-data-grid/sorting/#multi-sorting"
    />
  ),
  'data-grid/row-height': (
    <ColumnHead label="Row height" nested href="/x/react-data-grid/row-height/" />
  ),
  'data-grid/row-spanning': (
    <ColumnHead label="Row spanning" nested href="/x/react-data-grid/row-spanning/" />
  ),
  'data-grid/row-reordering': (
    <ColumnHead label="Row reordering" nested href="/x/react-data-grid/row-ordering/" />
  ),
  'data-grid/row-pinning': (
    <ColumnHead label="Row pinning" nested href="/x/react-data-grid/row-pinning/" />
  ),
  'data-grid/row-selection': (
    <ColumnHead label="Row selection" nested href="/x/react-data-grid/row-selection/" />
  ),
  'data-grid/row-multiselection': (
    <ColumnHead
      label="Multi-row selection"
      nested
      href="/x/react-data-grid/row-selection/#multiple-row-selection"
    />
  ),
  'data-grid/row-rangeselection': (
    <ColumnHead label="Range selection" nested href="/x/react-data-grid/cell-selection/" />
  ),
  'data-grid/filter-quick': (
    <ColumnHead label="Quick filter" nested href="/x/react-data-grid/filtering/#quick-filter" />
  ),
  'data-grid/filter-column': (
    <ColumnHead label="Column filters" nested href="/x/react-data-grid/filtering/" />
  ),
  'data-grid/filter-multicolumn': (
    <ColumnHead
      label="Multi-column filtering"
      nested
      href="/x/react-data-grid/filtering/#single-and-multi-filtering"
    />
  ),
  'data-grid/pagination': (
    <ColumnHead label="Pagination" nested href="/x/react-data-grid/pagination/" />
  ),
  'data-grid/pagination-large': (
    <ColumnHead
      label="Pagination > 100 rows per page"
      nested
      href="/x/react-data-grid/pagination/#size-of-the-page"
    />
  ),
  'data-grid/edit-row': (
    <ColumnHead label="Row editing" nested href="/x/react-data-grid/editing/#row-editing" />
  ),
  'data-grid/edit-cell': (
    <ColumnHead label="Cell editing" nested href="/x/react-data-grid/editing/#cell-editing" />
  ),
  'data-grid/file-csv': (
    <ColumnHead label="CSV export" nested href="/x/react-data-grid/export/#csv-export" />
  ),
  'data-grid/file-print': (
    <ColumnHead label="Print" nested href="/x/react-data-grid/export/#print-export" />
  ),
  'data-grid/file-clipboard': (
    <ColumnHead label="Clipboard" nested href="/x/react-data-grid/export/#clipboard" />
  ),
  'data-grid/file-excel': (
    <ColumnHead label="Excel export" nested href="/x/react-data-grid/export/#excel-export" />
  ),
  'data-grid/customizable-components': (
    <ColumnHead label="Customizable components" nested href="/x/react-data-grid/components/" />
  ),
  'data-grid/virtualize-column': (
    <ColumnHead
      label="Column virtualization"
      nested
      href="/x/react-data-grid/virtualization/#column-virtualization"
    />
  ),
  'data-grid/virtualize-row': (
    <ColumnHead
      label="Row virtualization > 100 rows"
      nested
      href="/x/react-data-grid/virtualization/#row-virtualization"
    />
  ),
  'data-grid/tree-data': (
    <ColumnHead label="Tree data" nested href="/x/react-data-grid/tree-data/" />
  ),
  'data-grid/master-detail': (
    <ColumnHead label="Master detail" nested href="/x/react-data-grid/master-detail/" />
  ),
  'data-grid/grouping': (
    <ColumnHead
      label="Row grouping"
      nested
      href="https://mui.com/x/react-data-grid/row-grouping/"
    />
  ),
  'data-grid/aggregation': (
    <ColumnHead label="Aggregation" nested href="/x/react-data-grid/aggregation/" />
  ),
  'data-grid/pivoting': <ColumnHead label="Pivoting" nested href="/x/react-data-grid/pivoting/" />,
  'data-grid/accessibility': (
    <ColumnHead label="Accessibility" nested href="/x/react-data-grid/accessibility/" />
  ),
  'data-grid/keyboard-nav': (
    <ColumnHead
      label="Keyboard navigation"
      nested
      href="/x/react-data-grid/accessibility/#keyboard-navigation"
    />
  ),
  'data-grid/localization': (
    <ColumnHead label="Localization" nested href="/x/react-data-grid/localization/" />
  ),
  'date-picker/simple': <ColumnHead label="Date Picker" />,
  'date-picker/range': <ColumnHead label="Date Range Picker" />,
  'mui-x-production': <ColumnHead label="Perpetual use in production" />,
  'mui-x-development': <ColumnHead label="Development license" tooltip="For active development" />,
  'mui-x-updates': <ColumnHead label="Access to new releases" />,
  // Support
  'core-support': (
    <ColumnHead
      {...{
        label: 'Technical support for MUI Core',
        tooltip:
          'Support for MUI Core (e.g. Material UI) is provided by the community. MUI Core maintainers focus on solving root issues to support the community at large.',
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
        label: 'Security questionnaire',
      }}
    />
  ),
};

const yes = <IconImage name="yes" title="Included" />;
const pending = <IconImage name="time" title="Work in progress" />;
const no = <IconImage name="no" title="Not included" />;

const communityData: Record<string, React.ReactNode> = {
  // MUI Core
  'Base UI': yes,
  'MUI System': yes,
  'Material UI': yes,
  'Joy UI': yes,
  // MUI X
  'data-grid/column-groups': yes,
  'data-grid/column-spanning': yes,
  'data-grid/column-resizing': no,
  'data-grid/column-reorder': no,
  'data-grid/column-pinning': no,
  'data-grid/row-height': yes,
  'data-grid/row-spanning': pending,
  'data-grid/row-reordering': no,
  'data-grid/row-pinning': no,
  'data-grid/row-selection': yes,
  'data-grid/row-multiselection': no,
  'data-grid/row-rangeselection': no,
  'data-grid/filter-quick': yes,
  'data-grid/filter-column': yes,
  'data-grid/filter-multicolumn': no,
  'data-grid/column-sorting': yes,
  'data-grid/multi-column-sorting': no,
  'data-grid/pagination': yes,
  'data-grid/pagination-large': no,
  'data-grid/edit-row': yes,
  'data-grid/edit-cell': yes,
  'data-grid/file-csv': yes,
  'data-grid/file-print': yes,
  'data-grid/file-clipboard': no,
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
  'date-picker/simple': yes,
  'date-picker/range': no,
  'mui-x-production': yes,
  'mui-x-updates': yes,
  'mui-x-development': yes,
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
  // MUI Core
  'Base UI': yes,
  'MUI System': yes,
  'Material UI': yes,
  'Joy UI': yes,
  // MUI X
  'data-grid/column-groups': yes,
  'data-grid/column-spanning': yes,
  'data-grid/column-resizing': yes,
  'data-grid/column-reorder': yes,
  'data-grid/column-pinning': yes,
  'data-grid/row-height': yes,
  'data-grid/row-spanning': pending,
  'data-grid/row-reordering': yes,
  'data-grid/row-pinning': yes,
  'data-grid/row-selection': yes,
  'data-grid/row-multiselection': yes,
  'data-grid/row-rangeselection': no,
  'data-grid/filter-quick': yes,
  'data-grid/filter-column': yes,
  'data-grid/filter-multicolumn': yes,
  'data-grid/column-sorting': yes,
  'data-grid/multi-column-sorting': yes,
  'data-grid/pagination': yes,
  'data-grid/pagination-large': yes,
  'data-grid/edit-row': yes,
  'data-grid/edit-cell': yes,
  'data-grid/file-csv': yes,
  'data-grid/file-print': yes,
  'data-grid/file-clipboard': pending,
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
  'mui-x-production': yes,
  'mui-x-development': <Info value="1 year" />,
  'mui-x-updates': <Info value="1 year" />,
  // Support
  'core-support': <Info value="Community" />,
  'x-support': <Info value={yes} metadata="Priority over Community" />,
  'tech-advisory': no,
  'support-duration': <Info value="1 year" />,
  'response-time': no,
  'pre-screening': no,
  'issue-escalation': no,
  'security-questionnaire': no,
};

const premiumData: Record<string, React.ReactNode> = {
  // MUI Core
  'Base UI': yes,
  'MUI System': yes,
  'Material UI': yes,
  'Joy UI': yes,
  // MUI X
  'data-grid/column-groups': yes,
  'data-grid/column-spanning': yes,
  'data-grid/column-resizing': yes,
  'data-grid/column-reorder': yes,
  'data-grid/column-pinning': yes,
  'data-grid/row-height': yes,
  'data-grid/row-spanning': pending,
  'data-grid/row-reordering': yes,
  'data-grid/row-pinning': yes,
  'data-grid/row-selection': yes,
  'data-grid/row-multiselection': yes,
  'data-grid/row-rangeselection': pending,
  'data-grid/filter-quick': yes,
  'data-grid/filter-column': yes,
  'data-grid/filter-multicolumn': yes,
  'data-grid/column-sorting': yes,
  'data-grid/multi-column-sorting': yes,
  'data-grid/pagination': yes,
  'data-grid/pagination-large': yes,
  'data-grid/edit-row': yes,
  'data-grid/edit-cell': yes,
  'data-grid/file-csv': yes,
  'data-grid/file-print': yes,
  'data-grid/file-clipboard': pending,
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
  'mui-x-production': yes,
  'mui-x-development': <Info value="1 year" />,
  'mui-x-updates': <Info value="1 year" />,
  // Support
  'core-support': <Info value={pending} metadata="priority add-on only" />,
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
  'issue-escalation': <Info value={pending} metadata="priority add-on only" />,
  'security-questionnaire': <Info value="Available from 4+ devs" />,
};

function RowCategory(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        (theme) => ({
          typography: 'caption',
          display: 'block',
          fontWeight: 500,
          py: 1,
          ml: 1,
          pl: 1.5,
          borderBottom: '1px solid',
          bgcolor: 'grey.50',
          borderColor: 'grey.200',
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
            borderColor: 'primaryDark.600',
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
  container: React.MutableRefObject<HTMLElement | null>;
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
          zIndex: 1,
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
            backgroundColor: alpha(theme.palette.primaryDark[900], 0.72),
          }),
      ]}
    >
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: `minmax(160px, 1fr) repeat(3, minmax(240px, 1fr))`,
        }}
      >
        <Typography variant="body2" fontWeight="bold" sx={{ px: 2, py: 1 }}>
          Plans
        </Typography>
        {(['community', 'pro', 'premium'] as const).map((plan) => (
          <Box key={plan} sx={{ px: 2, py: 1 }}>
            <PlanName plan={plan} centered disableDescription />
          </Box>
        ))}
      </Container>
    </Box>
  );
}

const divider = <Divider />;
const nestedDivider = <Divider sx={{ ml: 1 }} />;

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

  React.useEffect(() => {
    if (router.query['expand-path'] === 'all') {
      setDataGridCollapsed(true);
    }
  }, [router.query]);

  const tableRef = React.useRef<HTMLDivElement | null>(null);
  const gridSx = {
    display: 'grid',
    gridTemplateColumns: `minmax(160px, 1fr) repeat(${plans.length}, minmax(${
      columnHeaderHidden ? '0px' : '240px'
    }, 1fr))`,
  };

  const unfoldMore = (
    <UnfoldMoreRounded
      fontSize="small"
      sx={{ color: 'grey.600', opacity: dataGridCollapsed ? 0 : 1 }}
    />
  );

  function renderRow(key: string) {
    return (
      <Box
        sx={[
          gridSx,
          (theme) => ({
            '&:hover': {
              bgcolor: alpha(theme.palette.grey[50], 0.4),
              '@media (hover: none)': {
                bgcolor: 'initial',
              },
            },
          }),
          (theme) =>
            theme.applyDarkStyles({
              '&:hover': {
                bgcolor: alpha(theme.palette.primaryDark[900], 0.3),
              },
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
  return (
    <Box
      ref={tableRef}
      {...props}
      sx={{
        width: '100%',
        overflow: 'auto',
        py: { xs: 2, md: 4 },
        ...props.sx,
      }}
    >
      <StickyHead container={tableRef} disableCalculation={columnHeaderHidden} />
      {!columnHeaderHidden && (
        <Box sx={gridSx}>
          <Typography variant="body2" fontWeight="bold" sx={{ p: 2 }}>
            Plans
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
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
            <Recommended />
            <Box>
              <PlanName plan="pro" />
              <PlanPrice plan="pro" />
            </Box>
            <Button
              component={Link}
              noLinkStyle
              href="https://mui.com/store/items/mui-x-pro/"
              variant="contained"
              fullWidth
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ py: 1, mt: 'auto' }}
            >
              Buy now
            </Button>
          </ColumnHeadHighlight>
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <PlanName plan="premium" />
            <PlanPrice plan="premium" />
            <Button
              component={Link}
              noLinkStyle
              href="https://mui.com/store/items/mui-x-premium/"
              variant="contained"
              fullWidth
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ py: 1, mt: 'auto' }}
            >
              Buy now
            </Button>
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
        <Cell sx={{ minHeight: 60 }}>{unfoldMore}</Cell>
        <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
          {unfoldMore}
        </Cell>
        <Cell sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>{unfoldMore}</Cell>
        <Button
          fullWidth
          onClick={() => setDataGridCollapsed((bool) => !bool)}
          endIcon={
            <KeyboardArrowRightRounded
              color="primary"
              sx={{
                transform: dataGridCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)',
              }}
            />
          }
          sx={[
            (theme) => ({
              p: 1,
              py: 1.5,
              justifyContent: 'flex-start',
              fontWeight: 400,
              borderRadius: '0px',
              color: 'text.primary',
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
      <Collapse in={dataGridCollapsed} timeout={700} sx={{ position: 'relative' }}>
        <Box
          sx={(theme) => ({
            position: 'absolute',
            width: '2px',
            left: 10,
            top: 0,
            bottom: 0,
            bgcolor: 'grey.100',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.700',
            }),
          })}
        />
        <RowCategory>Column features</RowCategory>
        {renderRow('data-grid/column-groups')}
        {nestedDivider}
        {renderRow('data-grid/column-spanning')}
        {nestedDivider}
        {renderRow('data-grid/column-resizing')}
        {nestedDivider}
        {renderRow('data-grid/column-reorder')}
        {nestedDivider}
        {renderRow('data-grid/column-pinning')}
        {nestedDivider}
        <RowCategory>Row features</RowCategory>
        {renderRow('data-grid/row-height')}
        {nestedDivider}
        {renderRow('data-grid/row-reordering')}
        {nestedDivider}
        {renderRow('data-grid/row-pinning')}
        {nestedDivider}
        {renderRow('data-grid/row-spanning')}
        {nestedDivider}
        <RowCategory>Selection features</RowCategory>
        {renderRow('data-grid/row-selection')}
        {nestedDivider}
        {renderRow('data-grid/row-multiselection')}
        {nestedDivider}
        {renderRow('data-grid/row-rangeselection')}
        {nestedDivider}
        <RowCategory>Filtering features</RowCategory>
        {renderRow('data-grid/filter-quick')}
        {nestedDivider}
        {renderRow('data-grid/filter-column')}
        {nestedDivider}
        {renderRow('data-grid/filter-multicolumn')}
        {nestedDivider}
        <RowCategory>Sorting</RowCategory>
        {renderRow('data-grid/column-sorting')}
        {nestedDivider}
        {renderRow('data-grid/multi-column-sorting')}
        {nestedDivider}
        <RowCategory>Pagination features</RowCategory>
        {renderRow('data-grid/pagination')}
        {nestedDivider}
        {renderRow('data-grid/pagination-large')}
        {nestedDivider}
        <RowCategory>Editing features</RowCategory>
        {renderRow('data-grid/edit-row')}
        {nestedDivider}
        {renderRow('data-grid/edit-cell')}
        {nestedDivider}
        <RowCategory>Import & export</RowCategory>
        {renderRow('data-grid/file-csv')}
        {nestedDivider}
        {renderRow('data-grid/file-print')}
        {nestedDivider}
        {renderRow('data-grid/file-excel')}
        {nestedDivider}
        {renderRow('data-grid/file-clipboard')}
        {nestedDivider}
        <RowCategory>Rendering features</RowCategory>
        {renderRow('data-grid/customizable-components')}
        {nestedDivider}
        {renderRow('data-grid/virtualize-column')}
        {nestedDivider}
        {renderRow('data-grid/virtualize-row')}
        {nestedDivider}
        <RowCategory>Group & pivot</RowCategory>
        {renderRow('data-grid/tree-data')}
        {nestedDivider}
        {renderRow('data-grid/master-detail')}
        {nestedDivider}
        {renderRow('data-grid/grouping')}
        {nestedDivider}
        {renderRow('data-grid/aggregation')}
        {nestedDivider}
        {renderRow('data-grid/pivoting')}
        {nestedDivider}
        <RowCategory>Miscellaneous</RowCategory>
        {renderRow('data-grid/accessibility')}
        {nestedDivider}
        {renderRow('data-grid/keyboard-nav')}
        {nestedDivider}
        {renderRow('data-grid/localization')}
      </Collapse>
      {divider}
      {renderRow('date-picker/simple')}
      {divider}
      {renderRow('date-picker/range')}
      {divider}
      {renderRow('mui-x-production')}
      {divider}
      {renderRow('mui-x-development')}
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
