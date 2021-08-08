import * as React from 'react';
import { alpha } from '@material-ui/core/styles';
import Box, { BoxProps } from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import Link from 'docs/src/modules/components/Link';
import IconImage, { IconImageProps } from 'docs/src/components/icon/IconImage';

const planInfo = {
  community: {
    color: 'green',
    title: 'Community',
    description:
      'Get started with the most popular and industry-standard UI library to build interfaces with React.',
  },
  pro: {
    color: 'blue',
    title: 'Pro',
    description: 'Best for professional developers building enterprise or data-rich applications.',
  },
  premium: {
    color: 'gold',
    title: 'Premium',
    description: 'Unlock all the most advances features including premium support.',
  },
} as const;

export function PlanName({ plan }: { plan: 'community' | 'pro' | 'premium' }) {
  const { title, color, description } = planInfo[plan];
  return (
    <React.Fragment>
      <Typography
        variant="body2"
        fontWeight="bold"
        sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {title} <IconImage name={`block-${color}` as IconImageProps['name']} />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </React.Fragment>
  );
}
export function PlanPrice({ plan }: { plan: 'community' | 'pro' | 'premium' }) {
  if (plan === 'community') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', my: 'auto' }}>
        <Typography variant="h4" fontWeight="bold" color="success.600">
          $0
        </Typography>
        <Box sx={{ width: 5 }} />
        <Typography variant="body2" color="text.secondary">
          / free forever!
        </Typography>
      </Box>
    );
  }
  if (plan === 'pro') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
        <Typography
          variant="caption"
          fontWeight="bold"
          color="error.500"
          sx={{
            borderRadius: 0.5,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'error.900' : 'error.100'),
            // bgcolor: 'error.200',
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
    );
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="h4" fontWeight="bold" color="grey.600">
        $599
      </Typography>
      <Box sx={{ width: 5 }} />
      <Typography variant="body2" color="text.secondary">
        / per developer.
      </Typography>
    </Box>
  );
}

const Info = ({ value, metadata }: { value: React.ReactNode; metadata?: string }) => {
  return (
    <React.Fragment>
      {typeof value === 'string' ? <Typography variant="body2">{value}</Typography> : value}
      {metadata && (
        <Typography
          variant="caption"
          color="grey.800"
          fontWeight="normal"
          sx={{ display: 'block', mt: 0.5 }}
        >
          {metadata}
        </Typography>
      )}
    </React.Fragment>
  );
};
const ColumnHead = ({
  label,
  metadata,
  tooltip,
  nested = false,
}: {
  label: string;
  metadata?: string;
  tooltip?: string;
  nested?: boolean;
}) => {
  const text = (
    <Typography variant="body2" sx={{ '&:hover > svg': { color: 'primary.main' } }}>
      {label}{' '}
      {tooltip && (
        <InfoOutlinedIcon
          sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5, color: 'grey.800' }}
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
          color="grey.700"
          fontWeight="normal"
          sx={{ display: 'block' }}
        >
          {metadata}
        </Typography>
      )}
    </Box>
  );
};
const ColumnHeadHighlight = (props: BoxProps) => (
  <Box
    {...props}
    sx={{
      p: 2,
      position: 'relative',
      borderRadius: '10px 10px 0 0',
      borderWidth: '1px 1px 0 1px',
      borderStyle: 'solid',
      borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200'),
      bgcolor: (theme) =>
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.primaryDark[900], 0.5)
          : alpha(theme.palette.grey[50], 0.5),
      ...props.sx,
    }}
  />
);
const Recommended = (props: BoxProps) => (
  <Box
    {...props}
    sx={{
      typography: 'caption',
      color: 'primary.500',
      p: '2px 8px',
      border: '1px solid',
      borderRadius: 2,
      borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primary.700' : 'primary.200'),
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.50'),
      position: 'absolute',
      top: 0,
      left: 20,
      transform: 'translateY(-50%)',
      ...props.sx,
    }}
  >
    Recommended
  </Box>
);

