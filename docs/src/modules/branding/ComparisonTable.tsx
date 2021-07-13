import * as React from 'react';
import { styled, alpha, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Link from 'docs/src/modules/components/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';
import CheckIcon from 'docs/src/modules/branding/icons/Check';
import CloseIcon from 'docs/src/modules/branding/icons/Close';
import PendingIcon from 'docs/src/modules/branding/icons/Pending';
import Tooltip from '@material-ui/core/Tooltip';

interface PlanFeatuerProps {
  bold?: boolean;
  sx?: object;
  text?: any;
  tooltipText?: string;
  variant?: any;
}

function PlanFeature(props: PlanFeatuerProps) {
  const { text, sx, variant, bold = false, tooltipText } = props;

  const child = (
    <Typography
      component="span"
      variant={variant || (bold ? 'h5' : 'body2')}
      sx={{
        ...sx,
        borderBottom: tooltipText ? '1px dashed rgb(19 47 78 / 40%)' : '',
      }}
    >
      {text}
    </Typography>
  );

  return tooltipText ? (
    <Tooltip title={tooltipText} placement="top-start" disableInteractive describeChild arrow>
      {child}
    </Tooltip>
  ) : (
    child
  );
}

interface PlanStatusProps {
  secondaryText?: string;
  checkIcon?: boolean;
  closeIcon?: boolean;
  mainText?: string;
  pendingIcon?: boolean;
}

function PlanStatus(props: PlanStatusProps) {
  const {
    secondaryText,
    checkIcon = false,
    closeIcon = false,
    mainText,
    pendingIcon = false,
  } = props;

  return (
    <React.Fragment>
      {checkIcon ? (
        <CheckIcon
          sx={{
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
            color: 'primary.main',
            borderRadius: '50%',
            p: 0.5,
            width: 24,
            height: 24,
            boxSizing: 'content-box',
          }}
        />
      ) : null}
      {closeIcon ? <CloseIcon /> : null}
      {pendingIcon ? <PendingIcon /> : null}
      {mainText ? (
        <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '16px' } }}>
          {mainText}
        </Typography>
      ) : null}
      {secondaryText ? (
        <Typography
          component="div"
          variant="body3"
          sx={{
            color: 'grey87',
            fontSize: { xs: '12px', sm: '14px' },
          }}
        >
          {secondaryText}
        </Typography>
      ) : null}
    </React.Fragment>
  );
}

const StyledTable = styled(Table)(({ theme }) => ({
  '& .PlanFeature-bold': {
    backgroundColor: theme.palette.greyF3,
  },
  '& .MuiTableCell-root': {
    border: 0,
    verticalAlign: 'top',
    paddingRight: 2,
    paddingLeft: 2,
    '&:nth-of-type(1)': {
      paddingLeft: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(5),
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(13),
      },
    },
    '&:nth-of-type(4)': {
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingRight: theme.spacing(5),
      },
      [theme.breakpoints.up('lg')]: {
        paddingRight: theme.spacing(13),
      },
    },
  },
}));

function createRow(type: any, community: any, pro: any, premium: any) {
  return { type, community, pro, premium };
}

