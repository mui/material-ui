import * as React from 'react';
import { useTheme, alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InfoRounded from '@material-ui/icons/InfoRounded';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import SvgProductCore from 'docs/src/icons/SvgProductCore';
import SvgProductAdvanced from 'docs/src/icons/SvgProductAdvanced';

const Status = ({ value }: { value: 'yes' | 'no' | 'wip' }) => {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  let element = <img src={`/static/branding/pricing/yes-${mode}.svg`} alt="" />;
  if (value === 'no') {
    element = <img src={`/static/branding/pricing/no-${mode}.svg`} alt="" />;
  }
  if (value === 'wip') {
    element = <img src={`/static/branding/pricing/time-${mode}.svg`} alt="" />;
  }
  return element;
};
const Info = ({ value, metadata }: { value: React.ReactNode; metadata?: string }) => {
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
          color="grey.700"
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
}: {
  label: string;
  metadata?: string;
  tooltip?: string;
}) => {
  const text = (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ '&:hover > svg': { color: 'primary.main' } }}
    >
      {label}{' '}
      {tooltip && (
        <InfoRounded sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5, color: 'grey.400' }} />
      )}
    </Typography>
  );
  return (
    <Box sx={{ pl: 2, alignSelf: 'center', justifySelf: 'flex-start' }}>
      {tooltip ? (
        <Tooltip title={tooltip} placement="right">
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
const coreData = [
  [
    <ColumnHead
      {...{ label: '@mui/unstyled', tooltip: 'Core components following Material Design.' }}
    />,
    <Status value="yes" />,
    <Status value="yes" />,
    <Status value="yes" />,
  ],
  [
    <ColumnHead
      {...{ label: '@mui/core', tooltip: 'CSS utilities for rapidly laying out custom designs.' }}
    />,
    <Status value="yes" />,
    <Status value="yes" />,
    <Status value="yes" />,
  ],
  [
    <ColumnHead
      {...{
        label: '@mui/system',
        tooltip: 'The unstyled and headless (hooks) components version of @material-ui/core.',
      }}
    />,
    <Status value="yes" />,
    <Status value="yes" />,
    <Status value="yes" />,
  ],
];
const advancedData = [
  [
    <ColumnHead
      {...{
        label: 'Data Grid',
        tooltip:
          'An improved version of the Table component. Available in the @material-ui/data-grid package.',
      }}
    />,
    <Status value="yes" />,
    <Status value="yes" />,
    <Status value="yes" />,
  ],
  [
    <ColumnHead
      {...{
        label: 'Data Grid Advanced',
        tooltip: 'A powerful data table. Available in the @material-ui/x-grid package.',
      }}
    />,
    <Status value="no" />,
    <Status value="yes" />,
    <Status value="yes" />,
  ],
  [<ColumnHead {...{ label: 'Data Grid Updates' }} />, <Status value="no" />, '1 year', '1 year'],
  [
    <ColumnHead {...{ label: 'XGrid Advanced features' }} />,
    <Status value="no" />,
    <Status value="wip" />,
    <Status value="wip" />,
  ],
  [
    <ColumnHead {...{ label: 'Date Range Picker' }} />,
    <Status value="no" />,
    <Status value="no" />,
    <Status value="wip" />,
  ],
];
const supportData = [
  [
    <ColumnHead {...{ label: 'Community' }} />,
    <Status value="yes" />,
    <Status value="yes" />,
    <Status value="yes" />,
  ],
  [
    <ColumnHead
      {...{
        label: 'Bug reports & feature requests',
        tooltip:
          'You can report an unlimited number of bugs and submit unlimited feature requests.',
      }}
    />,
    <Status value="yes" />,
    <Info value={<Status value="yes" />} metadata="Priority over Community" />,
    <Info value={<Status value="yes" />} metadata="Priority over Pro" />,
  ],
  [
    <ColumnHead
      {...{
        label: 'Technical advisory',
        metadata: 'Subject to fair use policy',
        tooltip: 'Get the advice you need, from the people who build the product.',
      }}
    />,
    <Status value="no" />,
    <Status value="no" />,
    <Status value="wip" />,
  ],
  [
    <ColumnHead
      {...{ label: 'Support duration', tooltip: 'Included with initial license purchase.' }}
    />,
    <Status value="no" />,
    <Info value="1 year" />,
    <Info value="1 year" />,
  ],
  [
    <ColumnHead
      {...{ label: 'Guaranteed response time', tooltip: 'Maximum lead time for each response.' }}
    />,
    <Status value="no" />,
    <Status value="no" />,
    <Info value="2 business days" metadata="1 business day (priority only)" />,
  ],
  [
    <ColumnHead
      {...{
        label: 'Pre-screening',
        tooltip:
          'Ensure we have enough details in the ticket you submitted so our support team can work on it.',
      }}
    />,
    <Status value="no" />,
    <Status value="no" />,
    <Info value="4 hours" metadata="priority only" />,
  ],
  [
    <ColumnHead
      {...{
        label: 'Issue escalation',
        tooltip: 'Escalate your tickets to highest priority in our support queue.',
      }}
    />,
    <Status value="no" />,
    <Status value="no" />,
    <Info value={<Status value="wip" />} metadata="priority only" />,
  ],
];

export default function PricingTable() {
  function renderData(array: Array<Array<React.ReactNode>>) {
    return array.map((row, rowIndex) => (
      <React.Fragment key={rowIndex}>
        {row.map((item, colIndex) => {
          if (colIndex === 0) {
            return <React.Fragment key={colIndex}>{item}</React.Fragment>;
          }
          return (
            <Box
              key={colIndex}
              sx={{
                py: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...(colIndex % 2 === 0 && {
                  borderWidth: '0 1px 0 1px',
                  borderStyle: 'solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primaryDark[900], 0.7)
                      : alpha(theme.palette.grey[50], 0.7),
                }),
              }}
            >
              {item}
            </Box>
          );
        })}
        {rowIndex !== array.length - 1 && (
          <Divider key={`divider-${rowIndex}`} sx={{ gridColumn: 'span 4' }} />
        )}
      </React.Fragment>
    ));
  }
  function renderRowHead({ sx, ...props }: ButtonProps) {
    return (
      <Button
        {...props}
        sx={{
          gridColumn: 'span 4',
          justifyContent: 'flex-start',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
          px: 2,
          '& circle': {
            fill: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[100],
          },
          transition: 'none',
          ...sx,
        }}
      />
    );
  }
  return (
    <Container
      sx={{
        py: 4,
        display: { xs: 'none', md: 'grid' },
        gridTemplateColumns: '1fr repeat(3, minmax(220px, 1fr))',
      }}
    >
      <Typography variant="body2" fontWeight="bold">
        Plans
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
        <div>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            Community <img src="/static/branding/pricing/block-green.svg" alt="" />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Get started with the most popular and industry-standard UI library to build interfaces
            with React.
          </Typography>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 'auto' }}>
          <Typography variant="h4" fontWeight="bold" color="grey.600">
            $0
          </Typography>
          <Box sx={{ width: 5 }} />
          <Typography variant="body2" color="text.secondary">
            / free forever!
          </Typography>
        </Box>
        <Button variant="outlined" fullWidth endIcon={<KeyboardArrowRightRounded />} sx={{ py: 1 }}>
          Get Started
        </Button>
      </Box>
      <Box
        sx={{
          p: 2,
          position: 'relative',
          borderRadius: '10px 10px 0 0',
          borderWidth: '1px 1px 0 1px',
          borderStyle: 'solid',
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200'),
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primaryDark[900], 0.7)
              : alpha(theme.palette.grey[50], 0.7),
        }}
      >
        <Box
          sx={{
            typography: 'caption',
            color: 'primary.500',
            p: '2px 8px',
            border: '1px solid',
            borderRadius: 2,
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.900' : 'primary.200',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.50'),
            position: 'absolute',
            top: 0,
            left: 20,
            transform: 'translateY(-50%)',
          }}
        >
          Recommended
        </Box>
        <div>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            Pro <img src="/static/branding/pricing/block-blue.svg" alt="" />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Best for professional developers building enterprise or data-rich applications.
          </Typography>
        </div>
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
        <Button variant="outlined" fullWidth endIcon={<KeyboardArrowRightRounded />} sx={{ py: 1 }}>
          Get Started
        </Button>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ opacity: 0.5 }}>
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
            Premium
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Best for professional developers building enterprise or data-rich applications.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 5 }}>
            <Typography variant="h4" fontWeight="bold" color="grey.600">
              $599
            </Typography>
            <Box sx={{ width: 5 }} />
            <Typography variant="body2" color="text.secondary">
              / per developer
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          disabled
          fullWidth
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ py: 1, '&.Mui-disabled': { color: 'text.secondary' } }}
        >
          Available later this year!
        </Button>
      </Box>
      {renderRowHead({
        startIcon: <SvgProductCore />,
        endIcon: <KeyboardArrowRightRounded />,
        children: 'Core',
      })}
      {renderData(coreData)}
      {renderRowHead({
        startIcon: <SvgProductAdvanced />,
        endIcon: <KeyboardArrowRightRounded />,
        children: 'Advanced',
      })}
      {renderData(advancedData)}
      {renderRowHead({
        sx: { color: 'text.primary' },
        children: 'Advanced',
      })}
      {renderData(supportData)}
      <Divider sx={{ gridColumn: 'span 4' }} />
    </Container>
  );
}