const Cell = ({ highlighted = false, ...props }: BoxProps & { highlighted?: boolean }) => (
  <Box
    {...props}
    sx={{
      py: 2,
      pl: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: {
        xs: 'center',
        md: 'flex-start',
      },
      justifyContent: 'center',
      ...(highlighted && {
        borderWidth: '0 1px 0 1px',
        borderStyle: 'solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200'),
        bgcolor: (theme) =>
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primaryDark[900], 0.5)
            : alpha(theme.palette.grey[50], 0.5),
      }),
    }}
  />
);

const RowHead = ({
  children,
  startIcon,
  ...props
}: BoxProps & { startIcon?: React.ReactElement }) => (
  <Box
    {...props}
    sx={{
      justifyContent: 'flex-start',
      borderRadius: 1,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
      p: 1,
      transition: 'none',
      typography: 'body2',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      ...props.sx,
    }}
  >
    {startIcon && <Box sx={{ lineHeight: 0, mr: 1 }}>{startIcon}</Box>}
    {children}
  </Box>
);

const rowHeaders: Record<string, React.ReactNode> = {
  // Core
  '@mui/core': (
    <ColumnHead
      {...{
        label: '@mui/core-base',
        tooltip: 'The unstyled and headless (hooks) components version of @material-ui/core.',
      }}
    />
  ),
  '@mui/unstyled': (
    <ColumnHead
      {...{ label: '@mui/core-material', tooltip: 'Core components following Material Design.' }}
    />
  ),
  '@mui/system': (
    <ColumnHead
      {...{
        label: '@mui/system',
        tooltip: 'CSS utilities for rapidly laying out custom designs.',
      }}
    />
  ),
  // Advanced
  'data-grid/column-resizing': <ColumnHead label="Column resizing" nested />,
  'data-grid/column-groups': <ColumnHead label="Column groups" nested />,
  'data-grid/column-reorder': <ColumnHead label="Column reorder" nested />,
  'data-grid/column-pinning': <ColumnHead label="Column pinning" nested />,
  'data-grid/column-spanning': <ColumnHead label="Column spanning" nested />,
  'data-grid/row-sorting': <ColumnHead label="Row sorting" nested />,
  'data-grid/row-height': <ColumnHead label="Row height" nested />,
  'data-grid/row-spanning': <ColumnHead label="Row spanning" nested />,
  'data-grid/row-reordering': <ColumnHead label="Row reordering" nested />,
  'data-grid/row-selection': <ColumnHead label="Row selection" nested />,
  'data-grid/row-multiselection': <ColumnHead label="Multi-row selection" nested />,
  'data-grid/row-rangeselection': <ColumnHead label="Range selection" nested />,
  'data-grid/filter-column': <ColumnHead label="Column filters" nested />,
  'data-grid/filter-multicolumn': <ColumnHead label="Multi-column filtering" nested />,
  'data-grid/filter-quick': <ColumnHead label="Quick filter" nested />,
  'data-grid/pagination': <ColumnHead label="Pagination" nested />,
  'data-grid/pagination-large': <ColumnHead label="Pagination > 100 rows per page" nested />,
  'data-grid/edit-row': <ColumnHead label="Row editing" nested />,
  'data-grid/edit-cell': <ColumnHead label="Cell editing" nested />,
  'data-grid/file-csv': <ColumnHead label="CSV export" nested />,
  'data-grid/file-print': <ColumnHead label="Print" nested />,
  'data-grid/file-excel': <ColumnHead label="Excel export" nested />,
  'data-grid/file-clipboard': <ColumnHead label="Clipboard" nested />,
  'data-grid/virtualize-column': <ColumnHead label="Column virtualization" nested />,
  'data-grid/virtualize-row': <ColumnHead label="Row virtualization > 100 rows" nested />,
  'data-grid/customizable-components': <ColumnHead label="Customizable components" nested />,
  'data-grid/tree-data': <ColumnHead label="Tree data" nested />,
  'data-grid/master-detail': <ColumnHead label="Master detail" nested />,
  'data-grid/grouping': <ColumnHead label="Grouping" nested />,
  'data-grid/aggregation': <ColumnHead label="Aggregation" nested />,
  'data-grid/pivoting': <ColumnHead label="Pivoting" nested />,
  'data-grid/accessibility': <ColumnHead label="Accessibility" nested />,
  'data-grid/keyboard-nav': <ColumnHead label="Keyboard navigation" nested />,
  'data-grid/localization': <ColumnHead label="Localization" nested />,
  'data-grid-pro': <ColumnHead label="Data Grid Pro Updates" />,
  'date-range-picker': <ColumnHead label="Date Range Picker" />,
  // Support
  community: <ColumnHead {...{ label: 'Community' }} />,
  'bugs/features': (
    <ColumnHead
      {...{
        label: 'Bug reports & feature requests',
        tooltip:
          'You can report an unlimited number of bugs and submit unlimited feature requests.',
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
      {...{ label: 'Support duration', tooltip: 'Included with initial license purchase.' }}
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
};

const communityData: Record<string, React.ReactNode> = {
  // Core
  '@mui/core': <IconImage name="yes" />,
  '@mui/unstyled': <IconImage name="yes" />,
  '@mui/system': <IconImage name="yes" />,
  // Advanced
  'data-grid/column-resizing': <IconImage name="no" />,
  'data-grid/column-groups': <IconImage name="time" />,
  'data-grid/column-reorder': <IconImage name="no" />,
  'data-grid/column-pinning': <IconImage name="no" />,
  'data-grid/column-spanning': <IconImage name="time" />,
  'data-grid/row-sorting': <IconImage name="yes" />,
  'data-grid/row-height': <IconImage name="yes" />,
  'data-grid/row-spanning': <IconImage name="time" />,
  'data-grid/row-reordering': <IconImage name="no" />,
  'data-grid/row-selection': <IconImage name="yes" />,
  'data-grid/row-multiselection': <IconImage name="no" />,
  'data-grid/row-rangeselection': <IconImage name="no" />,
  'data-grid/filter-column': <IconImage name="yes" />,
  'data-grid/filter-multicolumn': <IconImage name="no" />,
  'data-grid/filter-quick': <IconImage name="time" />,
  'data-grid/pagination': <IconImage name="yes" />,
  'data-grid/pagination-large': <IconImage name="no" />,
  'data-grid/edit-row': <IconImage name="time" />,
  'data-grid/edit-cell': <IconImage name="yes" />,
  'data-grid/file-csv': <IconImage name="yes" />,
  'data-grid/file-print': <IconImage name="time" />,
  'data-grid/file-excel': <IconImage name="no" />,
  'data-grid/file-clipboard': <IconImage name="no" />,
  'data-grid/virtualize-column': <IconImage name="yes" />,
  'data-grid/virtualize-row': <IconImage name="no" />,
  'data-grid/customizable-components': <IconImage name="yes" />,
  'data-grid/tree-data': <IconImage name="no" />,
  'data-grid/master-detail': <IconImage name="no" />,
  'data-grid/grouping': <IconImage name="no" />,
  'data-grid/aggregation': <IconImage name="no" />,
  'data-grid/pivoting': <IconImage name="no" />,
  'data-grid/accessibility': <IconImage name="yes" />,
  'data-grid/keyboard-nav': <IconImage name="yes" />,
  'data-grid/localization': <IconImage name="yes" />,
  'data-grid-pro': <IconImage name="no" />,
  'date-range-picker': <IconImage name="no" />,
  // Support
  community: <IconImage name="yes" />,
  'bugs/features': <IconImage name="yes" />,
  'tech-advisory': <IconImage name="no" />,
  'support-duration': <IconImage name="no" />,
  'response-time': <IconImage name="no" />,
  'pre-screening': <IconImage name="no" />,
  'issue-escalation': <IconImage name="no" />,
};
const proData: Record<string, React.ReactNode> = {
  // Core
  '@mui/core': <IconImage name="yes" />,
  '@mui/unstyled': <IconImage name="yes" />,
  '@mui/system': <IconImage name="yes" />,
  // Advanced
  'data-grid/column-resizing': <IconImage name="yes" />,
  'data-grid/column-groups': <IconImage name="time" />,
  'data-grid/column-reorder': <IconImage name="yes" />,
  'data-grid/column-pinning': <IconImage name="time" />,
  'data-grid/column-spanning': <IconImage name="time" />,
  'data-grid/row-sorting': <IconImage name="yes" />,
  'data-grid/row-height': <IconImage name="yes" />,
  'data-grid/row-spanning': <IconImage name="time" />,
  'data-grid/row-reordering': <IconImage name="time" />,
  'data-grid/row-selection': <IconImage name="yes" />,
  'data-grid/row-multiselection': <IconImage name="yes" />,
  'data-grid/row-rangeselection': <IconImage name="no" />,
  'data-grid/filter-column': <IconImage name="yes" />,
  'data-grid/filter-multicolumn': <IconImage name="yes" />,
  'data-grid/filter-quick': <IconImage name="time" />,
  'data-grid/pagination': <IconImage name="yes" />,
  'data-grid/pagination-large': <IconImage name="yes" />,
  'data-grid/edit-row': <IconImage name="time" />,
  'data-grid/edit-cell': <IconImage name="yes" />,
  'data-grid/file-csv': <IconImage name="yes" />,
  'data-grid/file-print': <IconImage name="time" />,
  'data-grid/file-excel': <IconImage name="no" />,
  'data-grid/file-clipboard': <IconImage name="time" />,
  'data-grid/virtualize-column': <IconImage name="yes" />,
  'data-grid/virtualize-row': <IconImage name="yes" />,
  'data-grid/customizable-components': <IconImage name="yes" />,
  'data-grid/tree-data': <IconImage name="time" />,
  'data-grid/master-detail': <IconImage name="time" />,
  'data-grid/grouping': <IconImage name="no" />,
  'data-grid/aggregation': <IconImage name="no" />,
  'data-grid/pivoting': <IconImage name="no" />,
  'data-grid/accessibility': <IconImage name="yes" />,
  'data-grid/keyboard-nav': <IconImage name="yes" />,
  'data-grid/localization': <IconImage name="yes" />,
  'data-grid-pro': <Info value="1 year" />,
  'date-range-picker': <IconImage name="time" />,
  // Support
  community: <IconImage name="yes" />,
  'bugs/features': <Info value={<IconImage name="yes" />} metadata="Priority over Community" />,
  'tech-advisory': <IconImage name="no" />,
  'support-duration': <Info value="1 year" />,
  'response-time': <IconImage name="no" />,
  'pre-screening': <IconImage name="no" />,
  'issue-escalation': <IconImage name="no" />,
};
const premiumData: Record<string, React.ReactNode> = {
  // Core
  '@mui/core': <IconImage name="yes" />,
  '@mui/unstyled': <IconImage name="yes" />,
  '@mui/system': <IconImage name="yes" />,
  // Advanced
  'data-grid/column-resizing': <IconImage name="yes" />,
  'data-grid/column-groups': <IconImage name="time" />,
  'data-grid/column-reorder': <IconImage name="yes" />,
  'data-grid/column-pinning': <IconImage name="time" />,
  'data-grid/column-spanning': <IconImage name="time" />,
  'data-grid/row-sorting': <IconImage name="yes" />,
  'data-grid/row-height': <IconImage name="yes" />,
  'data-grid/row-spanning': <IconImage name="time" />,
  'data-grid/row-reordering': <IconImage name="time" />,
  'data-grid/row-selection': <IconImage name="yes" />,
  'data-grid/row-multiselection': <IconImage name="yes" />,
  'data-grid/row-rangeselection': <IconImage name="time" />,
  'data-grid/filter-column': <IconImage name="yes" />,
  'data-grid/filter-multicolumn': <IconImage name="yes" />,
  'data-grid/filter-quick': <IconImage name="time" />,
  'data-grid/pagination': <IconImage name="yes" />,
  'data-grid/pagination-large': <IconImage name="yes" />,
  'data-grid/edit-row': <IconImage name="time" />,
  'data-grid/edit-cell': <IconImage name="yes" />,
  'data-grid/file-csv': <IconImage name="yes" />,
  'data-grid/file-print': <IconImage name="time" />,
  'data-grid/file-excel': <IconImage name="no" />,
  'data-grid/file-clipboard': <IconImage name="time" />,
  'data-grid/virtualize-column': <IconImage name="yes" />,
  'data-grid/virtualize-row': <IconImage name="yes" />,
  'data-grid/customizable-components': <IconImage name="yes" />,
  'data-grid/tree-data': <IconImage name="time" />,
  'data-grid/master-detail': <IconImage name="time" />,
  'data-grid/grouping': <IconImage name="time" />,
  'data-grid/aggregation': <IconImage name="time" />,
  'data-grid/pivoting': <IconImage name="time" />,
  'data-grid/accessibility': <IconImage name="yes" />,
  'data-grid/keyboard-nav': <IconImage name="yes" />,
  'data-grid/localization': <IconImage name="yes" />,
  'data-grid-pro': <Info value="1 year" />,
  'date-range-picker': <IconImage name="time" />,
  // Support
  community: <IconImage name="yes" />,
  'bugs/features': <Info value={<IconImage name="yes" />} metadata="Priority over Pro" />,
  'tech-advisory': <IconImage name="time" />,
  'support-duration': <Info value="1 year" />,
  'response-time': <Info value="2 business days" metadata="1 business day (priority only)" />,
  'pre-screening': <Info value="4 hours" metadata="priority only" />,
  'issue-escalation': <Info value={<IconImage name="time" />} metadata="priority only" />,
};

export default function PricingTable({
  columnHeaderHidden,
  plans = ['community', 'pro', 'premium'],
  ...props
}: BoxProps & {
  columnHeaderHidden?: boolean;
  plans?: Array<'community' | 'pro' | 'premium'>;
}) {
  const [dataGridCollapsed, setDataGridCollapsed] = React.useState(false);
  function renderRow(key: string) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `minmax(200px, 1fr) repeat(${plans.length}, minmax(${
            columnHeaderHidden ? '0px' : '260px'
          }, 1fr))`,
          '&:hover': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primaryDark[900], 0.3)
                : alpha(theme.palette.grey[50], 0.4),
          },
        }}
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
  const divider = <Divider />;
  return (
    <Box
      {...props}
      sx={{
        width: '100%',
        overflow: 'auto',
        py: { xs: 2, md: 4 },
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        ...props.sx,
      }}
    >
      {!columnHeaderHidden && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `minmax(200px, 1fr) repeat(${plans.length}, minmax(${
              columnHeaderHidden ? '0px' : '260px'
            }, 1fr))`,
          }}
        >
          <Typography variant="body2" fontWeight="bold" sx={{ p: 2 }}>
            Plans
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <div>
              <PlanName plan="community" />
            </div>
            <PlanPrice plan="community" />
            <Button
              component={Link}
              noLinkStyle
              href="/getting-started/usage/"
              variant="outlined"
              fullWidth
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ py: 1 }}
            >
              Get Started
            </Button>
          </Box>
          <ColumnHeadHighlight>
            <Recommended />
            <div>
              <PlanName plan="pro" />
            </div>
            <PlanPrice plan="pro" />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Price capped at 10 developers.
            </Typography>
            <Button
              component={Link}
              noLinkStyle
              href="/components/data-grid/"
              variant="outlined"
              fullWidth
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ py: 1 }}
            >
              Get Started
            </Button>
          </ColumnHeadHighlight>
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ opacity: 0.5 }}>
              <PlanName plan="premium" />
              <PlanPrice plan="premium" />
            </Box>
            <Button
              component={Link}
              noLinkStyle
              href="/components/data-grid/"
              variant="outlined"
              disabled
              fullWidth
              sx={{ mt: 'auto', py: 1, '&.Mui-disabled': { color: 'text.secondary' } }}
            >
              Available later this year!
            </Button>
          </Box>
        </Box>
      )}
      <RowHead startIcon={<IconImage name="product-core" width="28" height="28" />}>Core</RowHead>
      {renderRow('@mui/core')}
      {divider}
      {renderRow('@mui/unstyled')}
      {divider}
      {renderRow('@mui/system')}

      <RowHead startIcon={<IconImage name="product-advanced" width="28" height="28" />}>
        Advanced
      </RowHead>
      <Button
        fullWidth
        onClick={() => setDataGridCollapsed((bool) => !bool)}
        endIcon={
          <KeyboardArrowRightRounded
            color="primary"
            sx={{
              transform: dataGridCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)',
              transition: '0.7s',
            }}
          />
        }
        sx={{
          p: 1,
          justifyContent: 'flex-start',
          fontWeight: 400,
          color: 'text.primary',
        }}
      >
        Data Grid
      </Button>
      {divider}
      <Collapse in={dataGridCollapsed} timeout={700} sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            width: '2px',
            left: 10,
            top: 0,
            bottom: 0,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
          }}
        />
        {renderRow('data-grid/column-resizing')}
        {divider}
        {renderRow('data-grid/column-groups')}
        {divider}
        {renderRow('data-grid/column-reorder')}
        {divider}
        {renderRow('data-grid/column-pinning')}
        {divider}
        {renderRow('data-grid/column-spanning')}
        {divider}
        {renderRow('data-grid/row-sorting')}
        {divider}
        {renderRow('data-grid/row-height')}
        {divider}
        {renderRow('data-grid/row-spanning')}
        {divider}
        {renderRow('data-grid/row-reordering')}
        {divider}
        {renderRow('data-grid/row-selection')}
        {divider}
        {renderRow('data-grid/row-multiselection')}
        {divider}
        {renderRow('data-grid/row-rangeselection')}
        {divider}
        {renderRow('data-grid/filter-column')}
        {divider}
        {renderRow('data-grid/filter-multicolumn')}
        {divider}
        {renderRow('data-grid/filter-quick')}
        {divider}
        {renderRow('data-grid/pagination')}
        {divider}
        {renderRow('data-grid/pagination-large')}
        {divider}
        {renderRow('data-grid/edit-row')}
        {divider}
        {renderRow('data-grid/edit-cell')}
        {divider}
        {renderRow('data-grid/file-csv')}
        {divider}
        {renderRow('data-grid/file-print')}
        {divider}
        {renderRow('data-grid/file-excel')}
        {divider}
        {renderRow('data-grid/file-clipboard')}
        {divider}
        {renderRow('data-grid/virtualize-column')}
        {divider}
        {renderRow('data-grid/virtualize-row')}
        {divider}
        {renderRow('data-grid/customizable-components')}
        {divider}
        {renderRow('data-grid/tree-data')}
        {divider}
        {renderRow('data-grid/master-detail')}
        {divider}
        {renderRow('data-grid/grouping')}
        {divider}
        {renderRow('data-grid/aggregation')}
        {divider}
        {renderRow('data-grid/pivoting')}
        {divider}
        {renderRow('data-grid/accessibility')}
        {divider}
        {renderRow('data-grid/keyboard-nav')}
        {divider}
        {renderRow('data-grid/localization')}
      </Collapse>
      {dataGridCollapsed && divider}
      {renderRow('data-grid-pro')}
      {divider}
      {renderRow('date-range-picker')}

      <RowHead>Support</RowHead>
      {renderRow('community')}
      {divider}
      {renderRow('bugs/features')}
      {divider}
      {renderRow('tech-advisory')}
      {divider}
      {renderRow('support-duration')}
      {divider}
      {renderRow('response-time')}
      {divider}
      {renderRow('pre-screening')}
      {divider}
      {renderRow('issue-escalation')}
      {divider}
    </Box>
  );
}