const rows = [
  {
    ...createRow(
      <PlanFeature text="Design system" bold tooltipText="Modules to create great looking UIs." />,
      '',
      '',
      '',
    ),
    className: 'PlanFeature-bold',
  },
  createRow(
    <PlanFeature
      text="@material-ui/core"
      tooltipText="Core components following Material Design."
    />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  createRow(
    <PlanFeature
      text="@material-ui/system"
      tooltipText="CSS utilities for rapidly laying out custom designs."
    />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  createRow(
    <PlanFeature
      text="@material-ui/unstyled"
      tooltipText="The unstyled and headless (hooks) components version of @material-ui/core."
    />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  {
    ...createRow(
      <PlanFeature
        bold
        text="Advanced components"
        tooltipText="Also known as Material-UI X. Developed under the mui-org/material-ui-x repository."
      />,
      '',
      '',
      '',
    ),
    className: 'PlanFeature-bold',
  },
  createRow(
    <PlanFeature
      text="DataGrid"
      tooltipText="An improved version of the Table component. Available in the @material-ui/data-grid package."
    />,
    <PlanStatus mainText="lifetime" />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  createRow(
    <PlanFeature
      text="XGrid"
      tooltipText="A powerful data table. Available in the @material-ui/x-grid package."
    />,
    <PlanStatus closeIcon />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  createRow(
    <PlanFeature text="XGrid Updates" />,
    <PlanStatus closeIcon />,
    <PlanStatus mainText="1 year" />,
    <PlanStatus mainText="1 year" />,
  ),
  createRow(
    <PlanFeature text="DateRangePicker" />,
    <PlanStatus closeIcon />,
    <PlanStatus pendingIcon />,
    <PlanStatus pendingIcon />,
  ),
  createRow(
    <PlanFeature text="XGrid Advanced features" />,
    <PlanStatus closeIcon />,
    <PlanStatus closeIcon />,
    <PlanStatus pendingIcon />,
  ),
  { ...createRow(<PlanFeature bold text="Support" />, '', '', ''), className: 'PlanFeature-bold' },
  createRow(
    <PlanFeature
      text="Community"
      tooltipText="The community is here to help on StackOverflow and other channels."
    />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon />,
  ),
  createRow(
    <PlanFeature
      text="Bugs reports & feature requests*"
      tooltipText="You can report an unlimited number of bugs and submit unlimited feature requests."
    />,
    <PlanStatus checkIcon />,
    <PlanStatus checkIcon secondaryText="priority over Community" />,
    <PlanStatus checkIcon secondaryText="priority over Pro" />,
  ),
  createRow(
    <PlanFeature
      text="Technical advisory*"
      tooltipText="Get the advice you need, from the people who build the product."
    />,
    <PlanStatus closeIcon />,
    <PlanStatus closeIcon />,
    <PlanStatus pendingIcon />,
  ),
  createRow(
    <PlanFeature text="Support duration" tooltipText="Included with initial license purchase." />,
    <PlanStatus closeIcon />,
    <PlanStatus mainText="1 year" />,
    <PlanStatus mainText="1 year" />,
  ),
  createRow(
    <PlanFeature
      text="Guaranteed response time"
      tooltipText="Maximum lead time for each response."
    />,
    <PlanStatus closeIcon />,
    <PlanStatus closeIcon />,
    <PlanStatus mainText="2 business days" secondaryText="1 business day (priority only)" />,
  ),
  createRow(
    <PlanFeature
      text="Pre-screening"
      tooltipText={
        'Ensure we have enough details in the ticket you submitted so our support team can work on it.'
      }
    />,
    <PlanStatus closeIcon />,
    <PlanStatus closeIcon />,
    <PlanStatus mainText="4 hours" secondaryText="priority only" />,
  ),
  createRow(
    <PlanFeature
      text="Issue escalation"
      tooltipText="Escalate your tickets to highest priority in our support queue."
    />,
    <PlanStatus closeIcon />,
    <PlanStatus closeIcon />,
    <PlanStatus pendingIcon secondaryText="priority only" />,
  ),
  createRow(
    <PlanFeature
      text={
        <React.Fragment>
          *Subject to{' '}
          <Box component="span" sx={{ borderBottom: '1px solid' }}>
            fair use policy
          </Box>
        </React.Fragment>
      }
      variant="body3"
      sx={{ color: 'grey87' }}
    />,
    <Button
      component={Link}
      noLinkStyle
      href="/getting-started/usage/"
      size="medium"
      variant="contained"
      endIcon={<NavigateNextIcon />}
      sx={{ display: { md: 'inline-flex', xs: 'none' } }}
    >
      Get started
    </Button>,
    <Button
      component={Link}
      noLinkStyle
      href="/components/data-grid/"
      size="medium"
      variant="contained"
      endIcon={<NavigateNextIcon />}
      sx={{ display: { md: 'inline-flex', xs: 'none' } }}
    >
      Learn more
    </Button>,
    <Button
      component={Link}
      noLinkStyle
      disabled
      href="/getting-started/usage/"
      variant="contained"
      endIcon={<NavigateNextIcon />}
      sx={{ display: { md: 'inline-flex', xs: 'none' } }}
    >
      Learn more
    </Button>,
  ),
];

const tableHeader = [
  {
    heading: 'Community',
    src: '/static/branding/pricing/community-plan.svg',
    imgProps: { width: 21, height: 24 },
  },
  { heading: 'Pro', src: '/static/branding/pricing/pro.svg', imgProps: { width: 32, height: 24 } },
  {
    heading: 'Premium',
    src: '/static/branding/pricing/premium.svg',
    imgProps: { width: 44, height: 24 },
  },
];

export default function ComparisonTable() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ mx: 'auto', maxWidth: 1440 }}>
      {isSmUp ? null : (
        <Grid container sx={{ textAlign: 'center', pt: 5, pb: 3 }}>
          {tableHeader.map((header) => (
            <Grid item xs={4} key={header.heading}>
              <Box component="img" src={header.src} loading="lazy" alt="" {...header.imgProps} />
              <Typography variant="h4" component="div" sx={{ fontSize: 19 }}>
                {header.heading}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
      <StyledTable aria-label="comparison table">
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHeader.map((header) => (
              <TableCell align="center" key={header.heading}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: { xs: 'column', lg: 'row' },
                    '& img': {
                      mr: { lg: 2 },
                      mb: { sm: 0.5 },
                    },
                  }}
                >
                  <img src={header.src} loading="lazy" alt="" {...header.imgProps} />
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontSize: { xs: 19, md: 24 }, display: { xs: 'none', sm: 'block' } }}
                  >
                    {header.heading}
                  </Typography>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, index) => (
            <TableRow key={index} className={row.className}>
              <TableCell>{row.type}</TableCell>
              <TableCell align="center">{row.community}</TableCell>
              <TableCell align="center">{row.pro}</TableCell>
              <TableCell align="center">{row.premium}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
}
